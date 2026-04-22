import { promises as fs } from "fs";
import path from "path";
import { ethers } from "hardhat";

async function main() {
  const marketplaceFactory = await ethers.getContractFactory("AgentMarketplace");
  const marketplace = await marketplaceFactory.deploy();
  await marketplace.waitForDeployment();

  const address = await marketplace.getAddress();
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  const deployment = {
    address,
    deployer: deployer.address,
    chainId: Number(network.chainId),
    deployedAt: new Date().toISOString(),
  };

  const deploymentsDir = path.resolve(__dirname, "..", "deployments");
  await fs.mkdir(deploymentsDir, { recursive: true });
  await fs.writeFile(
    path.join(deploymentsDir, "localhost.json"),
    JSON.stringify(deployment, null, 2),
    "utf8",
  );

  console.log(`AgentMarketplace deployed to ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
