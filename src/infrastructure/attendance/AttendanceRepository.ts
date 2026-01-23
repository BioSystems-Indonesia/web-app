import { AttendanceRepository } from "@/domain/repositories/AttendanceRepository";
import { Attendance } from "@prisma/client";
import { prisma } from "../prisma/PrismaClient";
import { AttendanceRequest } from "@/domain/dto/Attendance";
import { BadRequestError, NotFoundError } from "@/lib/http/error";

export class AttendanceRepositoryPrisma implements AttendanceRepository {
  async create(req: AttendanceRequest): Promise<Attendance> {
    const employeeExists = await prisma.employee.count({
      where: { id: req.employeeId, deletedAt: null },
    });

    if (employeeExists === 0) {
      throw new NotFoundError(`Employee ${req.employeeId} not found`);
    }

    const existing = await prisma.attendance.count({
      where: { employeeId: req.employeeId, date: req.date },
    });

    if (existing > 0) {
      throw new BadRequestError("Attendance for this employee and date already exists");
    }

    const attendance = await prisma.attendance.create({
      data: {
        employee: { connect: { id: req.employeeId } },
        date: req.date,
        checkIn: req.checkIn ?? null,
        checkOut: req.checkOut ?? null,
        status: req.status,
      },
    });

    return attendance;
  }

  async getById(id: string): Promise<Attendance> {
    const attendance = await prisma.attendance.findFirst({
      where: { id },
    });

    if (!attendance) throw new NotFoundError(`Attendance ${id} not found`);

    return attendance;
  }

  async getAllByEmployeeId(employeeId: string): Promise<Attendance[]> {
    return await prisma.attendance.findMany({
      where: { employeeId: employeeId },
      orderBy: { date: "asc" },
    });
  }

  async getByEmployeeIdAndMonth(
    employeeId: string,
    month: number,
    year: number
  ): Promise<Attendance[]> {
    const start = new Date(Date.UTC(year, month - 1, 1));
    const end = new Date(Date.UTC(year, month - 1 + 1, 1));

    return await prisma.attendance.findMany({
      where: {
        employeeId,
        date: {
          gte: start,
          lt: end,
        },
      },
      orderBy: { date: "asc" },
    });
  }

  async update(id: string, req: Partial<AttendanceRequest>): Promise<Attendance> {
    const exists = await prisma.attendance.findFirst({ where: { id } });
    if (!exists) throw new NotFoundError(`Attendance ${id} not found`);

    if (req.employeeId) {
      const employeeExists = await prisma.employee.count({
        where: { id: req.employeeId, deletedAt: null },
      });
      if (employeeExists === 0) throw new NotFoundError(`Employee ${req.employeeId} not found`);
    }

    const attendance = await prisma.attendance.update({
      where: { id },
      data: {
        employeeId: req.employeeId ?? undefined,
        date: req.date ?? undefined,
        checkIn: req.checkIn ?? undefined,
        checkOut: req.checkOut ?? undefined,
        status: req.status ?? undefined,
      },
    });

    return attendance;
  }

  async deleteById(id: string): Promise<void> {
    const exists = await prisma.attendance.findFirst({ where: { id } });
    if (!exists) throw new NotFoundError(`Attendance ${id} not found`);

    await prisma.attendance.delete({ where: { id } });
  }
}
