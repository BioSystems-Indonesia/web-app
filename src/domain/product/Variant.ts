import { Product } from "./Product";

export class ProductVariant {
  constructor(
    public id: number,
    public productId?: number,
    public code?: string,
    public raVolume?: string,
    public rbVolume?: string,
    public kitVolume?: string,
    public instrument?: string,
    public createdAt?: Date,
    public product?: Product[]
  ) {}
}
