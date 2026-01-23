import { LeaveRequest } from "@prisma/client";
import { prisma } from "../prisma/PrismaClient";
import { LeaveRequestDto } from "@/domain/dto/LeaveRequest";
import { NotFoundError } from "@/lib/http/error";

export class LeaveRepositoryPrisma {
  async create(req: LeaveRequestDto): Promise<LeaveRequest> {
    const employeeExists = await prisma.employee.count({
      where: { id: req.employeeId, deletedAt: null },
    });
    if (employeeExists === 0) throw new NotFoundError(`Employee ${req.employeeId} not found`);

    // Prevent overlapping leaves for the same employee
    const overlaps = await prisma.leaveRequest.count({
      where: {
        employeeId: req.employeeId,
        deletedAt: null,
        AND: [{ startDate: { lte: req.endDate } }, { endDate: { gte: req.startDate } }],
      },
    });

    if (overlaps > 0) {
      throw new Error("Employee has overlapping leave during the specified period");
    }

    const leave = await prisma.leaveRequest.create({
      data: {
        employee: { connect: { id: req.employeeId } },
        position: req.position,
        leaveType: req.leaveType,
        startDate: req.startDate,
        endDate: req.endDate,
        totalDays: req.totalDays,
        status: req.status ?? undefined,
        approvedBy: req.approvedBy ?? undefined,
      },
    });

    return leave;
  }

  async getById(id: string): Promise<LeaveRequest> {
    const leave = await prisma.leaveRequest.findFirst({
      where: { id, deletedAt: null },
      include: {
        employee: {
          select: {
            id: true,
            fullName: true,
            position: {
              select: {
                name: true,
                code: true,
              },
            },
          },
        },
      },
    });
    if (!leave) throw new NotFoundError(`LeaveRequest ${id} not found`);
    return leave;
  }

  async getAll(): Promise<any[]> {
    return await prisma.leaveRequest.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        employeeId: false,
        startDate: true,
        endDate: true,
        totalDays: true,
        status: true,
        approvedBy: true,
        employee: {
          select: {
            id: true,
            fullName: true,
            position: {
              select: {
                name: true,
                code: true,
              },
            },
          },
        },
      },
      orderBy: { startDate: "desc" },
    });
  }

  async update(id: string, req: Partial<LeaveRequestDto>): Promise<LeaveRequest> {
    const exists = await prisma.leaveRequest.findFirst({ where: { id, deletedAt: null } });
    if (!exists) throw new NotFoundError(`LeaveRequest ${id} not found`);

    if (req.employeeId) {
      const employeeExists = await prisma.employee.count({
        where: { id: req.employeeId, deletedAt: null },
      });
      if (employeeExists === 0) throw new NotFoundError(`Employee ${req.employeeId} not found`);
    }

    // If date range changed, check overlaps
    const start = req.startDate ?? exists.startDate;
    const end = req.endDate ?? exists.endDate;

    const overlaps = await prisma.leaveRequest.count({
      where: {
        employeeId: req.employeeId ?? exists.employeeId,
        deletedAt: null,
        AND: [{ startDate: { lte: end } }, { endDate: { gte: start } }],
        id: { not: id },
      },
    });

    if (overlaps > 0) {
      throw new Error("Employee has overlapping leave during the specified period");
    }

    const updated = await prisma.leaveRequest.update({
      where: { id },
      data: {
        employeeId: req.employeeId ?? undefined,
        position: req.position ?? undefined,
        leaveType: req.leaveType ?? undefined,
        startDate: req.startDate ?? undefined,
        endDate: req.endDate ?? undefined,
        totalDays: req.totalDays ?? undefined,
        status: req.status ?? undefined,
        approvedBy: req.approvedBy ?? undefined,
      },
    });

    return updated;
  }

  async deleteById(id: string): Promise<void> {
    const exists = await prisma.leaveRequest.findFirst({ where: { id, deletedAt: null } });
    if (!exists) throw new NotFoundError(`LeaveRequest ${id} not found`);

    await prisma.leaveRequest.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async approve(id: string, approverId: string, approve: boolean): Promise<LeaveRequest> {
    const exists = await prisma.leaveRequest.findFirst({ where: { id, deletedAt: null } });
    if (!exists) throw new NotFoundError(`LeaveRequest ${id} not found`);

    const approverExists = await prisma.employee.count({
      where: { id: approverId, deletedAt: null },
    });
    if (approverExists === 0) throw new NotFoundError(`Employee ${approverId} not found`);

    const updated = await prisma.leaveRequest.update({
      where: { id },
      data: {
        status: approve ? "APPROVED" : "REJECTED",
        approvedBy: approverId,
      },
    });

    return updated;
  }

  async getByEmployeeAndPeriod(employeeId: string, start: Date, end: Date): Promise<any[]> {
    return await prisma.leaveRequest.findMany({
      where: {
        employeeId,
        deletedAt: null,
        AND: [{ startDate: { lte: end } }, { endDate: { gte: start } }],
      },
      select: {
        id: true,
        employeeId: true,
        startDate: true,
        endDate: true,
        totalDays: true,
        status: true,
        approvedBy: true,
        employee: {
          select: {
            id: true,
            fullName: true,
            position: {
              select: {
                name: true,
                code: true,
              },
            },
          },
        },
      },
      orderBy: { startDate: "asc" },
    });
  }
}
