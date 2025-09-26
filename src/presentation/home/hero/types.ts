import { StaticImageData } from "next/image";

// Types for carousel component
export interface CarouselSlide {
  id: string;
  image: StaticImageData;
  title: string;
  description: string;
  alt?: string;
}

export interface CarouselProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
  transitionDuration?: number;
  priority?: boolean;
}

export interface HeroSectionProps {
  slides?: CarouselSlide[];
}
