import { EmployeeRequest } from "@/domain/dto/Employee";
import { EmployeeRepository } from "@/domain/repositories/EmployeeRepository";
import { validateEmployee } from "../../validation/employee.validator";

export class EmployeeUseCase {
  constructor(private readonly repo: EmployeeRepository) {}

  async create(req: EmployeeRequest) {
    const validated = validateEmployee(req);
    return await this.repo.create(validated);
  }

  async getById(id: string) {
    return await this.repo.getById(id);
  }

  async getAll() {
    return await this.repo.getAll();
  }

  async update(id: string, req: EmployeeRequest) {
    const validated = validateEmployee(req);
    return await this.repo.update(id, validated);
  }

  async deleteById(id: string) {
    return await this.repo.deleteById(id);
  }
}
