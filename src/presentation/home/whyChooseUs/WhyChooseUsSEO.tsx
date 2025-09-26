import React from "react";
import Head from "next/head";
import { WhyChooseUsItem } from "./types";

interface WhyChooseUsSEOProps {
    items: WhyChooseUsItem[];
    sectionTitle: string;
}

export const WhyChooseUsSEO: React.FC<WhyChooseUsSEOProps> = ({
    items,
    sectionTitle
}) => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": sectionTitle,
        "numberOfItems": items.length,
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.title,
            "description": item.desc
        }))
    };

    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData)
                }}
            />
        </Head>
    );
};
