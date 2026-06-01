import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* 1. SIDEBAR SKELETON (Hidden on mobile, icons on tablet, full on desktop) */}
      <aside 
        className="hidden md:flex flex-col w-20 lg:w-64 h-screen border-r border-surface-border bg-background p-6 space-y-8 select-none"
        aria-hidden="true"
      >
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl shimmer-shine shrink-0" />
          <div className="hidden lg:block h-4 w-28 rounded-lg shimmer-shine" />
        </div>

        <div className="flex-1 space-y-4 pt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 py-2 px-1">
              <div className="h-6 w-6 rounded-lg shimmer-shine shrink-0" />
              <div className="hidden lg:block h-3.5 w-24 rounded-lg shimmer-shine" />
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3 border-t border-surface-border/50 pt-4">
          <div className="h-9 w-9 rounded-full shimmer-shine shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3 w-16 rounded-md shimmer-shine" />
            <div className="h-2.5 w-24 rounded-md shimmer-shine" />
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTAINER SKELETON */}
      <main 
        className="flex-1 flex flex-col p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full z-10"
        aria-hidden="true"
      >
        {/* Top Header skeleton */}
        <header className="flex justify-between items-center mb-8 border-b border-surface-border/30 pb-4">
          <div className="hidden sm:block h-8 w-60 rounded-xl shimmer-shine" />
          <div className="sm:hidden h-5 w-24 rounded-lg shimmer-shine" />
          
          <div className="flex items-center gap-4">
            <div className="h-4 w-32 rounded-lg shimmer-shine" />
            <div className="h-9 w-9 rounded-xl shimmer-shine" />
            <div className="h-9 w-9 rounded-xl shimmer-shine" />
          </div>
        </header>

        {/* Bento Grid Skeleton matching layout dimensions exactly (No CLS) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
          
          {/* Large Hero Tile Skeleton (spans 2 cols on lg) */}
          <div className="lg:col-span-2 glass-panel rounded-3xl p-8 bg-surface-card bg-opacity-40 backdrop-blur-md border border-surface-border min-h-[220px] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-4.5 w-32 rounded-full shimmer-shine" />
              <div className="h-8 w-64 rounded-xl shimmer-shine" />
              <div className="h-3 w-80 rounded-lg shimmer-shine" />
            </div>
            <div className="flex justify-between items-center pt-8">
              <div className="h-3 w-40 rounded-md shimmer-shine" />
              <div className="h-8 w-32 rounded-full shimmer-shine" />
            </div>
          </div>

          {/* Stats Metric Tile Skeleton (spans 1 col) */}
          <div className="glass-panel rounded-3xl p-6 bg-surface-card bg-opacity-40 backdrop-blur-md border border-surface-border min-h-[220px] flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="h-3.5 w-24 rounded-md shimmer-shine" />
              <div className="h-4 w-4 rounded shimmer-shine" />
            </div>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <div className="h-2 w-16 rounded shimmer-shine" />
                <div className="h-6 w-20 rounded-md shimmer-shine" />
              </div>
              <div className="space-y-2">
                <div className="h-2 w-16 rounded shimmer-shine" />
                <div className="h-6 w-20 rounded-md shimmer-shine" />
              </div>
            </div>
            <div className="border-t border-surface-border/50 pt-3 flex justify-between">
              <div className="h-3.5 w-16 rounded shimmer-shine" />
              <div className="h-3.5 w-16 rounded shimmer-shine" />
            </div>
          </div>

          {/* Dynamic Course Tiles Skeleton (4 cards) */}
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className="glass-panel rounded-3xl p-6 bg-surface-card bg-opacity-40 backdrop-blur-md border border-surface-border min-h-[200px] flex flex-col justify-between"
            >
              <div className="flex justify-between items-center">
                <div className="h-10 w-10 rounded-xl shimmer-shine" />
                <div className="h-4 w-16 rounded-full shimmer-shine" />
              </div>
              <div className="my-5">
                <div className="h-5 w-48 rounded-lg shimmer-shine" />
              </div>
              <div className="space-y-3">
                <div className="h-3 w-12 rounded shimmer-shine" />
                <div className="w-full h-2 rounded-full shimmer-shine" />
                <div className="flex justify-between">
                  <div className="h-2.5 w-20 rounded shimmer-shine" />
                  <div className="h-3 w-3 rounded shimmer-shine" />
                </div>
              </div>
            </div>
          ))}

          {/* Activity Heatmap Skeleton (spans all 3 cols on lg) */}
          <div className="lg:col-span-3 glass-panel rounded-3xl p-6 bg-surface-card bg-opacity-40 backdrop-blur-md border border-surface-border min-h-[200px] flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl shimmer-shine" />
                <div className="space-y-1">
                  <div className="h-4.5 w-36 rounded-md shimmer-shine" />
                  <div className="h-3 w-48 rounded-md shimmer-shine" />
                </div>
              </div>
              <div className="h-3 w-28 rounded-md shimmer-shine" />
            </div>
            
            <div className="h-20 w-full rounded-2xl shimmer-shine" />

            <div className="mt-4 flex justify-between items-center border-t border-surface-border/20 pt-3">
              <div className="h-3.5 w-40 rounded shimmer-shine" />
              <div className="h-3.5 w-24 rounded shimmer-shine" />
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
