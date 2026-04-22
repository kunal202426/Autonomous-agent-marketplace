"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import { marketplaceAbi } from "../lib/contracts";
import { marketplaceAddress } from "../lib/wallet";

export function TaskActionsForm() {
  const [taskId, setTaskId] = useState("0");
  const [agentAddress, setAgentAddress] = useState("");
  const { writeContractAsync, isPending, data, error } = useWriteContract();

  const assignTask = async () => {
    if (!marketplaceAddress) return;
    await writeContractAsync({
      address: marketplaceAddress,
      abi: marketplaceAbi,
      functionName: "assignTask",
      args: [BigInt(taskId), agentAddress as `0x${string}`],
    });
  };

  const releasePayment = async () => {
    if (!marketplaceAddress) return;
    await writeContractAsync({
      address: marketplaceAddress,
      abi: marketplaceAbi,
      functionName: "releasePayment",
      args: [BigInt(taskId)],
    });
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-panel/70 p-5">
      <h2 className="text-lg font-semibold text-white">Task actions</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-300">
          Task ID
          <input value={taskId} onChange={(event) => setTaskId(event.target.value)} />
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          Agent address
          <input value={agentAddress} onChange={(event) => setAgentAddress(event.target.value)} />
        </label>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <button disabled={!marketplaceAddress || isPending || !agentAddress} onClick={assignTask} type="button">
          Assign task
        </button>
        <button disabled={!marketplaceAddress || isPending} onClick={releasePayment} type="button">
          Release payment
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-xs">
        {data ? <span className="text-emerald-400">Tx: {data}</span> : null}
        {error ? <span className="text-rose-400">{error.message}</span> : null}
      </div>
    </section>
  );
}
