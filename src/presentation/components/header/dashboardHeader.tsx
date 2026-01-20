import logo from "@/assets/BioSystems-logo-white.png";
import "./dashboardHeader.css";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";
import axios from "axios";
import { useLocale } from "next-intl";
import Link from "next/link";

type DashboardHeaderProps = {
  username?: string;
  role?: string;
  onToggleSidebar: () => void;
};

export default function DashboardHeader({ username, role, onToggleSidebar }: DashboardHeaderProps) {
  const locale = useLocale();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      window.location.href = "/login";
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <header>
      <a href={`/${locale}`}>
        <h2 className="logo">BioSystems</h2>
      </a>
      <GiHamburgerMenu className="hamburger-menu" cursor="pointer" onClick={onToggleSidebar} />
      <div className="header-info">
        {username && (
          <div className="user-info">
            <div className="user-details">
              <span className="user-name">{username}</span>
              <span className="user-role">{role}</span>
            </div>
          </div>
        )}
        <button className="logout-button" onClick={handleLogout} title="Logout">
          <IoLogOut className="logout-icon" size={20} />
        </button>
      </div>
    </header>
  );
}
