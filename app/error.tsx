"use client";

import React, { useEffect } from "react";
import { AlertOctagon, RefreshCw, Home, ArrowLeft } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an analytics or error tracking service
    console.error("Dashboard caught boundary error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-background select-none">
      {/* Background ambient mesh */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.15), transparent 50%)",
          filter: "blur(60px)"
        }}
      />

      {/* Main glass dialog card */}
      <main className="glass-panel max-w-md w-full rounded-3xl p-8 bg-zinc-950 bg-opacity-50 backdrop-blur-xl border border-red-500/10 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-500 via-orange-500 to-red-500 opacity-60" />
        
        {/* Error icon header */}
        <header className="flex flex-col items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-lg shadow-red-500/5 animate-pulse-slow">
            <AlertOctagon className="h-7 w-7 text-red-500" strokeWidth={1.5} />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-extrabold tracking-tight text-white">
              Data Synchronization Interrupted
            </h1>
            <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">
              Security & Fetch Boundary Captured
            </p>
          </div>
        </header>

        {/* Dynamic message */}
        <section className="my-6">
          <p className="text-xs text-zinc-400 leading-relaxed font-medium bg-zinc-900/40 p-4 rounded-xl border border-zinc-900">
            {error.message || "An unexpected error occurred during database communications. This could be due to invalid credentials, network latency, or an unapplied schema configuration."}
          </p>
          {error.digest && (
            <p className="text-[9px] text-zinc-650 font-mono mt-2 tracking-wide uppercase">
              Digest signature: {error.digest}
            </p>
          )}
        </section>

        {/* Action recovery buttons */}
        <footer className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <button
            onClick={() => reset()}
            className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 font-bold text-zinc-950 hover:bg-zinc-200 transition-colors shadow-glow-white border border-transparent outline-none text-xs"
            aria-label="Retry loading data"
          >
            <RefreshCw className="h-3.5 w-3.5 group-hover:rotate-185 transition-transform duration-300" />
            <span>Sync Connection</span>
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 px-5 py-2.5 font-bold text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors outline-none text-xs"
            aria-label="Refresh application window"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Refresh Window</span>
          </button>
        </footer>
      </main>
    </div>
  );
}
