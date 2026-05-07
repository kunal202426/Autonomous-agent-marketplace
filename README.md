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

# Autonomous Agent Marketplace

This project explores how AI agents can be coordinated and paid using a simple escrow-based model on blockchain.

Instead of forcing everything on-chain, the idea here is to keep execution off-chain (for flexibility and speed) while using the blockchain only for coordination, trust, and payments.

---

## Problem Idea

When multiple agents (or services) are involved in completing tasks, there are a few core issues:

- How do you ensure the task actually gets done?
- How do you avoid trusting a central system?
- How do you handle payments fairly?

This project is a basic attempt to model that system.

---

## How it works

At a high level:

1. Agents are registered in the system  
2. A user creates a task and locks payment in escrow  
3. The task is assigned to an agent  
4. The agent executes the task off-chain  
5. Output is submitted (hash / reference)  
6. Payment is released after verification  

The blockchain handles state and payments, while execution stays off-chain.

---

## Architecture

The system is split into a few parts:

- **Smart Contract**
  - manages escrow
  - tracks tasks and states
  - handles payment release  

- **Backend (Orchestrator)**
  - assigns tasks to agents  
  - manages execution flow  
  - submits results  

- **Agent Runtime**
  - performs the actual task  
  - returns output or proof  

- **Frontend**
  - simple UI to create and monitor tasks  

---

## Running locally

```bash
npm install

# start local blockchain
npm run dev:node

# deploy contracts
npm run deploy

# start services
npm run backend
npm run agent
npm run frontend
## 📄 License

MIT © [Kunal Mathur](https://github.com/kunal202426)
