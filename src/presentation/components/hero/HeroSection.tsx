"use client";

import Carousel from "@/presentation/components/hero/Carousel";
import { useTranslations } from "next-intl";
import BgHero1 from "@/assets/img/home/bg-hero-1.png";
import BgHero2 from "@/assets/img/home/bg-hero-2.png";
import BgHero3 from "@/assets/img/home/bg-hero-3.png";
import type { CarouselSlide } from "@/presentation/components/hero/types";
import "./HeroSection.css";

interface HeroSectionProps {
    slides?: CarouselSlide[];
}

export default function HeroSection({ slides }: HeroSectionProps) {
    const t = useTranslations("Home");

    const defaultSlides: CarouselSlide[] = [
        {
            id: "slide-1",
            image: BgHero1,
            title: t("h1-slide-1"),
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac sem et enim faucibus porttitor. Nam ullamcorper ante tellus, et condimentum metus suscipit nec.",
            alt: "BioSystems Indonesia hero slide 1 - Innovation in biotechnology"
        },
        {
            id: "slide-2",
            image: BgHero2,
            title: t("h1-slide-2"),
            description: "Our dedication goes beyond product excellence—we partner with users at every stage, providing complete support to help them achieve their goals.",
            alt: "BioSystems Indonesia hero slide 2 - Partnership and support"
        },
        {
            id: "slide-3",
            image: BgHero3,
            title: t("h1-slide-3"),
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac sem et enim faucibus porttitor. Nam ullamcorper ante tellus, et condimentum metus suscipit nec.",
            alt: "BioSystems Indonesia hero slide 3 - Advanced solutions"
        }
    ];

    const heroSlides = slides || defaultSlides;

    return (
        <section className="hero-section">
            <Carousel
                slides={heroSlides}
                autoPlayInterval={5000}
                transitionDuration={500}
                priority={true}
            />
        </section>
    );
}
