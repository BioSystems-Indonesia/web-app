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
        instrumentName: "BTS",
        instrumentCode: "83000",
        description: locale === "id"
            ? "BTS adalah penganalisis manual dengan sistem optik LED dan perangkat lunak baru yang intuitif dan mudah digunakan yang akan memudahkan pekerjaan sehari-hari Anda di laboratorium."
            : "BTS is a manual analyzer with LED optics system and a new intuitive and easy-to-use software that will ease your daily work in the laboratory.",
        pathname: "/instrument/bts",
        features: [
            "Manual analyzer",
            "LED optics system",
            "Intuitive software",
            "Easy to use",
            "Compact design"
        ],
        imageUrl: "/assets/img/instrument/bts/hero.png"
    });
}

export default async function BTSLayout({ children, params }: InstrumentLayoutProps) {
    const { locale } = await params;

    const jsonLd = generateInstrumentJsonLd({
        instrumentName: "BioSystems BTS",
        instrumentCode: "83000",
        description: "Manual analyzer with LED optics system and intuitive software for efficient laboratory work. Compact and reliable solution for clinical chemistry analysis.",
        url: `https://biosystems.id/${locale}/instrument/bts`,
        imageUrl: "https://biosystems.id/instrument/images/bts.png",
        features: [
            "Manual semi-automatic analyzer",
            "LED optical technology",
            "Intuitive and easy-to-use software",
            "Compact design (180mm x 438mm x 245mm)",
            "Low maintenance cost"
        ],
        specifications: {
            "Dimensions": "180 mm x 438 mm x 245 mm",
            "Weight": "4.3 kg",
            "Throughput": "Manual",
            "Light Source": "LEDs",
            "Product Code": "83000",
            "Type": "Semi-Automatic Analyzer with LED Technology"
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
