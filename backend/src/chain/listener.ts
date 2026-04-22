import type { Contract } from "ethers";
import type { BackendTaskRecord } from "../types.js";
import { persistProof } from "../services/proofService.js";
import { runAgentTask } from "../services/taskRunner.js";

export function startMarketplaceListener(
  contract: Contract,
  state: Map<number, BackendTaskRecord>,
) {
  const mergeTaskState = (taskId: number, next: Partial<BackendTaskRecord>) => {
    const current = state.get(taskId);
    state.set(taskId, {
      id: taskId,
      status: next.status ?? current?.status ?? "queued",
      taskType: next.taskType ?? current?.taskType ?? "unknown",
      inputURI: next.inputURI ?? current?.inputURI ?? "",
      assignedAgent: next.assignedAgent ?? current?.assignedAgent ?? "",
      outputHash: next.outputHash ?? current?.outputHash,
      outputURI: next.outputURI ?? current?.outputURI,
      error: next.error ?? current?.error,
      startedAt: next.startedAt ?? current?.startedAt,
      completedAt: next.completedAt ?? current?.completedAt,
    });
  };

  const executeTask = async (taskId: number) => {
    const onChainTask = await contract.getTask(taskId);
    const assignedAgent = String(onChainTask.assignedAgent);
    const inputURI = String(onChainTask.inputURI);
    const taskType = String(onChainTask.taskType);

    mergeTaskState(taskId, {
      status: "running",
      taskType,
      inputURI,
      assignedAgent,
      startedAt: new Date().toISOString(),
      error: undefined,
    });

    try {
      const result = await runAgentTask({ taskId, taskType, inputURI });
      const proof = await persistProof(taskId, result);
      const outputHash = `0x${proof.hash}` as const;

      const submitTx = await contract.submitProof(taskId, outputHash, proof.outputURI);
      await submitTx.wait();

      mergeTaskState(taskId, {
        status: "completed",
        taskType,
        inputURI,
        assignedAgent,
        outputHash,
        outputURI: proof.outputURI,
        completedAt: new Date().toISOString(),
      });
    } catch (error) {
      mergeTaskState(taskId, {
        status: "failed",
        taskType,
        inputURI,
        assignedAgent,
        error: error instanceof Error ? error.message : "Unknown execution error",
      });
    }
  };

  contract.on(
    "TaskCreated",
    async (taskIdValue: bigint, _creator: string, taskType: string, inputURI: string) => {
      const taskId = Number(taskIdValue);
      mergeTaskState(taskId, {
        status: "queued",
        taskType,
        inputURI,
      });
    },
  );

  contract.on("TaskAssigned", async (taskIdValue: bigint, agent: string) => {
    const taskId = Number(taskIdValue);
    if (state.get(taskId)?.status === "running" || state.get(taskId)?.status === "completed") {
      return;
    }

    mergeTaskState(taskId, {
      status: "queued",
      assignedAgent: agent,
    });

    await executeTask(taskId);
  });

  contract.on(
    "ProofSubmitted",
    async (taskIdValue: bigint, agent: string, outputHash: string, outputURI: string) => {
      const taskId = Number(taskIdValue);
      mergeTaskState(taskId, {
        status: "completed",
        assignedAgent: agent,
        outputHash,
        outputURI,
        completedAt: new Date().toISOString(),
      });
    },
  );

  contract.on("PaymentReleased", async (taskIdValue: bigint, agent: string) => {
    const taskId = Number(taskIdValue);
    mergeTaskState(taskId, {
      status: "paid",
      assignedAgent: agent,
    });
  });

  contract.on("TaskCancelled", async (taskIdValue: bigint) => {
    const taskId = Number(taskIdValue);
    mergeTaskState(taskId, {
      status: "cancelled",
      error: undefined,
    });
  });
}
