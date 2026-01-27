import { z, ZodIssue } from "zod";
import { InventoryRequest } from "@/domain/dto/Inventory";
import { InventoryHandoverRequest } from "@/domain/dto/InventoryHandover";
import { InventoryStatus } from "@prisma/client";
import { ValidationError } from "@/lib/http/error";

export const InventorySchema = z.object({
  assetCode: z.string().min(1, "Asset code is required"),
  assetType: z.string().min(1, "Asset type is required"),
  categoryId: z.string().min(1, "Category is required"),
  status: z.nativeEnum(InventoryStatus).optional(),
});

export const PartialInventorySchema = InventorySchema.partial();

export function validateInventory(req: unknown) {
  const result = InventorySchema.safeParse(req);
  if (!result.success) {
    const messages = result.error.issues.map((e: ZodIssue) => e.message).join(", ");
    throw new ValidationError(messages || "Invalid inventory data");
  }
  return result.data as InventoryRequest;
}

export function validatePartialInventory(req: unknown) {
  const result = PartialInventorySchema.safeParse(req);
  if (!result.success) {
    const messages = result.error.issues.map((e: ZodIssue) => e.message).join(", ");
    throw new ValidationError(messages || "Invalid inventory data");
  }
  return result.data as Partial<InventoryRequest>;
}

export const InventoryHandoverSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  inventoryId: z.string().min(1, "Inventory ID is required"),
  handoverDate: z.coerce.date({ message: "Handover date is required" }),
  conditionNotes: z.string().min(1, "Condition notes are required"),
  signatureFile: z.string().min(1, "Signature file is required"),
});

export function validateInventoryHandover(req: unknown) {
  const result = InventoryHandoverSchema.safeParse(req);
  if (!result.success) {
    const messages = result.error.issues.map((e: ZodIssue) => e.message).join(", ");
    throw new ValidationError(messages || "Invalid inventory handover data");
  }
  return result.data as InventoryHandoverRequest;
}
