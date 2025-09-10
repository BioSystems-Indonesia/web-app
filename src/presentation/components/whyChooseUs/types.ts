import { StaticImageData } from "next/image";

export interface WhyChooseUsItem {
  title: string;
  image: StaticImageData;
  desc: string;
}

export interface WhyChooseUsScrollState {
  totalOffset: number;
  lastScrollY: number;
}
