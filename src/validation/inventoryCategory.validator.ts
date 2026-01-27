import { z, ZodIssue } from "zod";
import { InventoryCategoryRequest } from "@/domain/dto/InventoryCategory";
import { ValidationError } from "@/lib/http/error";

export const InventoryCategorySchema = z.object({
  code: z.string().min(1, "Code is required"),
  name: z.string().min(1, "Name is required"),
});

export const PartialInventoryCategorySchema = InventoryCategorySchema.partial();

export function validateInventoryCategory(req: unknown) {
  const result = InventoryCategorySchema.safeParse(req);
  if (!result.success) {
    const messages = result.error.issues.map((e: ZodIssue) => e.message).join(", ");
    throw new ValidationError(messages || "Invalid inventory category data");
  }
  return result.data as InventoryCategoryRequest;
}

export function validatePartialInventoryCategory(req: unknown) {
  const result = PartialInventoryCategorySchema.safeParse(req);
  if (!result.success) {
    const messages = result.error.issues.map((e: ZodIssue) => e.message).join(", ");
    throw new ValidationError(messages || "Invalid inventory category data");
  }
  return result.data as Partial<InventoryCategoryRequest>;
}
