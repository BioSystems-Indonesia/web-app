# WhyChooseUsSection Component

This directory contains the refactored WhyChooseUsSection component and its related sub-components.

## Structure

```
whyChooseUs/
├── index.ts                    # Main exports
├── WhyChooseUsSection.tsx      # Main component
├── WhyChooseUsSection.css      # Styles (Mobile-first design)
├── types.ts                    # TypeScript interfaces
├── constants.ts                # Constants and data
├── hooks.ts                    # Custom React hooks
├── InfiniteScrollHeader.tsx    # Infinite scroll header component
├── WhyChooseUsCard.tsx         # Individual card component
├── WhyChooseUsGrid.tsx         # Grid container component
├── WhyChooseUsSEO.tsx          # SEO structured data component
└── README.md                   # This file
```

## Components

### WhyChooseUsSection (Main Component)

The main container component that orchestrates all sub-components with infinite scroll header and responsive card grid.

### InfiniteScrollHeader

Renders the infinitely scrolling header with title and arrow icons that moves based on page scroll.

### WhyChooseUsCard

Renders an individual card with:

- Background image
- Overlay content with title and description
- Hover effects (image zoom, text color change, background transparency)

### WhyChooseUsGrid

Container component that renders the grid of WhyChooseUsCard components with responsive layout:

- Mobile: Single column (vertical stack)
- Tablet: 2-column grid
- Desktop: 5-column horizontal layout

### WhyChooseUsSEO

Provides SEO optimization with JSON-LD structured data for search engines.

## Hooks

### useInfiniteScroll

Manages infinite scroll functionality:

- Tracks scroll position and delta
- Calculates transform values for smooth animation
- Provides `getTransform()` function for CSS transforms

## Types

### WhyChooseUsItem

```typescript
interface WhyChooseUsItem {
  title: string;
  image: StaticImageData;
  desc: string;
}
```

### WhyChooseUsScrollState

```typescript
interface WhyChooseUsScrollState {
  totalOffset: number;
  lastScrollY: number;
}
```

## Constants

### WCU_IMAGES

Static imports for all Why Choose Us images (wcu-1.png through wcu-5.png).

### SCROLL_CONFIG

Configuration for infinite scroll behavior:

- `SCROLL_MULTIPLIER`: Speed of scroll animation (0.3)
- `BASE_OFFSET`: Initial offset for infinite effect (-10000)
- `INFINITE_ARRAY_LENGTH`: Number of repeated elements (50)
- `ICON_SIZE`: Size of arrow icons (12px)

### createWhyChooseUsData()

Factory function that creates the data array using translation function.

## Styling (Mobile-First)

The component uses a mobile-first responsive design approach:

### Mobile (Default)

- Vertical card layout with full width
- Smaller typography and spacing
- Height: auto with min-height: 50vh
- Card height: 250px

### Tablet (768px+)

- 2-column grid layout
- Medium typography
- Card height: 300px

### Desktop (1024px+)

- 5-column horizontal layout
- Full viewport height (100vh)
- Original desktop-specific styling

## Features

1. **Infinite Scroll Animation**: Header moves horizontally based on page scroll
2. **Responsive Design**: Mobile-first approach with breakpoint optimizations
3. **Hover Effects**: Image zoom, text color change, background transparency
4. **SEO Optimization**: Structured data for search engines
5. **Performance**: Image priority loading for above-the-fold content
6. **Accessibility**: Proper alt texts and semantic HTML
7. **Internationalization**: Full support for next-intl translations

## Benefits of Refactoring

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused in other parts of the application
3. **Maintainability**: Code is organized and easy to understand
4. **Type Safety**: Proper TypeScript interfaces for all props
5. **Performance**: Optimized rendering and image loading
6. **Testability**: Smaller components are easier to test
7. **Custom Hooks**: Reusable scroll logic
8. **Better Organization**: Clear file structure and exports
9. **Mobile-First**: Optimized for mobile users with progressive enhancement

## Usage

```tsx
import WhyChooseUsSection from "@/presentation/components/whyChooseUs";

export default function Page() {
  return <WhyChooseUsSection />;
}
```

Or import specific components:

```tsx
import {
  WhyChooseUsCard,
  useInfiniteScroll,
  InfiniteScrollHeader,
} from "@/presentation/components/whyChooseUs";
```

## Translation Keys

The component expects the following translation keys in your locale files:

```json
{
  "WhyChooseUs": {
    "h1": "Why Choose Us",
    "item1": {
      "title": "Quality Products",
      "desc": "High-quality laboratory equipment"
    },
    "item2": {
      "title": "Expert Support",
      "desc": "Professional technical support"
    }
    // ... additional items
  }
}
```
