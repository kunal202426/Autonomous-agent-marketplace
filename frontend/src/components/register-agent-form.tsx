"use client";

import { useMemo, useState } from "react";
import { useWriteContract } from "wagmi";
import { marketplaceAbi } from "../lib/contracts";
import { marketplaceAddress } from "../lib/wallet";

export function RegisterAgentForm() {
  const [metadataURI, setMetadataURI] = useState("http://127.0.0.1:4100/metadata");
  const [capabilities, setCapabilities] = useState("summarization,classification,reporting");
  const { writeContractAsync, isPending, data, error } = useWriteContract();

  const capabilityList = useMemo(
    () => capabilities.split(",").map((value) => value.trim()).filter(Boolean),
    [capabilities],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!marketplaceAddress) return;

    await writeContractAsync({
      address: marketplaceAddress,
      abi: marketplaceAbi,
      functionName: "registerAgent",
      args: [metadataURI, capabilityList],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-800 bg-panel/70 p-5">
      <h2 className="text-lg font-semibold text-white">Register local agent</h2>
      <div className="mt-4 grid gap-4">
        <label className="grid gap-2 text-sm text-slate-300">
          Metadata URI
          <input value={metadataURI} onChange={(event) => setMetadataURI(event.target.value)} />
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          Capabilities
          <input value={capabilities} onChange={(event) => setCapabilities(event.target.value)} />
        </label>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button disabled={!marketplaceAddress || isPending} type="submit">
          {isPending ? "Submitting..." : "Register agent"}
        </button>
        {!marketplaceAddress ? <span className="text-xs text-amber-400">Set NEXT_PUBLIC_MARKETPLACE_ADDRESS first.</span> : null}
        {data ? <span className="text-xs text-emerald-400">Tx: {data}</span> : null}
        {error ? <span className="text-xs text-rose-400">{error.message}</span> : null}
      </div>
    </form>
  );
}
