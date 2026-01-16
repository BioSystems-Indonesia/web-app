"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Header from "@/presentation/components/header/header"
import OurProductsSection from "@/presentation/clinicalAnalysis/ourProducts/ourProuduts"
import TestingParameterSection from "@/presentation/clinicalAnalysis/ourParameter/testingParameter"
import CTASection from "@/presentation/home/cta/CTASection"
import Footer from "@/presentation/components/footer/footer"
import "./page.css"

export default function ClincalAnalysis() {
    const t = useTranslations("ClinicalAnalysis");
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1440) {
                const timer = setTimeout(() => {
                    setAnimated(true);
                }, 500);
                return () => clearTimeout(timer);
            } else {
                setAnimated(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="clinical-analysis">
            <Header />
            <div className={`hero ${animated ? "animated" : ""}`}>
                <h1 className="ca-title" >
                    <span className="line-1">{t('heroTitle1')}</span>
                    <span className="line-2">{t('heroTitle2')}</span>
                </h1>
                <div className="line-vertical"></div>
                <p className="text">{t('heroDesc')}</p>
            </div>
            <OurProductsSection />
            <TestingParameterSection color="#FF5A00" productType="CLINICAL" />
            <CTASection contentBg="#FF5A00" contentColor="#fff" iconColor="#fff" />
            <Footer bgColor=" #FF5A00" />
        </div>
    )
}