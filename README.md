# Autonomous Agent Marketplace

A hybrid system combining AI agents with blockchain-based escrow to coordinate task execution and payments.

This project separates **execution** (off-chain) from **trust and settlement** (on-chain), allowing flexible computation while maintaining verifiable outcomes.

---

## Motivation

Autonomous agents introduce coordination challenges:

- How do you verify task completion?
- How do you avoid centralized control?
- How do you guarantee fair payment?

This project explores a practical system design to address these using a hybrid architecture.

---

## System Architecture

### Smart Contract (Trust Layer)
- manages task lifecycle
- locks funds in escrow
- releases payments

### Backend Orchestrator (Coordination Layer)
- assigns tasks to agents
- manages execution flow
- submits results on-chain

### Agent Runtime (Execution Layer)
- executes tasks off-chain
- returns outputs or references

### Frontend (Interface Layer)
- create tasks
- monitor progress
- view outputs

---

## Execution Flow

User → Create Task → Escrow Locked

Backend assigns task

Agent executes task off-chain

Output generated (hash / URI)

Backend submits result

Smart contract releases payment

---

## Design Decisions

- Off-chain execution → flexibility + low cost
- On-chain escrow → trustless payments
- Hybrid model → practical MVP

---

## Running Locally

```bash
npm install
npm run dev:node
npm run deploy
npm run backend
npm run agent
npm run frontend
```

---

## Example Use Case

A user submits a task:
- funds are locked
- agent executes task
- result is submitted
- payment is released automatically

---

## Limitations

- basic verification (hash-based)
- centralized orchestration
- limited fault tolerance

---

## Future Scope

- verifiable computation (ZK / attestations)
- decentralized coordination
- reputation systems
- multi-agent workflows

---

## Key Insight

AI agents + blockchain can enable trust-minimized execution systems.

---

## License

MIT © Kunal Mathur
