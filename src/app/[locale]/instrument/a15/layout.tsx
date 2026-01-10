import { generateInstrumentMetadata } from "@/lib/seo/instrumentMetadata";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "A15" });

    return generateInstrumentMetadata({
        locale,
        instrumentName: "BioSystems A15",
        instrumentCode: "83105",
        description: t("heroDesc"),
        pathname: "/instrument/a15",
        features: ["Semi-automatic", "25 tests stored", "Photometric system"],
        imageUrl: "/og-a15.jpg",
    });
}

export default async function A15Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "BioSystems A15",
        description:
            "Semi-automatic clinical chemistry analyzer with compact design, 25 tests stored, and photometric system with 8 interference filters.",
        brand: {
            "@type": "Brand",
            name: "BioSystems",
        },
        category: "Clinical Chemistry Analyzer",
        offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
        },
        additionalProperty: [
            {
                "@type": "PropertyValue",
                name: "Type",
                value: "Semi-automatic analyzer",
            },
            {
                "@type": "PropertyValue",
                name: "Dimensions",
                value: "840 mm x 655 mm x 570 mm",
            },
            {
                "@type": "PropertyValue",
                name: "Throughput",
                value: "Up to 200 tests/hour",
            },
            {
                "@type": "PropertyValue",
                name: "Light Source",
                value: "Halogen lamp 12V-20W",
            },
            {
                "@type": "PropertyValue",
                name: "Reference Code",
                value: "83105",
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
