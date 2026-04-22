import type { ReactNode } from "react";

export function StatCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: ReactNode;
  hint: string;
  tone?: "default" | "success" | "warn";
}) {
  const toneClass =
    tone === "success"
      ? "border-emerald-500/30 bg-emerald-500/10"
      : tone === "warn"
        ? "border-amber-500/30 bg-amber-500/10"
        : "border-slate-800 bg-panel/70";

  return (
    <section className={`rounded-2xl border p-5 ${toneClass}`}>
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</p>
      <div className="mt-3 text-3xl font-semibold text-white">{value}</div>
      <p className="mt-2 text-sm text-slate-300">{hint}</p>
    </section>
  );
}
