"use client";

import React from "react";
import { Course } from "@/types";
import HeroTile from "./HeroTile";
import CourseTile from "./CourseTile";
import ActivityTile from "./ActivityTile";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Award, 
  Clock, 
  BookOpen 
} from "lucide-react";

interface BentoGridProps {
  courses: Course[];
}

export default function BentoGrid({ courses }: BentoGridProps) {
  // Staggered child variants for entrance reveal sequence
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
  };

  // Compute stats based on course list
  const activeCoursesCount = courses.filter(c => c.progress > 0 && c.progress < 100).length;
  const completedCoursesCount = courses.filter(c => c.progress === 100).length;
  const overallAvgProgress = Math.round(
    courses.reduce((acc, curr) => acc + curr.progress, 0) / (courses.length || 1)
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1 pb-10"
    >
      {/* 1. HERO TILE (spans 2 columns on large screen, 1 row) */}
      <motion.div variants={itemVariants} className="lg:col-span-2">
        <HeroTile />
      </motion.div>

      {/* 2. STATS OVERVIEW BENTO TILE (spans 1 column on large screen, 1 row) */}
      <motion.div 
        variants={itemVariants} 
        className="glass-panel rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden bg-surface-card bg-opacity-40 backdrop-blur-md border border-surface-border min-h-[220px] will-change-transform transform-gpu"
      >
        {/* Glow accent */}
        <div className="absolute -right-16 -top-16 w-32 h-32 bg-accent-purple/10 rounded-full blur-2xl pointer-events-none" />
        
        <header className="flex justify-between items-center z-10">
          <h3 className="text-zinc-400 text-xs font-semibold tracking-wider uppercase">Learning Metrics</h3>
          <TrendingUp className="h-4 w-4 text-accent-purple" />
        </header>

        <section className="grid grid-cols-2 gap-4 my-auto z-10 pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase font-medium tracking-wide">Completion</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold tracking-tight text-white">{overallAvgProgress}%</span>
              <span className="text-[10px] text-zinc-400">avg</span>
            </div>
            <div className="w-full bg-zinc-800/80 h-1 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-accent-purple to-accent-indigo h-full rounded-full" 
                style={{ width: `${overallAvgProgress}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase font-medium tracking-wide">Study Time</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold tracking-tight text-white">34.8</span>
              <span className="text-[10px] text-zinc-400">hours</span>
            </div>
            <span className="text-[9px] text-zinc-500 mt-2 flex items-center gap-1">
              <Clock className="h-3 w-3 text-accent-cyan" /> +3.4h this week
            </span>
          </div>
        </section>

        <footer className="border-t border-surface-border/50 pt-3 flex justify-between text-[11px] text-zinc-400 z-10">
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5 text-accent-indigo" />
            <span>{activeCoursesCount} Active</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-3.5 w-3.5 text-accent-cyan" />
            <span>{completedCoursesCount} Mastered</span>
          </div>
        </footer>
      </motion.div>

      {/* 3. DYNAMIC COURSE TILES (spans 1 column each on large screen) */}
      {courses.map((course) => (
        <motion.div key={course.id} variants={itemVariants} className="col-span-1">
          <CourseTile course={course} />
        </motion.div>
      ))}

      {/* 4. ACTIVITY HEATMAP TILE (spans all 3 columns on large screen for premium spacing) */}
      <motion.div variants={itemVariants} className="lg:col-span-3">
        <ActivityTile />
      </motion.div>
    </motion.div>
  );
}
