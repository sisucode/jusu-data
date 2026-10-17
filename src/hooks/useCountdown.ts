"use client";

import { useEffect, useState } from "react";

export function useCountdown(targetIso: string) {
  const [remaining, setRemaining] = useState(() => calc(targetIso));

  useEffect(() => {
    const id = setInterval(() => setRemaining(calc(targetIso)), 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  return remaining;
}

function calc(iso: string) {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff <= 0) return { minutes: 0, seconds: 0, totalMs: 0, expired: true };

  const totalSec = Math.floor(diff / 1000);
  return {
    minutes: Math.floor(totalSec / 60),
    seconds: totalSec % 60,
    totalMs: diff,
    expired: false,
  };
}

export function formatTMinus(m: number, s: number) {
  return `T-${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
