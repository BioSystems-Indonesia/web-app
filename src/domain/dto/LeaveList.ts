import { LeaveStatus } from "@prisma/client";

export interface LeaveListItem {
  id: string;
  employeeId: string;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  status: LeaveStatus;
  approvedBy?: string | null;
  employee: {
    id: string;
    fullName: string;
    position: {
      name: string;
      code: string;
    } | null;
  };
}
