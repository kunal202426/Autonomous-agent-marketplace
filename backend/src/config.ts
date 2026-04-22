import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), "../.env") });
dotenv.config();

export const config = {
  port: Number(process.env.BACKEND_PORT ?? 4000),
  rpcUrl: process.env.RPC_URL ?? "http://127.0.0.1:8545",
  agentServiceUrl: process.env.AGENT_SERVICE_URL ?? "http://127.0.0.1:4100",
  proofBaseUrl: process.env.PROOF_BASE_URL ?? `http://127.0.0.1:${process.env.BACKEND_PORT ?? 4000}`,
  deploymentFile: path.resolve(
    process.cwd(),
    process.env.DEPLOYMENT_FILE ?? "../contracts/deployments/localhost.json",
  ),
  privateKey:
    process.env.DEPLOYER_PRIVATE_KEY ??
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  proofDirectory: path.resolve(process.cwd(), "data/proofs"),
};
