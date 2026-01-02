export interface ProductRequest {
  name: string;
  method: string;
  productType: string;
  category: string[];
  variant: VariantRequest[];
}

export interface VariantRequest {
  code: string;
  raVolume: string;
  rbVolume: string;
  kitVolume: string;
  instrument: string;
}

export interface ProductCategoryRequest {
  name: string;
}
