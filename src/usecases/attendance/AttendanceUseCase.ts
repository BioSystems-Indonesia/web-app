import { AttendanceRequest } from "@/domain/dto/Attendance";
import { AttendanceRepository } from "@/domain/repositories/AttendanceRepository";
import { validateAttendance } from "@/validation/attendance.validator";

export class AttendanceUseCase {
  constructor(private readonly repo: AttendanceRepository) {}

  async create(req: AttendanceRequest) {
    const validated = validateAttendance(req);
    return await this.repo.create(validated);
  }

  async getAllByEmloyeeId(employeeId: string) {
    return await this.repo.getAllByEmployeeId(employeeId);
  }

  async getByEmployeeIdAndMonth(employeeId: string, month: number, year: number) {
    return await this.repo.getByEmployeeIdAndMonth(employeeId, month, year);
  }

  async update(id: string, req: AttendanceRequest) {
    const validated = validateAttendance(req);
    return await this.repo.update(id, validated);
  }

  async deleteById(id: string) {
    await this.repo.deleteById(id);
  }
}
