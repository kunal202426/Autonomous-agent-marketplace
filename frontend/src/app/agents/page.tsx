import { PageShell } from "../../components/page-shell";
import { RegisterAgentForm } from "../../components/register-agent-form";
import { WalletPanel } from "../../components/wallet-panel";

export default function AgentsPage() {
  return (
    <PageShell
      title="Agent marketplace"
      description="Register the local demo runtime as an available execution agent and expose its metadata URI on-chain."
    >
      <WalletPanel />
      <RegisterAgentForm />
      <section className="rounded-2xl border border-slate-800 bg-panel/70 p-5 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Expected local metadata</h2>
        <p className="mt-2">The bundled demo agent serves metadata from <code>http://127.0.0.1:4100/metadata</code>.</p>
        <p className="mt-2">Set <code>AGENT_WALLET_ADDRESS</code> in your root <code>.env</code> to the wallet you plan to register.</p>
      </section>
    </PageShell>
  );
}
