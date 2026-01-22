import { InventoryStatus } from "@prisma/client";

export interface InventoryRequest {
  assetCode: string;
  assetType: string;
  categoryId: string;
  status?: InventoryStatus;
}
