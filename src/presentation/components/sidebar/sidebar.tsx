"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { FaHome, FaNewspaper, FaUser } from "react-icons/fa";
import { SlChemistry } from "react-icons/sl";
import { MdEventAvailable } from "react-icons/md";
import { IoBagSharp, IoCall } from "react-icons/io5";
import { BsBox2 } from "react-icons/bs";

import "./sidebar.css";
import { Fa42Group, FaBox, FaBoxOpen, FaBoxTissue, FaPeopleGroup } from "react-icons/fa6";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  userRole?: string;
}

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  roles: string[];
};

const getNavItems = (locale: string): NavItem[] => [
  //   {
  //     href: `/${locale}/dashboard`,
  //     label: "Home",
  //     icon: <FaHome />,
  //     roles: ["ADMIN", "PRODUCT_SPECIALIST", "HUMAN_RESOURCE", "DG"],
  //   },
  {
    href: `/${locale}/dashboard/products`,
    label: "Products",
    icon: <BsBox2 />,
    roles: ["ADMIN", "PRODUCT_SPECIALIST", "DG"],
  },
  {
    href: `/${locale}/dashboard/posts`,
    label: "Articles",
    icon: <FaNewspaper />,
    roles: ["ADMIN", "PRODUCT_SPECIALIST", "DG"],
  },
  // {
  //   href: `/${locale}/dashboard/position`,
  //   label: "Position",
  //   icon: <FaPeopleGroup />,
  //   roles: ["ADMIN", "HUMAN_RESOURCE",],
  // },
  // {
  //   href: `/${locale}/dashboard/employee`,
  //   label: "Employee",
  //   icon: <FaPeopleGroup />,
  //   roles: ["ADMIN", "HUMAN_RESOURCE",],
  // },
  // {
  //   href: `/${locale}/dashboard/inventory`,
  //   label: "Inventory",
  //   icon: <FaBoxOpen />,
  //   roles: ["ADMIN", "HUMAN_RESOURCE",],
  // },
  // {
  //   href: `/${locale}/dashboard/category-inventory`,
  //   label: "Category Inventory",
  //   icon: <FaBox />,
  //   roles: ["ADMIN", "HUMAN_RESOURCE",],
  // },
  // { href: `/${locale}/dashboard/events`, label: "Events", icon: <MdEventAvailable />, roles: ["ADMIN", "PRODUCT_SPECIALIST"] },
  // { href: `/${locale}/dashboard/career`, label: "Career", icon: <IoBagSharp />, roles: ["ADMIN", "HUMAN_RESOURCE"] },
  // { href: `/${locale}/dashboard/contact`, label: "Contact", icon: <IoCall />, roles: ["ADMIN"] },
  { href: `/${locale}/dashboard/users`, label: "Users", icon: <FaUser />, roles: ["ADMIN"] },
  {
    href: `/${locale}/dashboard/lis`,
    label: "LIS Dashboard",
    icon: <SlChemistry />,
    roles: ["ADMIN"],
  },
];

export default function SidebarDashboard({ isOpen, onToggle, userRole }: SidebarProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const navItems = getNavItems(locale);

  const filteredNavItems = userRole
    ? navItems.filter((item) => item.roles.includes(userRole))
    : navItems;

  return (
    <>
      <aside className={`${isOpen ? "" : "open"}`}>
        <ul>
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href} className={`${isActive ? "isActive" : ""}`}>
                <Link href={item.href}>
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
