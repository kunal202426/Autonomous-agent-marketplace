import { promises as fs } from "fs";
import { Contract, JsonRpcProvider, Wallet } from "ethers";
import { marketplaceAbi } from "../abi.js";
import { config } from "../config.js";
import type { DeploymentFile } from "../types.js";

export async function createMarketplaceClient() {
  const deployment = JSON.parse(
    await fs.readFile(config.deploymentFile, "utf8"),
  ) as DeploymentFile;

  const provider = new JsonRpcProvider(config.rpcUrl);
  const wallet = new Wallet(config.privateKey, provider);
  const contract = new Contract(deployment.address, marketplaceAbi, wallet);

  return {
    deployment,
    provider,
    wallet,
    contract,
  };
}
