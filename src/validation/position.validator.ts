import { z, ZodIssue } from "zod";
import { PositionRequest } from "@/domain/dto/Position";
import { ValidationError } from "@/lib/http/error";

export const PositionSchema = z.object({
  code: z.string().min(1, "Code is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable().optional(),
});

export function validatePosition(req: unknown) {
  const result = PositionSchema.safeParse(req);
  if (!result.success) {
    const messages = result.error.issues.map((e: ZodIssue) => e.message).join(", ");
    throw new ValidationError(messages || "Invalid position data");
  }
  return result.data as PositionRequest;
}
