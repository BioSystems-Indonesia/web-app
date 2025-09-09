import { StaticImageData } from "next/image";

export interface Product {
  name: string;
  type: string;
  icon: StaticImageData;
  link: string;
  images: StaticImageData[];
}

export interface ImageSliderProps {
  product: Product;
  currentImageIndex: number;
  isTransitioning: boolean;
}

export interface ProductCardProps {
  product: Product;
  onHover: (productName: string) => void;
  onLeave: () => void;
  seeProductText: string;
}

export interface ProductListProps {
  products: Product[];
  hoveredProduct: string | null;
  onProductHover: (productName: string) => void;
  onProductLeave: () => void;
  seeProductText: string;
}

export interface ProductImagePreviewProps {
  products: Product[];
  hoveredProduct: string | null;
  currentImageIndex: number;
  isTransitioning: boolean;
}
