import { Metadata } from "next";
import { generateSEOMetadata, generateHrefLang } from "@/lib/seo/generateMetadata";

interface InstrumentMetadataProps {
  locale: string;
  instrumentName: string;
  instrumentCode: string;
  description: string;
  pathname: string;
  features?: string[];
  imageUrl?: string;
}

export function generateInstrumentMetadata({
  locale,
  instrumentName,
  instrumentCode,
  description,
  pathname,
  features = [],
  imageUrl = "/assets/img/instrument/default.png",
}: InstrumentMetadataProps): Metadata {
  const isIndonesian = locale === "id";

  const title = isIndonesian
    ? `${instrumentName} - Analyzer Klinis | BioSystems Indonesia`
    : `${instrumentName} - Clinical Analyzer | BioSystems Indonesia`;

  const fullDescription = isIndonesian
    ? `${description} Kode produk: ${instrumentCode}. Solusi analitik terpercaya dari BioSystems Indonesia sejak 1981.`
    : `${description} Product code: ${instrumentCode}. Trusted analytical solution from BioSystems Indonesia since 1981.`;

  const keywords = isIndonesian
    ? `${instrumentName}, ${instrumentCode}, analyzer klinis, clinical chemistry analyzer, diagnostik in vitro, IVD, peralatan laboratorium, BioSystems Indonesia, ${features.join(", ")}`
    : `${instrumentName}, ${instrumentCode}, clinical analyzer, clinical chemistry analyzer, in vitro diagnostics, IVD, laboratory equipment, BioSystems Indonesia, ${features.join(", ")}`;

  return generateSEOMetadata({
    title,
    description: fullDescription,
    locale,
    alternates: generateHrefLang(pathname),
    ...{
      keywords,
      openGraph: {
        title,
        description: fullDescription,
        locale,
        type: "website",
        siteName: "BioSystems Indonesia",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: `${instrumentName} - BioSystems Indonesia`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: fullDescription,
        images: [imageUrl],
      },
    },
  });
}

export function generateInstrumentJsonLd({
  instrumentName,
  instrumentCode,
  description,
  url,
  imageUrl,
  features = [],
  specifications = {},
}: {
  instrumentName: string;
  instrumentCode: string;
  description: string;
  url: string;
  imageUrl?: string;
  features?: string[];
  specifications?: Record<string, string>;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${url}#product`,
        name: instrumentName,
        description,
        sku: instrumentCode,
        url,
        image: imageUrl ? [imageUrl] : undefined,
        category: "Medical Laboratory Equipment",

        brand: {
          "@type": "Brand",
          name: "BioSystems",
        },

        manufacturer: {
          "@type": "Organization",
          name: "BioSystems",
          url: "https://biosystems.id",
        },

        offers: {
          "@type": "Offer",
          url,
          priceCurrency: "IDR",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
        },

        additionalProperty: [
          ...Object.entries(specifications).map(([name, value]) => ({
            "@type": "PropertyValue",
            name,
            value,
          })),
          ...features.map((feature) => ({
            "@type": "PropertyValue",
            name: "Feature",
            value: feature,
          })),
        ],
      },

      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://biosystems.id",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Instruments",
            item: "https://biosystems.id/instrument",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: instrumentName,
            item: url,
          },
        ],
      },

      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${instrumentName} – Clinical Analyzer`,
        description,
        inLanguage: ["id", "en"],
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://biosystems.id/#website",
        },
        breadcrumb: {
          "@id": `${url}#breadcrumb`,
        },
        mainEntity: {
          "@id": `${url}#product`,
        },
      },
    ],
  };
}

export function generateInstrumentListingMetadata({
  locale,
  pathname = "/instrument",
}: {
  locale: string;
  pathname?: string;
}): Metadata {
  const isIndonesian = locale === "id";

  const title = isIndonesian
    ? "Instrument Analyzer - BioSystems Indonesia | BA400, BA200, A15, BTS"
    : "Analyzer Instruments - BioSystems Indonesia | BA400, BA200, A15, BTS";

  const description = isIndonesian
    ? "Jelajahi rangkaian lengkap analyzer kimia klinis dari BioSystems Indonesia: BA400, BA200, A15, dan BTS. Solusi analitik terpercaya untuk laboratorium modern sejak 1981."
    : "Explore the complete range of clinical chemistry analyzers from BioSystems Indonesia: BA400, BA200, A15, and BTS. Trusted analytical solutions for modern laboratories since 1981.";

  const keywords = isIndonesian
    ? "analyzer, clinical chemistry analyzer, BA400, BA200, A15, BTS, diagnostik in vitro, IVD, peralatan laboratorium, BioSystems Indonesia, analyzer otomatis, laboratorium medis"
    : "analyzer, clinical chemistry analyzer, BA400, BA200, A15, BTS, in vitro diagnostics, IVD, laboratory equipment, BioSystems Indonesia, automatic analyzer, medical laboratory";

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
            url: "/assets/img/instrument/ba400/1.png",
            width: 1200,
            height: 630,
            alt: "BioSystems Analyzers - BioSystems Indonesia",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/assets/img/instrument/ba400/1.png"],
      },
    },
  });
}

