import "./page.css";
import { generateSEOMetadata, generateHrefLang } from "@/lib/seo/generateMetadata";
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import Header from "@/presentation/components/header/header";
import HeroSection from "@/presentation/home/hero/HeroSection";
import SolutionSection from "@/presentation/home/solutions/SolutionSection";
import WhyChooseUseSection from "@/presentation/home/whyChooseUs/WhyChooseUsSection";
import InsideOurLab from "@/presentation/home/insideOurLab/InsideOurLab";
import ClincalAnalysisSection from "@/presentation/home/clinicalAnalysis/ClincalAnalysis";
import DistributionSection from "@/presentation/home/distribution/DistributionSection";
import NewsSection from "@/presentation/home/news/NewsSection";
import CTASection from "@/presentation/home/cta/CTASection";
import Footer from "@/presentation/components/footer/footer";

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
  await params;
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
        <WhyChooseUseSection />
        <InsideOurLab />
        <ClincalAnalysisSection variant="home" />
        <DistributionSection />
        <NewsSection />
        <CTASection iconColor="#ee2737" />
        <Footer bgColor="#ee2737" />
      </div>
    </>
  );
}
