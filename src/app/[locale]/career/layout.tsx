import { Metadata } from "next";
import { generateCareerPageMetadata, careerPageJsonLd } from "@/lib/seo/careerPageMetadata";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    const { locale } = await params;
    return generateCareerPageMetadata({ locale });
}

export default async function CareerLayout({ children, params }: LayoutProps) {
    await params;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(careerPageJsonLd)
                }}
            />
            {children}
        </>
    );
}
