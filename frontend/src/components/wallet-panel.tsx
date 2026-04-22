"use client";

import { useAccount, useDisconnect } from "wagmi";

export function WalletPanel() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <section className="rounded-2xl border border-slate-800 bg-panel/70 p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Wallet</h2>
          <p className="mt-1 text-sm text-slate-300">
            {isConnected
              ? `Connected via injected wallet: ${address}`
              : "Open the site in a browser with MetaMask or another injected wallet to interact with the contract."}
          </p>
        </div>
        {isConnected ? <button onClick={() => disconnect()}>Disconnect</button> : null}
      </div>
    </section>
  );
}
