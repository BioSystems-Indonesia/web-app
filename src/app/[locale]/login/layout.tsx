import { Metadata } from "next";
import { generateLoginPageMetadata } from "@/lib/seo/loginPageMetadata";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    const { locale } = await params;
    return generateLoginPageMetadata({ locale });
}

export default async function LoginLayout({ children }: LayoutProps) {
    return <>{children}</>;
}
