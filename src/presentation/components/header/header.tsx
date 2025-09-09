"use client";

import Image from "next/image";
import RoundEarthLogo from "@/presentation/components/icon/RoundEarth.svg";
import LoginLogo from "@/presentation/components/icon/Login.svg"
import { useTranslations } from "next-intl";
import Link from "next/link";
import "./header.css"
import { useState } from "react";

type NavItem = {
    href: string;
    label: string;
}

export default function Header() {
    const t = useTranslations("Header")

    const navItems: NavItem[] = [
        { href: "#", label: "products" },
        { href: "#", label: "solutions" },
        { href: "#", label: "carear" },
        { href: "#", label: "about" },
        { href: "#", label: "contact-us" }
    ]

    const [isOpen, setIsOpen] = useState(false)

    return (
        <header>
            <div
                className={`layout ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(false)}
            ></div>
            <div className="header-up">
                <h2 className="logo">BioSystems</h2>
                <div className="items">
                    <div>
                        <Image src={RoundEarthLogo} alt="RoundEarth Logo" width={15}></Image>
                        <p>{t("language")}</p>
                    </div>
                    <div>
                        <Image src={LoginLogo} alt="Login Logo" width={15}></Image>
                        <p>{t("login")}</p>
                    </div>
                </div>
                <div className={`hamburger-menu ${isOpen ? "is-open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                    <div className="line-1"></div>
                    <div className="line-2"></div>
                </div>
            </div>
            <div className="header-bottom" style={isOpen ? { transform: "translateX(0)" } : {}}>
                <ul>
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.href}
                            >{t(item.label)}</Link>
                        </li>
                    ))}
                    <div className="items">
                        <div>
                            <Image src={RoundEarthLogo} alt="RoundEarth Logo" width={15}></Image>
                            <p>{t("language")}</p>
                        </div>
                        <div>
                            <Image src={LoginLogo} alt="Login Logo" width={15}></Image>
                            <p>{t("login")}</p>
                        </div>
                    </div>
                </ul>
            </div>
        </header>
    )
}