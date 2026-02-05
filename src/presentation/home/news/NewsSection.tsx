"use client";

import { StaticImageData } from "next/image"
import { useTranslations } from "next-intl"
import "./NewsSection.css"
import SampleImg from "@/assets/img/home/sample.png"
import ParameterImg from "@/assets/img/home/parameters.png"
import NewSeriesImg from "@/assets/img/home/new-series.png"
import ContaimentImg from "@/assets/img/home/contaiment.png"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react";
import { ensureAbsoluteImageUrl } from "@/lib/helper/imageLoader"

type StaticNewsContent = {
    title: string
    desc: string
    image: StaticImageData
}

type ArticlePreview = {
    title: string
    excerpt?: string
    slug: string
    heroImage?: string | null
    subTitle?: string
}

export default function NewsSection() {
    const t = useTranslations("News");
    const router = useRouter();

    const staticNews: StaticNewsContent[] = [
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

    const [articles, setArticles] = useState<ArticlePreview[] | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let mounted = true
        const fetchLatest = async () => {
            try {
                const res = await axios.get('/api/article/public/four')
                const payload = res.data || {}
                const items = (payload.data ?? payload) as unknown[];
                const normalized = items.map((it) => {
                    const row = it as Record<string, unknown>;
                    return {
                        title: String(row.title ?? ""),
                        subTitle: String(row.subTitle ?? ""),
                        slug: String(row.slug ?? ""),
                        heroImage: row.heroImage ? String(row.heroImage) : null,
                    } as ArticlePreview;
                });

                if (mounted) setArticles(normalized.slice(0, 4))
            } catch (err) {
                // fallback to static
                if (mounted) setArticles(staticNews.map((s) => ({ title: s.title, excerpt: s.desc, slug: "", heroImage: null })))
            } finally {
                if (mounted) setLoading(false)
            }
        }

        fetchLatest()
        return () => {
            mounted = false
        }
    }, [])

    function truncateWords(s: string | undefined, count = 5) {
        if (!s) return "";
        const words = s.trim().split(/\s+/);
        if (words.length <= count) return s;
        return words.slice(0, count).join(" ") + "...";
    }

    return (
        <section className="news-section">
            <div className="container">
                <div className="card-container">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (articles ?? staticNews.map((s) => ({ title: s.title, excerpt: s.desc, slug: "", heroImage: null }))).map((n, index) => {
                        const bgImage = n.heroImage ? ensureAbsoluteImageUrl(n.heroImage) : (staticNews[index]?.image?.src ?? "");
                        return (
                            <div
                                key={index}
                                className="card"
                                style={{ backgroundImage: `url(${bgImage})` }}
                                onClick={() => n.slug && router.push(`/article/${n.slug}`)}
                            >
                                <div className="text">
                                    <h3>{truncateWords(n.title, 5)}</h3>
                                    <p>{(n as any).subTitle}</p>
                                    <p>{t("viewMore")}</p>
                                </div>
                                <div className="overlay"></div>
                            </div>
                        );
                    })}
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