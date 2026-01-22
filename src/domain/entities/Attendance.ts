import { AttendanceStatus } from "@prisma/client";

export class Attendance {
  constructor(
    public id: string,
    public employeeId: string,
    public date: Date,
    public checkIn: Date | null,
    public checkOut: Date | null,
    public status: AttendanceStatus
  ) {}
}
