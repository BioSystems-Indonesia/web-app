"use client";
import { useState, useEffect } from "react";
import Header from "@/presentation/components/header/header"
import OurProductsSection from "@/presentation/clinicalAnalysis/ourProducts/ourProuduts"
import TestingParameterSection from "@/presentation/clinicalAnalysis/ourParameter/testingParameter"
import CTASection from "@/presentation/home/cta/CTASection"
import Footer from "@/presentation/components/footer/footer"
import "./page.css"
export default function ClincalAnalysis() {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimated(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="clinical-analysis">
            <Header />
            <div className={`hero ${animated ? "animated" : ""}`}>
                <h1 className="ca-title" >
                    <span className="line-1">Clinical</span>
                    <span className="line-2">Analysis</span>
                </h1>
                <div className="line-vertical"></div>
                <p className="text">We deliver analytical products and automation systems for biochemistry and autoimmunity, using high-quality materials and validated processes to ensure reliable results.</p>
            </div>
            <OurProductsSection />
            <TestingParameterSection color="#FF5A00" />
            <CTASection contentBg="#FF5A00" contentColor="#fff" iconColor="#fff" />
            <Footer bgColor=" #FF5A00" />
        </div>
    )
}