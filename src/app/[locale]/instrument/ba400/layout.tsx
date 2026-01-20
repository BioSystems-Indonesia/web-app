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
        instrumentName: "BA400",
        instrumentCode: "83400/83400ISE",
        description: locale === "id"
            ? "BA400 adalah analyzer kimia klinis otomatis penuh dengan deteksi hemolisis otomatis dan loading sampel cepat untuk laboratorium modern."
            : "BA400 is a full automatic clinical chemistry analyzer with automatic hemolysis detection and fast sample loading for modern laboratories.",
        pathname: "/instrument/ba400",
        features: [
            "Full automatic analyzer",
            "Automatic hemolysis detection",
            "400 tests/hour throughput",
            "Fast sample loading",
            "Advanced LED technology"
        ],
        imageUrl: "/assets/img/instrument/ba400/hero.png"
    });
}

export default async function BA400Layout({ children, params }: InstrumentLayoutProps) {
    const { locale } = await params;

    const jsonLd = generateInstrumentJsonLd({
        instrumentName: "BioSystems BA400",
        instrumentCode: "83400/83400ISE",
        description: "Full automatic clinical chemistry analyzer with automatic hemolysis detection on whole blood samples and fast sample loading capability. Ideal for high-throughput laboratories.",
        url: `https://biosystems.id/${locale}/instrument/ba400`,
        imageUrl: "https://biosystems.id/instrument/images/ba400.png",
        features: [
            "Full automatic random access analyzer",
            "Automatic hemolysis detection on whole blood samples",
            "400 tests/hour throughput (with ISE module)",
            "Fast and efficient sample loading",
            "Advanced LED optical technology"
        ],
        specifications: {
            "Throughput": "400 t/h (with ISE module)",
            "Light Source": "LED",
            "Product Code": "83400/83400ISE",
            "Type": "Full Automatic Random Access Analyzer"
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
