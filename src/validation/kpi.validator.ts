import { z, ZodIssue } from "zod";
import { KPIRequest } from "@/domain/dto/KPI";
import { KPIAuditRequest } from "@/domain/dto/KPIAudit";
import { ValidationError } from "@/lib/http/error";

export const KPISchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  period: z.string().min(1, "Period is required"),
  documentFile: z.string().min(1, "Document file is required"),
  description: z.string().nullable().optional(),
});

export function validateKPI(req: unknown) {
  const result = KPISchema.safeParse(req);
  if (!result.success) {
    const messages = result.error.issues.map((e: ZodIssue) => e.message).join(", ");
    throw new ValidationError(messages || "Invalid KPI data");
  }
  return result.data as KPIRequest;
}

export const KPIAuditSchema = z.object({
  auditorId: z.string().min(1, "Auditor ID is required"),
  kpiId: z.string().min(1, "KPI ID is required"),
  notes: z.string().nullable().optional(),
  score: z.number().nullable().optional(),
});

export function validateKPIAudit(req: unknown) {
  const result = KPIAuditSchema.safeParse(req);
  if (!result.success) {
    const messages = result.error.issues.map((e: ZodIssue) => e.message).join(", ");
    throw new ValidationError(messages || "Invalid KPI audit data");
  }
  return result.data as KPIAuditRequest;
}
