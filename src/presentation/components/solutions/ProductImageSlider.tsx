import React, { useMemo } from 'react';
import Image, { StaticImageData } from 'next/image';

interface ProductImageSliderProps {
    product: {
        Name: string;
        Type: string;
        Image: StaticImageData[];
    };
    currentImageIndex: number;
    isTransitioning: boolean;
}

export default function ProductImageSlider({
    product,
    currentImageIndex,
    isTransitioning
}: ProductImageSliderProps) {
    const infiniteImages = useMemo(() => [
        product.Image[product.Image.length - 1],
        ...product.Image,
        product.Image[0]
    ], [product.Image]);

    const currentImageName = useMemo(() => {
        const actualIndex = ((currentImageIndex - 1 + product.Image.length) % product.Image.length);
        return `${product.Name} - View ${actualIndex + 1}`;
    }, [currentImageIndex, product.Image.length, product.Name]);

    return (
        <div
            className="image-container fade-in"
            role="img"
            aria-label={`Product images for ${product.Name} ${product.Type}`}
            aria-live="polite"
            aria-atomic="true"
        >
            <div className="image-slider">
                <div
                    className="image-track"
                    style={{
                        transform: `translateX(-${currentImageIndex * 100}%)`,
                        transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
                    }}
                    role="presentation"
                >
                    {infiniteImages.map((image, index) => {
                        const actualIndex = ((index - 1 + product.Image.length) % product.Image.length);
                        const isCurrentImage = index === currentImageIndex;

                        return (
                            <Image
                                key={`${product.Name}-infinite-${index}`}
                                src={image}
                                alt={`${product.Name} ${product.Type} - Product view ${actualIndex + 1}`}
                                fill
                                className="preview-image"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                                priority={isCurrentImage}
                                quality={85}
                                loading={isCurrentImage ? 'eager' : 'lazy'}
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                            />
                        );
                    })}
                </div>
            </div>

            {/* Screen reader announcement for current image */}
            <div
                className="sr-only"
                aria-live="polite"
                aria-atomic="true"
            >
                Currently viewing: {currentImageName}
            </div>
        </div>
    );
}
