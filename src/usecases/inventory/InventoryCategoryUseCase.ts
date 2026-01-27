import { InventoryCategoryRequest } from "@/domain/dto/InventoryCategory";
import { InventoryCategoryRepository } from "@/domain/repositories/InventoryCategoryRepository";
import { validateInventoryCategory } from "@/validation/inventoryCategory.validator";

export class InventoryCategoryUseCase {
  constructor(private readonly repo: InventoryCategoryRepository) {}

  async create(req: InventoryCategoryRequest) {
    const validated = validateInventoryCategory(req);
    return await this.repo.create(validated);
  }

  async getById(id: string) {
    return await this.repo.getById(id);
  }

  async getAll() {
    return await this.repo.getAll();
  }

  async update(id: string, req: InventoryCategoryRequest) {
    const validated = validateInventoryCategory(req);
    return await this.repo.update(id, validated);
  }

  async deleteById(id: string) {
    return await this.repo.deleteById(id);
  }
}
