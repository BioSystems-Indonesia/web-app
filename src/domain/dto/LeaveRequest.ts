import { LeaveStatus } from "@prisma/client";

export interface LeaveRequestDto {
  employeeId: string;
  position: string;
  leaveType: string;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  status?: LeaveStatus;
  approvedBy?: string | null;
}
