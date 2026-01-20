import { generateInstrumentMetadata, generateInstrumentJsonLd } from "@/lib/seo/instrumentMetadata";
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
        imageUrl: "/assets/img/instrument/a15/hero.png",
    });
}

export default async function A15Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "A15" });

    const jsonLd = generateInstrumentJsonLd({
        instrumentName: "BioSystems A15",
        instrumentCode: "83105",
        description: t("heroDesc"),
        url: `https://biosystems.id/${locale}/instrument/a15`,
        imageUrl: "https://biosystems.id/instrument/images/a15.png",
        features: ["Semi-automatic", "25 tests stored", "Photometric system"],
        specifications: {
            "Type": "Semi-automatic analyzer",
            "Dimensions": "840 mm x 655 mm x 570 mm",
            "Throughput": "Up to 200 tests/hour",
            "Light Source": "Halogen lamp 12V-20W",
            "Reference Code": "83105",
        },
    });

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
