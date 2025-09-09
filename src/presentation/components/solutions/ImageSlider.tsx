import React from "react";
import Image from "next/image";
import { ImageSliderProps } from "./types";

export const ImageSlider: React.FC<ImageSliderProps> = React.memo(({
    product,
    currentImageIndex,
    isTransitioning
}) => {
    const infiniteImages = [
        product.images[product.images.length - 1],
        ...product.images,
        product.images[0]
    ];

    return (
        <div className="image-slider">
            <div
                className="image-track"
                style={{
                    transform: `translateX(-${currentImageIndex * 100}%)`,
                    transition: isTransitioning
                        ? 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                        : 'none'
                }}
            >
                {infiniteImages.map((image, index) => (
                    <Image
                        key={`${product.name}-infinite-${index}`}
                        src={image}
                        alt={`${product.name} - Image ${((index - 1 + product.images.length) % product.images.length) + 1}`}
                        className="preview-image"
                    />
                ))}
            </div>
        </div>
    );
});

ImageSlider.displayName = "ImageSlider";
