export interface Horse {
  id: string;
  name: string;
  driver: string;
  post: number;
  poolPct: number; // live ATG pool percentage 0-100
  earlySpeed: boolean;
  trainerWarning: boolean;
  // computed
  modelProb?: number;
  valueRatio?: number;
}

export interface RaceLeg {
  leg: number; // 1-8
  raceName: string;
  distance: number;
  startTime: string; // ISO
  horses: Horse[];
}

export interface TrackInfo {
  trackName: string;
  trackCode: string;
  nextRaceAt: string; // ISO
  biasAlert: string;
  stretchLength: number; // meters
  geometryNote: string;
}

export interface V85Card {
  track: TrackInfo;
  legs: RaceLeg[];
  generatedAt: string;
}

export type ToggleKey = "earlySpeed" | "trainerWarning";
