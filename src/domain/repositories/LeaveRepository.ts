import { LeaveRequest } from "@prisma/client";
import { LeaveRequestDto } from "../dto/LeaveRequest";

export interface LeaveRepository {
  create(req: LeaveRequestDto): Promise<LeaveRequest>;
  getById(id: string): Promise<LeaveRequest>;
  getAll(): Promise<LeaveRequest[]>;
  update(id: string, req: Partial<LeaveRequestDto>): Promise<LeaveRequest>;
  deleteById(id: string): Promise<void>;

  approve(id: string, approverId: string, approve: boolean): Promise<LeaveRequest>;
  getByEmployeeAndPeriod(employeeId: string, start: Date, end: Date): Promise<LeaveRequest[]>;
}
