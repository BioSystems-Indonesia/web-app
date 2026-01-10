import { MetadataRoute } from "next";
import { ArticleRepositoryPrisma } from "@/infrastructure/article/ArticleRepository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://biosystems.id";
  const lastModified = new Date();

  const routes = [
    { path: "", priority: 1, changeFrequency: "monthly" as const, lastModified: undefined },
    {
      path: "/clinical-analysis",
      priority: 0.9,
      changeFrequency: "weekly" as const,
      lastModified: undefined,
    },
    {
      path: "/food-beverage-analysis",
      priority: 0.9,
      changeFrequency: "weekly" as const,
      lastModified: undefined,
    },
    {
      path: "/instrument",
      priority: 0.8,
      changeFrequency: "weekly" as const,
      lastModified: undefined,
    },
    {
      path: "/instrument/ba400",
      priority: 0.8,
      changeFrequency: "weekly" as const,
      lastModified: undefined,
    },
    {
      path: "/instrument/ba200",
      priority: 0.8,
      changeFrequency: "weekly" as const,
      lastModified: undefined,
    },
    {
      path: "/instrument/a15",
      priority: 0.8,
      changeFrequency: "weekly" as const,
      lastModified: undefined,
    },
    {
      path: "/instrument/bts",
      priority: 0.8,
      changeFrequency: "weekly" as const,
      lastModified: undefined,
    },
    { path: "/career", priority: 0.7, changeFrequency: "weekly" as const, lastModified: undefined },
  ];

  // Fetch all published articles
  const articleRepo = new ArticleRepositoryPrisma();
  const articles = await articleRepo.getAll();
  const publishedArticles = articles.filter((article) => article.status === "PUBLISHED");

  // Generate article routes
  const articleRoutes = publishedArticles.map((article) => ({
    path: `/article/${article.slug}`,
    priority: 0.8,
    changeFrequency: "weekly" as const,
    lastModified: new Date(article.updatedAt),
  }));

  // Combine all routes
  const allRoutes = [...routes, ...articleRoutes];

  return allRoutes.flatMap((route) => [
    {
      url: `${baseUrl}/en${route.path}`,
      lastModified: route.lastModified || lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          en: `${baseUrl}/en${route.path}`,
          id: `${baseUrl}/id${route.path}`,
        },
      },
    },
    {
      url: `${baseUrl}/id${route.path}`,
      lastModified: route.lastModified || lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          en: `${baseUrl}/en${route.path}`,
          id: `${baseUrl}/id${route.path}`,
        },
      },
    },
  ]);
}
