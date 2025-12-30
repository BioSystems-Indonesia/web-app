import { ProductCategoryRequest } from "../dto/ProductCategory";
import { ProductCategory } from "./ProductCategory";

export interface ProductCategoryRepository {
  create(req: ProductCategoryRequest): Promise<ProductCategory>;
  getById(id: number): Promise<ProductCategory>;
  getAll(): Promise<ProductCategory[]>;
  update(id: number, req: ProductCategoryRequest): Promise<ProductCategory>;
  delete(id: number): Promise<void>;
}
