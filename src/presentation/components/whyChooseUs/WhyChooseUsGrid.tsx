import React from "react";
import { WhyChooseUsItem } from "./types";
import { WhyChooseUsCard } from "./WhyChooseUsCard";

interface WhyChooseUsGridProps {
    items: WhyChooseUsItem[];
}

export const WhyChooseUsGrid: React.FC<WhyChooseUsGridProps> = ({ items }) => {
    return (
        <div className="container">
            {items.map((item, index) => (
                <WhyChooseUsCard
                    key={index}
                    item={item}
                    index={index}
                />
            ))}
        </div>
    );
};
