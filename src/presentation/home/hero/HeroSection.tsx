"use client";

import Carousel from "@/presentation/home/hero/Carousel";
import { useTranslations } from "next-intl";
import BgHero1 from "@/assets/img/home/bg-hero-1.png";
import BgHero2 from "@/assets/img/home/bg-hero-2.png";
import BgHero3 from "@/assets/img/home/bg-hero-3.png";
import type { CarouselSlide } from "@/presentation/home/hero/types";
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
            description: t("desc-slide-1"),
            alt: "BioSystems Indonesia hero slide 1 - Innovation in biotechnology"
        },
        {
            id: "slide-2",
            image: BgHero2,
            title: t("h1-slide-2"),
            description: t("desc-slide-2"),
            alt: "BioSystems Indonesia hero slide 2 - Partnership and support"
        },
        {
            id: "slide-3",
            image: BgHero3,
            title: t("h1-slide-3"),
            description: t("desc-slide-3"),
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
