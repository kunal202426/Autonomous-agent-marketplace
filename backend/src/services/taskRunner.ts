import { config } from "../config.js";
import type { TaskResult } from "../types.js";

export async function runAgentTask(task: {
  taskId: number;
  taskType: string;
  inputURI: string;
}): Promise<TaskResult> {
  const response = await fetch(`${config.agentServiceUrl}/execute`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      taskId: task.taskId,
      taskType: task.taskType,
      inputURI: task.inputURI,
      input: {
        source: task.inputURI,
        description: `Marketplace task ${task.taskId} for ${task.taskType}`,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Agent execution failed with status ${response.status}`);
  }

  const body = (await response.json()) as { result: TaskResult };
  return body.result;
}
