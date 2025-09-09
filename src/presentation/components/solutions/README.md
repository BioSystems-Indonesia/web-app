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

The main container component that orchestrates all sub-components.

### ProductCard

Renders an individual product with icon, info, and link.

### ProductList

Renders a list of ProductCard components.

### ProductImagePreview

Displays the image preview area with image slider.

### ImageSlider

Handles the infinite image carousel functionality.

### SEOComponents

Contains SEO-related components:

- `StructuredData`: JSON-LD structured data
- `SEOFallback`: Hidden content for search engines

## Hooks

### useProductHover

Manages product hover state and handlers.

### useImageSlider

Manages image slider state and auto-advance functionality.

## Types

All TypeScript interfaces are defined in `types.ts` for better type safety.

## Constants

Product data and configuration constants are centralized in `constants.ts`.

## Benefits of Refactoring

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused in other parts of the application
3. **Maintainability**: Code is organized and easy to understand
4. **Type Safety**: Proper TypeScript interfaces for all props
5. **Performance**: React.memo optimization for sub-components
6. **Testability**: Smaller components are easier to test
7. **Custom Hooks**: Reusable state logic
8. **Better Organization**: Clear file structure and exports

## Usage

```tsx
import SolutionSection from "@/presentation/components/solutions";

export default function Page() {
  return <SolutionSection />;
}
```

Or import specific components:

```tsx
import { ProductCard, useProductHover } from "@/presentation/components/solutions";
```
