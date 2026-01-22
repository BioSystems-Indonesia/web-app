import { AttendanceStatus } from "@prisma/client";

export interface AttendanceRequest {
  employeeId: string;
  date: Date;
  checkIn?: Date | null;
  checkOut?: Date | null;
  status: AttendanceStatus;
}
