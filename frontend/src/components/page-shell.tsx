import type { ReactNode } from "react";
import { Nav } from "./nav";

export function PageShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-panel/70 p-6 shadow-lg shadow-black/20">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Autonomous Agent Marketplace</span>
          <h1 className="text-3xl font-semibold text-white">{title}</h1>
          <p className="max-w-3xl text-sm text-slate-300">{description}</p>
        </div>
        <Nav />
      </header>
      {children}
    </main>
  );
}
