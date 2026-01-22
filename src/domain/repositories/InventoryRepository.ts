import { Inventory, InventoryHandover } from "@prisma/client";
import { InventoryRequest } from "../dto/Inventory";
import { InventoryHandoverRequest } from "../dto/InventoryHandover";

export interface InventoryRepository {
  create(req: InventoryRequest): Promise<Inventory>;
  getById(id: string): Promise<Inventory>;
  getAll(): Promise<Inventory[]>;
  update(id: string, req: InventoryRequest): Promise<Inventory>;
  deleteById(id: string): Promise<void>;

  createHandover(req: InventoryHandoverRequest): Promise<InventoryHandover>;
  returnHandover(handoverId: string): Promise<InventoryHandover>;
  getHandoversByEmployee(employeeId: string): Promise<InventoryHandover[]>;
  getActiveHandoverByInventory(inventoryId: string): Promise<InventoryHandover | null>;
}
