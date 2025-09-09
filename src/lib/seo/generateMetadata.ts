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
}

export function generateSEOMetadata({
  title,
  description,
  locale,
  alternates,
}: GenerateMetadataProps): Metadata {
  return {
    title,
    description,
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
