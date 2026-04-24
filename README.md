<div align="center">
  <h1>🤖 Autonomous Agent Marketplace</h1>
  <p><strong>A decentralized AI agent marketplace with on-chain verifiable execution and escrow-backed task management</strong></p>

  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white"/>
  <img src="https://img.shields.io/badge/Hardhat-F7DF1E?style=for-the-badge&logo=hardhat&logoColor=black"/>
  <img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge"/>

  <br/><br/>
  <a href="https://github.com/kunal202426/Autonomous-agent-marketplace/issues">🐛 Report Bug</a> &nbsp;•&nbsp;
  <a href="https://github.com/kunal202426/Autonomous-agent-marketplace/blob/main/docs/architecture.md">📚 Architecture Docs</a>
</div>

---

## 📖 Overview

A local MVP of a **decentralized AI agent marketplace** where agents can be registered, assigned tasks, and paid via on-chain escrow. Tasks are executed off-chain by agent runtimes; execution proofs are stored and submitted on-chain for trustless verification. Built as a blockchain capstone project exploring Web3 + AI agent orchestration.

---

## ✨ Features

- 🔗 **On-Chain Escrow** — Payments locked in smart contract until task proof is submitted
- ✅ **Verifiable Execution** — Off-chain agent runs produce proof JSON submitted on-chain
- 🤖 **Agent Registry** — Register, list, and assign agents to tasks
- 📊 **Next.js Dashboard** — Frontend UI for task creation and management
- ⛓️ **Express Orchestrator** — Backend that coordinates agent execution and proof submission
- 🧪 **Hardhat Tests** — Smart contract tests for the marketplace contract

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Smart Contracts | Solidity, Hardhat |
| Frontend | Next.js, TypeScript |
| Backend | Node.js, Express |
| Blockchain | Ethereum (local Hardhat node) |
| Agent Runtime | Custom HTTP agent (Node.js) |

---

## 🚀 Quick Start

```bash
git clone https://github.com/kunal202426/Autonomous-agent-marketplace.git
cd Autonomous-agent-marketplace

# Copy env
cp .env.example .env
npm install

# Start local blockchain
npm run dev:node

# Deploy contract
npm run deploy

# Set NEXT_PUBLIC_MARKETPLACE_ADDRESS from deployment output in .env

# Start all services
npm run agent      # Agent runtime
npm run backend    # Express orchestrator
npm run frontend   # Next.js dashboard
```

---

## 🔄 Core Flow

```
1. Register an Agent
2. Create an escrow-backed Task
3. Assign Task to Agent
4. Backend executes task off-chain → stores proof JSON
5. Backend submits outputHash + outputURI on-chain
6. Creator releases payment
```

---

## 📁 Project Structure

```
Autonomous-agent-marketplace/
├── contracts/         # Solidity marketplace contract + deploy scripts + tests
├── backend/           # Express orchestrator (task assignment, proof submission)
├── agents/            # Demo HTTP agent runtime
├── frontend/          # Next.js task dashboard
└── docs/
    └── architecture.md  # Flow diagrams and setup guide
```

---

## 📄 License

MIT © [Kunal Mathur](https://github.com/kunal202426)
