import { Metadata } from "next";
import { generateSEOMetadata, generateHrefLang } from "@/lib/seo/generateMetadata";

interface DashboardMetadataProps {
  locale: string;
}

export function generateDashboardMetadata({ locale }: DashboardMetadataProps): Metadata {
  const isIndonesian = locale === "id";

  const title = isIndonesian
    ? "Dashboard - BioSystems Indonesia"
    : "Dashboard - BioSystems Indonesia";

  const description = isIndonesian
    ? "Dashboard BioSystems Indonesia - Kelola akun dan akses fitur eksklusif Anda."
    : "BioSystems Indonesia Dashboard - Manage your account and access exclusive features.";

  return {
    ...generateSEOMetadata({
      title,
      description,
      locale,
      alternates: generateHrefLang("/dashboard"),
    }),
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}
