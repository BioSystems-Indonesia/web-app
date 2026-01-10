import { ArticleStatus } from "@prisma/client";
import { Article } from "../entities/Article";

export interface ArticleRepository {
  create(article: Article): Promise<Article>;
  getBySlug(slug: string): Promise<Article>;
  getAll(): Promise<Article[]>;
  update(slug: string, article: Article): Promise<Article>;
  updateStatus(slug: string, status: ArticleStatus): Promise<Article>;
  delete(slug: string): Promise<void>;
}
