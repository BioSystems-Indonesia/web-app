import { Metadata } from "next";
import { generateSolutionMetadata, solutionPageJsonLd } from "@/lib/seo/solutionMetadata";
import SolutionSection from "@/presentation/home/solutions/SolutionSection";

interface SolutionsPageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: SolutionsPageProps): Promise<Metadata> {
    const { locale } = await params;
    return generateSolutionMetadata({ locale });
}

export default async function SolutionsPage({ params }: SolutionsPageProps) {
    const { locale } = await params;

    return (
        <>
            {/* Page-level structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(solutionPageJsonLd)
                }}
            />

            <main>
                <SolutionSection />
            </main>
        </>
    );
}
