import { ArticleRequest } from "@/domain/dto/Article";
import { Article } from "@/domain/entities/Article";
import { ArticleRepository } from "@/domain/repositories/ArticleRepository";
import { ValidationError } from "@/lib/http/error";
import { ArticleStatus } from "@prisma/client";

export class ArticleUseCase {
  constructor(private readonly repo: ArticleRepository) {}

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  private generateExcerpt(contentHtml: string, maxLength: number = 200): string {
    const text = contentHtml.replace(/<[^>]*>/g, "");

    if (text.length <= maxLength) {
      return text;
    }

    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");

    return lastSpace > 0 ? truncated.substring(0, lastSpace) + "..." : truncated + "...";
  }

  async create(req: ArticleRequest) {
    if (!req.title?.trim()) {
      throw new ValidationError("Title is required");
    }

    if (!req.subTitle?.trim()) {
      throw new ValidationError("Subtitle is required");
    }

    if (!req.authorId?.trim()) {
      throw new ValidationError("Author ID is required");
    }

    if (!req.contentHtml?.trim()) {
      throw new ValidationError("Content is required");
    }

    if (!req.status?.trim()) {
      throw new ValidationError("Status is required");
    }

    const validStatuses = Object.values(ArticleStatus);
    if (!validStatuses.includes(req.status as ArticleStatus)) {
      throw new ValidationError(`Invalid status. Must be one of: ${validStatuses.join(", ")}`);
    }

    const slug = this.generateSlug(req.title);
    const excerpt = this.generateExcerpt(req.contentHtml);
    const article = new Article(
      "",
      req.authorId,
      req.title,
      req.subTitle,
      slug,
      excerpt,
      req.heroImage ?? null,
      {} as any,
      req.contentHtml,
      req.references ?? null,
      req.status as ArticleStatus,
      new Date(),
      new Date()
    );

    return await this.repo.create(article);
  }

  async getBySlug(slug: string) {
    if (!slug?.trim()) {
      throw new ValidationError("Slug is required");
    }

    return await this.repo.getBySlug(slug);
  }

  async getAll() {
    return await this.repo.getAll();
  }

  async update(slug: string, req: ArticleRequest) {
    if (!slug?.trim()) {
      throw new ValidationError("Slug is required");
    }

    if (!req.title?.trim()) {
      throw new ValidationError("Title is required");
    }

    if (!req.subTitle?.trim()) {
      throw new ValidationError("Subtitle is required");
    }

    if (!req.contentHtml?.trim()) {
      throw new ValidationError("Content is required");
    }

    const newSlug = this.generateSlug(req.title);
    const excerpt = this.generateExcerpt(req.contentHtml);
    const article = new Article(
      "",
      req.authorId,
      req.title,
      req.subTitle,
      newSlug,
      excerpt,
      req.heroImage ?? null,
      {} as any,
      req.contentHtml,
      req.references ?? null,
      req.status as ArticleStatus,
      new Date(),
      new Date()
    );

    return await this.repo.update(slug, article);
  }

  async updateStatus(slug: string, status: ArticleStatus) {
    if (!slug?.trim()) {
      throw new ValidationError("Slug is required");
    }

    if (!status) {
      throw new ValidationError("Status is required");
    }

    const validStatuses = Object.values(ArticleStatus);
    if (!validStatuses.includes(status)) {
      throw new ValidationError(`Invalid status. Must be one of: ${validStatuses.join(", ")}`);
    }

    return await this.repo.updateStatus(slug, status);
  }

  async delete(slug: string) {
    if (!slug?.trim()) {
      throw new ValidationError("Slug is required");
    }

    return await this.repo.delete(slug);
  }
}
