"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import BentoGrid from "./BentoGrid";
import { Course, SidebarTab } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  Search, 
  Settings as SettingsIcon,
  Shield, 
  BookOpen, 
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  User,
  GraduationCap
} from "lucide-react";
import CourseTile from "./CourseTile";
import ActivityTile from "./ActivityTile";

interface DashboardShellProps {
  courses: Course[];
}

export default function DashboardShell({ courses }: DashboardShellProps) {
  const [activeTab, setActiveTab] = useState<SidebarTab>("dashboard");

  // Format current date
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Stagger variants for sub-tabs to ensure smooth entry flows
  const pageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18
      }
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.15 } }
  };

  // Render the body panel based on active tab selection
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <motion.div 
            key="dashboard" 
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="will-change-all transform-gpu"
          >
            <BentoGrid courses={courses} />
          </motion.div>
        );
      case "courses":
        return (
          <motion.div 
            key="courses" 
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6 will-change-all transform-gpu"
          >
            <header className="flex justify-between items-center bg-zinc-950 bg-opacity-30 p-6 rounded-3xl border border-surface-border backdrop-blur-md">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-accent-indigo" />
                  <span>Enrolled Course Curriculums</span>
                </h2>
                <p className="text-xs text-zinc-550 mt-1 font-semibold uppercase tracking-wider">
                  Real-time Supabase Data Synchronization
                </p>
              </div>
              <span className="text-xs font-bold text-accent-indigo bg-accent-indigo/10 border border-accent-indigo/20 px-3 py-1 rounded-full">
                {courses.length} Courses Enrolled
              </span>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseTile key={course.id} course={course} />
              ))}
            </div>
          </motion.div>
        );
      case "activity":
        return (
          <motion.div 
            key="activity" 
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6 will-change-all transform-gpu"
          >
            <ActivityTile />

            {/* Additional premium progress chart / metrics display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="glass-panel rounded-3xl p-6 bg-surface-card bg-opacity-40 backdrop-blur-md border border-surface-border">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-accent-cyan" />
                  <span>Weekly Study Velocity</span>
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Engineering Mathematics", progress: 88, hours: "12h" },
                    { label: "Advanced UI Engineering", progress: 95, hours: "18h" },
                    { label: "Computer Systems architecture", progress: 65, hours: "8.5h" },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-zinc-300">{item.label}</span>
                        <span className="text-accent-cyan">{item.hours}</span>
                      </div>
                      <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-800">
                        <div className="h-full bg-accent-cyan rounded-full" style={{ width: `${item.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="glass-panel rounded-3xl p-6 bg-surface-card bg-opacity-40 backdrop-blur-md border border-surface-border flex flex-col justify-between min-h-[220px]">
                <div>
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-accent-purple" />
                    <span>Active Milestones</span>
                  </h3>
                  <p className="text-xs text-zinc-450 leading-relaxed">
                    You are in the top <span className="text-accent-purple font-semibold">4%</span> of students on this campus! Keep your streak up to lock in elite certifications.
                  </p>
                </div>
                <div className="border-t border-surface-border/50 pt-4 flex justify-between items-center text-xs">
                  <span className="text-zinc-500 font-bold uppercase text-[9px] tracking-wider">Next unlock: Vercel Deploy Mastery</span>
                  <button className="group flex items-center gap-1 text-accent-purple font-semibold hover:text-white transition-colors duration-250">
                    <span>View certificate specs</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </section>
            </div>
          </motion.div>
        );
      case "settings":
        return (
          <motion.div 
            key="settings" 
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6 will-change-all transform-gpu"
          >
            <div className="glass-panel rounded-3xl p-6 bg-surface-card bg-opacity-40 backdrop-blur-md border border-surface-border space-y-6">
              <header className="border-b border-surface-border/50 pb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
                  <SettingsIcon className="h-5 w-5 text-zinc-400 animate-spin-slow" />
                  <span>Platform Preferences</span>
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  Fine-tune your dark-mode workspace, notifications, and integration APIs.
                </p>
              </header>

              <section className="space-y-4 max-w-xl">
                <div className="flex justify-between items-center py-2">
                  <div>
                    <label className="text-xs font-bold text-zinc-200 uppercase tracking-wide">Developer Mode Sandbox</label>
                    <p className="text-[11px] text-zinc-500">Auto-inject mocked data arrays when Supabase keys are blank.</p>
                  </div>
                  <div className="h-5 w-9 rounded-full bg-accent-indigo p-0.5 cursor-pointer flex justify-end">
                    <div className="h-4 w-4 bg-white rounded-full" />
                  </div>
                </div>

                <div className="flex justify-between items-center py-2 border-t border-surface-border/30">
                  <div>
                    <label className="text-xs font-bold text-zinc-200 uppercase tracking-wide">GPU Motion Acceleration</label>
                    <p className="text-[11px] text-zinc-500">Enforces will-change attributes on Framer Motion layer renderers.</p>
                  </div>
                  <div className="h-5 w-9 rounded-full bg-accent-indigo p-0.5 cursor-pointer flex justify-end">
                    <div className="h-4 w-4 bg-white rounded-full" />
                  </div>
                </div>

                <div className="flex justify-between items-center py-2 border-t border-surface-border/30">
                  <div>
                    <label className="text-xs font-bold text-zinc-200 uppercase tracking-wide">Supabase Database Sync</label>
                    <p className="text-[11px] text-zinc-500">Revalidate serverside course data caching on page navigations.</p>
                  </div>
                  <span className="text-[10px] font-bold text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                    AUTO-ENABLED
                  </span>
                </div>
              </section>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* 1. COLLAPSIBLE NAVIGATION SIDEBAR (Handles desktop, tablet, mobile layouts seamlessly) */}
      <Sidebar activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* 2. MAIN CORE VIEWPORT WRAPPER */}
      <main className="flex-1 flex flex-col p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full z-10">
        
        {/* Top Header Navigation panel (Includes search, date, updates notifications) */}
        <header className="flex justify-between items-center mb-8 border-b border-surface-border/30 pb-4 select-none">
          <div className="flex items-center gap-3">
            {/* Quick search input */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3.5 top-1/2 transform-gpu -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Press ⌘K to search..." 
                className="bg-zinc-950/80 border border-zinc-800/80 text-zinc-300 text-xs rounded-xl pl-10 pr-4 py-2 w-60 focus:outline-none focus:border-accent-indigo/60 transition duration-300"
              />
            </div>
            <div className="sm:hidden flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-accent-indigo" />
              <span className="text-xs font-black tracking-wider text-white">AETHERIS</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Today's Date */}
            <div className="text-zinc-550 text-xs font-semibold flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-zinc-500" />
              <span>{formattedDate}</span>
            </div>

            {/* Notification trigger with accent animation */}
            <button 
              className="relative h-9 w-9 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition duration-300 focus:outline-none"
              aria-label="View notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent-cyan shadow-glow" />
            </button>

            {/* Compact user header avatar */}
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-accent-indigo to-accent-purple p-[1px] cursor-pointer hover:scale-105 transition-transform duration-250 select-none">
              <div className="h-full w-full bg-zinc-950 rounded-[11px] flex items-center justify-center text-zinc-400">
                <User className="h-4 w-4 text-zinc-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Tab body viewport rendered dynamically inside Framer Motion AnimatePresence wrapper */}
        <section className="flex-1">
          <AnimatePresence mode="wait">
            {renderTabContent()}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
