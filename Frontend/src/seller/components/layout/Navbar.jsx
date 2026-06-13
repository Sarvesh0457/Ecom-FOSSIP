import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiSun,
  FiMoon,
  FiBell,
  FiMenu,
  FiChevronDown,
  FiLogOut,
  FiUser,
  FiSettings,
} from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { menuItems } from "./Sidebar";

export const Navbar = ({ setMobileOpen, collapsed }) => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  // Derive page title or breadcrumbs
  const getPageTitle = () => {
    const current = menuItems.find((item) => item.path === location.pathname);
    if (current) return current.name;
    if (location.pathname.startsWith("/products/add")) return "Add New Product";
    if (location.pathname.startsWith("/products/edit")) return "Edit Product";
    if (location.pathname.startsWith("/reports/")) {
      const sub = location.pathname.split("/").pop();
      return `${sub.charAt(0).toUpperCase() + sub.slice(1)} Report`;
    }
    return "Admin Panel";
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className={`sticky top-0 z-20 flex items-center justify-between h-16 px-4 md:px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 transition-all duration-300`}
    >
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <FiMenu className="w-5 h-5" />
        </button>

        {/* Page Breadcrumbs */}
        <nav className="flex items-center text-sm font-medium">
          <Link
            to="/"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            Admin
          </Link>
          <span className="mx-2 text-slate-300 dark:text-slate-700">/</span>
          <span className="text-slate-800 dark:text-white font-semibold">
            {getPageTitle()}
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Search Bar */}
        <div className="relative hidden sm:block w-48 md:w-64">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <FiSearch className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search dashboard..."
            className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-lime-500/50 focus:border-lime-500 text-slate-900 dark:text-slate-100 transition-all"
          />
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
        >
          {isDark ? (
            <FiSun className="w-4.5 h-4.5" />
          ) : (
            <FiMoon className="w-4.5 h-4.5" />
          )}
        </button>

        {/* Notification Bell */}
        <Link
          to="/notifications"
          className="relative flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
        >
          <FiBell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
        </Link>

        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 hidden sm:block" />

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-1.5 rounded-lg transition-colors"
          >
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
              alt="Sarah Connor"
              className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
            />
            <FiChevronDown
              className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
            />
          </button>

          {profileOpen && (
            <>
              {/* Overlay transparent click-away handler */}
              <div
                onClick={() => setProfileOpen(false)}
                className="fixed inset-0 z-10"
              />
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-lg p-1.5 z-20 animate-fade-in">
                <Link
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  <FiUser className="w-4 h-4 text-slate-400" />
                  My Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  <FiSettings className="w-4 h-4 text-slate-400" />
                  Store Settings
                </Link>
                <div className="my-1.5 border-t border-slate-100 dark:border-slate-800/80" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 w-full text-left px-3 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors"
                >
                  <FiLogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
