"use client"
import "./ourProducts.css"
import Image from "next/image"

import Reagent1 from "@/assets/img/clinical-analysis/reagent-1.png"
import Reagent2 from "@/assets/img/clinical-analysis/reagent-2.png"
import Reagent3 from "@/assets/img/clinical-analysis/reagent-3.png"
import Reagent4 from "@/assets/img/clinical-analysis/reagent-4.png"
import Reagent5 from "@/assets/img/clinical-analysis/reagent-5.png"
import Reagent6 from "@/assets/img/clinical-analysis/reagent-6.png"
import Reagent7 from "@/assets/img/clinical-analysis/reagent-7.png"
import Reagent8 from "@/assets/img/clinical-analysis/reagent-8.png"

export default function OurProductsSection() {
    const images = [Reagent1, Reagent2, Reagent3, Reagent4, Reagent5, Reagent6, Reagent7, Reagent8];

    // duplicate images array to create continuous loop
    const looped = [...images, ...images, ...images];

    return (
        <div className="our-product-section">
            <div className="content">
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt leo sit amet purus congue, eget venenatis eros semper. Maecenas nisl dui, suscipit non sodales a, molestie eu sapien. Praesent libero diam, suscipit at feugiat non, sodales vehicula enim. In hac habitasse platea dictumst. Donec ultrices tellus justo, malesuada dignissim mauris dictum sit amet. Quisque a commodo ex. Nam egestas, dui ac lacinia pulvinar, metus odio malesuada mauris, id laoreet ligula neque ut ligula.</p>
            </div>
            <div className="corousel-wrap">
                <div className="corousel-track">
                    {looped.map((img, i) => (
                        <div className="corousel-item" key={i}>
                            <Image src={img} alt={`reagent-${i}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}