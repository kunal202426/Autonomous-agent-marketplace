"use client";

import { parseEther } from "viem";
import { useState } from "react";
import { useWriteContract } from "wagmi";
import { marketplaceAbi } from "../lib/contracts";
import { marketplaceAddress } from "../lib/wallet";

export function CreateTaskForm() {
  const [taskType, setTaskType] = useState("classification");
  const [inputURI, setInputURI] = useState("ipfs://demo-task-input");
  const [reward, setReward] = useState("0.1");
  const { writeContractAsync, isPending, data, error } = useWriteContract();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!marketplaceAddress) return;

    await writeContractAsync({
      address: marketplaceAddress,
      abi: marketplaceAbi,
      functionName: "createTask",
      args: [taskType, inputURI],
      value: parseEther(reward || "0"),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-800 bg-panel/70 p-5">
      <h2 className="text-lg font-semibold text-white">Create escrowed task</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm text-slate-300">
          Task type
          <input value={taskType} onChange={(event) => setTaskType(event.target.value)} />
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          Input URI
          <input value={inputURI} onChange={(event) => setInputURI(event.target.value)} />
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          Reward (ETH)
          <input value={reward} onChange={(event) => setReward(event.target.value)} />
        </label>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button disabled={!marketplaceAddress || isPending} type="submit">
          {isPending ? "Creating..." : "Create task"}
        </button>
        {data ? <span className="text-xs text-emerald-400">Tx: {data}</span> : null}
        {error ? <span className="text-xs text-rose-400">{error.message}</span> : null}
      </div>
    </form>
  );
}
