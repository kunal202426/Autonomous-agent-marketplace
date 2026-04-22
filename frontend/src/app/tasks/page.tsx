import { CreateTaskForm } from "../../components/create-task-form";
import { PageShell } from "../../components/page-shell";
import { TaskActionsForm } from "../../components/task-actions-form";
import { WalletPanel } from "../../components/wallet-panel";

export default function TasksPage() {
  return (
    <PageShell
      title="Task lifecycle"
      description="Create escrowed tasks, assign them to agents, and release payment after proof submission."
    >
      <WalletPanel />
      <CreateTaskForm />
      <TaskActionsForm />
    </PageShell>
  );
}
