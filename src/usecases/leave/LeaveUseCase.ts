import { LeaveRequestDto } from "@/domain/dto/LeaveRequest";
import { LeaveRepository } from "@/domain/repositories/LeaveRepository";
import { validateLeave, validatePartialLeave } from "@/validation/leave.validator";

export class LeaveUseCase {
  constructor(private readonly repo: LeaveRepository) {}

  async create(req: LeaveRequestDto) {
    const validated = validateLeave(req);
    return await this.repo.create(validated);
  }

  async getById(id: string) {
    return await this.repo.getById(id);
  }

  async getAll() {
    return await this.repo.getAll();
  }

  async update(id: string, req: Partial<LeaveRequestDto>) {
    const validated = validatePartialLeave(req);
    return await this.repo.update(id, validated);
  }

  async deleteById(id: string) {
    return await this.repo.deleteById(id);
  }

  async approve(id: string, approverId: string, approve: boolean) {
    return await this.repo.approve(id, approverId, approve);
  }

  async getByEmployeeAndPeriod(employeeId: string, start: Date, end: Date) {
    return await this.repo.getByEmployeeAndPeriod(employeeId, start, end);
  }
}
