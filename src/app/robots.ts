import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/", "/login/", "/_next/"],
    },
    sitemap: "https://biosystems.id/sitemap.xml",
  };
}
