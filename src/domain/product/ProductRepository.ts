import { ProductRequest } from "../dto/Product";
import { Product } from "./Product";

export interface ProductRepository {
  create(req: ProductRequest): Promise<Product>;
  getById(id: number): Promise<Product>;
  getAll(): Promise<Product[]>;
  update(id: number, req: ProductRequest): Promise<Product>;
  delete(id: number): Promise<void>;
}
