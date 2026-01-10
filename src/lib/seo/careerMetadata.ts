import { Metadata } from "next";
import { generateSEOMetadata, generateHrefLang } from "@/lib/seo/generateMetadata";

interface CareerMetadataProps {
  locale: string;
  pathname?: string;
}

export function generateCareerMetadata({
  locale,
  pathname = "/career",
}: CareerMetadataProps): Metadata {
  const isIndonesian = locale === "id";

  const title = isIndonesian
    ? "Karir - Bergabung dengan Tim BioSystems Indonesia"
    : "Career - Join BioSystems Indonesia Team";

  const description = isIndonesian
    ? "Temukan peluang karir Anda di BioSystems Indonesia. Bergabunglah dengan tim profesional dalam industri diagnostik in vitro dan solusi analitik. Kembangkan karir Anda bersama kami."
    : "Find your career opportunities at BioSystems Indonesia. Join our professional team in the in vitro diagnostics and analytical solutions industry. Grow your career with us.";

  const keywords = isIndonesian
    ? "karir BioSystems Indonesia, lowongan kerja, peluang karir, diagnostik in vitro, laboratorium medis, marketing officer, pekerjaan Bandung, karir biotechnology"
    : "BioSystems Indonesia career, job opportunities, career opportunities, in vitro diagnostics, medical laboratory, marketing officer, jobs in Bandung, biotechnology career";

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
            url: "/assets/img/career/hero.png",
            width: 1200,
            height: 630,
            alt: "Career Opportunities at BioSystems Indonesia",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/assets/img/career/hero.png"],
      },
    },
  });
}

export const careerPageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://biosystems.id/career#webpage",
      url: "https://biosystems.id/career",
      name: "Career Opportunities - BioSystems Indonesia",
      description:
        "Join our team of professionals in the in vitro diagnostics and analytical solutions industry.",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://biosystems.id/#website",
      },
      inLanguage: ["en", "id"],
    },
    {
      "@type": "Organization",
      "@id": "https://biosystems.id/#organization",
      name: "BioSystems Indonesia",
      url: "https://biosystems.id",
      logo: {
        "@type": "ImageObject",
        url: "https://biosystems.id/logo.png",
      },
      description: "Leading provider of analytical solutions for in vitro diagnostics since 1981",
      foundingDate: "1981",
      industry: "Biotechnology",
    },
  ],
};

export function generateJobPostingJsonLd(job: {
  title: string;
  location: string;
  description: string;
  qualifications: string[];
  id: string;
  datePosted?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "@id": `https://biosystems.id/career#job-${job.id}`,
    title: job.title,
    description: job.description,
    identifier: {
      "@type": "PropertyValue",
      name: "BioSystems Indonesia",
      value: job.id,
    },
    datePosted: job.datePosted || new Date().toISOString().split("T")[0],
    validThrough: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 90 days from now
    employmentType: "FULL_TIME",
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
        addressLocality: job.location.split(",")[0].trim(),
        addressRegion: job.location.split(",")[1]?.trim() || "Indonesia",
        addressCountry: "ID",
      },
    },
    qualifications: job.qualifications.join(", "),
  };
}
