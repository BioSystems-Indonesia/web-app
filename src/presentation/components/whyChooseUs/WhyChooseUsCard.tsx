import React from "react";
import Image from "next/image";
import { WhyChooseUsItem } from "./types";

interface WhyChooseUsCardProps {
    item: WhyChooseUsItem;
    index: number;
}

export const WhyChooseUsCard: React.FC<WhyChooseUsCardProps> = ({
    item,
    index
}) => {
    return (
        <div className="wcu-card">
            <Image
                src={item.image}
                alt={item.title}
                priority={index < 2}
            />
            <div className="wcu-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
            </div>
        </div>
    );
};
