# SolutionSection Component

This directory contains the refactored SolutionSection component and its related sub-components.

## Structure

```
solutions/
├── index.ts                    # Main exports
├── SolutionSection.tsx         # Main component
├── SolutionSection.css         # Styles
├── types.ts                    # TypeScript interfaces
├── constants.ts                # Constants and data
├── hooks.ts                    # Custom React hooks
├── SEOComponents.tsx           # SEO-related components
├── ImageSlider.tsx             # Image slider component
├── ProductCard.tsx             # Individual product card
├── ProductList.tsx             # List of product cards
├── ProductImagePreview.tsx     # Image preview area
└── README.md                   # This file
```

## Components

### SolutionSection (Main Component)

The main container component that orchestrates all sub-components with product showcase and image carousel functionality.

### ProductCard

Renders an individual product with:
- Product icon and information
- Hover effects for image preview
- "See Product" link for navigation

### ProductList

Container component that renders the list of ProductCard components with hover state management.

### ProductImagePreview

Displays the image preview area with automatic image slider for the currently hovered product.

### ImageSlider

Handles the infinite image carousel functionality:
- Auto-advancing images
- Smooth transitions with infinite loop
- Responsive image display

### SEOComponents

Contains SEO-related components:
- `StructuredData`: JSON-LD structured data for search engines
- `SEOFallback`: Hidden content for accessibility and SEO

## Hooks

### useProductHover

Manages product hover state and handlers:
- Tracks currently hovered product
- Provides hover and leave event handlers
- Default fallback to first product

### useImageSlider

Manages image slider state and auto-advance functionality:
- Auto-advancing image carousel
- Infinite loop with smooth transitions
- Image index management and reset logic

## Types

### Product
```typescript
interface Product {
  name: string;
  type: string;
  icon: StaticImageData;
  link: string;
  images: StaticImageData[];
}
```

### ImageSliderProps
```typescript
interface ImageSliderProps {
  product: Product;
  currentImageIndex: number;
  isTransitioning: boolean;
}
```

### ProductCardProps
```typescript
interface ProductCardProps {
  product: Product;
  onHover: (productName: string) => void;
  onLeave: () => void;
  seeProductText: string;
}
```

## Constants

### PRODUCTS_DATA
Static product information including icons, images, and links for laboratory equipment.

### DEFAULT_HOVERED_PRODUCT
Default product to display when no product is hovered (typically first product).

### IMAGE_TRANSITION_DURATION
Timing configuration for automatic image transitions (3000ms).

### TRANSITION_DELAY
Delay for smooth infinite loop transitions (500ms).

### createProductsData()
Factory function that creates the products array using translation function.

## Features

1. **Interactive Product Showcase**: Hover over products to see their image gallery
2. **Automatic Image Carousel**: Images auto-advance with smooth infinite transitions
3. **SEO Optimization**: Structured data and fallback content for search engines
4. **Responsive Design**: Adapts to different screen sizes
5. **Performance**: Image optimization and smooth transitions
6. **Accessibility**: Proper alt texts and semantic HTML structure
7. **Internationalization**: Full support for next-intl translations

## Benefits of Refactoring

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused in other parts of the application
3. **Maintainability**: Code is organized and easy to understand
4. **Type Safety**: Proper TypeScript interfaces for all props
5. **Performance**: React.memo optimization for sub-components
6. **Testability**: Smaller components are easier to test
7. **Custom Hooks**: Reusable state logic for hover and slider functionality
8. **Better Organization**: Clear file structure and exports
9. **Enhanced UX**: Smooth interactions and visual feedback

## Usage

```tsx
import SolutionSection from "@/presentation/components/solutions";

export default function Page() {
  return <SolutionSection />;
}
```

Or import specific components:

```tsx
import { 
  ProductCard, 
  useProductHover,
  ImageSlider 
} from "@/presentation/components/solutions";
```

## Translation Keys

The component expects the following translation keys in your locale files:

```json
{
  "Solutions": {
    "h2": "Our Solutions",
    "seeProduct": "See Product",
    "products": {
      "analyzer": {
        "name": "Analyzer",
        "type": "Laboratory Equipment"
      },
      "ba200": {
        "name": "BA200",
        "type": "Biochemistry Analyzer"
      }
      // ... additional products
    }
  }
}
```
