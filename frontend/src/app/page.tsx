import { PageShell } from "../components/page-shell";
import { StatCard } from "../components/stat-card";
import { WalletPanel } from "../components/wallet-panel";

async function getBackendTasks() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000";

  try {
    const response = await fetch(`${baseUrl}/api/tasks`, { cache: "no-store" });
    if (!response.ok) return [];
    const data = (await response.json()) as { tasks: Array<{ status: string }> };
    return data.tasks;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const tasks = await getBackendTasks();
  const completed = tasks.filter((task) => task.status === "completed").length;
  const running = tasks.filter((task) => task.status === "running").length;

  return (
    <PageShell
      title="Local execution dashboard"
      description="Track the local on-chain marketplace flow from funded task creation through proof submission and payout release."
    >
      <WalletPanel />
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Tracked tasks" value={tasks.length} hint="Tasks currently visible in backend orchestration state." />
        <StatCard label="Running" value={running} hint="Assignments that are actively being executed by the demo agent." tone="warn" />
        <StatCard label="Completed" value={completed} hint="Tasks with proof artifacts submitted back on-chain." tone="success" />
      </section>
      <section className="rounded-2xl border border-slate-800 bg-panel/70 p-6">
        <h2 className="text-xl font-semibold text-white">Execution flow</h2>
        <ol className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
          <li>1. Register the demo agent from the Agents page.</li>
          <li>2. Create a funded task from the Tasks page.</li>
          <li>3. Assign the task to the registered agent address.</li>
          <li>4. Backend listens for assignment, calls the agent, hashes the result, and submits proof.</li>
          <li>5. Review the proof and state updates in Monitor.</li>
          <li>6. Release escrow payment after verifying the output.</li>
        </ol>
      </section>
    </PageShell>
  );
}
