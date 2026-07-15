"use client";

import { useEffect, useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AdminShell({
  username,
  children,
}: {
  username: string;
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");

    const syncToViewport = (e: MediaQueryList | MediaQueryListEvent) => {
      if (!e.matches) setIsCollapsed(false);
    };

    syncToViewport(mql);
    mql.addEventListener("change", syncToViewport);
    return () => mql.removeEventListener("change", syncToViewport);
  }, []);

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-gray-950">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
      />

      <div
        className={`flex flex-1 flex-col transition-[margin] duration-300 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <Navbar username={username} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 bg-gray-950 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
