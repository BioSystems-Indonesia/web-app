import { z, ZodIssue } from "zod";
import { EmployeeStatus } from "@prisma/client";
import { ValidationError } from "@/lib/http/error";

export const EmployeeSchema = z.object({
  employeeCode: z.string().min(1, "Employee code is required"),
  fullName: z.string().min(1, "Full name is required"),
  positionId: z.string().min(1, "Position is required"),
  joinDate: z.coerce.date({ message: "Join date is required" }),
  employeeStatus: z.nativeEnum(EmployeeStatus),
  birthDate: z.coerce.date({ message: "Birth date is required" }),
  nationalId: z.string().min(1, "National ID is required"),
  salary: z.number().min(0, "Salary must be >= 0"),
  domicile: z.string().min(1, "Domicile is required"),
  email: z.string().email("Invalid email"),
  motherName: z.string().min(1, "Mother name is required"),
  religion: z.string().min(1, "Religion is required"),
  bankName: z.string().min(1, "Bank name is required"),
  bankAccount: z.string().min(1, "Bank account is required"),
  bpjsNumber: z.string().min(1, "BPJS number is required"),
  taxNumber: z.string().min(1, "Tax number is required"),
});

export function validateEmployee(req: unknown) {
  const result = EmployeeSchema.safeParse(req);
  if (!result.success) {
    const messages = result.error.issues.map((e: ZodIssue) => e.message).join(", ");
    throw new ValidationError(messages || "Invalid employee data");
  }
  return result.data;
}
