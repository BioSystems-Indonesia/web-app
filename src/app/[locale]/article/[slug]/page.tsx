import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "./page.css";
import Header from "@/presentation/components/header/header";
import CTASection from "@/presentation/home/cta/CTASection";
import Footer from "@/presentation/components/footer/footer";

import type { Article as ArticleEntity } from "@/domain/entities/Article";
import { ArticleRepositoryPrisma } from "@/infrastructure/article/ArticleRepository";
import { NotFoundError } from "@/lib/http/error";
import { generateCanonicalUrl, generateHrefLang, generateSEOMetadata } from "@/lib/seo/generateMetadata";
import { ArticleUseCase } from "@/usecases/article/ArticleUseCase";

interface PageProps {
    params: Promise<{ locale: string; slug: string }>;
}

const articleRepo = new ArticleRepositoryPrisma();
const articleUseCase = new ArticleUseCase(articleRepo);

async function getArticle(slug: string): Promise<ArticleEntity> {
    try {
        return await articleUseCase.getBySlug(slug);
    } catch (error) {
        if (error instanceof NotFoundError) {
            notFound();
        }
        throw error;
    }
}

function stripOuterArticleContentWrapper(html: string): string {
    if (!html) return html;

    const match = html.match(/^\s*<div\s+class=("|')article-content\1\s*>/i);
    if (!match) return html;

    const openTagEndIndex = html.indexOf(">") + 1;
    const lastCloseIndex = html.toLowerCase().lastIndexOf("</div>");
    if (openTagEndIndex <= 0 || lastCloseIndex <= openTagEndIndex) return html;

    return html.slice(openTagEndIndex, lastCloseIndex).trim();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const canonical = generateCanonicalUrl(locale, `/article/${slug}`);

    try {
        const article = await articleUseCase.getBySlug(slug);
        const title = `${article.title} | Biosystems Indonesia`;
        const description = article.excerpt || article.subTitle;
        const image = article.heroImage || "https://biosystems.id/logo/biosystems-logo.png";

        const base = generateSEOMetadata({
            title,
            description,
            locale,
            alternates: generateHrefLang(`/article/${slug}`),
            canonical,
        });

        return {
            ...base,
            openGraph: {
                ...base.openGraph,
                type: "article",
                url: canonical,
                images: [{ url: image }],
                publishedTime: article.createdAt.toISOString(),
                modifiedTime: article.updatedAt.toISOString(),
                authors: [article.author.name],
            },
            twitter: {
                ...base.twitter,
                images: [image],
            },
        };
    } catch (error) {
        if (error instanceof NotFoundError) {
            return {
                title: "Article not found | Biosystems Indonesia",
                description: "Article not found",
                robots: { index: false, follow: false },
            };
        }

        return generateSEOMetadata({
            title: "Article | Biosystems Indonesia",
            description: "Article",
            locale,
            alternates: generateHrefLang(`/article/${slug}`),
            canonical,
        });
    }
}

export default async function ArticlePage({ params }: PageProps) {
    const { slug, locale } = await params;
    const article = await getArticle(slug);

    const canonical = generateCanonicalUrl(locale, `/article/${article.slug}`);
    const image = article.heroImage || "https://biosystems.id/logo/biosystems-logo.png";

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        alternativeHeadline: article.subTitle,
        image,
        author: {
            "@type": "Person",
            name: article.author.name,
        },
        publisher: {
            "@type": "Organization",
            name: "Biosystems Indonesia",
            logo: {
                "@type": "ImageObject",
                url: "https://biosystems.id/logo/biosystems-logo.png",
            },
        },
        datePublished: article.createdAt.toISOString(),
        dateModified: article.updatedAt.toISOString(),
        description: article.excerpt || article.subTitle,
        articleBody: article.contentHtml.replace(/<[^>]*>/g, "").substring(0, 500),
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonical,
        },
    };

    const contentHtml = stripOuterArticleContentWrapper(article.contentHtml);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

            <Header />
            <div className="article-page">
                <article className="article-container">
                    <header
                        className="article-header"
                        style={article.heroImage ? { backgroundImage: `url(${article.heroImage})` } : undefined}
                    >
                        <h1 className="article-title">{article.title}</h1>
                        <h2 className="article-subtitle">{article.subTitle}</h2>

                        <div className="article-meta">
                            <div className="article-date">
                                {article.createdAt.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </div>
                        </div>
                    </header>

                    <div className="article-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />

                    {article.references && (
                        <div className="article-references">
                            <h3>References</h3>
                            <div className="references-content">
                                {article.references.split("\n").map((ref, index) => {
                                    const urlMatch = ref.match(/(https?:\/\/[^\s]+)/);
                                    if (urlMatch) {
                                        const url = urlMatch[0];
                                        const text = ref.replace(url, "").trim() || url;
                                        return (
                                            <p key={index}>
                                                <a href={url} target="_blank" rel="noopener noreferrer">
                                                    {text}
                                                </a>
                                            </p>
                                        );
                                    }
                                    return <p key={index}>{ref}</p>;
                                })}
                            </div>
                        </div>
                    )}
                </article>
            </div>
            <CTASection contentBg="var(--primary)" iconColor="white" contentColor="white" />
            <Footer bgColor="var(--primary)" />
        </>
    );
}

