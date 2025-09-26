import { Product } from "./types";

// Import images
import BA400Img1 from "@/assets/img/home/ba400-1.png";
import BA400Img2 from "@/assets/img/home/ba400-2.png";
import BA400Img3 from "@/assets/img/home/ba400-3.png";
import BA200Img1 from "@/assets/img/home/ba200-1.png";
import BA200Img2 from "@/assets/img/home/ba200-2.png";
import BA200Img3 from "@/assets/img/home/ba200-3.png";
import A15Img1 from "@/assets/img/home/a15-1.png";
import A15Img2 from "@/assets/img/home/a15-2.png";
import A15Img3 from "@/assets/img/home/a15-3.png";
import BTSNewImg1 from "@/assets/img/home/bts-new-1.png";
import BTSNewImg2 from "@/assets/img/home/bts-new-2.png";
import BTSNewImg3 from "@/assets/img/home/bts-new-3.png";

// Import icons
import BA400Icon from "@/presentation/components/icon/BA400.svg";
import BA200Icon from "@/presentation/components/icon/BA200.svg";
import A15Icon from "@/presentation/components/icon/A15.svg";
import BTSNewIcon from "@/presentation/components/icon/BTSNew.svg";
import CoaxIcon from "@/presentation/components/icon/BA400.svg";

export const PRODUCTS: Product[] = [
  {
    name: "BA 400",
    type: "Analyzer",
    icon: BA400Icon,
    link: "#",
    images: [BA400Img1, BA400Img2, BA400Img3],
  },
  {
    name: "BA 200",
    type: "Analyzer",
    icon: BA200Icon,
    link: "https://katalog.inaproc.id/elga-tama/biosystems-ba200-and-accessories",
    images: [BA200Img1, BA200Img2, BA200Img3],
  },
  {
    name: "A15",
    type: "Analyzer",
    icon: A15Icon,
    link: "https://katalog.inaproc.id/elga-tama/biosystems-a15-random-access-automatic-analyzer-and-accessories",
    images: [A15Img1, A15Img2, A15Img3],
  },
  {
    name: "BTS NEW",
    type: "Analyzer",
    icon: BTSNewIcon,
    link: "#",
    images: [BTSNewImg1, BTSNewImg2, BTSNewImg3],
  },
  {
    name: "COAX",
    type: "Analyzer",
    icon: CoaxIcon,
    link: "#",
    images: [BA400Img1, BA400Img2, BA400Img3],
  },
];

export const DEFAULT_HOVERED_PRODUCT = "BA 400";
export const IMAGE_TRANSITION_DURATION = 1500;
export const TRANSITION_DELAY = 800;
