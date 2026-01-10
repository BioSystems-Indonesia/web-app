"use client"

import Header from "@/presentation/components/header/header"
import "./page.css"
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import BTS1Img from "@/assets/img/instrument/bts/1.png"
import BTS2Img from "@/assets/img/instrument/bts/2.png"
import BTSCenter from "@/assets/img/instrument/bts/center.png"

import BTS from "@/assets/img/instrument/bts/specs-1.png"
import BTS2 from "@/assets/img/instrument/bts/specs-2.png"
import BTS3 from "@/assets/img/instrument/bts/specs-3.png"
import BTS4 from "@/assets/img/instrument/bts/specs-4.png"

import DimensionImg1 from "@/assets/img/instrument/bts/dimension-1.png"
import DimensionImg2 from "@/assets/img/instrument/bts/dimension-2.png"

import Detail1 from "@/assets/img/instrument/bts/detail-1.png"
import Detail2 from "@/assets/img/instrument/bts/detail-2.png"

import { MdArrowOutward } from "react-icons/md";

import { InfiniteScrollHeader } from "@/presentation/home/whyChooseUs";
import { useInfiniteScroll } from "@/presentation/home/whyChooseUs/hooks";

import CTASection from "@/presentation/home/cta/CTASection";
import Footer from "@/presentation/components/footer/footer";
import { motion } from "framer-motion"

