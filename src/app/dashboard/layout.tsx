"use client";

import { useState } from "react";
import DashboardHeader from "@/presentation/components/header/header";
import SidebarDashboard from "@/presentation/components/sidebar/sidebar";
import "./layout.css";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <>
      <DashboardHeader
        username="JohnDoe"
        role="Admin"
        onToggleSidebar={() => setIsSideBarOpen(!isSideBarOpen)}
      />
      <SidebarDashboard isOpen={isSideBarOpen} onToggle={() => setIsSideBarOpen(!isSideBarOpen)} />
      <div className="container">{children}</div>
    </>
  );
}
