import { JobdeskRepository } from "@/domain/repositories/JobdeskRepository";
import { Jobdesk } from "@prisma/client";
import { prisma } from "../prisma/PrismaClient";
import { JobdeskRequest } from "@/domain/dto/Jobdesk";
import { NotFoundError } from "@/lib/http/error";

export class JobdeskRepositoryPrisma implements JobdeskRepository {
  async create(req: JobdeskRequest): Promise<Jobdesk> {
    const positionExists = await prisma.position.count({
      where: { id: req.positionId, deletedAt: null },
    });
    if (positionExists === 0) throw new NotFoundError(`Position ${req.positionId} not found`);

    const jobdesk = await prisma.jobdesk.create({
      data: {
        title: req.title,
        description: req.description ?? null,
        position: { connect: { id: req.positionId } },
      },
    });

    return jobdesk;
  }

  async getById(id: string): Promise<Jobdesk> {
    const jobdesk = await prisma.jobdesk.findFirst({
      where: { id, deletedAt: null },
      include: {
        employees: {
          select: {
            employee: {
              select: { fullName: true, employeeCode: true, employmentStatus: true },
            },
          },
        },
      },
    });
    if (!jobdesk) throw new NotFoundError(`Jobdesk ${id} not found`);
    return jobdesk;
  }

  async getAll(): Promise<Jobdesk[]> {
    return await prisma.jobdesk.findMany({
      where: { deletedAt: null },
      include: {
        position: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { title: "asc" },
    });
  }

  async update(id: string, req: JobdeskRequest): Promise<Jobdesk> {
    const exists = await prisma.jobdesk.findFirst({ where: { id, deletedAt: null } });
    if (!exists) throw new NotFoundError(`Jobdesk ${id} not found`);

    const positionExists = await prisma.position.count({
      where: { id: req.positionId, deletedAt: null },
    });
    if (positionExists === 0) throw new NotFoundError(`Position ${req.positionId} not found`);

    const updated = await prisma.jobdesk.update({
      where: { id },
      data: {
        title: req.title,
        description: req.description ?? null,
        position: { connect: { id: req.positionId } },
      },
    });

    return updated;
  }

  async deleteById(id: string): Promise<void> {
    const exists = await prisma.jobdesk.findFirst({ where: { id, deletedAt: null } });
    if (!exists) throw new NotFoundError(`Jobdesk ${id} not found`);
    await prisma.jobdesk.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async getJobdesksByPosition(positionId: string): Promise<Jobdesk[]> {
    const positionExists = await prisma.position.count({
      where: { id: positionId, deletedAt: null },
    });
    if (positionExists === 0) throw new NotFoundError(`Position ${positionId} not found`);

    return await prisma.jobdesk.findMany({
      where: { positionId, deletedAt: null },
      orderBy: { title: "asc" },
    });
  }

  async getJobdesksByEmployee(employeeId: string): Promise<Jobdesk[]> {
    const employee = await prisma.employee.findFirst({
      where: { id: employeeId, deletedAt: null },
      select: { positionId: true },
    });
    if (!employee) throw new NotFoundError(`Employee ${employeeId} not found`);

    return await prisma.jobdesk.findMany({
      where: { positionId: employee.positionId, deletedAt: null },
      orderBy: { title: "asc" },
    });
  }
}
