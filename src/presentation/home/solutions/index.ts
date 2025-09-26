// Main component
export { default } from "./SolutionSection";

// Sub-components (for potential reuse)
export { ProductCard } from "./ProductCard";
export { ProductList } from "./ProductList";
export { ProductImagePreview } from "./ProductImagePreview";
export { ImageSlider } from "./ImageSlider";
export { SEOFallback, StructuredData } from "./SEOComponents";

// Types and constants
export type {
  Product,
  ProductCardProps,
  ProductListProps,
  ProductImagePreviewProps,
  ImageSliderProps,
} from "./types";
export {
  PRODUCTS,
  DEFAULT_HOVERED_PRODUCT,
  IMAGE_TRANSITION_DURATION,
  TRANSITION_DELAY,
} from "./constants";

// Hooks
export { useProductHover, useImageSlider } from "./hooks";
