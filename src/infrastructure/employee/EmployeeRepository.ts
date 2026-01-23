import { EmployeeRepository } from "@/domain/repositories/EmployeeRepository";
import { Employee } from "@prisma/client";
import { prisma } from "../prisma/PrismaClient";
import { EmployeeRequest } from "@/domain/dto/Employee";
import { BadRequestError, NotFoundError } from "@/lib/http/error";

export class EmployeeRepositoryPrisma implements EmployeeRepository {
  async create(req: EmployeeRequest): Promise<Employee> {
    const positionExists = await prisma.position.count({
      where: { id: req.positionId, deletedAt: null },
    });

    if (positionExists === 0) {
      throw new NotFoundError(`Position ${req.positionId} not found`);
    }

    const existingCode = await prisma.employee.count({
      where: { employeeCode: req.employeeCode, deletedAt: null },
    });

    if (existingCode > 0) {
      throw new BadRequestError("Employee code already exists");
    }

    const existingNational = await prisma.employee.count({
      where: { nationalId: req.nationalId, deletedAt: null },
    });

    if (existingNational > 0) {
      throw new BadRequestError("National ID already exists");
    }

    const existingEmail = await prisma.employee.count({
      where: { email: req.email, deletedAt: null },
    });

    if (existingEmail > 0) {
      throw new BadRequestError("Email already exists");
    }

    const employee = await prisma.employee.create({
      data: {
        employeeCode: req.employeeCode,
        fullName: req.fullName,
        position: {
          connect: {
            id: req.positionId,
          },
        },
        joinDate: req.joinDate,
        employmentStatus: req.employeeStatus,
        birthDate: req.birthDate,
        nationalId: req.nationalId,
        salary: req.salary,
        domicile: req.domicile,
        email: req.email,
        motherName: req.motherName,
        religion: req.religion,
        bankName: req.bankName,
        bankAccount: req.bankAccount,
        bpjsNumber: req.bpjsNumber,
        taxNumber: req.taxNumber,
      },
    });

    return employee;
  }

  async getById(id: string): Promise<Employee> {
    const employee = await prisma.employee.findFirst({
      where: { id, deletedAt: null },
    });

    if (!employee) {
      throw new NotFoundError(`Employee ${id} not found`);
    }

    return employee;
  }

  async getAll(): Promise<Employee[]> {
    const employees = await prisma.employee.findMany({
      where: { deletedAt: null },
      include: {
        position: {
          select: {
            id: true,
            code: true,
            description: true,
          },
        },
      },
    });

    return employees;
  }

  async update(id: string, req: EmployeeRequest): Promise<Employee> {
    const exists = await prisma.employee.findFirst({
      where: { id, deletedAt: null },
    });

    if (!exists) {
      throw new NotFoundError(`Employee ${id} not found`);
    }

    const codeCount = await prisma.employee.count({
      where: { employeeCode: req.employeeCode, id: { not: id }, deletedAt: null },
    });
    if (codeCount > 0) throw new Error("Employee code already exists");

    const nationalCount = await prisma.employee.count({
      where: { nationalId: req.nationalId, id: { not: id }, deletedAt: null },
    });
    if (nationalCount > 0) throw new Error("National ID already exists");

    const emailCount = await prisma.employee.count({
      where: { email: req.email, id: { not: id }, deletedAt: null },
    });
    if (emailCount > 0) throw new Error("Email already exists");

    const positionExists = await prisma.position.count({
      where: { id: req.positionId, deletedAt: null },
    });
    if (positionExists === 0) throw new NotFoundError(`Position ${req.positionId} not found`);

    const employee = await prisma.employee.update({
      where: { id },
      data: {
        employeeCode: req.employeeCode,
        fullName: req.fullName,
        position: { connect: { id: req.positionId } },
        joinDate: req.joinDate,
        employmentStatus: req.employeeStatus,
        birthDate: req.birthDate,
        nationalId: req.nationalId,
        salary: req.salary,
        domicile: req.domicile,
        email: req.email,
        motherName: req.motherName,
        religion: req.religion,
        bankName: req.bankName,
        bankAccount: req.bankAccount,
        bpjsNumber: req.bpjsNumber,
        taxNumber: req.taxNumber,
      },
    });

    return employee;
  }

  async deleteById(id: string): Promise<void> {
    const exists = await prisma.employee.findFirst({
      where: { id, deletedAt: null },
    });

    if (!exists) {
      throw new NotFoundError(`Employee ${id} not found`);
    }

    await prisma.employee.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
