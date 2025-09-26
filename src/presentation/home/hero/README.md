# Hero Section Component

This directory contains the Hero section component with an interactive carousel for the BioSystems Indonesia website.

## Structure

```
hero/
├── index.ts                    # Main exports
├── HeroSection.tsx             # Main hero section component
├── HeroSection.css             # Hero section styles
├── Carousel.tsx                # Interactive carousel component
├── Carousel.css                # Carousel styles
├── types.ts                    # TypeScript interfaces
└── README.md                   # This file
```

## Components

### HeroSection (Main Component)

The main hero section component that displays a carousel of hero slides with multilingual support.

**Features:**

- 🌐 Internationalization support with next-intl
- 🎛️ Configurable slides with default content
- 📱 Responsive design
- ♿ Accessibility features
- 🖼️ SEO optimized with proper image alt tags

**Props:**

```tsx
interface HeroSectionProps {
  slides?: CarouselSlide[];
}
```

### Carousel

An interactive, touch-enabled carousel component with auto-play functionality.

**Features:**

- 🔄 Infinite scroll with seamless transitions
- ⏯️ Auto-play with configurable intervals
- 👆 Touch/drag support for mobile devices
- 🎯 Click indicators for navigation
- ⏸️ Auto-pause on user interaction
- 🚀 Performance optimized with useCallback
- ♿ Full accessibility support

**Props:**

```tsx
interface CarouselProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number; // Default: 5000ms
  transitionDuration?: number; // Default: 500ms
  priority?: boolean; // Default: true (for image loading)
}
```

## Types

### CarouselSlide

```tsx
interface CarouselSlide {
  id: string; // Unique identifier
  image: StaticImageData; // Next.js optimized image
  title: string; // Slide title
  description: string; // Slide description
  alt?: string; // Image alt text for accessibility
}
```

## Usage

### Basic Usage

```tsx
import { HeroSection } from "@/presentation/components/hero";

export default function HomePage() {
  return <HeroSection />;
}
```

### Custom Slides

```tsx
import { HeroSection } from "@/presentation/components/hero";
import CustomImage from "@/assets/custom-image.png";

const customSlides = [
  {
    id: "custom-1",
    image: CustomImage,
    title: "Custom Title",
    description: "Custom description text",
    alt: "Custom alt text",
  },
];

export default function HomePage() {
  return <HeroSection slides={customSlides} />;
}
```

### Direct Carousel Usage

```tsx
import Carousel from "@/presentation/components/hero/Carousel";

export default function CustomSection() {
  return (
    <Carousel slides={slides} autoPlayInterval={3000} transitionDuration={800} priority={false} />
  );
}
```

## Configuration

### Default Slides

The HeroSection component includes three default slides that use translations from the `Home` namespace:

- **Slide 1**: `t("h1-slide-1")` - Innovation focused
- **Slide 2**: `t("h1-slide-2")` - Partnership and support
- **Slide 3**: `t("h1-slide-3")` - Advanced solutions

### Carousel Settings

- **Auto-play Interval**: 5000ms (5 seconds)
- **Transition Duration**: 500ms
- **Image Priority**: `true` (for LCP optimization)

## Accessibility Features

- **ARIA Labels**: Proper ARIA attributes for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Proper focus handling
- **Alt Text**: Descriptive alt text for all images
- **Semantic HTML**: Uses proper HTML5 semantic elements

## Performance Optimizations

- **Image Optimization**: Uses Next.js Image component with proper sizing
- **Lazy Loading**: Images are loaded with appropriate priority settings
- **Memoization**: useCallback for event handlers
- **Client-side Hydration**: Proper SSR/CSR handling

## SEO Features

- **Structured Data**: Hidden SEO content for search engines
- **Meta Information**: Proper image alt tags and descriptions
- **First Slide Priority**: First slide content is prioritized for LCP

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Touch/Gesture Support

- **Swipe Navigation**: Left/right swipe to change slides
- **Drag Threshold**: 10% of container width
- **Momentum**: Smooth transitions with momentum
- **Auto-pause**: Pauses auto-play during user interaction

## Customization

### Styling

Modify `HeroSection.css` and `Carousel.css` to customize the appearance:

```css
/* Custom hero section styles */
.hero-section {
  /* Your custom styles */
}

/* Custom carousel styles */
.carousel {
  /* Your custom styles */
}
```

### Animation Timing

Adjust transition timings in the component props:

```tsx
<Carousel
  autoPlayInterval={8000} // 8 seconds
  transitionDuration={1000} // 1 second transition
/>
```

## Development Notes

### State Management

The carousel uses several state variables:

- `currentSlide`: Current slide index
- `isTransitioning`: Controls transition animations
- `isDragging`: Touch/drag interaction state
- `isPaused`: Auto-play pause state

### Infinite Scroll Implementation

The carousel creates an array with duplicate slides at the beginning and end to achieve seamless infinite scrolling:

```tsx
const infiniteSlides = [
  slides[slides.length - 1], // Last slide (for backward transition)
  ...slides, // Original slides
  slides[0], // First slide (for forward transition)
];
```

## Troubleshooting

### Common Issues

1. **Images not loading**: Ensure images are properly imported as StaticImageData
2. **Translations missing**: Check that the `Home` namespace is configured in next-intl
3. **Touch not working**: Verify that touch event handlers are properly bound
4. **Auto-play not working**: Check that the component is client-side rendered

### Debug Mode

Add console logs to track carousel state:

```tsx
useEffect(() => {
  console.log("Current slide:", currentSlide);
  console.log("Is transitioning:", isTransitioning);
}, [currentSlide, isTransitioning]);
```

## Contributing

When adding new features:

1. Maintain TypeScript strict typing
2. Add proper accessibility attributes
3. Test on multiple devices and browsers
4. Update this documentation
5. Follow the existing code style patterns

## Related Components

- **Header**: Navigation component
- **Solutions**: Product showcase section
- **Footer**: Site footer component
