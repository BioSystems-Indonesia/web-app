"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaNewspaper, FaUser } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { IoBagSharp, IoCall } from "react-icons/io5";

import './sidebar.css';

interface SidebarProps {
    isOpen: boolean;
}

type NavItem = {
    href: string;
    label: string;
    icon: React.ReactNode;
};

const navItems: NavItem[] = [
    { href: "/dashboard", label: "Home", icon: <FaHome /> },
    { href: "/dashboard/posts", label: "Posts", icon: <FaNewspaper /> },
    { href: "/dashboard/events", label: "Events", icon: <MdEventAvailable /> },
    { href: "/dashboard/career", label: "Career", icon: <IoBagSharp /> },
    { href: "/dashboard/contact", label: "Contact", icon: <IoCall /> },
    { href: "/dashboard/users", label: "Users", icon: <FaUser /> },
];

export default function SidebarDashboard({ isOpen }: SidebarProps) {
    const pathname = usePathname();

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
            <div className={`layout ${isOpen ? "open-layout" : ""}`}></div>
        </>
    );
}
