import Header from "@/components/Header";
import TrackGeometryCard from "@/components/TrackGeometryCard";
import V85LegMatrix from "@/components/V85LegMatrix";
import { mockGävleV85 } from "@/data/mockV85";

/**
 * JUSU-DATA V2.0 — Dynamic V85 Trav-Motor Dashboard
 *
 * In production this page would fetch live ATG pool data.
 * When the external API is unreachable we instantly fall back
 * to the clean mock Gävle V85 card so the UI stays fully interactive.
 */
export default function DashboardPage() {
  // Instant fallback — no network call in this scaffold
  const card = mockGävleV85;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* Track Geometry + Bias */}
        <TrackGeometryCard track={card.track} />

        {/* V85 8-Leg Matrix */}
        <V85LegMatrix legs={card.legs} />

        {/* Footer meta */}
        <footer className="pt-4 pb-8 text-center text-[11px] text-slate-600">
          <p>
            JUSU-DATA · Model anchored to pool % · Barefoot mid-tier 1.30× ·
            Early-speed post bias 1.10× · Trainer warning 0.88×
          </p>
          <p className="mt-1 font-mono">
            Mock generated {new Date(card.generatedAt).toLocaleString("sv-SE")}
          </p>
        </footer>
      </main>
    </div>
  );
}
