"use client";

import { useTranslations } from "next-intl";
import "./WhyChooseUsSection.css";
import React from "react";
import { createWhyChooseUsData } from "./constants";
import { useInfiniteScroll } from "./hooks";
import { InfiniteScrollHeader } from "./InfiniteScrollHeader";
import { WhyChooseUsGrid } from "./WhyChooseUsGrid";
import { WhyChooseUsSEO } from "./WhyChooseUsSEO";

export default function WhyChooseUsSection() {
    const t = useTranslations("WhyChooseUs");
    const whyChooseUsData = createWhyChooseUsData(t);
    const { getTransform } = useInfiniteScroll();

    const sectionTitle = t("h1");

    return (
        <>
            <WhyChooseUsSEO
                items={whyChooseUsData}
                sectionTitle={sectionTitle}
            />
            <section className="why-choose-us">
                <InfiniteScrollHeader
                    title={sectionTitle}
                    transform={getTransform()}
                />
                <WhyChooseUsGrid items={whyChooseUsData} />
            </section>
        </>
    );
}