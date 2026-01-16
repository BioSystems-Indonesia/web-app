import { Article } from "@/domain/entities/Article";
import { User } from "@/domain/entities/User";
import { ArticleRepository } from "@/domain/repositories/ArticleRepository";
import { ArticleStatus, UserRole, Prisma } from "@prisma/client";
import { prisma } from "../prisma/PrismaClient";
import { NotFoundError } from "@/lib/http/error";

export class ArticleRepositoryPrisma implements ArticleRepository {
  private mapToArticle(
    articlePrisma: Prisma.ArticleGetPayload<{
      include: { author: { include: { role: true; auth: true } } };
    }>
  ): Article {
    return new Article(
      articlePrisma.id,
      articlePrisma.author.id,
      articlePrisma.title,
      articlePrisma.subTitle,
      articlePrisma.slug,
      articlePrisma.excerpt ?? "",
      articlePrisma.heroImage ?? null,
      new User(
        articlePrisma.author.id,
        articlePrisma.author.email,
        articlePrisma.author.name,
        articlePrisma.author.role?.name ?? UserRole.ADMIN,
        articlePrisma.author.auth?.username ?? "",
        articlePrisma.author.createdAt,
        articlePrisma.author.updatedAt
      ),
      articlePrisma.contentHtml,
      articlePrisma.references ?? null,
      articlePrisma.status,
      articlePrisma.createdAt,
      articlePrisma.updatedAt
    );
  }

  async getAllPublished(): Promise<Article[]> {
    const articles = await prisma.article.findMany({
      where: {
        deletedAt: null,
        status: ArticleStatus.PUBLISHED,
      },
      include: {
        author: {
          include: {
            role: true,
            auth: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return articles.map((article) => this.mapToArticle(article));
  }

  async getFourArticle(): Promise<Article[]> {
    const articles = await prisma.article.findMany({
      where: {
        deletedAt: null,
        status: ArticleStatus.PUBLISHED,
      },
      include: {
        author: {
          include: {
            role: true,
            auth: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
    });

    return articles.map((article) => this.mapToArticle(article));
  }

  async create(article: Article): Promise<Article> {
    const count = await prisma.article.count({
      where: {
        slug: article.slug,
        deletedAt: null,
      },
    });

    if (count > 0) {
      throw new NotFoundError("Article with this slug already exists");
    }

    const articlePrisma = await prisma.article.create({
      data: {
        title: article.title,
        subTitle: article.subTitle,
        slug: article.slug,
        author: {
          connect: { id: article.authorId },
        },
        status: article.status,
        excerpt: article.excerpt,
        heroImage: article.heroImage,
        contentHtml: article.contentHtml,
        references: article.references,
      },
      include: {
        author: {
          include: {
            role: true,
            auth: true,
          },
        },
      },
    });

    return this.mapToArticle(articlePrisma);
  }
  async getBySlug(slug: string): Promise<Article> {
    const articlePrisma = await prisma.article.findFirst({
      where: {
        slug: slug,
        status: ArticleStatus.PUBLISHED,
        deletedAt: null,
      },
      include: {
        author: {
          include: {
            role: true,
            auth: true,
          },
        },
      },
    });

    if (!articlePrisma) {
      throw new NotFoundError(`Article with slug '${slug}' not found`);
    }

    return this.mapToArticle(articlePrisma);
  }
  async getBySlugAdmin(slug: string): Promise<Article> {
    const articlePrisma = await prisma.article.findFirst({
      where: {
        slug: slug,
        deletedAt: null,
      },
      include: {
        author: {
          include: {
            role: true,
            auth: true,
          },
        },
      },
    });

    if (!articlePrisma) {
      throw new NotFoundError(`Article with slug '${slug}' not found`);
    }

    return this.mapToArticle(articlePrisma);
  }
  async getAll(): Promise<Article[]> {
    const articles = await prisma.article.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        author: {
          include: {
            role: true,
            auth: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return articles.map((article) => this.mapToArticle(article));
  }
  async update(slug: string, article: Article): Promise<Article> {
    const existingArticle = await prisma.article.findFirst({
      where: {
        slug: slug,
        deletedAt: null,
      },
    });

    if (!existingArticle) {
      throw new NotFoundError(`Article with slug '${slug}' not found`);
    }

    if (slug !== article.slug) {
      const slugExists = await prisma.article.count({
        where: {
          slug: article.slug,
          deletedAt: null,
          NOT: {
            id: existingArticle.id,
          },
        },
      });

      if (slugExists > 0) {
        throw new NotFoundError("Article with this slug already exists");
      }
    }

    const updatedArticle = await prisma.article.update({
      where: {
        id: existingArticle.id,
      },
      data: {
        title: article.title,
        subTitle: article.subTitle,
        slug: article.slug,
        excerpt: article.excerpt,
        heroImage: article.heroImage,
        contentHtml: article.contentHtml,
        references: article.references,
      },
      include: {
        author: {
          include: {
            role: true,
            auth: true,
          },
        },
      },
    });

    return this.mapToArticle(updatedArticle);
  }
  async updateStatus(slug: string, status: ArticleStatus): Promise<Article> {
    const existingArticle = await prisma.article.findFirst({
      where: {
        slug: slug,
        deletedAt: null,
      },
    });

    if (!existingArticle) {
      throw new NotFoundError(`Article with slug '${slug}' not found`);
    }

    const updatedArticle = await prisma.article.update({
      where: {
        id: existingArticle.id,
      },
      data: {
        status: status,
      },
      include: {
        author: {
          include: {
            role: true,
            auth: true,
          },
        },
      },
    });

    return this.mapToArticle(updatedArticle);
  }
  async delete(slug: string): Promise<void> {
    const existingArticle = await prisma.article.findFirst({
      where: {
        slug: slug,
        deletedAt: null,
      },
    });

    if (!existingArticle) {
      throw new NotFoundError(`Article with slug '${slug}' not found`);
    }

    await prisma.article.update({
      where: {
        id: existingArticle.id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
