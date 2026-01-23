import { z, ZodIssue } from "zod";
import { AttendanceStatus } from "@prisma/client";
import { ValidationError } from "@/lib/http/error";
import type { AttendanceRequest } from "@/domain/dto/Attendance";

export const AttendanceSchema = z
  .object({
    employeeId: z.string().min(1, "Employee ID is required"),
    date: z.coerce.date({ message: "Date is required" }),
    checkIn: z.coerce.date({ message: "Check-in must be a valid date" }).nullable().optional(),
    checkOut: z.coerce.date({ message: "Check-out must be a valid date" }).nullable().optional(),
    status: z.nativeEnum(AttendanceStatus),
  })
  .refine(
    (data) => {
      if (data.checkIn && data.checkOut) {
        return data.checkOut >= data.checkIn;
      }
      return true;
    },
    { message: "Check-out must be same or after Check-in", path: ["checkOut"] }
  );

export function validateAttendance(req: unknown) {
  const result = AttendanceSchema.safeParse(req);
  if (!result.success) {
    const messages = result.error.issues.map((e: ZodIssue) => e.message).join(", ");
    throw new ValidationError(messages || "Invalid attendance data");
  }
  return result.data as AttendanceRequest;
}
