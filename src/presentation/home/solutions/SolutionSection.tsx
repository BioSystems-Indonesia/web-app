"use client";

import React from "react";
import { useTranslations } from "next-intl";
import "./SolutionSection.css";

// Components
import { SEOFallback, StructuredData } from "./SEOComponents";
import { ProductList } from "./ProductList";
import { ProductImagePreview } from "./ProductImagePreview";

// Hooks and utilities
import { useProductHover, useImageSlider } from "./hooks";
import { PRODUCTS } from "./constants";

export default function SolutionSection() {
    const t = useTranslations("Solutions");

    // Custom hooks for state management
    const { hoveredProduct, handleProductHover, handleProductLeave } = useProductHover();
    const { currentImageIndex, isTransitioning } = useImageSlider(hoveredProduct, PRODUCTS);

    // Get translations
    const h1Text = t("h1");
    const contentText = t("content");
    const h2Text = t("h2");
    const seeProductText = t("see-product");

    return (
        <section className="solution-section">
            {/* SEO Components */}
            <StructuredData />
            <SEOFallback
                h1Text={h1Text}
                h2Text={h2Text}
                contentText={contentText}
            />

            <div className="container-section">
                <div>
                    <article className="card">
                        <h1 suppressHydrationWarning>{h1Text}</h1>
                        <p suppressHydrationWarning>{contentText}</p>
                    </article>

                    <div className="highlighted-products">
                        <h2 suppressHydrationWarning>{h2Text}</h2>
                        <div className="product-section">
                            <ProductList
                                products={PRODUCTS}
                                hoveredProduct={hoveredProduct}
                                onProductHover={handleProductHover}
                                onProductLeave={handleProductLeave}
                                seeProductText={seeProductText}
                            />
                        </div>
                    </div>
                </div>

                {/* Image preview area */}
                <ProductImagePreview
                    products={PRODUCTS}
                    hoveredProduct={hoveredProduct}
                    currentImageIndex={currentImageIndex}
                    isTransitioning={isTransitioning}
                />
            </div>
        </section>
    );
}