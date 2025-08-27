"use client"

import DashboardHeader from "@/presentation/components/header/header";
import SidebarDashboard from "@/presentation/components/sidebar/sidebar";

import "./dashboard.css";
import { useState } from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <>
      <DashboardHeader username="JohnDoe" role="Admin" onToggleSidebar={() => setIsSideBarOpen(!isSideBarOpen)} />
      <SidebarDashboard isOpen={isSideBarOpen} />
      <div className="container">
        {children}
      </div>
    </>
  );
}
