import { z, ZodIssue } from "zod";
import { JobdeskRequest } from "@/domain/dto/Jobdesk";
import { ValidationError } from "@/lib/http/error";

export const JobdeskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable().optional(),
  positionId: z.string().min(1, "Position is required"),
});

export function validateJobdesk(req: unknown) {
  const result = JobdeskSchema.safeParse(req);
  if (!result.success) {
    const messages = result.error.issues.map((e: ZodIssue) => e.message).join(", ");
    throw new ValidationError(messages || "Invalid jobdesk data");
  }
  return result.data as JobdeskRequest;
}
