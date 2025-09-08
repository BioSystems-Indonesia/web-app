import Image from "next/image";
import RoundEarthLogo from "@/presentation/components/icon/RoundEarth.svg";
import LoginLogo from "@/presentation/components/icon/Login.svg"
import { useTranslations } from "next-intl";
import Link from "next/link";
import "./header.css"

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

    return (
        <header>
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
            </div>
            <div className="header-bottom">
                <ul>
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.href}
                            >{t(item.label)}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    )
}