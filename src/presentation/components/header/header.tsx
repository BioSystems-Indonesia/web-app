import logo from "@/assets/BioSystems-logo-white.png";
import "./header.css";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";

type DashboardHeaderProps = {
  username?: string;
  role?: string;
  onToggleSidebar: () => void;
}

export default function DashboardHeader({ username, role, onToggleSidebar }: DashboardHeaderProps) {
  return (
    <header>
      <Image className="logo" src={logo.src} alt="BioSystems Logo" height={0} width={150} />
      <div className="header-info">
        <GiHamburgerMenu cursor="pointer" onClick={onToggleSidebar} />
        {username && <p>Welcome, {role} <span>{username}</span>!</p>}
      </div>
    </header>
  );
}
