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
    const [uploadingHero, setUploadingHero] = useState(false);
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

    const handleHeroImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            return;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            return;
        }

        try {
            setUploadingHero(true);
            const formDataUpload = new FormData();
            formDataUpload.append("file", file);

            const response = await fetch("/api/article/upload-image", {
                method: "POST",
                body: formDataUpload,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Upload failed");
            }

            const data = await response.json();
            setFormData({ ...formData, heroImage: data.url });
        } catch (error) {
            console.error("Upload error:", error);
            alert(error instanceof Error ? error.message : "Failed to upload image");
        } finally {
            setUploadingHero(false);
            // clear input value if present
            try { (event.target as HTMLInputElement).value = ""; } catch {}
        }
    };

    const handleRemoveHeroImage = async () => {
        try {
            const response = await fetch(`/api/article/delete-image?url=${encodeURIComponent(formData.heroImage)}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                console.error("Failed to delete image from server");
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
        setFormData({ ...formData, heroImage: "" });
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
                        <label>Hero Image</label>
                        {formData.heroImage ? (
                            <div className="hero-image-preview">
                                <img src={formData.heroImage} alt="Hero" />
                                <button type="button" className="btn-remove-hero" onClick={handleRemoveHeroImage}>
                                    Remove Image
                                </button>
                            </div>
                        ) : (
                            <div className="hero-image-upload">
                                <label className="upload-label">
                                    {uploadingHero ? "Uploading..." : "Click to upload hero image"}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleHeroImageUpload}
                                        disabled={uploadingHero}
                                        style={{ display: "none" }}
                                    />
                                </label>
                            </div>
                        )}
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
