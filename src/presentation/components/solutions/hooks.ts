import { useState, useEffect, useCallback } from "react";
import { Product } from "./types";
import { DEFAULT_HOVERED_PRODUCT, IMAGE_TRANSITION_DURATION, TRANSITION_DELAY } from "./constants";

export const useProductHover = () => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(DEFAULT_HOVERED_PRODUCT);

  const handleProductHover = useCallback(
    (productName: string) => {
      if (productName !== hoveredProduct) {
        setHoveredProduct(productName);
      }
    },
    [hoveredProduct]
  );

  const handleProductLeave = useCallback(() => {
    setHoveredProduct(DEFAULT_HOVERED_PRODUCT);
  }, []);

  return {
    hoveredProduct,
    handleProductHover,
    handleProductLeave,
  };
};

export const useImageSlider = (hoveredProduct: string | null, products: Product[]) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Auto-advance images
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (hoveredProduct) {
      interval = setInterval(() => {
        const product = products.find((p) => p.name === hoveredProduct);
        if (product && product.images.length > 1) {
          setCurrentImageIndex((prev) => prev + 1);
        }
      }, IMAGE_TRANSITION_DURATION);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [hoveredProduct, products]);

  // Reset when hovered product changes
  useEffect(() => {
    setCurrentImageIndex(1);
    setIsTransitioning(true);
  }, [hoveredProduct]);

  // Handle infinite loop
  useEffect(() => {
    if (hoveredProduct) {
      const product = products.find((p) => p.name === hoveredProduct);
      if (product) {
        const totalSlides = product.images.length + 2;

        if (currentImageIndex === totalSlides - 1) {
          const timer = setTimeout(() => {
            setIsTransitioning(false);
            setCurrentImageIndex(1);
            requestAnimationFrame(() => {
              setIsTransitioning(true);
            });
          }, TRANSITION_DELAY);

          return () => clearTimeout(timer);
        }
      }
    }
  }, [currentImageIndex, hoveredProduct, products]);

  return {
    currentImageIndex,
    isTransitioning,
  };
};
