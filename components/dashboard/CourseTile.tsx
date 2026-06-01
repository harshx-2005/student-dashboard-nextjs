"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Code2, 
  Layers, 
  Shield, 
  Zap, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Course } from "@/types";
import { cn } from "@/lib/utils";

interface CourseTileProps {
  course: Course;
}

export default function CourseTile({ course }: CourseTileProps) {
  // Helper to map icon name to corresponding Lucide React components
  const renderIcon = (name: string) => {
    const props = {
      className: "h-5 w-5",
      strokeWidth: 1.5,
    };

    switch (name) {
      case "Code2":
        return <Code2 {...props} className="text-accent-indigo" />;
      case "Layers":
        return <Layers {...props} className="text-accent-purple" />;
      case "Shield":
        return <Shield {...props} className="text-accent-cyan" />;
      case "Zap":
        return <Zap {...props} className="text-orange-400" />;
      default:
        return <Code2 {...props} className="text-accent-indigo" />;
    }
  };

  // Map dynamic accent styles based on the course icon for harmonic neon glow aesthetics
  const getThemeColorClass = (name: string) => {
    switch (name) {
      case "Code2":
        return "from-accent-indigo/20 to-accent-indigo/5 hover:border-accent-indigo/30 shadow-glow hover:shadow-indigo-500/10";
      case "Layers":
        return "from-accent-purple/20 to-accent-purple/5 hover:border-accent-purple/30 shadow-glow-purple hover:shadow-purple-500/10";
      case "Shield":
        return "from-accent-cyan/20 to-accent-cyan/5 hover:border-accent-cyan/30 shadow-glow-cyan hover:shadow-cyan-500/10";
      case "Zap":
        return "from-orange-500/20 to-orange-500/5 hover:border-orange-500/30 shadow-glow hover:shadow-orange-500/10";
      default:
        return "from-accent-indigo/20 to-accent-indigo/5 hover:border-accent-indigo/30";
    }
  };

  const themeClass = getThemeColorClass(course.icon_name);

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "glass-panel rounded-3xl p-6 flex flex-col justify-between overflow-hidden bg-surface-card bg-opacity-40 backdrop-blur-md border border-surface-border min-h-[200px] will-change-transform transform-gpu select-none cursor-pointer relative",
        themeClass
      )}
      aria-label={`Course: ${course.title}`}
    >
      {/* Subtle background radial glow mesh */}
      <div 
        className="absolute -right-16 -bottom-16 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background: course.icon_name === "Code2" ? "rgba(99, 102, 241, 0.15)" :
                      course.icon_name === "Layers" ? "rgba(168, 85, 247, 0.15)" :
                      course.icon_name === "Shield" ? "rgba(6, 182, 212, 0.15)" : "rgba(249, 115, 22, 0.15)"
        }}
      />

      {/* Header containing the dynamic lucide icon & standard options */}
      <div className="flex justify-between items-start z-10">
        <div className="h-10 w-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner">
          {renderIcon(course.icon_name)}
        </div>
        {course.progress === 100 ? (
          <div className="flex items-center gap-1 text-[9px] font-bold text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
            <Sparkles className="h-2.5 w-2.5" />
            <span>Mastered</span>
          </div>
        ) : (
          <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
            In Progress
          </span>
        )}
      </div>

      {/* Main course title and details */}
      <div className="my-5 z-10">
        <h2 className="text-base font-bold text-zinc-100 group-hover:text-white tracking-tight line-clamp-2 leading-snug">
          {course.title}
        </h2>
      </div>

      {/* Footer containing animated progress metrics */}
      <div className="space-y-3 z-10">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-zinc-500">Progress</span>
          <span className="text-zinc-200">{course.progress}%</span>
        </div>
        
        {/* Progress bar container */}
        <div 
          className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden relative border border-zinc-800"
          aria-hidden="true"
        >
          {/* 
            PERFORMANCE RULES COMPLIANCE:
            Rather than animating 'width' (which forces layout shifts and CPU reflows), 
            we set the bar to full width ('w-full') and animate its 'scaleX' transformation.
            We use 'origin-left' and Framer Motion spring transitions to achieve buttery-smooth 
            60 FPS GPU-accelerated completion.
          */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: course.progress / 100 }}
            transition={{ type: "spring", stiffness: 90, damping: 15, delay: 0.2 }}
            style={{ originX: 0 }}
            className={cn(
              "h-full rounded-full will-change-transform transform-gpu",
              course.icon_name === "Code2" ? "bg-gradient-to-r from-accent-indigo to-accent-purple" :
              course.icon_name === "Layers" ? "bg-gradient-to-r from-accent-purple to-accent-indigo" :
              course.icon_name === "Shield" ? "bg-gradient-to-r from-accent-cyan to-accent-indigo" :
              "bg-gradient-to-r from-orange-500 to-amber-500"
            )}
          />
        </div>

        <div className="flex justify-between items-center text-[10px] text-zinc-500 pt-1 font-medium">
          <span>{course.progress === 100 ? "Completed" : "8 modules left"}</span>
          <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </motion.article>
  );
}
