"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import "./page.css";

interface User {
    id: string;
    email: string;
    name: string;
}

interface Article {
    id: string;
    authorId: string;
    title: string;
    subTitle: string;
    slug: string;
    excerpt: string;
    author: User;
    contentHtml: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export default function ViewArticlePage() {
    const router = useRouter();
    const params = useParams();
    const slug = params.slug as string;

    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (slug) {
            fetchArticle();
        }
    }, [slug]);

    const fetchArticle = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/article/${slug}`);
            setArticle(response.data.data);
            setError(null);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Failed to fetch article");
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="view-article-page">
                <div className="loading-container">
                    <p>Loading article...</p>
                </div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="view-article-page">
                <div className="error-container">
                    <h1>Error</h1>
                    <p>{error || "Article not found"}</p>
                    <button className="btn-back" onClick={() => router.push("/dashboard/posts")}>
                        Back to Articles
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="view-article-page">
            <div className="article-header">
                <button className="btn-back" onClick={() => router.push("/dashboard/posts")}>
                    ← Back to Articles
                </button>
                <div className="header-actions">
                    <button className="btn-edit" onClick={() => router.push(`/dashboard/posts/${slug}/edit`)}>
                        Edit Article
                    </button>
                </div>
            </div>

            <article className="article-container">
                <header className="article-title-section">
                    <h1 className="article-title">{article.title}</h1>
                    <h2 className="article-subtitle">{article.subTitle}</h2>

                    <div className="article-meta">
                        <div className="author-info">
                            <span className="author-label">By</span>
                            <span className="author-name">{article.author.name}</span>
                        </div>
                        <div className="article-date">
                            {new Date(article.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </div>
                        <div className="article-status">
                            <span className={`status-badge status-${article.status.toLowerCase()}`}>
                                {article.status}
                            </span>
                        </div>
                    </div>
                </header>

                <div className="article-content" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />

                <footer className="article-footer">
                    <div className="footer-info">
                        <p className="last-updated">
                            Last updated: {new Date(article.updatedAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                </footer>
            </article>
        </div>
    );
}
