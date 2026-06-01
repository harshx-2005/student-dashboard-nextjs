"use client";

import React from "react";
import { Flame, Sparkles, Trophy, ArrowRight } from "lucide-react";

export default function HeroTile() {
  return (
    <article 
      className="glass-panel relative rounded-3xl p-8 flex flex-col justify-between overflow-hidden bg-zinc-950 bg-opacity-40 backdrop-blur-md border border-surface-border min-h-[220px] will-change-transform transform-gpu select-none"
      aria-label="Welcome Hero"
    >
      {/* 1. GPU-Accelerated Animating Mesh Gradient Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-accent-indigo/20 via-accent-purple/10 to-accent-cyan/15 opacity-40 mix-blend-screen pointer-events-none" 
        style={{
          background: "radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15), transparent 50%), radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.12), transparent 50%)"
        }}
      />

      {/* Floating Particle Stars using scale & translate only (No CLS) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 z-0">
        <div 
          className="absolute h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" 
          style={{ top: "15%", left: "45%", transform: "translate3d(0,0,0)" }} 
        />
        <div 
          className="absolute h-2 w-2 rounded-full bg-accent-purple animate-pulse" 
          style={{ top: "65%", left: "15%", animationDelay: "0.5s", transform: "translate3d(0,0,0)" }} 
        />
        <div 
          className="absolute h-1 w-1 rounded-full bg-accent-indigo animate-pulse" 
          style={{ top: "40%", left: "85%", animationDelay: "1s", transform: "translate3d(0,0,0)" }} 
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 z-10">
        {/* Welcome Text Header */}
        <header className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-indigo/10 px-3 py-1 border border-accent-indigo/20 text-[10px] font-semibold text-accent-indigo uppercase tracking-wider">
            <Sparkles className="h-3 w-3 text-accent-indigo" />
            <span>Autumn Term 2026</span>
          </div>
          
          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text">
            Welcome back, Student
          </h1>
          <p className="text-zinc-400 text-sm max-w-md font-medium leading-relaxed">
            You've achieved <span className="text-accent-cyan font-semibold">85%</span> of your weekly engineering goals. Your next learning milestone is ready.
          </p>
        </header>

        {/* Streak & Achievement pill */}
        <section 
          className="flex items-center gap-4 bg-zinc-900/60 backdrop-blur-md rounded-2xl p-4 border border-zinc-800/80 shadow-glow select-none group will-change-transform transform-gpu"
          aria-label="Streak Stats"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-full blur opacity-45 group-hover:opacity-75 transition duration-500 will-change-opacity" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 border border-orange-500/30">
              <Flame className="h-6 w-6 text-orange-500 fill-orange-500/20" />
            </div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
              Learning Streak
            </div>
            <div className="text-xl font-black text-white tracking-tight flex items-baseline gap-1">
              17 Days
            </div>
            <div className="text-[9px] font-semibold text-orange-400 flex items-center gap-0.5 mt-0.5">
              <Trophy className="h-2.5 w-2.5" /> Next reward at 20 days
            </div>
          </div>
        </section>
      </div>

      {/* Hero CTA button / footer link */}
      <footer className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-surface-border/30 pt-4 z-10 text-xs">
        <span className="text-zinc-500 font-semibold tracking-wide uppercase text-[10px]">
          RECOMMENDED PATHWAY: NEXT.JS APP ROUTER MASTERY
        </span>
        <button 
          suppressHydrationWarning
          className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 font-bold text-zinc-950 hover:bg-zinc-200 transition-colors shadow-glow-white border border-transparent outline-none focus:ring-2 focus:ring-accent-indigo focus:ring-offset-2 focus:ring-offset-black text-xs"
          aria-label="Resume learning pathway"
        >
          <span>Resume Module</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
        </button>
      </footer>
    </article>
  );
}
