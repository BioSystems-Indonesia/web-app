import { Attendance } from "@prisma/client";
import { AttendanceRequest } from "../dto/Attendance";

export interface AttendanceRepository {
  create(req: AttendanceRequest): Promise<Attendance>;
  getById(id: string): Promise<Attendance>;
  getAllByEmployeeId(employeeId: string): Promise<Attendance[]>;
  getByEmployeeIdAndMonth(employeeId: string, year: number, month: number): Promise<Attendance[]>;
  update(id: string, req: Partial<AttendanceRequest>): Promise<Attendance>;
  deleteById(id: string): Promise<void>;
}
