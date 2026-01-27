import { InventoryRequest } from "@/domain/dto/Inventory";
import { InventoryHandoverRequest } from "@/domain/dto/InventoryHandover";
import { InventoryRepository } from "@/domain/repositories/InventoryRepository";
import {
  validateInventory,
  validatePartialInventory,
  validateInventoryHandover,
} from "@/validation/inventory.validator";

export class InventoryUseCase {
  constructor(private readonly repo: InventoryRepository) {}

  async create(req: InventoryRequest) {
    const validated = validateInventory(req);
    return await this.repo.create(validated);
  }

  async getById(id: string) {
    return await this.repo.getById(id);
  }

  async getAll() {
    return await this.repo.getAll();
  }

  async update(id: string, req: InventoryRequest) {
    const validated = validateInventory(req);
    return await this.repo.update(id, validated);
  }

  async deleteById(id: string) {
    return await this.repo.deleteById(id);
  }

  async createHandover(req: InventoryHandoverRequest) {
    const validated = validateInventoryHandover(req);
    return await this.repo.createHandover(validated);
  }

  async returnHandover(handoverId: string) {
    return await this.repo.returnHandover(handoverId);
  }

  async getHandoversByEmployee(employeeId: string) {
    return await this.repo.getHandoversByEmployee(employeeId);
  }

  async getActiveHandoverByInventory(inventoryId: string) {
    return await this.repo.getActiveHandoverByInventory(inventoryId);
  }
}
