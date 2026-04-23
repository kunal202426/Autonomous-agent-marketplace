"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function WalletPanel() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showConnected = mounted && isConnected;

  return (
    <section className="rounded-2xl border border-slate-800 bg-panel/70 p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Wallet</h2>
          <p className="mt-1 text-sm text-slate-300">
            {showConnected
              ? `Connected via injected wallet: ${address}`
              : "Connect MetaMask before submitting contract transactions."}
          </p>
          {error ? <p className="mt-2 text-xs text-rose-400">{error.message}</p> : null}
        </div>
        {showConnected ? (
          <button onClick={() => disconnect()}>Disconnect</button>
        ) : (
          <div className="flex flex-wrap gap-2">
            {connectors.map((connector) => (
              <button key={connector.uid} disabled={isPending} onClick={() => connect({ connector })}>
                {isPending ? "Connecting..." : `Connect ${connector.name}`}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
