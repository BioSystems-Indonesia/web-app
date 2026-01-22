import { JobdeskRepository } from "@/domain/repositories/JobdeskRepository";
import { Jobdesk, EmployeeJobdesk } from "@prisma/client";
import { prisma } from "../prisma/PrismaClient";
import { JobdeskRequest } from "@/domain/dto/Jobdesk";
import { EmployeeJobdeskRequest } from "@/domain/dto/EmployeeJobdesk";
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
    const jobdesk = await prisma.jobdesk.findFirst({ where: { id, deletedAt: null } });
    if (!jobdesk) throw new NotFoundError(`Jobdesk ${id} not found`);
    return jobdesk;
  }

  async getAll(): Promise<Jobdesk[]> {
    return await prisma.jobdesk.findMany({ where: { deletedAt: null }, orderBy: { title: "asc" } });
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

  async assignToEmployee(req: EmployeeJobdeskRequest): Promise<EmployeeJobdesk> {
    const jobdeskExists = await prisma.jobdesk.count({
      where: { id: req.jobdeskId, deletedAt: null },
    });
    if (jobdeskExists === 0) throw new NotFoundError(`Jobdesk ${req.jobdeskId} not found`);

    const employeeExists = await prisma.employee.count({
      where: { id: req.employeeId, deletedAt: null },
    });
    if (employeeExists === 0) throw new NotFoundError(`Employee ${req.employeeId} not found`);

    const active = await prisma.employeeJobdesk.count({
      where: { employeeId: req.employeeId, jobdeskId: req.jobdeskId, deletedAt: null },
    });
    if (active > 0) throw new Error("Employee already assigned to this jobdesk");

    const assignment = await prisma.employeeJobdesk.create({
      data: {
        employee: { connect: { id: req.employeeId } },
        jobdesk: { connect: { id: req.jobdeskId } },
      },
    });

    return assignment;
  }

  async unassignEmployee(assignmentId: string): Promise<void> {
    const exists = await prisma.employeeJobdesk.findFirst({
      where: { id: assignmentId, deletedAt: null },
    });
    if (!exists) throw new NotFoundError(`Assignment ${assignmentId} not found`);

    await prisma.employeeJobdesk.update({
      where: { id: assignmentId },
      data: { deletedAt: new Date() },
    });
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

  async getJobdesksByEmployee(employeeId: string): Promise<EmployeeJobdesk[]> {
    const employeeExists = await prisma.employee.count({
      where: { id: employeeId, deletedAt: null },
    });
    if (employeeExists === 0) throw new NotFoundError(`Employee ${employeeId} not found`);

    return await prisma.employeeJobdesk.findMany({
      where: { employeeId, deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
  }
}
