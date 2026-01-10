"use client";
import "./ClincalAnalysis.css"
import { GoArrowUpRight } from "react-icons/go"
import Link from "next/link"
import { useEffect, useState } from "react"

interface ClincalAnalysisSectionProps {
    variant?: "home" | "full";
}

export default function ClincalAnalysisSection({ variant = "full" }: ClincalAnalysisSectionProps) {
    const isHome = variant === "home";
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        if (!isHome) {
            const timer = setTimeout(() => {
                setAnimated(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isHome]);

    return (
        <section className={`clinical-analysis ${isHome ? "clinical-analysis--home" : ""}`}>
            <div className={`container ${animated ? "animated" : ""}`}>
                <div className="analysis">
                    <Link href="/clinical-analysis" className="clinical-analysis-home-link" target="_blank">
                        <div style={{ display: "flex" }}>
                            <h2>
                                <span className="line-1">Clinical</span>
                                <span className="line-2">Analysis</span>
                            </h2>
                            <GoArrowUpRight className="arrow-icon" aria-hidden="true" />
                        </div>
                    </Link>
                    <Link href="/food-beverage-analysis" className="food-beverage-analysis" target="_blank">
                        <div style={{ display: "flex" }}>
                            <h2>
                                <span className="line-1">Food & Beverage</span>
                                <span className="line-2">Analysis</span>
                            </h2>
                            <GoArrowUpRight className="arrow-icon" aria-hidden="true" />
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}