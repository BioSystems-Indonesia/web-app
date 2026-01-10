import { ProductCategoryRequest } from "@/domain/dto/ProductCategory";
import { ProductCategoryRepository } from "@/domain/repositories/ProductCategoryRepository";
import { ValidationError } from "@/lib/http/error";
import { ProductType } from "@prisma/client";

export class ProductCategoryUseCase {
  constructor(private readonly repo: ProductCategoryRepository) {}

  async create(req: ProductCategoryRequest) {
    if (!req.category?.trim()) {
      throw new ValidationError("Category name is required");
    }

    return await this.repo.create(req);
  }

  async getById(id: number) {
    return await this.repo.getById(id);
  }

  async getAll() {
    return await this.repo.getAll();
  }

  async getByProductType(productType: ProductType) {
    return await this.repo.getByProductType(productType);
  }

  async update(req: ProductCategoryRequest, id: number) {
    if (!req.category?.trim()) {
      throw new ValidationError("Category name is required");
    }

    return await this.repo.update(id, req);
  }

  async delete(id: number) {
    await this.repo.delete(id);
  }
}
