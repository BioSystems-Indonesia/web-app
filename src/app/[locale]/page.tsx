import SolutionSection from "@/presentation/components/solutions/SolutionSection";
import "./page.css";
import HeroSection from "@/presentation/components/hero/HeroSection";
import { generateSEOMetadata, generateHrefLang } from "@/lib/seo/generateMetadata";
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Header from "@/presentation/components/header/header";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return generateSEOMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    alternates: generateHrefLang('/')
  });
}

export default async function Home({ params }: PageProps) {
  await params; // Consume params to avoid unused parameter warning

  return (
    <>
      {/* Structured Data for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "BioSystems Indonesia",
            "url": "https://biosystems-indonesia.com",
            "logo": "https://biosystems-indonesia.com/logo.png",
            "description": "Leading provider of analytical solutions for in vitro diagnostics since 1981",
            "foundingDate": "1981",
            "industry": "Biotechnology",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "ID"
            },
            "sameAs": [
              "https://linkedin.com/company/biosystems-indonesia",
              "https://facebook.com/biosystems-indonesia"
            ]
          })
        }}
      />

      <div className="home">
        <Header />

        <HeroSection />
        <SolutionSection />
      </div>
    </>
  );
}
