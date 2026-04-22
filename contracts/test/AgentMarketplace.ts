import { expect } from "chai";
import { ethers } from "hardhat";

describe("AgentMarketplace", function () {
  async function deployFixture() {
    const [creator, agent, other] = await ethers.getSigners();
    const marketplaceFactory = await ethers.getContractFactory("AgentMarketplace");
    const marketplace = await marketplaceFactory.deploy();
    await marketplace.waitForDeployment();

    return { marketplace, creator, agent, other };
  }

  it("registers agents and updates status", async function () {
    const { marketplace, agent } = await deployFixture();

    await expect(
      marketplace
        .connect(agent)
        .registerAgent("ipfs://agent-metadata", ["summarization", "reporting"]),
    )
      .to.emit(marketplace, "AgentRegistered")
      .withArgs(agent.address, "ipfs://agent-metadata", ["summarization", "reporting"]);

    const registeredAgent = await marketplace.getAgent(agent.address);
    expect(registeredAgent.owner).to.equal(agent.address);
    expect(registeredAgent.active).to.equal(true);

    await expect(marketplace.connect(agent).updateAgentStatus(false))
      .to.emit(marketplace, "AgentStatusUpdated")
      .withArgs(agent.address, false);
  });

  it("creates, assigns, completes, and pays tasks", async function () {
    const { marketplace, creator, agent } = await deployFixture();

    await marketplace.connect(agent).registerAgent("ipfs://agent-metadata", ["classification"]);

    await expect(
      marketplace
        .connect(creator)
        .createTask("classification", "ipfs://task-input", { value: ethers.parseEther("1") }),
    )
      .to.emit(marketplace, "TaskCreated")
      .withArgs(0n, creator.address, "classification", "ipfs://task-input", ethers.parseEther("1"));

    await expect(marketplace.connect(creator).assignTask(0, agent.address))
      .to.emit(marketplace, "TaskAssigned")
      .withArgs(0n, agent.address);

    const outputHash = ethers.keccak256(ethers.toUtf8Bytes("proof"));

    await expect(marketplace.connect(agent).submitProof(0, outputHash, "ipfs://proof-output"))
      .to.emit(marketplace, "ProofSubmitted")
      .withArgs(0n, agent.address, outputHash, "ipfs://proof-output");

    await expect(() => marketplace.connect(creator).releasePayment(0)).to.changeEtherBalances(
      [creator, agent],
      [ethers.parseEther("-1"), ethers.parseEther("1")],
    );

    const task = await marketplace.getTask(0);
    expect(task.status).to.equal(3n);
    expect(task.outputURI).to.equal("ipfs://proof-output");
  });

  it("refunds open tasks when cancelled", async function () {
    const { marketplace, creator } = await deployFixture();

    await marketplace.connect(creator).createTask("reporting", "ipfs://task-input", {
      value: ethers.parseEther("0.5"),
    });

    await expect(() => marketplace.connect(creator).cancelTask(0)).to.changeEtherBalances(
      [creator, marketplace],
      [ethers.parseEther("0.5"), ethers.parseEther("-0.5")],
    );

    const task = await marketplace.getTask(0);
    expect(task.status).to.equal(4n);
  });

  it("rejects assignment to inactive agents", async function () {
    const { marketplace, creator, agent } = await deployFixture();

    await marketplace.connect(agent).registerAgent("ipfs://agent-metadata", ["reporting"]);
    await marketplace.connect(agent).updateAgentStatus(false);
    await marketplace.connect(creator).createTask("reporting", "ipfs://task-input", {
      value: ethers.parseEther("0.2"),
    });

    await expect(marketplace.connect(creator).assignTask(0, agent.address)).to.be.revertedWithCustomError(
      marketplace,
      "AgentInactive",
    );
  });
});
