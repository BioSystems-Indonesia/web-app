"use client";

import { useState, useEffect } from "react";
import "./Carousel.css";

interface CarouselSlide {
    id: string;
    image: any;
    title: string;
    description: string;
}

interface CarouselProps {
    slides: CarouselSlide[];
    autoPlayInterval?: number;
    transitionDuration?: number;
}

export default function Carousel({
    slides,
    autoPlayInterval = 5000,
    transitionDuration = 500
}: CarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    const infiniteSlides = [
        slides[slides.length - 1],
        ...slides,
        slides[0]
    ];

    useEffect(() => {
        const startInterval = () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
            const newInterval = setInterval(() => {
                nextSlide();
            }, autoPlayInterval);
            setIntervalId(newInterval);
        };

        startInterval();

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [currentSlide, autoPlayInterval]);

    const nextSlide = () => {
        setIsTransitioning(true);
        setCurrentSlide(prev => prev + 1);
    };

    const goToSlide = (index: number) => {
        setIsTransitioning(true);
        setCurrentSlide(index + 1);
    };

    const handleTransitionEnd = () => {
        if (currentSlide >= infiniteSlides.length - 1) {
            setIsTransitioning(false);
            setCurrentSlide(1);
        } else if (currentSlide <= 0) {
            setIsTransitioning(false);
            setCurrentSlide(slides.length);
        }
    };

    const getCurrentSlideIndex = () => {
        if (currentSlide === 0) return slides.length - 1;
        if (currentSlide === infiniteSlides.length - 1) return 0;
        return currentSlide - 1;
    };

    return (
        <div className="carousel">
            <div className="carousel-container">
                <div
                    className="carousel-track"
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                        transition: isTransitioning ? `transform ${transitionDuration}ms ease-in-out` : 'none'
                    }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {infiniteSlides.map((slide, index) => (
                        <div key={`${slide.id}-${index}`} className="carousel-slide">
                            <div
                                onContextMenu={(e) => e.preventDefault()}
                                className="carousel-slide-bg"
                                style={{ backgroundImage: `url(${slide.image.src})` }}
                            />
                            <div className="carousel-content">
                                <h1 className="carousel-title">{slide.title}</h1>
                                <p className="carousel-description">{slide.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="carousel-indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`carousel-indicator ${index === getCurrentSlideIndex() ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
