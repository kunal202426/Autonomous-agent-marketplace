type TaskRecord = {
  id: number;
  status: string;
  taskType: string;
  inputURI: string;
  assignedAgent: string;
  outputHash?: string;
  outputURI?: string;
  error?: string;
  startedAt?: string;
  completedAt?: string;
};

function shortAddress(value: string) {
  if (!value || value === "0x0000000000000000000000000000000000000000") return "Unassigned";
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

export function BackendTaskTable({ tasks }: { tasks: TaskRecord[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-panel/70">
      <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
        <thead className="bg-slate-950/70 text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Task</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Agent</th>
            <th className="px-4 py-3 font-medium">Input</th>
            <th className="px-4 py-3 font-medium">Proof</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {tasks.length === 0 ? (
            <tr>
              <td className="px-4 py-6 text-slate-400" colSpan={5}>
                No backend tasks tracked yet.
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id} className="align-top text-slate-200">
                <td className="px-4 py-4">
                  <div className="font-medium text-white">#{task.id}</div>
                  <div className="text-xs text-slate-400">{task.taskType}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="font-medium capitalize">{task.status}</div>
                  {task.error ? <div className="mt-1 text-xs text-rose-400">{task.error}</div> : null}
                </td>
                <td className="px-4 py-4 text-xs text-slate-300">{shortAddress(task.assignedAgent)}</td>
                <td className="px-4 py-4 text-xs text-slate-300">{task.inputURI}</td>
                <td className="px-4 py-4 text-xs text-slate-300">
                  {task.outputURI ? (
                    <div className="space-y-1">
                      <div>{task.outputHash}</div>
                      <a href={task.outputURI} target="_blank" rel="noreferrer">
                        {task.outputURI}
                      </a>
                    </div>
                  ) : (
                    "Pending"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
