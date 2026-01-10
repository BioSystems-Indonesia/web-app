"use client";

import { StaticImageData } from "next/image"
import { useTranslations } from "next-intl"
import "./NewsSection.css"
import SampleImg from "@/assets/img/home/sample.png"
import ParameterImg from "@/assets/img/home/parameters.png"
import NewSeriesImg from "@/assets/img/home/new-series.png"
import ContaimentImg from "@/assets/img/home/contaiment.png"

type NewsContent = {
    title: string
    desc: string
    image: StaticImageData
}

export default function NewsSection() {
    const t = useTranslations("News");

    const news: NewsContent[] = [
        {
            title: t("parameters.title"),
            desc: t("parameters.desc"),
            image: ParameterImg
        },
        {
            title: t("newSeries.title"),
            desc: t("newSeries.desc"),
            image: NewSeriesImg
        },
        {
            title: t("samplePreparing.title"),
            desc: t("samplePreparing.desc"),
            image: SampleImg
        },
        {
            title: t("contaiment.title"),
            desc: t("contaiment.desc"),
            image: ContaimentImg
        },
    ]

    return (
        <section className="news-section">
            <div className="container">
                <div className="card-container">
                    {news.map((n, index) => (
                        <div key={index} className="card" style={{ backgroundImage: `url(${n.image.src})` }}>
                            <div className="text">
                                <h3>{n.title}</h3>
                                <p>{n.desc}</p>
                                <p>{t("viewMore")}</p>
                            </div>
                            <div className="overlay"></div>
                        </div>
                    ))}
                </div>
                <div className="content">
                    <div className="text">
                        <h2>{t("title")}</h2>
                        <p>{t("description")}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}