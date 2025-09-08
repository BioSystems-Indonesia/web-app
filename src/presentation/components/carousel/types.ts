// Types for carousel component
export interface CarouselSlide {
  id: string;
  image: any;
  title: string;
  description: string;
}

export interface CarouselProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
  transitionDuration?: number;
}

export interface HeroSectionProps {
  slides: CarouselSlide[];
}
