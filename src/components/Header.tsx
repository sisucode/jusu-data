"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b border-slate-700/60 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo – replace with generated asset once exported to /public/assets */}
            <div className="relative h-9 w-9 shrink-0">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-amber-400 via-yellow-300 to-lime-400 opacity-90 blur-[2px]" />
              <div className="relative flex h-full w-full items-center justify-center rounded-lg bg-slate-900 border border-amber-400/40">
                <span className="text-sm font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-lime-400">
                  JD
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                JUSU<span className="text-lime-400">-DATA</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                Trav Edge Engine · V2.0
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 px-3 py-1 border border-slate-700">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-pulse" />
              Live Mock Mode
            </span>
            <span className="font-mono text-slate-500">ATG Fallback</span>
          </div>
        </div>
      </div>
    </header>
  );
}
