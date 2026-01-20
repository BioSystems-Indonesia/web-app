"use client";

import "./CTASection.css"
import { useTranslations } from "next-intl"
import CTAImg from "@/assets/img/home/cta.png"
import LocIcon from "@/presentation/components/icon/loc.png"
import callIcon from "@/presentation/components/icon/call.png"
import Image from "next/image"
import { StaticImageData } from "next/image"

type CTASectionProps = {
    contentBg?: string;
    contentColor?: string;
    iconColor?: string;
}

export default function CTASection({ contentBg = "transparent", contentColor = "inherit", iconColor = "#121212" }: CTASectionProps) {
    const t = useTranslations("CTA");

    return (
        <section className="cta-section" id="contact-us organization">
            <div className="container">
                <div className="head">
                    <h2>{t("title")}</h2>
                </div>
                <div className="cta">
                    <div className="content" style={{ backgroundColor: contentBg, color: contentColor }}>
                        <div className="addr">
                            <div className="title">
                                <span
                                    className="icon-mask"
                                    aria-hidden
                                    style={{
                                        backgroundColor: iconColor,
                                        WebkitMaskImage: `url(${(LocIcon as StaticImageData).src})`,
                                        maskImage: `url(${(LocIcon as StaticImageData).src})`,
                                        WebkitMaskRepeat: 'no-repeat',
                                        maskRepeat: 'no-repeat',
                                        WebkitMaskSize: 'contain',
                                        maskSize: 'contain',
                                        width: 33,
                                        height: 33,
                                        display: 'inline-block'
                                    }}
                                />
                                <h5>{t("address")}</h5>
                            </div>
                            <p>{t("addressText")}</p>
                        </div>
                        <div className="call" style={{ marginTop: "2rem" }}>
                            <div className="title">
                                <span
                                    className="icon-mask"
                                    aria-hidden
                                    style={{
                                        backgroundColor: iconColor,
                                        WebkitMaskImage: `url(${(callIcon as StaticImageData).src})`,
                                        maskImage: `url(${(callIcon as StaticImageData).src})`,
                                        WebkitMaskRepeat: 'no-repeat',
                                        maskRepeat: 'no-repeat',
                                        WebkitMaskSize: 'contain',
                                        maskSize: 'contain',
                                        width: 33,
                                        height: 33,
                                        display: 'inline-block'
                                    }}
                                />
                                <h5>{t("phone")}</h5>
                            </div>
                            <p>{t("customerCare")} </p>
                            <p>{t("telemarketing")}</p>
                        </div>
                    </div>
                    <Image src={CTAImg} alt="call to action" />
                </div>
            </div>
        </section>
    )
}