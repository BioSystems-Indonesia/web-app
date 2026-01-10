"use client";
import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import "./DistributionSection.css";
import MapDots from "./MapDots";

function AnimatedCounter({ value, duration = 2000, trigger }: { value: number; duration?: number; trigger: boolean }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!trigger) return;

        let frame: number;
        let startTime: number | null = null;
        const startValue = 0;
        const endValue = value;

        const animate = (time: number) => {
            if (!startTime) startTime = time;
            const progress = Math.min((time - startTime) / duration, 1);

            const current = Math.floor(startValue - (startValue - endValue) * progress);

            setDisplayValue(current);

            if (progress < 1) {
                frame = requestAnimationFrame(animate);
            } else {
                setDisplayValue(endValue);
            }
        };

        frame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frame);
    }, [value, duration, trigger]);

    return <p>{displayValue.toLocaleString()}</p>;
}

export default function DistributionSection() {
    const t = useTranslations("Distribution");
    const sectionRef = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="distribution-section" aria-labelledby="distribution-heading">
            <h2 id="distribution-heading" className="sr-only">{t("title")}</h2>
            <div className="card">
                <div className="count">
                    <AnimatedCounter value={46} trigger={inView} />
                    <h5>{t("branches")}</h5>
                </div>
                <div className="count">
                    <AnimatedCounter value={1140} trigger={inView} />
                    <h5>{t("instruments")}</h5>
                </div>
                <div className="count">
                    <AnimatedCounter value={38} trigger={inView} />
                    <h5>{t("yearsServing")}</h5>
                </div>
            </div>
            <MapDots />
        </section>
    );
}
