import { InventoryCategory } from "@prisma/client";
import { InventoryCategoryRequest } from "../dto/InventoryCategory";

export interface InventoryCategoryRepository {
  create(req: InventoryCategoryRequest): Promise<InventoryCategory>;
  getById(id: string): Promise<InventoryCategory>;
  getAll(): Promise<InventoryCategory[]>;
  update(id: string, req: InventoryCategoryRequest): Promise<InventoryCategory>;
  deleteById(id: string): Promise<void>;
}
