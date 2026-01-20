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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://biosystems.id/#organization",
                "name": "BioSystems Indonesia",
                "url": "https://biosystems.id",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://biosystems.id/logo.png",
                  "width": 512,
                  "height": 512
                },
                "description": "Leading provider of analytical solutions for in vitro diagnostics since 1981",
                "foundingDate": "1981",
                "industry": "Biotechnology",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Jl. Kyai Caringin No. 18-A RT 10/RW 4. Cideng",
                  "addressLocality": "Jakarta Pusat",
                  "addressRegion": "DKI Jakarta",
                  "postalCode": "10150",
                  "addressCountry": "ID"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+62-817-887-060",
                  "contactType": "Customer Service",
                  "availableLanguage": ["en", "id"]
                },
                "sameAs": [
                  "https://linkedin.com/company/biosystemsid",
                  "https://instagram.com/biosystems.ind",
                  "https://youtube.com/@biosystemsindonesia"
                ]
              },
              {
                "@type": "WebSite",
                "@id": "https://biosystems.id/#website",
                "url": "https://biosystems.id",
                "name": "BioSystems Indonesia",
                "publisher": {
                  "@id": "https://biosystems.id/#organization"
                },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://biosystems.id/search?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                },
                "inLanguage": ["en", "id"]
              },
              {
                "@type": "VideoObject",
                "@id": "https://biosystems.id/#inside-our-lab-video",
                "name": "Inside BioSystems Indonesia Laboratory",
                "description": "Virtual tour of our state-of-the-art laboratory facilities showcasing clinical and analytical excellence",
                "thumbnailUrl": "https://biosystems.id/lab-thumbnail.jpg",
                "uploadDate": "2024-01-01",
                "contentUrl": "https://biosystems.id/inside-our-lab.mp4",
                "embedUrl": "https://biosystems.id/inside-our-lab.mp4",
                "publisher": {
                  "@id": "https://biosystems.id/#organization"
                }
              }
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
