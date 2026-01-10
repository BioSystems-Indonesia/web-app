import { Metadata } from "next";

interface GenerateMetadataProps {
  title: string;
  description: string;
  locale: string;
  alternates?: {
    languages: {
      [key: string]: string;
    };
  };
  canonical?: string;
}

export function generateSEOMetadata({
  title,
  description,
  locale,
  alternates,
  canonical,
}: GenerateMetadataProps): Metadata {
  return {
    title,
    description,
    ...(canonical && {
      alternates: {
        ...alternates,
        canonical,
      },
    }),
    openGraph: {
      title,
      description,
      locale,
      type: "website",
      siteName: "BioSystems Indonesia",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateHrefLang(pathname: string) {
  return {
    languages: {
      en: `/en${pathname}`,
      id: `/id${pathname}`,
      "x-default": `/en${pathname}`,
    },
  };
}

export function generateCanonicalUrl(locale: string, pathname: string): string {
  const baseUrl = "https://biosystems.id";
  return `${baseUrl}/${locale}${pathname}`;
}
