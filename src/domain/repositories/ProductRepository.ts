import { ProductType } from "@prisma/client";
import { ProductRequest } from "../dto/Product";
import { Product } from "../entities/Product";

export interface ProductRepository {
  create(req: ProductRequest): Promise<Product>;
  getById(id: number): Promise<Product>;
  getByCategoryAndType(productType: ProductType, categoryId: number): Promise<Product[]>;
  getAll(): Promise<Product[]>;
  update(id: number, req: ProductRequest): Promise<Product>;
  delete(id: number): Promise<void>;
}
