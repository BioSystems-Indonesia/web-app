"use client"

import Header from "@/presentation/components/header/header"
import "./page.css"
import { useState, useEffect } from "react";
import Image from "next/image";

import BA1Img from "@/assets/img/instrument/ba400/1.png"
import BA2Img from "@/assets/img/instrument/ba400/2.png"
import BACenter from "@/assets/img/instrument/ba400/center.png"

import BASpecs1 from "@/assets/img/instrument/ba400/specs-1.png"
import BASpecs2 from "@/assets/img/instrument/ba400/specs-2.png"
import BASpecs3 from "@/assets/img/instrument/ba400/specs-3.png"

import DimensionImg1 from "@/assets/img/instrument/ba400/dimension-1.png"
import DimensionImg2 from "@/assets/img/instrument/ba400/dimension-2.png"

import Detail1 from "@/assets/img/instrument/ba400/detail-1.png"
import Detail2 from "@/assets/img/instrument/ba400/detail-2.png"

import { MdArrowOutward } from "react-icons/md";

import { InfiniteScrollHeader } from "@/presentation/home/whyChooseUs";
import { useInfiniteScroll } from "@/presentation/home/whyChooseUs/hooks";

import CTASection from "@/presentation/home/cta/CTASection";
import Footer from "@/presentation/components/footer/footer";
import { motion } from "framer-motion"

export default function InstrumentBA400() {
    const [animated, setAnimated] = useState(false);
    const fadeUp = {
        initial: { opacity: 0, y: 100 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 1 },
        viewport: { once: true },
    };

    const fadeRight = {
        initial: { opacity: 0, x: -100 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 1 },
        viewport: { once: true },
    };

    const fadeDown = {
        initial: { opacity: 0, y: -100 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 1 },
        viewport: { once: true },
    };

    const fadeLeft = {
        initial: { opacity: 0, x: 100 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 1 },
        viewport: { once: true },
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimated(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const { getTransform } = useInfiniteScroll();

    return (
        <div className="ba400">
            <Header />
            <div className={`hero ${animated ? "animated" : ""}`}>
                <h1 className="ca-title" >
                    <span className="line-1">BioSystems</span>
                    <span className="line-2">BA400</span>
                </h1>
                <div className="line-vertical"></div>
                <p className="text">BA400 is a clinical chemistry analyser that improves your laboratory resources and minimise the required system maintenance</p>
            </div>
            <div className="container-hero-images">
                <Image src={BA1Img} alt="BioSystems BA400 Analyzer" />
                <Image src={BA2Img} alt="BioSystems BA400 Analyzer" />
            </div>
            <div className="barrier">
                <p>Anlyzer</p>
                <h3>BA400</h3>
            </div>
            <article className="article">
                <motion.div {...fadeRight}>
                    <Image src={BACenter} alt="BioSystem BA400 Analyzer" />
                </motion.div>
                <div className="content">
                    <motion.div {...fadeUp}>
                        <div className="specs">
                            <Image src={BASpecs1} alt="BA400 Spesification"></Image>
                            <h2>Minimum Working Time</h2>
                            <p>New enhanced maneuvers reduce samples loading time and minimise the attention required by the user.</p>
                        </div>
                    </motion.div>
                    <motion.div {...fadeUp}>
                        <div className="specs">
                            <Image src={BASpecs2} alt="BA400 Spesification"></Image>
                            <h2>Reliable Validated System</h2>
                            <p>The reagent barcoding and volume detection system allow to manage the amount of reagent in the system at anytime</p>
                        </div>
                    </motion.div>
                    <motion.div {...fadeUp}>
                        <div className="specs">
                            <Image src={BASpecs3} alt="BA400 Spesification"></Image>
                            <h2>Highest Performance, Minimal Maintenence</h2>
                            <p>The reagent barcoding and volume detection system allow to manage the amount of reagent in the system at anytime</p>
                        </div>
                    </motion.div>
                </div>
            </article>
            <div className="specs-dimension">
                <div className="analyzer-images">
                    <div className="length">
                        <p>1200 mm</p>
                        <Image src={DimensionImg1} alt="BA400 Dimension Length" />
                    </div>
                    <div className="width">
                        <div>
                            <p>720 mm</p>
                            <Image src={DimensionImg2} alt="BA400 Dimension Width" />
                        </div>
                        <p className="height">1258 mm</p>
                    </div>
                </div>
                <article>
                    <h2>Full Automatic Random Access Analyzer</h2>
                    <p>Our main goal is to optimise the laboratory workflow and improve the user experience. The BA400 forms a complete systems that perfectly adapts to the demands of the laboratories in its reagents.</p>
                </article>
            </div>
            <div className="barrier2">
                <motion.div {...fadeLeft}>
                    <h1>BA400</h1>
                </motion.div>
            </div>
            <div className="images-detail">
                <div className="card-images">
                    <Image src={Detail1} alt="Detail Spesification" />
                    <Image src={Detail2} alt="Detail Spesification" />
                </div>
            </div>
            <div className="specs-detail">
                <div className="title">
                    <h2><span>01 </span>Product Description</h2>
                    <h2><span>02 </span>Specs</h2>
                    <h2><span>03 </span>Reference</h2>
                </div>
                <div className="body">
                    <p>Full Automatic Random Access Analyser</p>
                    <ul className="spec-list">
                        <li>Dimensions: 1258 mm x 720 mm x 1200 mm</li>
                        <li>Weight: 210 kg</li>
                        <li>Throughput: 400 t/h (with ISE module 560 t/h)</li>
                        <li>Light source: LED</li>
                    </ul>
                    <p>83400/83400ISE</p>
                </div>
            </div>
            <div className="related-products">
                <h2>Related Products</h2>
                <h2 className="tags">Reagents, reference materials and more</h2>

                <div className="container">
                    <div className="card">
                        <div className="head">
                            <div className="title">
                                <p>Analyzer</p>
                                <h3>BA200</h3>
                            </div>
                            <MdArrowOutward size={28} className="icon-outward" />
                        </div>
                        <div className="content">
                            <p>BA200 is a full automatic analyser with high reagent and sample capacity (88 position), the highest grade in flexibility.</p>
                        </div>
                        <div className="code">
                            <p>Code</p>
                            <h4>83200/83200ISE</h4>
                        </div>
                    </div>
                    <div className="card">
                        <div className="head">
                            <div className="title">
                                <p>Analyzer</p>
                                <h3>A15</h3>
                            </div>
                            <MdArrowOutward size={28} className="icon-outward" />
                        </div>
                        <div className="content">
                            <p>A15 is a small size and low demanding analyser that facilitates automation of tests.</p>
                        </div>
                        <div className="code">
                            <p>Code</p>
                            <h4>83105</h4>
                        </div>
                    </div>
                    <div className="card">
                        <div className="head">
                            <div className="title">
                                <p>Analyzer</p>
                                <h3>BTS</h3>
                            </div>
                            <MdArrowOutward size={28} className="icon-outward" />
                        </div>
                        <div className="content">
                            <p>BTS is a manual analyser with LED optics system and a new intuitive and easy-to use software that will ease your daily work in the laboratory</p>
                        </div>
                        <div className="code">
                            <p>Code</p>
                            <h4>83000</h4>
                        </div>
                    </div>
                </div>
            </div>
            <InfiniteScrollHeader title="Contact Us" transform={getTransform()} />
            <CTASection />
            <Footer bgColor="#ff5a00" />
        </div>

    )
}