"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Image from "next/image";
import "./InsideOurLab.css";

import LabImg1 from "@/assets/img/home/lab-1.png"
import LabImg2 from "@/assets/img/home/lab-2.png"

export default function InsideOurLab() {
    const t = useTranslations("InsideOurLab");
    const [videoSrc, setVideoSrc] = useState("/inside-our-lab.mp4");

    useEffect(() => {
        setVideoSrc(`${window.location.origin}/inside-our-lab.mp4`);
    }, []);

    return (
        <section className="inside-our-lab">
            <div className="video-background">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="background-video"
                >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="gradient"></div>
            <div className="container">
                <div className="card1">
                    <Image src={LabImg1} alt="Inside Our Lab biosystems | Di dalam lab biosystems" className="img1"></Image>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at iaculis mi.</p>
                </div>
                <div className="card2">
                    <Image src={LabImg2} alt="Inside Our Lab biosystems | Di dalam lab biosystems" className="img1"></Image>

                </div>
            </div>
        </section>
    );
}
