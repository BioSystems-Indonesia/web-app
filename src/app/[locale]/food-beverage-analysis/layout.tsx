import { Metadata } from "next";
import { generateAnalysisMetadata } from "@/lib/seo/analysisMetadata";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    const { locale } = await params;
    return generateAnalysisMetadata({
        locale,
        analysisType: "food-beverage",
        pathname: "/food-beverage-analysis"
    });
}

export default async function FoodBeverageAnalysisLayout({ children }: LayoutProps) {
    return <>{children}</>;
}
