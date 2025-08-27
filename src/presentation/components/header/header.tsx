import logo from "@/assets/BioSystems-logo-white.png";
import "./header.css";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";
import axios from "axios";

type DashboardHeaderProps = {
  username?: string;
  role?: string;
  onToggleSidebar: () => void;
}



export default function DashboardHeader({ username, role, onToggleSidebar }: DashboardHeaderProps) {
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      window.location.href = "/login";
    } catch (error: unknown) {
      console.error(error)
    }
  }

  return (
    <header>
      <Image className="logo" src={logo.src} alt="BioSystems Logo" height={0} width={120} />
      <GiHamburgerMenu className="hamburger-menu" cursor="pointer" onClick={onToggleSidebar} />
      <div className="header-info">
        {username && <p>Welcome, {role} <span>{username}</span>!</p>}
        <IoLogOut className="logout-icon" size={20} onClick={handleLogout} cursor={"pointer"} />
      </div>
    </header>
  );
}
