"use client"

import Header from "@/presentation/components/header/header"
import "./page.css"
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import A151Img from "@/assets/img/instrument/a15/1.png"
import A152Img from "@/assets/img/instrument/a15/2.png"
import A15Center from "@/assets/img/instrument/a15/center.png"

import A15Specs1 from "@/assets/img/instrument/a15/specs-1.png"
import A15Specs2 from "@/assets/img/instrument/a15/specs-2.png"
import A15Specs3 from "@/assets/img/instrument/a15/specs-3.png"

import DimensionImg1 from "@/assets/img/instrument/a15/dimension-1.png"
import DimensionImg2 from "@/assets/img/instrument/a15/dimension-2.png"

import Detail1 from "@/assets/img/instrument/a15/detail-1.png"
import Detail2 from "@/assets/img/instrument/a15/detail-2.png"

import { MdArrowOutward } from "react-icons/md";

import { InfiniteScrollHeader } from "@/presentation/home/whyChooseUs";
import { useInfiniteScroll } from "@/presentation/home/whyChooseUs/hooks";

import CTASection from "@/presentation/home/cta/CTASection";
import Footer from "@/presentation/components/footer/footer";
import { motion } from "framer-motion"

export default function InstrumentA15() {
    const t = useTranslations("A15");
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
        <div className="a15">
            <Header />
            <h1 className="sr-only">BioSystems A15</h1>
            <main>
                <section aria-labelledby="hero-heading">
                    <div className={`hero ${animated ? "animated" : ""}`}>
                        <div className="ca-title" role="heading" aria-level={1} id="hero-heading">
                            <span className="line-1">{t('heroTitle1')}</span>
                            <span className="line-2">{t('heroTitle2')}</span>
                        </div>
                        <div className="line-vertical"></div>
                        <p className="text">{t('heroDesc')}</p>
                    </div>
                    <div className="container-hero-images">
                        <Image src={A151Img} alt="BioSystems A15 Clinical Chemistry Analyzer Front View" />
                        <Image src={A152Img} alt="BioSystems A15 Clinical Chemistry Analyzer Side View" />
                    </div>
                    <div className="barrier">
                        <p>{t('barrierLabel')}</p>
                        <h3>{t('barrierTitle')}</h3>
                    </div>
                </section>
                <section aria-labelledby="specifications-heading">
                    <h2 className="sr-only" id="specifications-heading">Technical Specifications</h2>
                    <article className="article">
                        <motion.div {...fadeUp}>
                            <div className="wrapper">
                                <Image src={A15Center} alt="BioSystems A15 Analyzer Central Unit" width={1571} className="center" />
                            </div>
                        </motion.div>
                        <div className="content">
                            <motion.div {...fadeRight}>
                                <div className="specs">
                                    <Image src={A15Specs1} alt="BioSystems A15 Semi-automatic Operation"></Image>
                                    <h3>{t('spec1Title')}</h3>
                                    <p>{t('spec1Desc')}</p>
                                </div>
                            </motion.div>
                            <motion.div {...fadeUp}>
                                <div className="specs">
                                    <Image src={A15Specs2} alt="BioSystems A15 Test Storage Capacity"></Image>
                                    <h3>{t('spec2Title')}</h3>
                                    <p>{t('spec2Desc')}</p>
                                </div>
                            </motion.div>
                            <motion.div {...fadeLeft}>
                                <div className="specs">
                                    <Image src={A15Specs3} alt="BioSystems A15 Photometric System"></Image>
                                    <h3>{t('spec3Title')}</h3>
                                    <p>{t('spec3Desc')}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </article>
                </section>
                <section aria-labelledby="dimensions-heading">
                    <h2 className="sr-only" id="dimensions-heading">Dimensions</h2>
                    <div className="specs-dimension">
                        <div className="analyzer-images">
                            <div className="length">
                                <p>840 mm</p>
                                <Image src={DimensionImg1} alt="BioSystems A15 Dimension Length" />
                            </div>
                            <div className="width">
                                <div>
                                    <p>655 mm</p>
                                    <Image src={DimensionImg2} alt="BioSystems A15 Dimension Width" />
                                </div>
                                <p className="height">570 mm</p>
                            </div>
                        </div>
                        <article>
                            <h3>{t('dimensionTitle')}</h3>
                            <p>{t('dimensionDesc')}</p>
                        </article>
                    </div>
                </section>
                <section aria-labelledby="product-highlight-heading">
                    <h2 className="sr-only" id="product-highlight-heading">Product Highlight</h2>
                    <div className="barrier2">
                        <motion.div {...fadeLeft}>
                            <h2>A15</h2>
                        </motion.div>
                    </div>
                </section>
                <section aria-labelledby="detail-images-heading">
                    <h2 className="sr-only" id="detail-images-heading">Detail Images</h2>
                    <div className="images-detail">
                        <div className="card-images">
                            <Image src={Detail1} alt="BioSystems A15 Display Panel Detail" />
                            <Image src={Detail2} alt="BioSystems A15 Sample Compartment Detail" />
                        </div>
                    </div>
                </section>
                <section aria-labelledby="product-details-heading">
                    <h2 className="sr-only" id="product-details-heading">Product Details</h2>
                    <div className="specs-detail">
                        <div>
                            <div className="title first">
                                <h3>01 Product Description</h3>
                            </div>
                            <div className="body">
                                <p className="desc">{t('productDesc')}</p>

                            </div>
                        </div>
                        <div>
                            <div className="title">
                                <h3>02 {t('specsTitle')}</h3>
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
                                <h3>03 {t('reference')}</h3>
                            </div>
                            <div className="body">
                                <p className="code">83105</p>

                            </div>
                        </div>
                    </div>
                </section>
                <section aria-labelledby="related-products-heading">
                    <h2 className="sr-only" id="related-products-heading">Related Products</h2>
                    <div className="related-products">
                        <h2>{t('relatedProducts')}</h2>
                        <h3 className="tags">{t('relatedProductsTag')}</h3>

                        <div className="container">
                            <div className="card">
                                <div className="head">
                                    <div className="title">
                                        <p>{t('analyzer')}</p>
                                        <h3>BA400</h3>
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
                                        <h3>BA200</h3>
                                    </div>
                                    <MdArrowOutward size={28} className="icon-outward" />
                                </div>
                                <div className="content">
                                    <p>{t('ba200Desc')}</p>
                                </div>
                                <div className="code">
                                    <p>{t('code')}</p>
                                    <h4>83200/83200ISE</h4>
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
                </section>
            </main>
            <InfiniteScrollHeader title={t('contactUs')} transform={getTransform()} />
            <CTASection />
            <Footer bgColor="#ff5a00" />
        </div>

    )
}