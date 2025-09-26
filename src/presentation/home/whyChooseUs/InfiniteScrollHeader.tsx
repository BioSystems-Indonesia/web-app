import React from "react";
import { FaArrowDown } from "react-icons/fa6";
import { SCROLL_CONFIG } from "./constants";

interface InfiniteScrollHeaderProps {
    title: string;
    transform: React.CSSProperties;
}

export const InfiniteScrollHeader: React.FC<InfiniteScrollHeaderProps> = ({
    title,
    transform
}) => {
    return (
        <div className="head">
            <div style={transform}>
                {Array.from({ length: SCROLL_CONFIG.INFINITE_ARRAY_LENGTH }).map((_, index) => (
                    <React.Fragment key={index}>
                        <h1>{title}</h1>
                        <div className="icon-card">
                            <FaArrowDown size={SCROLL_CONFIG.ICON_SIZE} />
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
