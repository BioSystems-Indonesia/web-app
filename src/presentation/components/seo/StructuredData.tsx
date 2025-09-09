import React from 'react';

interface Product {
    name: string;
    type: string;
    description?: string;
    image?: string;
    url?: string;
}

interface StructuredDataProps {
    products?: Product[];
    organizationName?: string;
    description?: string;
}

export default function StructuredData({
    products = [],
    organizationName = "BioSystems Indonesia",
    description = "Analytical solutions for in vitro diagnostics (IVD) throughout the entire value chain since 1981"
}: StructuredDataProps) {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": organizationName,
        "description": description,
        "foundingDate": "1981",
        "industry": "Medical Devices",
        "areaServed": "Indonesia",
        "knowsAbout": ["In Vitro Diagnostics", "Medical Laboratory Equipment", "Analytical Solutions"]
    };

    const productSchema = products.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "BioSystems Analytical Products",
        "description": "Featured analytical instruments and solutions",
        "numberOfItems": products.length,
        "itemListElement": products.map((product, index) => ({
            "@type": "Product",
            "position": index + 1,
            "name": product.name,
            "category": product.type,
            "description": product.description || `${product.type} - ${product.name}`,
            "manufacturer": {
                "@type": "Organization",
                "name": organizationName
            }
        }))
    } : null;

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "BioSystems Analytical Solutions",
        "description": description,
        "provider": {
            "@type": "Organization",
            "name": organizationName
        },
        "serviceType": "Medical Laboratory Equipment",
        "areaServed": "Indonesia"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema)
                }}
            />
            {productSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(productSchema)
                    }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(serviceSchema)
                }}
            />
        </>
    );
}
