
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split("/")[1] || "dashboard";

  const handleNavigation = (path: string) => {
    navigate(`/${path}`);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activePath={currentPath} onNavigate={handleNavigation} />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
};

export default AppLayout;
