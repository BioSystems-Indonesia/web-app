"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "@/presentation/components/header/dashboardHeader";
import SidebarDashboard from "@/presentation/components/sidebar/sidebar";
import axios from "axios";
import "./layout.css";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface CurrentUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
}

// Note: Metadata is handled in a separate server component wrapper if needed
// For now, this client component focuses on dashboard functionality

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("/api/auth/me");
        setCurrentUser(response.data.data);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          window.location.href = "/login";
        }
      }
    };

    fetchCurrentUser();
  }, []);

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "Admin";
      case "HUMAN_RESOURCE":
        return "Human Resource";
      case "PRODUCT_SPECIALIST":
        return "Product Specialist";
      default:
        return role;
    }
  };

  return (
    <>
      <DashboardHeader
        username={currentUser?.name || "Loading..."}
        role={currentUser ? getRoleLabel(currentUser.role) : "..."}
        onToggleSidebar={() => setIsSideBarOpen(!isSideBarOpen)}
      />
      <SidebarDashboard
        isOpen={isSideBarOpen}
        onToggle={() => setIsSideBarOpen(!isSideBarOpen)}
        userRole={currentUser?.role}
      />
      <div className="container">{children}</div>
    </>
  );
}
