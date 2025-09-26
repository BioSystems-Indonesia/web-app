import React from "react";
import { ImageSlider } from "./ImageSlider";
import { ProductImagePreviewProps } from "./types";

export const ProductImagePreview: React.FC<ProductImagePreviewProps> = React.memo(({
    products,
    hoveredProduct,
    currentImageIndex,
    isTransitioning
}) => {
    const product = hoveredProduct ? products.find(p => p.name === hoveredProduct) : null;

    return (
        <div className="product-image-preview">
            <div className="image-container-wrapper">
                {product && (
                    <div
                        key={hoveredProduct}
                        className="image-container fade-in"
                    >
                        <ImageSlider
                            product={product}
                            currentImageIndex={currentImageIndex}
                            isTransitioning={isTransitioning}
                        />
                    </div>
                )}
            </div>
        </div>
    );
});

ProductImagePreview.displayName = "ProductImagePreview";
