"use client";

import { useEffect, useState } from "react";

type CountdownState = {
  minutes: number;
  seconds: number;
  totalMs: number;
  expired: boolean;
};

function calc(iso?: string): CountdownState {
  if (!iso) {
    return { minutes: 0, seconds: 0, totalMs: 0, expired: true };
  }

  const target = new Date(iso).getTime();

  if (Number.isNaN(target)) {
    return { minutes: 0, seconds: 0, totalMs: 0, expired: true };
  }

  const diff = target - Date.now();

  if (diff <= 0) {
    return { minutes: 0, seconds: 0, totalMs: 0, expired: true };
  }

  const totalSec = Math.floor(diff / 1000);

  return {
    minutes: Math.floor(totalSec / 60),
    seconds: totalSec % 60,
    totalMs: diff,
    expired: false,
  };
}

export function useCountdown(targetIso?: string) {
  const [remaining, setRemaining] = useState<CountdownState>(() => calc(targetIso));

  useEffect(() => {
    setRemaining(calc(targetIso));

    const id = setInterval(() => {
      setRemaining(calc(targetIso));
    }, 1000);

    return () => clearInterval(id);
  }, [targetIso]);

  return remaining;
}

export function formatTMinus(m: number, s: number) {
  return `T-${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
