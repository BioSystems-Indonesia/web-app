"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { FaHome, FaNewspaper, FaUser } from "react-icons/fa";
import { SlChemistry } from "react-icons/sl";
import { MdEventAvailable } from "react-icons/md";
import { IoBagSharp, IoCall } from "react-icons/io5";
import { BsBox2 } from "react-icons/bs";

import './sidebar.css';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

type NavItem = {
    href: string;
    label: string;
    icon: React.ReactNode;
};

const getNavItems = (locale: string): NavItem[] => [
    { href: `/${locale}/dashboard`, label: "Home", icon: <FaHome /> },
    { href: `/${locale}/dashboard/products`, label: "Products", icon: <BsBox2 /> },
    { href: `/${locale}/dashboard/posts`, label: "Posts", icon: <FaNewspaper /> },
    { href: `/${locale}/dashboard/events`, label: "Events", icon: <MdEventAvailable /> },
    { href: `/${locale}/dashboard/career`, label: "Career", icon: <IoBagSharp /> },
    { href: `/${locale}/dashboard/contact`, label: "Contact", icon: <IoCall /> },
    { href: `/${locale}/dashboard/users`, label: "Users", icon: <FaUser /> },
    { href: `/${locale}/dashboard/lis`, label: "LIS Dashboard", icon: <SlChemistry /> },
];

export default function SidebarDashboard({ isOpen, onToggle }: SidebarProps) {
    const pathname = usePathname();
    const locale = useLocale();
    const navItems = getNavItems(locale);

    return (
        <>
            <aside className={`${isOpen ? "" : "open"}`}>
                <ul>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <li key={item.href} className={`${isActive
                                ? "isActive"
                                : ""
                                }`}>
                                <Link
                                    href={item.href}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </aside>
            <div className={`layout ${isOpen ? "open-layout" : ""}`} onClick={onToggle}></div>

        </>
    );
}
