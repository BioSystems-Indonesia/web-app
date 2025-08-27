import logo from '@/assets/BioSystems-logo-white.png';
import './header.css';
import Image from "next/image";

type DashboardHeaderProps = {
  username?: string;
  role?: string
}

export default function DashboardHeader({ username, role }: DashboardHeaderProps) {
  return (
    <header>
      <Image src={logo.src} alt="BioSystems Logo" width={150} />
      <div className='user-info'>
        {username && <p>Welcome, {role} <span>{username}</span>!</p>}
      </div>
    </header>
  );
}