export function generateInstrumentListingJsonLd(locale: string) {
  const isIndonesian = locale === "id";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://biosystems.id/instrument#webpage",
        url: "https://biosystems.id/instrument",
        name: isIndonesian
          ? "Instrument Analyzer - BioSystems Indonesia"
          : "Analyzer Instruments - BioSystems Indonesia",
        description: isIndonesian
          ? "Rangkaian lengkap analyzer kimia klinis dari BioSystems Indonesia"
          : "Complete range of clinical chemistry analyzers from BioSystems Indonesia",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://biosystems.id/",
        },
        about: {
          "@type": "Thing",
          name: isIndonesian ? "Analyzer Klinis" : "Clinical Analyzers",
        },
        mainEntity: {
          "@type": "ItemList",
          "@id": "https://biosystems.id/instrument#analyzers",
          name: isIndonesian ? "Analyzer BioSystems" : "BioSystems Analyzers",
          numberOfItems: 4,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "Product",
                "@id": "https://biosystems.id/instrument/ba400#product",
                name: "BioSystems BA400",
                url: "https://biosystems.id/instrument/ba400",
                description: isIndonesian
                  ? "BA400 adalah penganalisis otomatis penuh dengan hemolisis otomatis pada sampel darah lengkap dan pemuatan sampel yang cepat."
                  : "BA400 is a full automatic analyzer with automatic hemolysis on whole blood samples and fast sample loading.",
                brand: {
                  "@type": "Brand",
                  name: "BioSystems",
                },
                category: "Medical Laboratory Equipment",
                image: "https://biosystems.id/instrument/images/ba400.png",
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@type": "Product",
                "@id": "https://biosystems.id/instrument/ba200#product",
                name: "BioSystems BA200",
                url: "https://biosystems.id/instrument/ba200",
                description: isIndonesian
                  ? "BA200 adalah penganalisis otomatis penuh dengan kapasitas reagen dan sampel yang tinggi (88 posisi), tingkat fleksibilitas tertinggi."
                  : "BA200 is a full automatic analyzer with high reagent and sample capacity (88 position), the highest grade in flexibility.",
                brand: {
                  "@type": "Brand",
                  name: "BioSystems",
                },
                category: "Medical Laboratory Equipment",
                image: "https://biosystems.id/instrument/images/ba200.png",
              },
            },
            {
              "@type": "ListItem",
              position: 3,
              item: {
                "@type": "Product",
                "@id": "https://biosystems.id/instrument/a15#product",
                name: "BioSystems A15",
                url: "https://biosystems.id/instrument/a15",
                description: isIndonesian
                  ? "A15 adalah penganalisis berukuran kecil dan tidak menuntut yang memfasilitasi otomatisasi tes, mengurangi waktu kerja dan meningkatkan efisiensi laboratorium."
                  : "A15 is a small size and low demanding analyzer that facilitates automation of tests, reducing work time and improving laboratory efficiency.",
                brand: {
                  "@type": "Brand",
                  name: "BioSystems",
                },
                category: "Medical Laboratory Equipment",
                image: "https://biosystems.id/instrument/images/a15.png",
              },
            },
            {
              "@type": "ListItem",
              position: 4,
              item: {
                "@type": "Product",
                "@id": "https://biosystems.id/instrument/bts#product",
                name: "BioSystems BTS",
                url: "https://biosystems.id/instrument/bts",
                description: isIndonesian
                  ? "BTS adalah penganalisis manual dengan sistem optik LED dan perangkat lunak baru yang intuitif dan mudah digunakan yang akan memudahkan pekerjaan sehari-hari Anda di laboratorium."
                  : "BTS is a manual analyzer with LED optics system and a new intuitive and easy-to-use software that will ease your daily work in the laboratory.",
                brand: {
                  "@type": "Brand",
                  name: "BioSystems",
                },
                category: "Medical Laboratory Equipment",
                image: "https://biosystems.id/instrument/images/bts.png",
              },
            },
            {
              "@type": "ListItem",
              position: 5,
              item: {
                "@type": "Product",
                "@id": "https://biosystems.id/instrument/coax#product",
                name: "BioSystems COAX",
                url: "https://biosystems.id/instrument/coax",
                description: isIndonesian
                  ? "COAX adalah koagulometer semi-otomatis yang dirancang untuk mengoptimalkan rutinitas laboratorium Anda."
                  : "COAX is a semi-automated coagulometer designed to optimize your laboratory routine.",
                brand: {
                  "@type": "Brand",
                  name: "BioSystems",
                },
                category: "Medical Laboratory Equipment",
                image: "https://biosystems.id/instrument/images/coax.png",
              },
            },
          ],
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://biosystems.id/instrument#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: isIndonesian ? "Beranda" : "Home",
            item: "https://biosystems.id",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isIndonesian ? "Instrument" : "Instruments",
            item: "https://biosystems.id/instrument",
          },
        ],
      },
    ],
  };
}
