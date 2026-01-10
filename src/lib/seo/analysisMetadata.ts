import { Metadata } from "next";
import { generateSEOMetadata, generateHrefLang } from "@/lib/seo/generateMetadata";

interface AnalysisMetadataProps {
  locale: string;
  analysisType: "clinical" | "food-beverage";
  pathname: string;
}

export function generateAnalysisMetadata({
  locale,
  analysisType,
  pathname,
}: AnalysisMetadataProps): Metadata {
  const isIndonesian = locale === "id";

  const titles = {
    clinical: {
      en: "Clinical Analysis Solutions - Laboratory Diagnostics | BioSystems Indonesia",
      id: "Solusi Analisis Klinis - Diagnostik Laboratorium | BioSystems Indonesia",
    },
    "food-beverage": {
      en: "Food & Beverage Analysis - Quality Control Solutions | BioSystems Indonesia",
      id: "Analisis Makanan & Minuman - Solusi Kontrol Kualitas | BioSystems Indonesia",
    },
  };

  const descriptions = {
    clinical: {
      en: "Comprehensive clinical chemistry analysis solutions for accurate diagnostics. Advanced analyzers and reagents for medical laboratories. Trusted by healthcare professionals since 1981.",
      id: "Solusi analisis kimia klinis komprehensif untuk diagnostik akurat. Analyzer dan reagen canggih untuk laboratorium medis. Dipercaya oleh profesional kesehatan sejak 1981.",
    },
    "food-beverage": {
      en: "Advanced food and beverage analysis solutions for quality control and safety testing. Ensure product quality with BioSystems analytical instruments and expertise.",
      id: "Solusi analisis makanan dan minuman canggih untuk kontrol kualitas dan pengujian keamanan. Pastikan kualitas produk dengan instrumen analitik dan keahlian BioSystems.",
    },
  };

  const keywords = {
    clinical: {
      en: "clinical analysis, clinical chemistry, laboratory diagnostics, medical laboratory, IVD, in vitro diagnostics, clinical analyzer, BioSystems Indonesia, healthcare",
      id: "analisis klinis, kimia klinis, diagnostik laboratorium, laboratorium medis, IVD, diagnostik in vitro, analyzer klinis, BioSystems Indonesia, kesehatan",
    },
    "food-beverage": {
      en: "food analysis, beverage analysis, quality control, food safety, analytical testing, food laboratory, BioSystems Indonesia, quality assurance",
      id: "analisis makanan, analisis minuman, kontrol kualitas, keamanan pangan, pengujian analitik, laboratorium makanan, BioSystems Indonesia, jaminan kualitas",
    },
  };

  const title = isIndonesian ? titles[analysisType].id : titles[analysisType].en;
  const description = isIndonesian ? descriptions[analysisType].id : descriptions[analysisType].en;
  const keyword = isIndonesian ? keywords[analysisType].id : keywords[analysisType].en;

  const imageUrl =
    analysisType === "clinical"
      ? "/assets/img/clinical-analysis/hero.png"
      : "/assets/img/food-beverage-analysis/hero.png";

  return generateSEOMetadata({
    title,
    description,
    locale,
    alternates: generateHrefLang(pathname),
    ...{
      keywords: keyword,
      openGraph: {
        title,
        description,
        locale,
        type: "website",
        siteName: "BioSystems Indonesia",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    },
  });
}

export function generateAnalysisJsonLd(analysisType: "clinical" | "food-beverage", url: string) {
  const schemas = {
    clinical: {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "@id": `${url}#medical-business`,
      name: "BioSystems Indonesia Clinical Analysis Solutions",
      description:
        "Comprehensive clinical chemistry analysis solutions for accurate diagnostics and medical laboratory services.",
      url: url,
      serviceType: "Clinical Laboratory Services",
      areaServed: "Indonesia",
      provider: {
        "@type": "Organization",
        name: "BioSystems Indonesia",
        url: "https://biosystems.id",
      },
    },
    "food-beverage": {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: "BioSystems Indonesia Food & Beverage Analysis",
      description:
        "Advanced food and beverage analysis solutions for quality control and safety testing.",
      url: url,
      serviceType: "Food Quality Testing Services",
      areaServed: "Indonesia",
      provider: {
        "@type": "Organization",
        name: "BioSystems Indonesia",
        url: "https://biosystems.id",
      },
    },
  };

  return schemas[analysisType];
}
