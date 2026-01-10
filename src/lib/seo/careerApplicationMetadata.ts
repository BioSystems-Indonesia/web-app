import { Metadata } from "next";
import { generateSEOMetadata, generateHrefLang } from "@/lib/seo/generateMetadata";

interface CareerApplicationMetadataProps {
  locale: string;
  positionTitle?: string;
  positionLocation?: string;
}

export function generateCareerApplicationMetadata({
  locale,
  positionTitle,
  positionLocation,
}: CareerApplicationMetadataProps): Metadata {
  const isIndonesian = locale === "id";

  const title = positionTitle
    ? isIndonesian
      ? `Lamar ${positionTitle} - ${positionLocation || ""} | BioSystems Indonesia`
      : `Apply for ${positionTitle} - ${positionLocation || ""} | BioSystems Indonesia`
    : isIndonesian
      ? "Formulir Lamaran - BioSystems Indonesia"
      : "Application Form - BioSystems Indonesia";

  const description = positionTitle
    ? isIndonesian
      ? `Kirim lamaran Anda untuk posisi ${positionTitle} di ${positionLocation || "BioSystems Indonesia"}. Isi formulir dan bergabung dengan tim kami.`
      : `Submit your application for ${positionTitle} position at ${positionLocation || "BioSystems Indonesia"}. Fill out the form and join our team.`
    : isIndonesian
      ? "Isi formulir lamaran untuk bergabung dengan tim BioSystems Indonesia. Mulai karir Anda di bidang analitik laboratorium dan diagnostik klinis."
      : "Fill out the application form to join BioSystems Indonesia team. Start your career in laboratory analytics and clinical diagnostics.";

  return {
    ...generateSEOMetadata({
      title,
      description,
      locale,
      alternates: generateHrefLang("/career/application"),
    }),
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  };
}

export function generateCareerApplicationJsonLd(position?: {
  title: string;
  location: string;
  description: string;
  id: string;
}) {
  if (!position) return null;

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: position.title,
    description: position.description,
    identifier: {
      "@type": "PropertyValue",
      name: "BioSystems Indonesia",
      value: position.id,
    },
    datePosted: new Date().toISOString(),
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
        addressLocality: position.location,
        addressCountry: "ID",
      },
    },
    employmentType: "FULL_TIME",
    industry: "Biotechnology",
  };
}
