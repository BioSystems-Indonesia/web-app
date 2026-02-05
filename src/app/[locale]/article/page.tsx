
"use client"
import Header from "@/presentation/components/header/header"
import "./page.css"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import axios from "axios"
import { Article } from "@/domain/entities/Article"
import Image from "next/image"
import CTASection from "@/presentation/home/cta/CTASection"
import Footer from "@/presentation/components/footer/footer"
import { useRouter } from "next/navigation"
import { ensureAbsoluteImageUrl } from "@/lib/helper/imageLoader"

export default function ArticlePage() {
    const t = useTranslations("Article")
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const articlesRes = await axios.get('/api/article/public')
                const allArticles = (articlesRes.data.data || []) as unknown[];
                const normalized = allArticles.map((a) => {
                    const row = a as Record<string, unknown>;
                    const createdAtRaw = row.createdAt as string | undefined | number | null;
                    const updatedAtRaw = row.updatedAt as string | undefined | number | null;
                    return {
                        ...row as Record<string, any>,
                        createdAt: createdAtRaw ? new Date(String(createdAtRaw)) : new Date(0),
                        updatedAt: updatedAtRaw ? new Date(String(updatedAtRaw)) : new Date(0),
                    } as Article;
                });
                setArticles(normalized)
            } catch (error) {
                console.error('Error fetching articles:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchArticle()
    }, [])

    return (
        <>
            <Header />
            <div className="article">
                <header className="hero">
                    <div className="overlay"></div>

                    <div className="text">
                        <h1>{t("heroTitle")}</h1>
                        <p>{t("heroDescription")}</p>
                    </div>
                </header>
                <div className="article-list">
                    {loading ? (
                        <p>{t("loading")}</p>
                    ) : articles.length === 0 ? (
                        <p>{t("noArticles")}</p>
                    ) : (
                        articles.map((article, index) => {
                            const imgSrc = ensureAbsoluteImageUrl(article.heroImage);
                            return (
                                <article key={index} className="article-item" onClick={() => router.push(`/article/${article.slug}`)}>
                                    <div className="image-wrap">
                                        <Image 
                                            src={imgSrc} 
                                            alt={article.title || "article"} 
                                            fill 
                                            style={{ objectFit: "cover" }}
                                            priority={index < 3}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="text">
                                        <p><i>{article.createdAt.toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}</i></p>
                                        <h2>{article.title}</h2>
                                        <p>{article.excerpt}</p>
                                    </div>
                                </article>
                            );
                        })
                    )}
                </div>
            </div>
            <CTASection contentBg="var(--primary)" iconColor="white" contentColor="white" />
            <Footer bgColor="var(--primary)" />
        </>
    )
}