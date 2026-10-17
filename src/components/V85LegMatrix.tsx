"use client";

import { useState, useCallback } from "react";
import type { RaceLeg, Horse } from "@/types";
import { enrichField } from "@/lib/calculateValue";
import HorseRow from "./HorseRow";

interface Props {
  legs: RaceLeg[];
}

export default function V85LegMatrix({ legs }: Props) {
  // Local mutable copy so toggles recalculate instantly
  const [localLegs, setLocalLegs] = useState(() =>
    legs.map((leg) => ({
      ...leg,
      horses: enrichField(leg.horses),
    }))
  );
  const [activeTab, setActiveTab] = useState(0);

  const handleToggle = useCallback(
    (legIndex: number, horseId: string, key: "earlySpeed" | "trainerWarning") => {
      setLocalLegs((prev) => {
        const next = [...prev];
        const leg = { ...next[legIndex] };
        leg.horses = leg.horses.map((h) => {
          if (h.id !== horseId) return h;
          const toggled: Horse = { ...h, [key]: !h[key] };
          return enrichField([toggled])[0];
        });
        next[legIndex] = leg;
        return next;
      });
    },
    []
  );

  const current = localLegs[activeTab];

  return (
    <section className="rounded-2xl border border-slate-700/70 bg-slate-900/60 overflow-hidden shadow-xl shadow-black/30">
      {/* Tab bar */}
      <div className="flex overflow-x-auto border-b border-slate-700/80 bg-slate-950/80 scrollbar-thin">
        {localLegs.map((leg, i) => {
          const goldenCount = leg.horses.filter(
            (h) => h.valueRatio != null && h.valueRatio >= 1.15 && h.poolPct >= 5
          ).length;
          return (
            <button
              key={leg.leg}
              type="button"
              onClick={() => setActiveTab(i)}
              className={`relative flex shrink-0 flex-col items-center px-4 py-3 text-sm font-medium transition-colors min-w-[88px] ${
                activeTab === i
                  ? "text-white bg-slate-800/80"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider text-slate-500">
                Leg
              </span>
              <span className="text-base font-bold">{leg.leg}</span>
              {goldenCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-lime-500 text-[9px] font-bold text-slate-950">
                  {goldenCount}
                </span>
              )}
              {activeTab === i && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Race header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/50">
        <div>
          <h3 className="text-sm font-semibold text-white">{current.raceName}</h3>
          <p className="text-xs text-slate-400">
            {current.distance} m · {current.horses.length} runners
          </p>
        </div>
        <div className="text-right text-xs text-slate-500">
          <span className="font-mono">
            {current.horses.filter((h) => h.poolPct >= 5).length} live ·{" "}
            {current.horses.filter((h) => h.poolPct < 5).length} noise
          </span>
        </div>
      </div>

      {/* Data table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] uppercase tracking-wider text-slate-500">
              <th className="px-3 py-2.5 text-center font-medium w-14">Post</th>
              <th className="px-3 py-2.5 font-medium">Horse / Driver</th>
              <th className="px-3 py-2.5 text-right font-medium w-20">Pool %</th>
              <th className="px-3 py-2.5 text-right font-medium w-24">
                Model Prob
              </th>
              <th className="px-3 py-2.5 text-right font-medium w-20">Value</th>
              <th className="px-3 py-2.5 text-right font-medium w-36">
                Recalc Toggles
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {current.horses.map((horse) => (
              <HorseRow
                key={horse.id}
                horse={horse}
                onToggle={(id, key) => handleToggle(activeTab, id, key)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 px-4 py-3 border-t border-slate-800 bg-slate-950/50 text-[10px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-lime-500/40 border border-lime-400" />
          Golden Nugget ≥ 1.15
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-rose-900/60 border border-rose-700" />
          Overbet {"<"} 0.90
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-slate-700 opacity-40" />
          Noise filter {"<"} 5%
        </span>
        <span className="ml-auto font-mono text-slate-500">
          Toggle Speed / Train → instant recalc
        </span>
      </div>
    </section>
  );
}
