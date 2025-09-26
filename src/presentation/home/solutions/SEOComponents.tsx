import React from "react";

interface SEOFallbackProps {
    h1Text: string;
    h2Text: string;
    contentText: string;
}

export const SEOFallback: React.FC<SEOFallbackProps> = ({
    h1Text,
    h2Text,
    contentText
}) => (
    <div
        className="seo-fallback"
        style={{
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
            overflow: 'hidden'
        }}
    >
        <h1>{h1Text} - Analytical Solutions for In Vitro Diagnostics</h1>
        <h2>{h2Text} - Solusi Analitik untuk Diagnostik In Vitro</h2>
        <p>{contentText}</p>
        <p>Since 1981, we have focused on developing analytical solutions for in vitro diagnostics (IVD) throughout the entire value chain. We provide laboratory technicians with robust systems that ensure reliable results for informed decision-making.</p>
        <p>Sejak tahun 1981, kami berfokus pada pengembangan solusi analitik untuk diagnostik in vitro (IVD) di seluruh rantai nilai. Kami menyediakan sistem yang andal bagi tenaga laboratorium untuk memastikan hasil yang terpercaya sebagai dasar pengambilan keputusan.</p>
    </div>
);

export const StructuredData: React.FC = () => (
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "BioSystems Analytical Solutions",
                "description": "Analytical solutions for in vitro diagnostics (IVD) throughout the entire value chain since 1981",
                "provider": {
                    "@type": "Organization",
                    "name": "BioSystems Indonesia"
                }
            })
        }}
    />
);
