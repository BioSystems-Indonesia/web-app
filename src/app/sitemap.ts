import { MetadataRoute } from "next";
import { ArticleRepositoryPrisma } from "@/infrastructure/article/ArticleRepository";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://biosystems.id";
  const lastModified = new Date();

  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: "monthly" | "weekly";
    lastModified?: Date;
  }> = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/clinical-analysis", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/food-beverage-analysis", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/instrument", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/instrument/ba400", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/instrument/ba200", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/instrument/a15", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/instrument/bts", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/career", priority: 0.7, changeFrequency: "weekly" as const },
  ];

  // Articles
  let publishedArticles: { slug: string; updatedAt: Date; status: string }[] = [];

  try {
    const articleRepo = new ArticleRepositoryPrisma();
    const articles = await articleRepo.getAll();
    publishedArticles = articles.filter((a) => a.status === "PUBLISHED");
  } catch (err) {
    console.error("Failed to load articles for sitemap:", err);
  }

  const articleRoutes = publishedArticles.map((article) => ({
    path: `/article/${article.slug}`,
    priority: 0.8,
    changeFrequency: "weekly" as const,
    lastModified: new Date(article.updatedAt),
  }));

  const allRoutes = [...routes, ...articleRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}/id${route.path}`,
    lastModified: route.lastModified ?? lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,

    alternates: {
      languages: {
        "x-default": `${baseUrl}/id${route.path}`,
        id: `${baseUrl}/id${route.path}`,
        en: `${baseUrl}/en${route.path}`,
      },
    },
  }));
}
