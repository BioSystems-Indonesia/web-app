import { PerformanceReview, PerformanceAudit } from "@prisma/client";
import { prisma } from "../prisma/PrismaClient";
import { PerformanceReviewRequest } from "@/domain/dto/PerformanceReview";
import { PerformanceAuditRequest } from "@/domain/dto/PerformanceAudit";
import { NotFoundError } from "@/lib/http/error";

export class PerformanceRepositoryPrisma {
  async create(req: PerformanceReviewRequest): Promise<PerformanceReview> {
    const employeeExists = await prisma.employee.count({
      where: { id: req.employeeId, deletedAt: null },
    });
    if (employeeExists === 0) throw new NotFoundError(`Employee ${req.employeeId} not found`);

    const review = await prisma.performanceReview.create({
      data: {
        employee: { connect: { id: req.employeeId } },
        period: req.period,
        workQuality: req.workQuality,
        communication: req.communication,
        workMethod: req.workMethod,
        problemSolving: req.problemSolving,
        compliance: req.compliance,
        discipline: req.discipline,
        cleanliness: req.cleanliness,
        initiative: req.initiative,
        specialTaskScore: req.specialTaskScore,
        weight: req.weight,
        totalScore: req.totalScore,
        ranking: req.ranking ?? null,
      },
    });

    return review;
  }

  async getById(id: string): Promise<PerformanceReview> {
    const review = await prisma.performanceReview.findFirst({ where: { id, deletedAt: null } });
    if (!review) throw new NotFoundError(`PerformanceReview ${id} not found`);
    return review;
  }

  async getAll(): Promise<PerformanceReview[]> {
    return await prisma.performanceReview.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
  }

  async update(id: string, req: PerformanceReviewRequest): Promise<PerformanceReview> {
    const exists = await prisma.performanceReview.findFirst({ where: { id, deletedAt: null } });
    if (!exists) throw new NotFoundError(`PerformanceReview ${id} not found`);

    const employeeExists = await prisma.employee.count({
      where: { id: req.employeeId, deletedAt: null },
    });
    if (employeeExists === 0) throw new NotFoundError(`Employee ${req.employeeId} not found`);

    const updated = await prisma.performanceReview.update({
      where: { id },
      data: {
        employeeId: req.employeeId,
        period: req.period,
        workQuality: req.workQuality,
        communication: req.communication,
        workMethod: req.workMethod,
        problemSolving: req.problemSolving,
        compliance: req.compliance,
        discipline: req.discipline,
        cleanliness: req.cleanliness,
        initiative: req.initiative,
        specialTaskScore: req.specialTaskScore,
        weight: req.weight,
        totalScore: req.totalScore,
        ranking: req.ranking ?? null,
      },
    });

    return updated;
  }

  async deleteById(id: string): Promise<void> {
    const exists = await prisma.performanceReview.findFirst({ where: { id, deletedAt: null } });
    if (!exists) throw new NotFoundError(`PerformanceReview ${id} not found`);
    await prisma.performanceReview.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async addAudit(req: PerformanceAuditRequest): Promise<PerformanceAudit> {
    const review = await prisma.performanceReview.findFirst({
      where: { id: req.reviewId, deletedAt: null },
    });
    if (!review) throw new NotFoundError(`PerformanceReview ${req.reviewId} not found`);

    const auditorExists = await prisma.employee.count({
      where: { id: req.auditorId, deletedAt: null },
    });
    if (auditorExists === 0) throw new NotFoundError(`Employee ${req.auditorId} not found`);

    if (req.auditorId === review.employeeId)
      throw new Error("Auditor cannot audit their own review");

    const existing = await prisma.performanceAudit.count({
      where: { auditorId: req.auditorId, reviewId: req.reviewId },
    });
    if (existing > 0) throw new Error("This auditor already audited the review");

    const audit = await prisma.performanceAudit.create({
      data: {
        auditor: { connect: { id: req.auditorId } },
        review: { connect: { id: req.reviewId } },
        notes: req.notes ?? null,
        approved: req.approved ?? false,
      },
    });

    return audit;
  }

  async getAuditsByReview(reviewId: string): Promise<PerformanceAudit[]> {
    return await prisma.performanceAudit.findMany({
      where: { reviewId, deletedAt: null },
      orderBy: { auditedAt: "desc" },
    });
  }

  async getAuditsByAuditor(auditorId: string): Promise<PerformanceAudit[]> {
    return await prisma.performanceAudit.findMany({
      where: { auditorId, deletedAt: null },
      orderBy: { auditedAt: "desc" },
    });
  }
}
