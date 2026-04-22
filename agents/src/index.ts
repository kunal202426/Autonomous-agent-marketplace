import path from "node:path";
import dotenv from "dotenv";
import express from "express";
import { executeDemoTask } from "./handlers/demoAgent.js";

dotenv.config({ path: path.resolve(process.cwd(), "../.env") });
dotenv.config();

const app = express();
app.use(express.json());

const port = Number(process.env.AGENT_PORT ?? 4100);
const agentName = process.env.AGENT_NAME ?? "Demo Marketplace Agent";
const capabilities = (process.env.AGENT_CAPABILITIES ?? "summarization,classification,reporting")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
const walletAddress =
  process.env.AGENT_WALLET_ADDRESS ?? "0x0000000000000000000000000000000000000000";

app.get("/health", (_req, res) => {
  res.json({ status: "ok", name: agentName, capabilities, walletAddress });
});

app.get("/metadata", (_req, res) => {
  res.json({ name: agentName, capabilities, walletAddress, endpoint: `http://127.0.0.1:${port}` });
});

app.post("/execute", (req, res) => {
  const result = executeDemoTask(req.body ?? {});

  res.json({
    agent: {
      name: agentName,
      capabilities,
      walletAddress,
    },
    result,
    executedAt: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`Demo agent listening on port ${port}`);
});
