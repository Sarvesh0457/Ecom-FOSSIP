import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { ThemeProvider } from "../../context/ThemeContext";

export const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
        {/* Navigation Sidebar */}
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* Main Panel Content Area */}
        <div
          className={`flex-1 flex flex-col min-h-screen transition-all duration-305 ${collapsed ? "md:pl-20" : "md:pl-64"}`}
        >
          <Navbar setMobileOpen={setMobileOpen} collapsed={collapsed} />
          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};
export default Layout;
