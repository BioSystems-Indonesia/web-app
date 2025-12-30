import { Product } from "../product/Product";

export class ProductCategory {
  constructor(
    public id: number,
    public category: string,
    public icon: string,
    public products?: Product[]
  ) {}
}
