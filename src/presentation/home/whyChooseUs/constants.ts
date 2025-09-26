import wcu1 from "@/assets/img/home/wcu-1.png";
import wcu2 from "@/assets/img/home/wcu-2.png";
import wcu3 from "@/assets/img/home/wcu-3.png";
import wcu4 from "@/assets/img/home/wcu-4.png";
import wcu5 from "@/assets/img/home/wcu-5.png";
import { WhyChooseUsItem } from "./types";

export const WCU_IMAGES = {
  wcu1,
  wcu2,
  wcu3,
  wcu4,
  wcu5,
} as const;

export const SCROLL_CONFIG = {
  SCROLL_MULTIPLIER: 0.3,
  BASE_OFFSET: -10000,
  INFINITE_ARRAY_LENGTH: 50,
  ICON_SIZE: 24,
} as const;

export const createWhyChooseUsData = (t: (key: string) => string): WhyChooseUsItem[] => [
  {
    title: t("item1.title"),
    image: WCU_IMAGES.wcu1,
    desc: t("item1.desc"),
  },
  {
    title: t("item2.title"),
    image: WCU_IMAGES.wcu2,
    desc: t("item2.desc"),
  },
  {
    title: t("item3.title"),
    image: WCU_IMAGES.wcu3,
    desc: t("item3.desc"),
  },
  {
    title: t("item4.title"),
    image: WCU_IMAGES.wcu4,
    desc: t("item4.desc"),
  },
  {
    title: t("item5.title"),
    image: WCU_IMAGES.wcu5,
    desc: t("item5.desc"),
  },
];
