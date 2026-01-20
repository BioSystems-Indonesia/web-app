import { Metadata } from "next";
import { generateInstrumentMetadata, generateInstrumentJsonLd } from "@/lib/seo/instrumentMetadata";

interface InstrumentLayoutProps {
    params: Promise<{ locale: string }>;
    children: React.ReactNode;
}

export async function generateMetadata({ params }: InstrumentLayoutProps): Promise<Metadata> {
    const { locale } = await params;

    return generateInstrumentMetadata({
        locale,
        instrumentName: "COAX",
        instrumentCode: "85001/85002/85004",
        description: locale === "id"
            ? "COAX adalah koagulometer semi-otomatis yang dirancang untuk mengoptimalkan rutinitas laboratorium Anda."
            : "COAX is a semi-automated coagulometer designed to optimize your laboratory routine.",
        pathname: "/instrument/coax",
        features: [
            "Semi-automated coagulometer",
            "Open system",
            "1, 2 or 4 optical channels",
            "Nearly maintenance-free",
            "High-quality results"
        ],
        imageUrl: "/assets/img/instrument/coax/hero.png"
    });
}

export default async function CoaxLayout({ children, params }: InstrumentLayoutProps) {
    const { locale } = await params;

    const jsonLd = generateInstrumentJsonLd({
        instrumentName: "BioSystems COAX",
        instrumentCode: "85001/85002/85004",
        description: "Semi-automated coagulometer designed to optimize laboratory routine. Available in 1, 2, or 4 optical channel models for flexible coagulation testing.",
        url: `https://biosystems.id/${locale}/instrument/coax`,
        imageUrl: "https://biosystems.id/instrument/images/coax.png",
        features: [
            "Semi-automated coagulometer",
            "Open system",
            "1, 2 or 4 optical channels",
            "Nearly maintenance-free",
            "Color touch screen display"
        ],
        specifications: {
            "Dimensions": "225 mm x 90 mm x 115 mm",
            "Channels": "1, 2, or 4 optical channels",
            "Display": "Color touch screen",
            "Product Code": "85001/85002/85004",
            "Type": "Semi-Automated Coagulometer"
        }
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
