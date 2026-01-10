"use client"

import Header from "@/presentation/components/header/header"
import "./page.css"
import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DescImg from "@/assets/img/instrument/desc.png"
import CTASection from "@/presentation/home/cta/CTASection";
import Footer from "@/presentation/components/footer/footer";

export default function InsturmentPage() {
    const t = useTranslations("Instrument");
    const [animated, setAnimated] = useState(false);
    const [activeIndex, setActiveIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [hasDragged, setHasDragged] = useState(false);
    const [startPos, setStartPos] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();

    const analyzers = [
        {
            id: 'ba400',
            name: t('ba400.name'),
            description: t('ba400.description'),
            bgClass: 'bg-ba400',
            link: '/instrument/ba400'
        },
        {
            id: 'ba200',
            name: t('ba200.name'),
            description: t('ba200.description'),
            bgClass: 'bg-ba200',
            link: '/instrument/ba200'
        },
        {
            id: 'a15',
            name: t('a15.name'),
            description: t('a15.description'),
            bgClass: 'bg-a15',
            link: '/instrument/a15'
        },
        {
            id: 'bts',
            name: t('bts.name'),
            description: t('bts.description'),
            bgClass: 'bg-bts',
            link: '/instrument/bts'
        }
    ];

    // Create infinite slides array
    const infiniteAnalyzers = [
        analyzers[analyzers.length - 1],
        ...analyzers,
        analyzers[0]
    ];

    const nextSlide = useCallback(() => {
        setIsTransitioning(true);
        setActiveIndex(prev => prev + 1);
    }, []);

    const prevSlide = useCallback(() => {
        setIsTransitioning(true);
        setActiveIndex(prev => prev - 1);
    }, []);

    const goToSlide = (index: number) => {
        setIsTransitioning(true);
        setActiveIndex(index + 1);
    };

    const handleTransitionEnd = () => {
        if (activeIndex >= infiniteAnalyzers.length - 1) {
            setIsTransitioning(false);
            setActiveIndex(1);
        } else if (activeIndex <= 0) {
            setIsTransitioning(false);
            setActiveIndex(analyzers.length);
        }
    };

    const getCurrentIndex = () => {
        if (activeIndex === 0) return analyzers.length - 1;
        if (activeIndex === infiniteAnalyzers.length - 1) return 0;
        return activeIndex - 1;
    };

    const getClientX = (e: React.TouchEvent | React.MouseEvent) => {
        return 'touches' in e ? e.touches[0].clientX : e.clientX;
    };

    const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
        setIsDragging(true);
        setHasDragged(false);
        const clientX = getClientX(e);
        setStartPos(clientX);
        setDragOffset(0);
    };

    const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging) return;

        const clientX = getClientX(e);
        const deltaX = clientX - startPos;

        if (Math.abs(deltaX) > 5) {
            setHasDragged(true);
        }

        const containerWidth = window.innerWidth;
        const limitedOffset = Math.max(-containerWidth * 0.6, Math.min(containerWidth * 0.6, deltaX));
        setDragOffset(limitedOffset);
    };

    const handleEnd = () => {
        if (!isDragging) return;

        const deltaX = dragOffset;
        setIsDragging(false);

        const containerWidth = window.innerWidth;
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
            setHasDragged(false);
        }, 100);
    };

    const handleAnalyzerClick = () => {
        if (!hasDragged) {
            router.push(infiniteAnalyzers[activeIndex].link);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimated(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isDragging) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        intervalRef.current = interval;

        return () => clearInterval(interval);
    }, [activeIndex, isDragging, nextSlide]);

    return (
        <div className="instrument">
            <Header />
            <main>
                <section aria-labelledby="hero-heading">
                    <h2 className="sr-only" id="hero-heading">{t('heroTitle1')} {t('heroTitle2')}</h2>
                    <div className={`hero ${animated ? "animated" : ""}`}>
                        <div className="ca-title" role="heading" aria-level={1}>
                            <span className="line-1">{t('heroTitle1')}</span>
                            <span className="line-2">{t('heroTitle2')}</span>
                        </div>
                    </div>
                </section>
                <section aria-labelledby="description-heading">
                    <article className="desctiption">
                        <div className="content">
                            <h2 id="description-heading">{t('descTitle')}</h2>
                            <p>{t('descContent')}</p>
                        </div>
                        <Image src={DescImg} width={952} height={636} alt="BioSystems Clinical Chemistry Analyzers - Laboratory Equipment" />
                    </article>
                </section>
                <section aria-labelledby="analyzers-heading">
                    <h2 className="sr-only" id="analyzers-heading">{t('heroTitle2')} Collection</h2>
                    <div className="analyzer-carousel">
                        <div
                            className={`analyzer-track ${isDragging ? 'dragging' : ''}`}
                            style={{
                                transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
                                transition: (isTransitioning && !isDragging) ? 'transform 500ms ease-in-out' : 'none'
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
                            {infiniteAnalyzers.map((analyzer, index) => (
                                <div
                                    key={`${analyzer.id}-${index}`}
                                    className={`analyzer ${analyzer.bgClass}`}
                                    onClick={handleAnalyzerClick}
                                >
                                    <div className="overlay"></div>
                                    <div className="content">
                                        <h3>{analyzer.name}</h3>
                                        <p>{analyzer.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="indicators">
                            {analyzers.map((analyzer, index) => (
                                <button
                                    key={index}
                                    className={`indicator ${index === getCurrentIndex() ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`${t('goTo')} ${analyzer.name}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <CTASection contentBg="#fff" contentColor="#000" iconColor="#FF5A00" />
            <Footer bgColor=" #FF5A00" />
        </div>
    )
}