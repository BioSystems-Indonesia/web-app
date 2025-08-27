"use client"

import DashboardHeader from "@/presentation/components/header/header";
import SidebarDashboard from "@/presentation/components/sidebar/sidebar";

import "./dashboard.css";

type DashboardLayoutProps = {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <DashboardHeader username="JohnDoe" role="Admin" />
      <SidebarDashboard />
      <div className="container">
        {children}
      </div>
    </>
  );
}
