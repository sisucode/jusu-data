"use client";

import { useCountdown, formatTMinus } from "@/hooks/useCountdown";
import type { TrackInfo } from "@/types";

interface Props {
  track: TrackInfo;
}

export default function TrackGeometryCard({ track }: Props) {
  const { minutes, seconds, expired } = useCountdown(track.nextRaceAt);

  return (
    <section className="rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800/80 p-5 shadow-xl shadow-black/40">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Left: Track meta + countdown */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-300 border border-slate-600">
              {track.trackCode}
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {track.trackName}
            </h2>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-xs uppercase tracking-widest text-slate-500">
              Next race
            </span>
            <span
              className={`font-mono text-2xl font-bold tabular-nums ${
                expired
                  ? "text-rose-400"
                  : minutes < 10
                    ? "text-amber-300"
                    : "text-lime-400"
              }`}
            >
              {expired ? "LIVE" : formatTMinus(minutes, seconds)}
            </span>
          </div>

          <p className="max-w-md text-sm text-slate-400 leading-relaxed">
            {track.geometryNote}
          </p>
        </div>

        {/* Right: Track profile visual + bias alert */}
        <div className="flex flex-col items-end gap-3">
          {/* Mini track profile SVG */}
          <div className="relative h-20 w-48 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
            <svg viewBox="0 0 200 80" className="h-full w-full">
              {/* Outer oval */}
              <ellipse
                cx="100"
                cy="40"
                rx="90"
                ry="28"
                fill="none"
                stroke="#334155"
                strokeWidth="6"
              />
              {/* Inner oval */}
              <ellipse
                cx="100"
                cy="40"
                rx="70"
                ry="16"
                fill="none"
                stroke="#1e293b"
                strokeWidth="4"
              />
              {/* Short home stretch highlight (right side) */}
              <path
                d="M 170 28 Q 190 40 170 52"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="5"
                strokeLinecap="round"
                className="drop-shadow-[0_0_6px_#f43f5e]"
              />
              {/* Label */}
              <text
                x="175"
                y="18"
                fill="#f43f5e"
                fontSize="8"
                fontFamily="monospace"
                textAnchor="middle"
              >
                178m
              </text>
            </svg>
          </div>

          {/* Bias alert box */}
          <div className="max-w-xs rounded-lg border border-rose-500/40 bg-rose-950/40 px-3 py-2 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-400 mb-0.5">
              Track Bias Alert
            </p>
            <p className="text-sm font-medium text-rose-100 leading-snug">
              {track.biasAlert}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