export default function InstrumentBTS() {
    const t = useTranslations("BTS");
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
        <div className="bts">
            <Header />
            <main>
                <section aria-labelledby="hero-heading">
                    <h1 className="sr-only" id="hero-heading">{t("heroTitle1")} {t("heroTitle2")}</h1>
                    <div className={`hero ${animated ? "animated" : ""}`}>
                        <div className="ca-title" role="heading" aria-level={1}>
                            <span className="line-1">{t("heroTitle1")}</span>
                            <span className="line-2">{t("heroTitle2")}</span>
                        </div>
                        <div className="line-vertical"></div>
                        <p className="text">{t("heroDesc")}</p>
                    </div>
                </section>
                <section aria-labelledby="images-heading">
                    <h2 className="sr-only" id="images-heading">BioSystems BTS Product Images</h2>
                    <div className="container-hero-images">
                        <Image src={BTS1Img} alt="BioSystems BTS Analyzer" />
                        <Image src={BTS2Img} alt="BioSystems BTS Analyzer" />
                    </div>
                </section>
                <section aria-labelledby="barrier-heading">
                    <h2 className="sr-only" id="barrier-heading">{t("barrierLabel")} {t("barrierTitle")}</h2>
                    <div className="barrier">
                        <p>{t("barrierLabel")}</p>
                        <h3>{t("barrierTitle")}</h3>
                    </div>
                </section>
                <section aria-labelledby="specifications-heading">
                    <h2 className="sr-only" id="specifications-heading">Technical Specifications</h2>
                    <article className="article">

                        <div className="content">
                            <div className="part-1">
                                <motion.div {...fadeRight}>
                                    <div className="specs">
                                        <Image src={BTS} alt="BTS Spesification"></Image>
                                        <h3>{t("spec1Title")}</h3>
                                        <p>{t("spec1Desc")}</p>
                                    </div>
                                </motion.div>
                                <motion.div {...fadeUp}>
                                    <div className="specs specs-2">
                                        <Image src={BTS2} alt="BTS Spesification"></Image>
                                        <h3>{t("spec2Title")}</h3>
                                        <p>{t("spec2Desc")}</p>
                                    </div>
                                </motion.div>
                            </div>
                            <motion.div {...fadeUp}>
                                <div className="wrapper">
                                    <Image src={BTSCenter} alt="BioSystem BTS Analyzer" width={656} className="center" />
                                </div>
                            </motion.div>
                            <div className="part-2">
                                <motion.div {...fadeLeft}>
                                    <div className="specs">
                                        <Image src={BTS3} alt="BTS Spesification"></Image>
                                        <h3>{t("spec3Title")}</h3>
                                        <p>{t("spec3Desc")}</p>
                                    </div>
                                </motion.div>
                                <motion.div {...fadeLeft}>
                                    <div className="specs specs-2">
                                        <Image src={BTS4} alt="BTS Spesification"></Image>
                                        <h3>{t("spec4Title")}</h3>
                                        <p>{t("spec4Desc")}</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </article>
                </section>
                <section aria-labelledby="dimension-heading">
                    <h2 className="sr-only" id="dimension-heading">Dimensions and Size</h2>
                    <div className="specs-dimension">
                        <div className="analyzer-images">
                            <div className="length">
                                <p>245 mm</p>
                                <Image src={DimensionImg1} alt="BTS Dimension Length" />
                            </div>
                            <div className="width">
                                <div>
                                    <p>438 mm</p>
                                    <Image src={DimensionImg2} alt="BTS Dimension Width" />
                                </div>
                                <p className="height">680 mm</p>
                            </div>
                        </div>
                        <article>
                            <h3>{t("dimensionTitle")}</h3>
                            <p>{t("dimensionDesc")}</p>
                        </article>
                    </div>
                </section>
                <section aria-labelledby="product-highlight">
                    <div className="barrier2">
                        <motion.div {...fadeLeft}>
                            <h2 id="product-highlight">{t("heroTitle2")}</h2>
                        </motion.div>
                    </div>
                </section>
                <section aria-labelledby="detail-images-heading">
                    <h2 className="sr-only" id="detail-images-heading">Product Detail Images</h2>
                    <div className="images-detail">
                        <div className="card-images">
                            <Image src={Detail1} alt="BioSystems BTS Control Panel Detail" />
                            <Image src={Detail2} alt="BioSystems BTS Sample Tray Detail" />
                        </div>
                    </div>
                </section>
                <section aria-labelledby="product-details-heading">
                    <h2 className="sr-only" id="product-details-heading">Complete Product Details</h2>
                    <div className="specs-detail">

                        <div>
                            <div className="title first">
                                <h3>01 Product Description</h3>
                            </div>
                            <div className="body">
                                <p className="desc">{t("productDesc")}</p>
                            </div>
                        </div>
                        <div>
                            <div className="title">
                                <h3>02 {t("specsTitle")}</h3>
                            </div>
                            <div className="body">
                                <ul className="spec-list">
                                    <li>{t("dimensions")}</li>
                                    <li>{t("weight")}</li>
                                    <li>{t("throughput")}</li>
                                    <li>{t("lightSource")}</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className="title">
                                <h3>03 {t("reference")}</h3>
                            </div>
                            <div className="body">
                                <p className="code">83000</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section aria-labelledby="related-products-heading">
                    <div className="related-products">
                        <h2 id="related-products-heading">{t("relatedProducts")}</h2>
                        <h3 className="tags">{t("relatedProductsTag")}</h3>

                        <div className="container">
                            <div className="card">
                                <div className="head">
                                    <div className="title">
                                        <p>{t("analyzer")}</p>
                                        <h3>BA400</h3>
                                    </div>
                                    <MdArrowOutward size={28} className="icon-outward" />
                                </div>
                                <div className="content">
                                    <p>{t("ba400Desc")}</p>
                                </div>
                                <div className="code">
                                    <p>{t("code")}</p>
                                    <h4>83400/83400ISE</h4>
                                </div>
                            </div>
                            <div className="card">
                                <div className="head">
                                    <div className="title">
                                        <p>{t("analyzer")}</p>
                                        <h3>A15</h3>
                                    </div>
                                    <MdArrowOutward size={28} className="icon-outward" />
                                </div>
                                <div className="content">
                                    <p>{t("a15Desc")}</p>
                                </div>
                                <div className="code">
                                    <p>{t("code")}</p>
                                    <h4>83105</h4>
                                </div>
                            </div>
                            <div className="card">
                                <div className="head">
                                    <div className="title">
                                        <p>{t("analyzer")}</p>
                                        <h3>BTS</h3>
                                    </div>
                                    <MdArrowOutward size={28} className="icon-outward" />
                                </div>
                                <div className="content">
                                    <p>{t("btsDesc")}</p>
                                </div>
                                <div className="code">
                                    <p>{t("code")}</p>
                                    <h4>83000</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <InfiniteScrollHeader title={t("contactUs")} transform={getTransform()} />
            <CTASection />
            <Footer bgColor="#ff5a00" />
        </div>

    )
}