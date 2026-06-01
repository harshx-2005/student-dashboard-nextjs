"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Info, Sparkles } from "lucide-react";

interface HeatmapDay {
  date: string;
  count: number; // 0, 1, 2, or 3 representing progress intensity
  hours: number;
}

export default function ActivityTile() {
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [data, setData] = useState<HeatmapDay[][]>([]);
  const [mounted, setMounted] = useState(false);

  // Generate 24 weeks of contribution data (168 days)
  const generateHeatmapData = (): HeatmapDay[][] => {
    const weeks: HeatmapDay[][] = [];
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - 168); // Go back 24 weeks

    for (let w = 0; w < 24; w++) {
      const week: HeatmapDay[] = [];
      for (let d = 0; d < 7; d++) {
        const currentDate = new Date(baseDate);
        currentDate.setDate(baseDate.getDate() + (w * 7 + d));
        
        // Random study progress biased towards higher counts on weekdays
        const dayOfWeek = currentDate.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const rand = Math.random();
        
        let count = 0;
        let hours = 0;
        
        if (isWeekend) {
          if (rand > 0.7) {
            count = 1;
            hours = Math.round(rand * 2);
          }
        } else {
          if (rand > 0.8) {
            count = 3;
            hours = Math.round(4 + rand * 4);
          } else if (rand > 0.4) {
            count = 2;
            hours = Math.round(2 + rand * 2.5);
          } else if (rand > 0.15) {
            count = 1;
            hours = Math.round(0.5 + rand * 1.5);
          }
        }

        week.push({
          date: currentDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          count,
          hours,
        });
      }
      weeks.push(week);
    }
    return weeks;
  };

  useEffect(() => {
    setData(generateHeatmapData());
    setMounted(true);
  }, []);

  // Handle tooltip positions dynamically
  const handleMouseEnter = (e: React.MouseEvent, day: HeatmapDay) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const container = e.currentTarget.closest(".heatmap-container")?.getBoundingClientRect();
    
    if (container) {
      setTooltipPos({
        x: rect.left - container.left + rect.width / 2,
        y: rect.top - container.top - 42,
      });
    }
    setHoveredDay(day);
  };

  // Color mappings for modern glass heatmap levels
  const getLevelColor = (count: number) => {
    switch (count) {
      case 0:
        return "bg-zinc-900 border-zinc-800/40 hover:bg-zinc-800"; // None
      case 1:
        return "bg-accent-indigo/25 border-accent-indigo/10 hover:bg-accent-indigo/40 hover:shadow-[0_0_8px_rgba(99,102,241,0.3)]"; // Light
      case 2:
        return "bg-accent-indigo/60 border-accent-indigo/30 hover:bg-accent-indigo/70 hover:shadow-[0_0_12px_rgba(99,102,241,0.5)]"; // Medium
      case 3:
        return "bg-gradient-to-tr from-accent-indigo to-accent-purple border-accent-purple/40 hover:brightness-110 hover:shadow-[0_0_16px_rgba(168,85,247,0.7)]"; // Intensive
      default:
        return "bg-zinc-900";
    }
  };

  return (
    <article 
      className="glass-panel rounded-3xl p-6 relative overflow-hidden bg-surface-card bg-opacity-40 backdrop-blur-md border border-surface-border select-none will-change-transform transform-gpu"
      aria-label="Student Learning Heatmap"
    >
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-zinc-900 border border-zinc-850 flex items-center justify-center shadow-inner">
            <Calendar className="h-5 w-5 text-accent-indigo" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5">
              <span>Learning Consistency</span>
              <span className="text-[10px] font-bold text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5">
                <Sparkles className="h-2.5 w-2.5" /> High
              </span>
            </h3>
            <p className="text-[11px] text-zinc-500 font-semibold tracking-wide uppercase mt-0.5">
              GitHub-Style Activity heatmap
            </p>
          </div>
        </div>

        {/* Legend */}
        <section className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-semibold">
          <span>Less</span>
          <div className="h-2.5 w-2.5 rounded-[2px] bg-zinc-900 border border-zinc-800" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-accent-indigo/25 border border-accent-indigo/10" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-accent-indigo/60 border border-accent-indigo/30" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-gradient-to-tr from-accent-indigo to-accent-purple" />
          <span>More</span>
        </section>
      </header>

      {/* Grid Container wrapper for responsive clipping */}
      <section className="heatmap-container relative overflow-x-auto py-2 scrollbar-none">
        {/* Tooltip Popup inside grid (will-change opacity/transform only) */}
        {hoveredDay && (
          <div 
            className="absolute z-30 px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-[10px] text-zinc-200 font-medium shadow-glow flex flex-col items-center pointer-events-none transform-gpu -translate-x-1/2 will-change-all transition-all duration-150"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y,
            }}
          >
            <span className="font-bold text-white">
              {hoveredDay.hours === 0 ? "No activity" : `${hoveredDay.hours} hours`}
            </span>
            <span className="text-[9px] text-zinc-500 font-semibold mt-0.5">{hoveredDay.date}</span>
            <div className="absolute -bottom-1 left-1/2 transform-gpu -translate-x-1/2 w-2 h-2 bg-zinc-950 border-r border-b border-zinc-800 rotate-45" />
          </div>
        )}

        {/* Heatmap grid */}
        <div className="flex gap-[4px] min-w-max justify-between">
          {/* Days labels */}
          <div className="flex flex-col justify-around text-[9px] font-bold text-zinc-650 pr-2 pb-1">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* Grid columns: Map 24 weeks on desktop, responsive tailwind adjusts elsewhere */}
          <div className="flex gap-[5px]">
            {mounted ? (
              data.map((week, wIndex) => {
                // Hide older weeks on tablet and mobile to ensure bento stays fully inside container grid without scrolling
                let displayClass = "flex flex-col gap-[5px]";
                if (wIndex < 8) {
                  displayClass = "hidden lg:flex flex-col gap-[5px]"; // Only visible on large screens
                } else if (wIndex < 12) {
                  displayClass = "hidden md:flex flex-col gap-[5px]"; // Visible on medium+
                }
                
                return (
                  <div key={wIndex} className={displayClass}>
                    {week.map((day, dIndex) => (
                      <div
                        key={dIndex}
                        onMouseEnter={(e) => handleMouseEnter(e, day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`h-[11px] w-[11px] sm:h-[13px] sm:w-[13px] rounded-[3px] border transition-all duration-200 cursor-pointer transform-gpu ${getLevelColor(
                          day.count
                        )}`}
                        role="gridcell"
                        aria-label={`${day.hours} hours learned on ${day.date}`}
                      />
                    ))}
                  </div>
                );
              })
            ) : (
              Array.from({ length: 24 }).map((_, wIndex) => {
                let displayClass = "flex flex-col gap-[5px]";
                if (wIndex < 8) {
                  displayClass = "hidden lg:flex flex-col gap-[5px]";
                } else if (wIndex < 12) {
                  displayClass = "hidden md:flex flex-col gap-[5px]";
                }
                return (
                  <div key={wIndex} className={displayClass}>
                    {Array.from({ length: 7 }).map((_, dIndex) => (
                      <div
                        key={dIndex}
                        className="h-[11px] w-[11px] sm:h-[13px] sm:w-[13px] rounded-[3px] border bg-zinc-900 border-zinc-800/40"
                      />
                    ))}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      <footer className="mt-4 flex items-center justify-between text-[10px] text-zinc-500 border-t border-surface-border/20 pt-3 font-medium">
        <div className="flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5 text-accent-indigo" />
          <span>Calculated across your active terms</span>
        </div>
        <span className="font-bold text-zinc-400">Streak: 17 days</span>
      </footer>
    </article>
  );
}
