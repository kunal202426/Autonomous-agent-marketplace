import { BackendTaskTable } from "../../components/backend-task-table";
import { PageShell } from "../../components/page-shell";

async function getBackendTasks() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:4000";

  try {
    const response = await fetch(`${baseUrl}/api/tasks`, { cache: "no-store" });
    if (!response.ok) return [];
    const data = (await response.json()) as { tasks: Array<any> };
    return data.tasks;
  } catch {
    return [];
  }
}

export default async function MonitorPage() {
  const tasks = await getBackendTasks();

  return (
    <PageShell
      title="Execution monitor"
      description="Inspect backend orchestration state, proof hashes, and generated output artifact links."
    >
      <BackendTaskTable tasks={tasks} />
    </PageShell>
  );
}
