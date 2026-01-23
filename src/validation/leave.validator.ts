import { z, ZodIssue } from "zod";
import { LeaveStatus } from "@prisma/client";
import { ValidationError } from "@/lib/http/error";
import type { LeaveRequestDto } from "@/domain/dto/LeaveRequest";

const BaseLeaveSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  position: z.string().min(1, "Position is required"),
  leaveType: z.string().min(1, "Leave type is required"),
  startDate: z.coerce.date({ message: "Start date is required" }),
  endDate: z.coerce.date({ message: "End date is required" }),
  totalDays: z.number().min(1, "Total days must be >= 1"),
  status: z.nativeEnum(LeaveStatus).optional(),
  approvedBy: z.string().nullable().optional(),
});

export const LeaveSchema = BaseLeaveSchema.refine((data) => data.endDate >= data.startDate, {
  message: "End date must be same or after start date",
  path: ["endDate"],
});

export const PartialLeaveSchema = BaseLeaveSchema.partial().superRefine((data, ctx) => {
  if (data.startDate !== undefined && data.endDate !== undefined) {
    if (data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date must be same or after start date",
        path: ["endDate"],
      });
    }
  }
});

export function validateLeave(req: unknown) {
  const result = LeaveSchema.safeParse(req);
  if (!result.success) {
    const messages = result.error.issues.map((e: ZodIssue) => e.message).join(", ");
    throw new ValidationError(messages || "Invalid leave data");
  }
  return result.data as LeaveRequestDto;
}

export function validatePartialLeave(req: unknown) {
  const result = PartialLeaveSchema.safeParse(req);
  if (!result.success) {
    const messages = result.error.issues.map((e: ZodIssue) => e.message).join(", ");
    throw new ValidationError(messages || "Invalid leave data");
  }
  return result.data as Partial<LeaveRequestDto>;
}
