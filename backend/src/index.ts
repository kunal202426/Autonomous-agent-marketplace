import cors from "cors";
import express from "express";
import { createMarketplaceClient } from "./services/marketplaceClient.js";
import { config } from "./config.js";
import type { BackendTaskRecord } from "./types.js";
import { registerApiRoutes } from "./routes/api.js";
import { startMarketplaceListener } from "./chain/listener.js";

async function main() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const state = new Map<number, BackendTaskRecord>();
  const { contract, deployment } = await createMarketplaceClient();

  registerApiRoutes(app, state, deployment.address);
  startMarketplaceListener(contract, state);

  app.listen(config.port, () => {
    console.log(`Backend listening on port ${config.port}`);
    console.log(`Watching marketplace at ${deployment.address}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
