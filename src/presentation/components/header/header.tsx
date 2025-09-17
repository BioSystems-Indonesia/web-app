"use client";

import Image from "next/image";
import RoundEarthLogo from "@/presentation/components/icon/RoundEarth.svg";
import LoginLogo from "@/presentation/components/icon/Login.svg"
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import "./header.css"
import { useState, useEffect, useRef } from "react";

type NavItem = {
    href: string;
    label: string;
}

export default function Header() {
    const t = useTranslations("Header")
    const [langOpen, setLangOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const locale = useLocale()
    const languageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
                setLangOpen(false)
            }
        }

        if (langOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [langOpen])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            setIsScrolled(scrollTop > 100) 
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const navItems = (locale: string): NavItem[] => [
        { href: `${locale}/#`, label: "products" },
        { href: `${locale}/#`, label: "solutions" },
        { href: `${locale}/#`, label: "carear" },
        { href: `${locale}/#`, label: "about" },
        { href: `${locale}/#`, label: "contact-us" }
    ]

    return (
        <header>
            <div
                className={`layout ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(false)}
            ></div>
            <div className={`header-up ${isScrolled ? 'hidden' : ''}`}>
                <h2 className="logo">BioSystems</h2>
                <div className="items">
                    <div ref={languageRef} style={{ position: "relative" }}>
                        <div style={{ cursor: "pointer" }} onClick={() => { setLangOpen(!langOpen) }}>
                            <RoundEarthLogo />
                            <p>{t("language")}</p>
                        </div>
                        {/* <div className={`language-card ${langOpen ? 'lang-open' : ''}`}>
                            <span onClick={() => {
                                window.location.href = "/id"
                                setLangOpen(false)
                            }} style={{ cursor: "pointer" }}>
                                Indonesia
                            </span>
                            <span onClick={() => {
                                window.location.href = "/en"
                                setLangOpen(false)
                            }} style={{ cursor: "pointer" }}>
                                English
                            </span>
                        </div> */}
                    </div>


                    <div onClick={() => window.location.href = `${locale}/login`} style={{ cursor: "pointer" }}>
                        <LoginLogo />
                        <p>{t("login")}</p>

                    </div>

                </div>
                <div className={`hamburger-menu ${isOpen ? "is-open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                    <div className="line-1"></div>
                    <div className="line-2"></div>
                </div>
            </div>
            <div className={`header-bottom ${isScrolled ? 'move-up' : ''}`} style={isOpen ? { transform: "translateX(0)" } : {}}>
                <ul>
                    {navItems(locale).map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.href}
                            >{t(item.label)}</Link>
                        </li>
                    ))}
                    <div className="items">
                        <div >
                            <Image src={RoundEarthLogo} alt="RoundEarth Logo" width={25}></Image>
                            <p>{t("language")}</p>
                        </div>
                        <div onClick={() => window.location.href = `${locale}/login`}>
                            <LoginLogo />
                            {/* <Image src={LoginLogo} alt="Login Logo" width={25}></Image> */}
                            <p>{t("login")}</p>
                        </div>
                    </div>
                </ul>
            </div>
        </header>
    )
}