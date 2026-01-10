import { Metadata } from "next";
import { generateSEOMetadata, generateHrefLang } from "@/lib/seo/generateMetadata";

interface SolutionPageMetadataProps {
  locale: string;
  pathname?: string;
}

export function generateSolutionMetadata({
  locale,
  pathname = "/solutions",
}: SolutionPageMetadataProps): Metadata {
  const isIndonesian = locale === "id";

  const title = isIndonesian
    ? "Solusi Analitik - BioSystems Indonesia | Diagnostik In Vitro"
    : "Analytical Solutions - BioSystems Indonesia | In Vitro Diagnostics";

  const description = isIndonesian
    ? "Sejak 1981, BioSystems Indonesia mengembangkan solusi analitik untuk diagnostik in vitro (IVD). Produk unggulan: BA 400, BA 200, A15, BTS NEW, COAX analyzer."
    : "Since 1981, BioSystems Indonesia develops analytical solutions for in vitro diagnostics (IVD). Featured products: BA 400, BA 200, A15, BTS NEW, COAX analyzers.";

  const keywords = isIndonesian
    ? "solusi analitik, diagnostik in vitro, IVD, analyzer, BA 400, BA 200, A15, BTS NEW, COAX, laboratorium medis, peralatan laboratorium, BioSystems Indonesia"
    : "analytical solutions, in vitro diagnostics, IVD, analyzer, BA 400, BA 200, A15, BTS NEW, COAX, medical laboratory, laboratory equipment, BioSystems Indonesia";

  return generateSEOMetadata({
    title,
    description,
    locale,
    alternates: generateHrefLang(pathname),
    ...{
      keywords,
      openGraph: {
        title,
        description,
        locale,
        type: "website",
        siteName: "BioSystems Indonesia",
        images: [
          {
            url: "/assets/img/home/ba400-1.png",
            width: 800,
            height: 600,
            alt: "BA 400 Analyzer - BioSystems Indonesia",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/assets/img/home/ba400-1.png"],
      },
      other: {
        "application-name": "BioSystems Indonesia",
        "apple-mobile-web-app-title": "BioSystems Indonesia",
        "msapplication-TileColor": "#1976d2",
        "theme-color": "#1976d2",
      },
    },
  });
}

export const solutionPageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://biosystems.id/solutions",
      url: "https://biosystems.id/solutions",
      name: "Analytical Solutions - BioSystems Indonesia",
      description:
        "Since 1981, we have focused on developing analytical solutions for in vitro diagnostics (IVD) throughout the entire value chain.",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://biosystems.id",
        name: "BioSystems Indonesia",
        url: "https://biosystems.id",
      },
      inLanguage: ["en", "id"],
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://biosystems.id",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Solutions",
            item: "https://biosystems.id/solutions",
          },
        ],
      },
    },
    {
      "@type": "Organization",
      "@id": "https://biosystems.id/#organization",
      name: "BioSystems Indonesia",
      url: "https://biosystems.id",
      logo: {
        "@type": "ImageObject",
        url: "https://biosystems.id/assets/BioSystems-logo.png",
      },
      foundingDate: "1981",
      industry: "Medical Devices",
      areaServed: "Indonesia",
      knowsAbout: ["In Vitro Diagnostics", "Medical Laboratory Equipment", "Analytical Solutions"],
    },
  ],
};
