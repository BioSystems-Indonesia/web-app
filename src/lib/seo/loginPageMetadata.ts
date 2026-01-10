import { Metadata } from "next";
import { generateSEOMetadata, generateHrefLang } from "@/lib/seo/generateMetadata";

interface LoginPageMetadataProps {
  locale: string;
}

export function generateLoginPageMetadata({ locale }: LoginPageMetadataProps): Metadata {
  const isIndonesian = locale === "id";

  const title = isIndonesian ? "Login - BioSystems Indonesia" : "Login - BioSystems Indonesia";

  const description = isIndonesian
    ? "Masuk ke akun BioSystems Indonesia Anda untuk mengakses dashboard dan fitur eksklusif."
    : "Sign in to your BioSystems Indonesia account to access dashboard and exclusive features.";

  return {
    ...generateSEOMetadata({
      title,
      description,
      locale,
      alternates: generateHrefLang("/login"),
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
