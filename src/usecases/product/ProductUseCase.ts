import { ProductRequest } from "@/domain/dto/Product";
import { ProductRepository } from "@/domain/product/ProductRepository";
import { ValidationError } from "@/lib/http/error";

export class ProductUseCase {
  constructor(private readonly repo: ProductRepository) {}

  async create(req: ProductRequest) {
    if (!req.name?.trim()) {
      throw new ValidationError("Name is required");
    }

    if (!req.method?.trim()) {
      throw new ValidationError("mMthod is required");
    }

    if (!req.variant) {
      throw new ValidationError("Variant is required");
    }

    if (!req.category) {
      throw new ValidationError("Category is required");
    }

    return this.repo.create(req);
  }

  async getById(id: number) {
    return this.repo.getById(id);
  }

  async getAll() {
    return this.repo.getAll();
  }
}
