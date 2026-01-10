"use client";

import { useState, useEffect } from "react";
import { ArticleStatus } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import "./page.css";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  username: string;
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

export default function PostsPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [viewingArticle, setViewingArticle] = useState<Article | null>(null);
  const [filterStatus, setFilterStatus] = useState<ArticleStatus | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success">("error");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/article");
      setArticles(response.data.data || []);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to fetch articles");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    setDeleteSlug(slug);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteSlug) return;

    try {
      await axios.delete(`/api/article/${deleteSlug}`);
      setShowDeleteModal(false);
      setDeleteSlug(null);
      await fetchArticles();
      setMessageContent("Article deleted successfully");
      setMessageType("success");
      setShowMessageModal(true);
    } catch (err) {
      setShowDeleteModal(false);
      setDeleteSlug(null);
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setMessageContent(err.response.data.message);
      } else {
        setMessageContent("Failed to delete article");
      }
      setMessageType("error");
      setShowMessageModal(true);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteSlug(null);
  };

  const handleStatusChange = async (slug: string, status: ArticleStatus) => {
    try {
      await axios.patch(`/api/article/${slug}/status`, { status });
      await fetchArticles();
      setMessageContent("Article status updated successfully");
      setMessageType("success");
      setShowMessageModal(true);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setMessageContent(err.response.data.message);
      } else {
        setMessageContent("Failed to update article status");
      }
      setMessageType("error");
      setShowMessageModal(true);
    }
  };

  const openDetailModal = (article: Article) => {
    setViewingArticle(article);
    setShowDetailModal(true);
    setIsClosing(false);
  };

  const closeDetailModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowDetailModal(false);
      setIsClosing(false);
      setViewingArticle(null);
    }, 300);
  };

  const filteredArticles = articles.filter((article) => {
    const matchesStatus = filterStatus === "ALL" || article.status === filterStatus;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.subTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: ArticleStatus) => {
    const colors = {
      DRAFT: "#6c757d",
      PUBLISHED: "#28a745",
      ARCHIVED: "#ffc107",
    };
    return colors[status] || "#6c757d";
  };

  return (
    <div className="articles-page">
      <div className="page-header">
        <h1>Articles</h1>
        <div className="header-actions">
          <button className="btn-primary" onClick={() => router.push("/dashboard/posts/create")}>
            + Create Article
          </button>
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as ArticleStatus | "ALL")} className="filter-select">
            <option value="ALL">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      {loading && <div className="loading">Loading articles...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Subtitle</th>
                <th>Author</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="no-data">
                    No articles found
                  </td>
                </tr>
              ) : (
                filteredArticles.map((article) => (
                  <tr key={article.id}>
                    <td className="article-title">{article.title}</td>
                    <td>{article.subTitle}</td>
                    <td>{article.author.name}</td>
                    <td>
                      <span className="status-badge" style={{ backgroundColor: getStatusBadge(article.status) }}>
                        {article.status}
                      </span>
                    </td>
                    <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                    <td className="actions">
                      <a className="btn-view" href={`/${locale}/article/${article.slug}`}>
                        View
                      </a>
                      <button className="btn-edit" onClick={() => router.push(`/dashboard/posts/${article.slug}/edit`)}>
                        Edit
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(article.slug)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && viewingArticle && (
        <div className={`modal-overlay ${isClosing ? "closing" : ""}`} onClick={closeDetailModal}>
          <div className={`modal modal-large ${isClosing ? "closing" : ""}`} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Article Details</h2>
              <button className="close-btn" onClick={closeDetailModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <strong>Title:</strong>
                <span>{viewingArticle.title}</span>
              </div>
              <div className="detail-row">
                <strong>Subtitle:</strong>
                <span>{viewingArticle.subTitle}</span>
              </div>
              <div className="detail-row">
                <strong>Slug:</strong>
                <span>{viewingArticle.slug}</span>
              </div>
              <div className="detail-row">
                <strong>Author:</strong>
                <span>{viewingArticle.author.name} ({viewingArticle.author.email})</span>
              </div>
              <div className="detail-row">
                <strong>Status:</strong>
                <span className="status-badge" style={{ backgroundColor: getStatusBadge(viewingArticle.status) }}>
                  {viewingArticle.status}
                </span>
              </div>
              {viewingArticle.excerpt && (
                <div className="detail-row">
                  <strong>Excerpt:</strong>
                  <span>{viewingArticle.excerpt}</span>
                </div>
              )}
              <div className="detail-row">
                <strong>Created:</strong>
                <span>{new Date(viewingArticle.createdAt).toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <strong>Updated:</strong>
                <span>{new Date(viewingArticle.updatedAt).toLocaleString()}</span>
              </div>
              <div className="detail-content">
                <strong>Content:</strong>
                <div className="content-preview" dangerouslySetInnerHTML={{ __html: viewingArticle.contentHtml }} />
              </div>
            </div>
            <div className="modal-footer">
              <div className="status-actions">
                <label>Change Status:</label>
                <select
                  value={viewingArticle.status}
                  onChange={(e) => {
                    handleStatusChange(viewingArticle.slug, e.target.value as ArticleStatus);
                    closeDetailModal();
                  }}
                  className="status-select"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
              <button className="btn-secondary" onClick={closeDetailModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={cancelDelete}>
          <div className="modal modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button className="close-btn" onClick={cancelDelete}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this article? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="btn-danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && (
        <div className="modal-overlay" onClick={() => setShowMessageModal(false)}>
          <div className="modal modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{messageType === "error" ? "Error" : "Success"}</h2>
              <button className="close-btn" onClick={() => setShowMessageModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className={messageType === "error" ? "text-error" : "text-success"}>{messageContent}</p>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowMessageModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
