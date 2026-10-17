"use client";

import type { Horse } from "@/types";
import { getRowTier } from "@/lib/calculateValue";

interface Props {
  horse: Horse;
  onToggle: (id: string, key: "earlySpeed" | "trainerWarning") => void;
}

export default function HorseRow({ horse, onToggle }: Props) {
  const tier = getRowTier(horse);

  const rowClasses: Record<string, string> = {
    golden:
      "bg-lime-500/15 border-l-4 border-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.25)]",
    overbet: "bg-rose-950/30 opacity-60 border-l-4 border-rose-700/60",
    noise: "opacity-40 grayscale",
    neutral: "border-l-4 border-transparent hover:bg-slate-800/50",
  };

  return (
    <tr
      className={`transition-all duration-200 ${rowClasses[tier]} ${
        tier === "noise" ? "pointer-events-none" : ""
      }`}
    >
      {/* Post */}
      <td className="px-3 py-2.5 text-center">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-800 text-xs font-bold text-slate-200 border border-slate-600">
          {horse.post}
        </span>
      </td>

      {/* Horse + Driver */}
      <td className="px-3 py-2.5">
        <div className="flex items-center gap-2">
          <div>
            <p className="font-semibold text-white leading-tight">
              {horse.name}
            </p>
            <p className="text-xs text-slate-400">{horse.driver}</p>
          </div>
          {tier === "golden" && (
            <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-lime-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-lime-300 border border-lime-400/50">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-pulse" />
              Nugget
            </span>
          )}
        </div>
      </td>

      {/* Pool % */}
      <td className="px-3 py-2.5 text-right">
        <span className="font-mono text-sm tabular-nums text-slate-200">
          {horse.poolPct.toFixed(1)}%
        </span>
      </td>

      {/* Model Prob */}
      <td className="px-3 py-2.5 text-right">
        <span className="font-mono text-sm tabular-nums text-cyan-300">
          {horse.modelProb != null
            ? `${(horse.modelProb * 100).toFixed(1)}%`
            : "—"}
        </span>
      </td>

      {/* Value Ratio */}
      <td className="px-3 py-2.5 text-right">
        <span
          className={`font-mono text-sm font-bold tabular-nums ${
            tier === "golden"
              ? "text-lime-300"
              : tier === "overbet"
                ? "text-rose-400"
                : "text-slate-300"
          }`}
        >
          {horse.valueRatio != null ? horse.valueRatio.toFixed(2) : "—"}
        </span>
      </td>

      {/* Toggles */}
      <td className="px-3 py-2.5">
        <div className="flex items-center justify-end gap-2">
          {/* Pappa's Early Speed Alert */}
          <button
            type="button"
            onClick={() => onToggle(horse.id, "earlySpeed")}
            className={`rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-wide transition-all border ${
              horse.earlySpeed
                ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.3)]"
                : "bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500"
            }`}
            title="Pappa's Early Speed Alert"
          >
            Speed
          </button>

          {/* Trainer Warning */}
          <button
            type="button"
            onClick={() => onToggle(horse.id, "trainerWarning")}
            className={`rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-wide transition-all border ${
              horse.trainerWarning
                ? "bg-rose-500/20 border-rose-400 text-rose-300 shadow-[0_0_8px_rgba(251,113,133,0.3)]"
                : "bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500"
            }`}
            title="Trainer Warning"
          >
            Train
          </button>
        </div>
      </td>
    </tr>
  );
}
