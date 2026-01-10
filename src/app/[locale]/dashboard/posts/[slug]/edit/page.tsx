"use client";

import { useState, useEffect } from "react";
import { ArticleStatus } from "@prisma/client";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import Tiptap from "../../create/richText";
import "../../create/page.css";

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
    status: ArticleStatus;
    createdAt: string;
    updatedAt: string;
}

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params?.slug as string;

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        subTitle: "",
        heroImage: "",
        contentHtml: "",
        excerpt: "",
        references: "",
        status: "DRAFT" as ArticleStatus,
    });

    useEffect(() => {
        fetchCurrentUser();
        fetchArticle();
    }, [slug]);

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get("/api/auth/me");
            setCurrentUser(response.data.data);
        } catch (err) {
            console.error("Failed to fetch current user:", err);
            alert("You must be logged in to edit articles");
            router.push("/dashboard/posts");
        }
    };

    const fetchArticle = async () => {
        try {
            setFetching(true);
            const response = await axios.get(`/api/article/${slug}`);
            const articleData = response.data.data;
            setArticle(articleData);
            setFormData({
                title: articleData.title,
                subTitle: articleData.subTitle,
                heroImage: articleData.heroImage || "",
                contentHtml: articleData.contentHtml,
                excerpt: articleData.excerpt || "",
                references: articleData.references || "",
                status: articleData.status,
            });
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                alert(err.response.data.message);
            } else {
                alert("Failed to fetch article");
            }
            router.push("/dashboard/posts");
        } finally {
            setFetching(false);
        }
    };

    const handleContentChange = (html: string) => {
        setFormData({ ...formData, contentHtml: html });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentUser) {
            alert("You must be logged in to edit articles");
            return;
        }

        if (!formData.contentHtml.trim() || formData.contentHtml === "") {
            alert("Content is required. Please add at least one content block.");
            return;
        }

        try {
            setLoading(true);
            const payload = {
                ...formData,
                authorId: currentUser.id,
            };

            await axios.put(`/api/article/${slug}`, payload);
            router.push("/dashboard/posts");
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                alert(err.response.data.message);
            } else {
                alert("Failed to update article");
            }
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="create-article-page">
                <div className="page-header">
                    <h1>Loading...</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="create-article-page">
            <div className="page-header">
                <h1>Edit Article</h1>
                <button className="btn-secondary" onClick={() => router.push("/dashboard/posts")}>
                    ← Back to Articles
                </button>
            </div>

            <form onSubmit={handleSubmit} className="article-form">
                <div className="form-section">
                    <div className="form-group">
                        <label>Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter article title..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Subtitle *</label>
                        <input
                            type="text"
                            value={formData.subTitle}
                            onChange={(e) => setFormData({ ...formData, subTitle: e.target.value })}
                            placeholder="Enter article subtitle..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Excerpt (Optional)</label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            rows={3}
                            placeholder="Short description of the article..."
                        />
                    </div>

                    <div className="form-group">
                        <label>Status *</label>
                        <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as ArticleStatus })} required>
                            <option value="DRAFT">Draft</option>
                            <option value="PUBLISHED">Published</option>
                            <option value="ARCHIVED">Archived</option>
                        </select>
                    </div>
                </div>

                <div className="form-section">
                    <div className="form-group">
                        <label>Content *</label>
                        <Tiptap onChange={handleContentChange} initialContent={formData.contentHtml} />
                    </div>
                </div>

                <div className="form-section">
                    <div className="form-group">
                        <label>References (Optional)</label>
                        <textarea
                            value={formData.references}
                            onChange={(e) => setFormData({ ...formData, references: e.target.value })}
                            rows={4}
                            placeholder="Add references or citations here... (one per line)"
                        />
                        <small className="form-hint">Add sources, citations, or references used in this article.</small>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={() => router.push("/dashboard/posts")} disabled={loading}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary" disabled={loading || !formData.contentHtml.trim()}>
                        {loading ? "Updating..." : "Update Article"}
                    </button>
                </div>
            </form>
        </div>
    );
}
