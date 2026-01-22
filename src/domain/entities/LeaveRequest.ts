import { LeaveStatus } from "@prisma/client";

export class LeaveRequest {
  constructor(
    public id: string,
    public employeeId: string,
    public position: string,
    public leaveType: string,
    public startDate: Date,
    public endDate: Date,
    public totalDays: number,
    public status: LeaveStatus,
    public approvedBy: string | null,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
