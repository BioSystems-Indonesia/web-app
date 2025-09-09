import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { ProductCardProps } from "./types";

export const ProductCard: React.FC<ProductCardProps> = React.memo(({
    product,
    onHover,
    onLeave,
    seeProductText
}) => (
    <div
        className="product-card"
        onMouseEnter={() => onHover(product.name)}
        onMouseLeave={onLeave}
    >
        <div className="product-icon-container">
            <Image src={product.icon} alt={product.name} />
        </div>
        <div className="product-info">
            <p className="product-type">{product.type}</p>
            <p className="product-name">{product.name}</p>
        </div>
        <div className="product-link-container">
            <Link href={product.link} target="_blank" className="product-link">
                {seeProductText}
            </Link>
            <GoArrowUpRight className="arrow-icon" />
        </div>
    </div>
));

ProductCard.displayName = "ProductCard";
