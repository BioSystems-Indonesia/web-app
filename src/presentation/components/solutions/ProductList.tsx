import React from "react";
import { ProductCard } from "./ProductCard";
import { ProductListProps } from "./types";

export const ProductList: React.FC<ProductListProps> = React.memo(({
    products,
    onProductHover,
    onProductLeave,
    seeProductText
}) => (
    <div className="product-container">
        {products.map((product) => (
            <ProductCard
                key={product.name}
                product={product}
                onHover={onProductHover}
                onLeave={onProductLeave}
                seeProductText={seeProductText}
            />
        ))}
    </div>
));

ProductList.displayName = "ProductList";
