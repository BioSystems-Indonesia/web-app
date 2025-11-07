"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import "./Carousel.css";
import { CarouselProps } from "./types";

export default function Carousel({
    slides,
    autoPlayInterval = 5000,
    transitionDuration = 500,
    priority = true
}: CarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [isClient, setIsClient] = useState(false);

    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const infiniteSlides = [
        slides[slides.length - 1],
        ...slides,
        slides[0]
    ];

    const nextSlide = useCallback(() => {
        setIsTransitioning(true);
        setCurrentSlide(prev => prev + 1);
    }, []);

    useEffect(() => {
        if (!isClient || isPaused) return;

        const startInterval = () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            const newInterval = setInterval(() => {
                nextSlide();
            }, autoPlayInterval);
            intervalRef.current = newInterval;
        };

        startInterval();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [currentSlide, autoPlayInterval, isClient, isPaused, nextSlide]);

    const prevSlide = useCallback(() => {
        setIsTransitioning(true);
        setCurrentSlide(prev => prev - 1);
    }, []);

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

    const getClientX = (e: React.TouchEvent | React.MouseEvent) => {
        return 'touches' in e ? e.touches[0].clientX : e.clientX;
    };

    const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setIsPaused(true);
        const clientX = getClientX(e);
        setStartPos({ x: clientX, y: 0 });
        setDragOffset(0);
    };

    const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();

        const clientX = getClientX(e);
        const deltaX = clientX - startPos.x;
        const containerWidth = document.querySelector('.carousel-container')?.clientWidth || window.innerWidth;
        const limitedOffset = Math.max(-containerWidth * 0.6, Math.min(containerWidth * 0.6, deltaX));
        setDragOffset(limitedOffset);
    };

    const handleEnd = () => {
        if (!isDragging) return;

        const deltaX = dragOffset;
        setIsDragging(false);

        const containerWidth = document.querySelector('.carousel-container')?.clientWidth || window.innerWidth;
        const threshold = containerWidth * 0.1;

        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }

        setDragOffset(0);

        setTimeout(() => {
            setIsPaused(false);
        }, 1000);
    };

    const getCurrentSlideIndex = () => {
        if (currentSlide === 0) return slides.length - 1;
        if (currentSlide === infiniteSlides.length - 1) return 0;
        return currentSlide - 1;
    };

    const firstSlideContent = slides[0];

    return (
        <section
            className="carousel"
            role="region"
            aria-label="Hero carousel"
            aria-live="polite"
        >
            <div className="carousel-seo-content" style={{ display: 'none' }}>
                <h1>{firstSlideContent.title}</h1>
                <p>{firstSlideContent.description}</p>
                {slides.map((slide, index) => (
                    <div key={slide.id}>
                        <h2>{slide.title}</h2>
                        <p>{slide.description}</p>
                        <Image
                            src={slide.image}
                            alt={slide.alt || slide.title}
                            width={1920}
                            height={1080}
                            style={{ display: 'none' }}
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            <div className="carousel-container">
                <div
                    className={`carousel-track ${isDragging ? 'dragging' : ''}`}
                    style={{
                        transform: isClient
                            ? `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))`
                            : 'translateX(-100%)',
                        transition: (isTransitioning && !isDragging)
                            ? `transform ${transitionDuration}ms ease-in-out`
                            : 'none'
                    }}
                    onTransitionEnd={handleTransitionEnd}
                    onMouseDown={handleStart}
                    onMouseMove={handleMove}
                    onMouseUp={handleEnd}
                    onMouseLeave={handleEnd}
                    onTouchStart={handleStart}
                    onTouchMove={handleMove}
                    onTouchEnd={handleEnd}
                >
                    {infiniteSlides.map((slide, index) => (
                        <article
                            key={`${slide.id}-${index}`}
                            className="carousel-slide"
                            aria-hidden={isClient && index !== currentSlide}
                        >
                            <Image
                                src={slide.image}
                                alt={slide.alt || slide.title}
                                fill
                                className="carousel-slide-bg"
                                style={{ objectFit: 'cover' }}
                                priority={priority && index <= 2}
                                sizes="100vw"
                                quality={85}
                            />
                            <div className="carousel-content">
                                <h1 className="carousel-title">{slide.title}</h1>
                                <p className="carousel-description">{slide.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <nav className="carousel-indicators" aria-label="Carousel navigation">
                {slides.map((slide, index) => (
                    <button
                        key={index}
                        className={`carousel-indicator ${index === getCurrentSlideIndex() ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                        aria-current={index === getCurrentSlideIndex() ? 'true' : 'false'}
                    />
                ))}
            </nav>
        </section>
    );
}
