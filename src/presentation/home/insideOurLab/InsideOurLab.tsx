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
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

    useEffect(() => {
        // Only load video on tablet and above for better mobile performance
        const isMobile = window.innerWidth < 768;
        setShouldLoadVideo(!isMobile);

        if (!isMobile) {
            setVideoSrc(`${window.location.origin}/inside-our-lab.mp4`);
        }

        // Re-check on resize (debounced)
        let resizeTimer: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const isNowMobile = window.innerWidth < 768;
                setShouldLoadVideo(!isNowMobile);
            }, 250);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimer);
        };
    }, []);

    return (
        <section className="inside-our-lab">
            {shouldLoadVideo && (
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
            )}
            <div className="gradient"></div>
            <div className="container">
                <div className="card1">
                    <Image
                        src={LabImg1}
                        alt="Inside Our Lab biosystems | Di dalam lab biosystems"
                        priority
                    />
                    <p>{t("description")}</p>
                </div>
                <div className="card2">
                    <Image
                        src={LabImg2}
                        alt="Inside Our Lab biosystems | Di dalam lab biosystems"
                    />
                </div>
            </div>
        </section>
    );
}
