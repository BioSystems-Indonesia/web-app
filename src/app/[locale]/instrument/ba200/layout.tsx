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
        instrumentName: "BA200",
        instrumentCode: "83200/83200ISE",
        description: locale === "id"
            ? "BA200 adalah analyzer kimia klinis yang meningkatkan sumber daya laboratorium dan meminimalkan maintenance sistem yang diperlukan."
            : "BA200 is a clinical chemistry analyzer that improves your laboratory resources and minimizes the required system maintenance.",
        pathname: "/instrument/ba200",
        features: [
            "LED optical technology",
            "Automatic hemolysis detection",
            "200 tests/hour throughput",
            "Minimal maintenance",
            "Reagent barcoding system"
        ],
        imageUrl: "/assets/img/instrument/ba200/1.png"
    });
}

export default async function BA200Layout({ children, params }: InstrumentLayoutProps) {
    const { locale } = await params;

    const jsonLd = generateInstrumentJsonLd({
        instrumentName: "BioSystems BA200",
        instrumentCode: "83200/83200ISE",
        description: "Full automatic clinical chemistry analyzer with LED optical technology and 200 tests per hour throughput. Features automatic hemolysis detection on whole blood samples.",
        url: `https://biosystems.id/${locale}/instrument/ba200`,
        imageUrl: "https://biosystems.id/assets/img/instrument/ba200/1.png",
        features: [
            "LED optical technology with minimal maintenance",
            "Automatic hemolysis detection on whole blood samples",
            "200 tests/hour throughput (300 t/h with ISE module)",
            "Reagent barcoding and volume detection system",
            "Fast sample loading capability"
        ],
        specifications: {
            "Dimensions": "680mm x 690mm x 1070mm",
            "Weight": "166 kg",
            "Throughput": "200 t/h (with ISE module: 300 t/h)",
            "Light Source": "LED",
            "Product Code": "83200/83200ISE"
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
