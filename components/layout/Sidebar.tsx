"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  BookOpen, 
  Activity, 
  Settings, 
  GraduationCap, 
  LogOut,
  User,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarItem, SidebarTab } from "@/types";

interface SidebarProps {
  activeTab: SidebarTab;
  onChangeTab: (tab: SidebarTab) => void;
}

export default function Sidebar({ activeTab, onChangeTab }: SidebarProps) {
  const menuItems: SidebarItem[] = [
    { id: "dashboard", label: "Dashboard", iconName: "LayoutDashboard" },
    { id: "courses", label: "Courses", iconName: "BookOpen" },
    { id: "activity", label: "Activity", iconName: "Activity" },
    { id: "settings", label: "Settings", iconName: "Settings" },
  ];

  // Helper to render the appropriate Lucide Icon dynamically
  const renderIcon = (name: string, isActive: boolean) => {
    const props = {
      className: cn(
        "h-5 w-5 transition-colors duration-200",
        isActive 
          ? "text-accent-indigo transform-gpu" 
          : "text-zinc-400 group-hover:text-zinc-200"
      ),
      strokeWidth: 1.5,
    };

    switch (name) {
      case "LayoutDashboard":
        return <LayoutDashboard {...props} />;
      case "BookOpen":
        return <BookOpen {...props} />;
      case "Activity":
        return <Activity {...props} />;
      case "Settings":
        return <Settings {...props} />;
      default:
        return <LayoutDashboard {...props} />;
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* DESKTOP SIDEBAR (Visible on lg viewports: 1024px+)                         */}
      {/* ========================================================================= */}
      <aside 
        className="hidden lg:flex flex-col w-64 h-screen border-r border-surface-border bg-background bg-opacity-40 backdrop-blur-md sticky top-0 p-6 will-change-transform transform-gpu select-none"
        aria-label="Desktop primary navigation"
      >
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 px-2 py-4 mb-8">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-accent-indigo via-accent-purple to-accent-cyan p-[1.5px] shadow-glow">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-background">
              <GraduationCap className="h-5 w-5 text-accent-indigo" />
            </div>
          </div>
          <div>
            <span className="font-semibold tracking-wider bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent text-sm">
              AETHERIS
            </span>
            <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">
              LMS Platform
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                suppressHydrationWarning
                onClick={() => onChangeTab(item.id)}
                className={cn(
                  "group relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200 outline-none focus:ring-1 focus:ring-accent-indigo/40",
                  isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                )}
                aria-label={`Navigate to ${item.label}`}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Active Backdrop Highlight with LayoutId snapping */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicatorDesktop"
                    className="absolute inset-0 bg-gradient-to-r from-accent-indigo/10 to-accent-purple/5 border-l-[3px] border-accent-indigo rounded-r-xl rounded-l-sm transform-gpu will-change-all"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                
                {/* Icon & Label */}
                <div className="z-10 flex items-center gap-3">
                  {renderIcon(item.iconName, isActive)}
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* User profile footer section */}
        <div className="border-t border-surface-border pt-4 mt-auto">
          <div className="flex items-center gap-3 p-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-zinc-700 flex items-center justify-center shadow-inner">
              <User className="h-5 w-5 text-zinc-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-zinc-200 truncate">Alex Sterling</p>
              <p className="text-[10px] text-zinc-500 truncate">alex.s@aetheris.edu</p>
            </div>
            <button 
              suppressHydrationWarning
              className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded-lg hover:bg-zinc-900 transition-colors"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* TABLET SIDEBAR - COLLAPSED TO ICONS (Visible on md only: 768px - 1023px)  */}
      {/* ========================================================================= */}
      <aside 
        className="hidden md:flex lg:hidden flex-col w-20 h-screen border-r border-surface-border bg-background bg-opacity-40 backdrop-blur-md sticky top-0 p-4 items-center will-change-transform transform-gpu select-none"
        aria-label="Tablet primary navigation"
      >
        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-accent-indigo to-accent-purple p-[1.5px] mb-8 mt-2 shadow-glow">
          <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-background">
            <GraduationCap className="h-5 w-5 text-accent-indigo" />
          </div>
        </div>

        <nav className="flex-1 space-y-4 w-full flex flex-col items-center">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                suppressHydrationWarning
                onClick={() => onChangeTab(item.id)}
                className={cn(
                  "group relative p-3 rounded-xl transition-colors duration-200 outline-none focus:ring-1 focus:ring-accent-indigo/40 flex justify-center",
                  isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                )}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicatorTablet"
                    className="absolute inset-0 bg-accent-indigo/10 border-l-[3px] border-accent-indigo rounded-r-lg rounded-l-sm transform-gpu will-change-all"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <div className="z-10">{renderIcon(item.iconName, isActive)}</div>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto w-full flex flex-col items-center gap-4 pt-4 border-t border-surface-border">
          <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shadow-inner">
            <User className="h-4 w-4 text-zinc-400" />
          </div>
          <button 
            suppressHydrationWarning
            className="text-zinc-500 hover:text-zinc-300 p-2 rounded-xl hover:bg-zinc-900 transition-colors"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MOBILE BOTTOM NAVIGATION (Visible on mobile viewports: <768px)          */}
      {/* ========================================================================= */}
      <nav 
        className="flex md:hidden fixed bottom-0 left-0 right-0 h-16 border-t border-surface-border bg-zinc-950 bg-opacity-80 backdrop-blur-xl z-50 px-4 items-center justify-around will-change-transform transform-gpu select-none"
        aria-label="Mobile bottom navigation"
      >
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              suppressHydrationWarning
              onClick={() => onChangeTab(item.id)}
              className={cn(
                "group relative py-1 px-3 flex flex-col items-center justify-center transition-colors duration-200 outline-none",
                isActive ? "text-white" : "text-zinc-400"
              )}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicatorMobile"
                  className="absolute -top-1 px-5 py-[1.5px] bg-accent-indigo rounded-full shadow-glow transform-gpu will-change-all"
                  style={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              
              {renderIcon(item.iconName, isActive)}
              <span className="text-[9px] font-medium tracking-wide mt-1 uppercase">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
