"use client"

import Header from "@/presentation/components/header/header"
import "./page.css"
import { useState, useEffect } from "react";
import Image from "next/image";
import DescImg from "@/assets/img/instrument/desc.png"
import CTASection from "@/presentation/home/cta/CTASection";
import Footer from "@/presentation/components/footer/footer";

export default function InsturmentPage() {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimated(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="instrument">
            <Header />
            <div className={`hero ${animated ? "animated" : ""}`}>
                <h1 className="ca-title" >
                    <span className="line-1">Biochemisry</span>
                    <span className="line-2">Systems</span>
                </h1>
                <div className="line-vertical"></div>
                <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt leo sit amet purus congue, eget venenatis eros semper. Maecenas nisl dui, suscipit non sodales a, molestie eu sapien.</p>
            </div>
            <article className="desctiption">
                <div className="content">
                    <h2>Analytical systems to enhance patient care and drive research forward</h2>
                    <p>Our analytical solutions integrate biochemistry instruments, reagents, and reference materials to accurately analyse biological samples, aiding in monitoring diseases through renal tests and cardiac tests, among other biochemistry controls, and assessing treatment effectiveness. By measuring biomarkers, we provide viral data that enhances patient care and contributes to medical research across various conditions, such as the control of diabetes, cardiovascular diseases, analysis of kidney disorders, and fertility issues.</p>
                </div>
                <Image src={DescImg} width={952} height={636} alt="Description Image" />
            </article>
            <div className="analyzer">
                <div className="overlay"></div>
                <div className="content">
                    <h2>BA400</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt leo sit amet purus congue, eget venenatis eros semper. Maecenas nisl dui, suscipit non sodales a, molestie eu sapien. Praesent libero diam, suscipit at feugiat non, sodales vehicula enim.</p>
                </div>
            </div>

            <CTASection contentBg="#fff" contentColor="#000" iconColor="#FF5A00" />
            <Footer bgColor=" #FF5A00" />

        </div>
    )
}