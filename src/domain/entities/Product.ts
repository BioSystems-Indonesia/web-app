import { ProductCategory } from "./ProductCategory";
import { ProductVariant } from "./Variant";

export class Product {
  constructor(
    public id: number,
    public name: string,
    public method: string,
    public createdAt: Date,
    public variants?: ProductVariant[],
    public categories?: ProductCategory[]
  ) {}
}
