import { KPI, KPIAudit } from "@prisma/client";
import { prisma } from "../prisma/PrismaClient";
import { KPIRequest } from "@/domain/dto/KPI";
import { KPIAuditRequest } from "@/domain/dto/KPIAudit";
import { NotFoundError } from "@/lib/http/error";

export class KPIRepositoryPrisma {
  async create(req: KPIRequest): Promise<KPI> {
    const employeeExists = await prisma.employee.count({
      where: { id: req.employeeId, deletedAt: null },
    });
    if (employeeExists === 0) throw new NotFoundError(`Employee ${req.employeeId} not found`);

    const kpi = await prisma.kPI.create({
      data: {
        employee: { connect: { id: req.employeeId } },
        period: req.period,
        documentFile: req.documentFile,
        description: req.description ?? null,
      },
    });

    return kpi;
  }

  async getById(id: string): Promise<KPI> {
    const kpi = await prisma.kPI.findFirst({ where: { id, deletedAt: null } });
    if (!kpi) throw new NotFoundError(`KPI ${id} not found`);
    return kpi;
  }

  async getAll(): Promise<KPI[]> {
    return await prisma.kPI.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
  }

  async update(id: string, req: KPIRequest): Promise<KPI> {
    const exists = await prisma.kPI.findFirst({ where: { id, deletedAt: null } });
    if (!exists) throw new NotFoundError(`KPI ${id} not found`);

    const employeeExists = await prisma.employee.count({
      where: { id: req.employeeId, deletedAt: null },
    });
    if (employeeExists === 0) throw new NotFoundError(`Employee ${req.employeeId} not found`);

    const updated = await prisma.kPI.update({
      where: { id },
      data: {
        employeeId: req.employeeId,
        period: req.period,
        documentFile: req.documentFile,
        description: req.description ?? null,
      },
    });

    return updated;
  }

  async deleteById(id: string): Promise<void> {
    const exists = await prisma.kPI.findFirst({ where: { id, deletedAt: null } });
    if (!exists) throw new NotFoundError(`KPI ${id} not found`);
    await prisma.kPI.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async addAudit(req: KPIAuditRequest): Promise<KPIAudit> {
    const kpi = await prisma.kPI.findFirst({ where: { id: req.kpiId, deletedAt: null } });
    if (!kpi) throw new NotFoundError(`KPI ${req.kpiId} not found`);

    const auditorExists = await prisma.employee.count({
      where: { id: req.auditorId, deletedAt: null },
    });
    if (auditorExists === 0) throw new NotFoundError(`Employee ${req.auditorId} not found`);

    // Prevent self-audit
    if (req.auditorId === kpi.employeeId) {
      throw new Error("Auditor cannot audit their own KPI");
    }

    const existing = await prisma.kPIAudit.count({
      where: { auditorId: req.auditorId, kpiId: req.kpiId },
    });
    if (existing > 0) throw new Error("This auditor already audited the KPI");

    const audit = await prisma.kPIAudit.create({
      data: {
        auditor: { connect: { id: req.auditorId } },
        kpi: { connect: { id: req.kpiId } },
        notes: req.notes ?? null,
        score: req.score ?? null,
      },
    });

    return audit;
  }

  async getAuditsByKpi(kpiId: string): Promise<KPIAudit[]> {
    return await prisma.kPIAudit.findMany({
      where: { kpiId, deletedAt: null },
      orderBy: { auditedAt: "desc" },
    });
  }

  async getAuditsByAuditor(auditorId: string): Promise<KPIAudit[]> {
    return await prisma.kPIAudit.findMany({
      where: { auditorId, deletedAt: null },
      orderBy: { auditedAt: "desc" },
    });
  }
}
