import { Metadata } from "next";
import { generateSEOMetadata, generateHrefLang } from "@/lib/seo/generateMetadata";

interface CareerPageMetadataProps {
  locale: string;
}

export function generateCareerPageMetadata({ locale }: CareerPageMetadataProps): Metadata {
  const isIndonesian = locale === "id";

  const title = isIndonesian
    ? "Karir - Bergabung dengan Tim Kami | BioSystems Indonesia"
    : "Career Hub - Join Our Team | BioSystems Indonesia";

  const description = isIndonesian
    ? "Temukan peluang karir di BioSystems Indonesia. Bergabunglah dengan tim profesional di bidang analitik laboratorium dan diagnostik klinis. Kembangkan karir Anda bersama kami."
    : "Discover career opportunities at BioSystems Indonesia. Join our professional team in laboratory analytics and clinical diagnostics. Grow your career with us.";

  const keywords = isIndonesian
    ? "karir BioSystems Indonesia, lowongan kerja, peluang karir, marketing officer, product specialist, laboratorium, diagnostik"
    : "BioSystems Indonesia careers, job opportunities, career opportunities, marketing officer, product specialist, laboratory, diagnostics";

  return generateSEOMetadata({
    title,
    description,
    locale,
    alternates: generateHrefLang("/career"),
  });
}

export const careerPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  hiringOrganization: {
    "@type": "Organization",
    name: "BioSystems Indonesia",
    sameAs: "https://biosystems.id",
    logo: "https://biosystems.id/logo.png",
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
    },
  },
  employmentType: "FULL_TIME",
  industry: "Biotechnology",
};
