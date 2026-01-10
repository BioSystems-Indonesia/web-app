"use client"

import Header from "@/presentation/components/header/header"
import "./page.css"
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import BA1Img from "@/assets/img/instrument/ba200/1.png"
import BA2Img from "@/assets/img/instrument/ba200/2.png"
import BACenter from "@/assets/img/instrument/ba200/center.png"

import BASpecs1 from "@/assets/img/instrument/ba200/specs-1.png"
import BASpecs2 from "@/assets/img/instrument/ba200/specs-2.png"
import BASpecs3 from "@/assets/img/instrument/ba200/specs-3.png"

import DimensionImg1 from "@/assets/img/instrument/ba200/dimension-1.png"
import DimensionImg2 from "@/assets/img/instrument/ba200/dimension-2.png"

import Detail1 from "@/assets/img/instrument/ba200/detail-1.png"
import Detail2 from "@/assets/img/instrument/ba200/detail-2.png"

import { MdArrowOutward } from "react-icons/md";

import { InfiniteScrollHeader } from "@/presentation/home/whyChooseUs";
import { useInfiniteScroll } from "@/presentation/home/whyChooseUs/hooks";

import CTASection from "@/presentation/home/cta/CTASection";
import Footer from "@/presentation/components/footer/footer";
import { motion } from "framer-motion"

export default function InstrumentBA200() {
    const t = useTranslations("BA200");
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

    const fadeLeft = {
        initial: { opacity: 0, x: 100 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 1 },
        viewport: { once: true },
    };


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

    const { getTransform } = useInfiniteScroll();

    return (
        <div className="ba200">
            <Header />
            <div className={`hero ${animated ? "animated" : ""}`}>
                <h1 className="ca-title" >
                    <span className="line-1">{t('heroTitle1')}</span>
                    <span className="line-2">{t('heroTitle2')}</span>
                </h1>
                <div className="line-vertical"></div>
                <p className="text">{t('heroDesc')}</p>
            </div>
            <div className="container-hero-images">
                <Image src={BA1Img} alt="BioSystems BA200 Analyzer" />
                <Image src={BA2Img} alt="BioSystems BA200 Analyzer" />
            </div>
            <div className="barrier">
                <p>{t('barrierLabel')}</p>
                <h3>{t('barrierTitle')}</h3>
            </div>
            <article className="article">
                <motion.div {...fadeUp}>
                    <div className="wrapper">
                        <Image src={BACenter} alt="BioSystem BA200 Analyzer" width={1571} className="center" />
                    </div>
                </motion.div>
                <div className="content">
                    <motion.div {...fadeRight}>
                        <div className="specs">
                            <Image src={BASpecs1} alt="BA200 Spesification"></Image>
                            <h2>{t('spec1Title')}</h2>
                            <p>{t('spec1Desc')}</p>
                        </div>
                    </motion.div>
                    <motion.div {...fadeUp}>
                        <div className="specs">
                            <Image src={BASpecs2} alt="BA200 Spesification"></Image>
                            <h2>{t('spec2Title')}</h2>
                            <p>{t('spec2Desc')}</p>
                        </div>
                    </motion.div>
                    <motion.div {...fadeLeft}>
                        <div className="specs">
                            <Image src={BASpecs3} alt="BA200 Spesification"></Image>
                            <h2>{t('spec3Title')}</h2>
                            <p>{t('spec3Desc')}</p>
                        </div>
                    </motion.div>
                </div>
            </article>
            <div className="specs-dimension">
                <div className="analyzer-images">
                    <div className="length">
                        <p>1070 mm</p>
                        <Image src={DimensionImg1} alt="BA200 Dimension Length" />
                    </div>
                    <div className="width">
                        <div>
                            <p>690 mm</p>
                            <Image src={DimensionImg2} alt="BA200 Dimension Width" />
                        </div>
                        <p className="height">680 mm</p>
                    </div>
                </div>
                <article>
                    <h2>{t('dimensionTitle')}</h2>
                    <p>{t('dimensionDesc')}</p>
                </article>
            </div>
            <div className="barrier2">
                <motion.div {...fadeLeft}>
                    <h1>BA200</h1>
                </motion.div>
            </div>
            <div className="images-detail">
                <div className="card-images">
                    <Image src={Detail1} alt="Detail Spesification" />
                    <Image src={Detail2} alt="Detail Spesification" />
                </div>
            </div>
            <div className="specs-detail">
                <div>
                    <div className="title first">
                        <h2>01 Product Description</h2>
                    </div>
                    <div className="body">
                        <p className="desc">{t('productDesc')}</p>
                    </div>
                </div>
                <div>
                    <div className="title">
                        <h2>02 {t('specsTitle')}</h2>
                    </div>
                    <div className="body">
                        <ul className="spec-list">
                            <li>{t('dimensions')}</li>
                            <li>{t('weight')}</li>
                            <li>{t('throughput')}</li>
                            <li>{t('lightSource')}</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div className="title">
                        <h2>03 {t('reference')}</h2>
                    </div>
                    <div className="body">
                        <p className="code">83200/83200ISE</p>
                    </div>
                </div>
            </div>
            <div className="related-products">
                <h2>{t('relatedProducts')}</h2>
                <h2 className="tags">{t('relatedProductsTag')}</h2>

                <div className="container">
                    <div className="card">
                        <div className="head">
                            <div className="title">
                                <p>{t('analyzer')}</p>
                                <h3>BA200</h3>
                            </div>
                            <MdArrowOutward size={28} className="icon-outward" />
                        </div>
                        <div className="content">
                            <p>{t('ba400Desc')}</p>
                        </div>
                        <div className="code">
                            <p>{t('code')}</p>
                            <h4>83400/83400ISE</h4>
                        </div>
                    </div>
                    <div className="card">
                        <div className="head">
                            <div className="title">
                                <p>{t('analyzer')}</p>
                                <h3>A15</h3>
                            </div>
                            <MdArrowOutward size={28} className="icon-outward" />
                        </div>
                        <div className="content">
                            <p>{t('a15Desc')}</p>
                        </div>
                        <div className="code">
                            <p>{t('code')}</p>
                            <h4>83105</h4>
                        </div>
                    </div>
                    <div className="card">
                        <div className="head">
                            <div className="title">
                                <p>{t('analyzer')}</p>
                                <h3>BTS</h3>
                            </div>
                            <MdArrowOutward size={28} className="icon-outward" />
                        </div>
                        <div className="content">
                            <p>{t('btsDesc')}</p>
                        </div>
                        <div className="code">
                            <p>{t('code')}</p>
                            <h4>83000</h4>
                        </div>
                    </div>
                </div>
            </div>
            <InfiniteScrollHeader title={t('contactUs')} transform={getTransform()} />
            <CTASection />
            <Footer bgColor="#ff5a00" />
        </div>

    )
}