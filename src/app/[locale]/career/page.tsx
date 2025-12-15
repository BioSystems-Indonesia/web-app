"use client"

import Header from "@/presentation/components/header/header"
import OpportunitiesSection from "@/presentation/career/opportunities/opportunities";
import Footer from "@/presentation/components/footer/footer";
import CTASection from "@/presentation/home/cta/CTASection";
import "./page.css"
import { useState, useEffect } from "react";

export default function CareerPage() {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimated(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="career">
            <Header />
            <div className={`hero ${animated ? "animated" : ""}`}>
                <h1 className="ca-title">
                    <span className="line-1">Career</span>
                    <span className="line-2">Hub</span>
                </h1>
                <div className="line-vertical"></div>

                <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt leo sit amet purus congue, eget venenatis eros semper. Maecenas nisl dui, suscipit non sodales a </p>
            </div>
            <OpportunitiesSection />
            <CTASection iconColor="#ee2737" />

            <Footer bgColor="#ee2737" />

        </div>
    )
}