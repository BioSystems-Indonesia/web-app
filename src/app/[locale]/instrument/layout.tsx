import { Metadata } from "next";
import { generateInstrumentListingMetadata, generateInstrumentListingJsonLd } from "@/lib/seo/instrumentMetadata";

interface InstrumentLayoutProps {
    params: Promise<{ locale: string }>;
    children: React.ReactNode;
}

export async function generateMetadata({ params }: InstrumentLayoutProps): Promise<Metadata> {
    const { locale } = await params;

    return generateInstrumentListingMetadata({
        locale,
        pathname: "/instrument"
    });
}

export default async function InstrumentLayout({ params, children }: InstrumentLayoutProps) {
    const { locale } = await params;
    const jsonLd = generateInstrumentListingJsonLd(locale);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd)
                }}
            />
            {children}
        </>
    );
}
