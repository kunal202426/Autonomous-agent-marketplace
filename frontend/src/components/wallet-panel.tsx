"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

export function WalletPanel() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <section className="rounded-2xl border border-slate-800 bg-panel/70 p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Wallet</h2>
          <p className="mt-1 text-sm text-slate-300">
            {isConnected ? `Connected: ${address}` : "Connect MetaMask to interact with the marketplace contract."}
          </p>
        </div>
        {isConnected ? (
          <button onClick={() => disconnect()}>Disconnect</button>
        ) : (
          <div className="flex flex-wrap gap-2">
            {connectors.map((connector) => (
              <button key={connector.uid} onClick={() => connect({ connector })}>
                Connect {connector.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
