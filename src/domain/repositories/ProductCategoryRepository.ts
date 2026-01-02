import { ProductType } from "@prisma/client";
import { ProductCategoryRequest } from "../dto/ProductCategory";
import { ProductCategory } from "../entities/ProductCategory";

export interface ProductCategoryRepository {
  create(req: ProductCategoryRequest): Promise<ProductCategory>;
  getById(id: number): Promise<ProductCategory>;
  getAll(): Promise<ProductCategory[]>;
  getByProductType(productType: ProductType): Promise<ProductCategory[]>;
  update(id: number, req: ProductCategoryRequest): Promise<ProductCategory>;
  delete(id: number): Promise<void>;
}
