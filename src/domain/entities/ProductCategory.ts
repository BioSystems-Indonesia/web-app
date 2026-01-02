import { ProductType } from "@prisma/client";
import { Product } from "../entities/Product";

export class ProductCategory {
  constructor(
    public id: number,
    public category: string,
    public productType: ProductType,
    public icon: string,
    public products?: Product[]
  ) {}
}
