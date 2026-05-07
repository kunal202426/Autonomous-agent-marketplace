# Autonomous Agent Marketplace

This project explores how AI agents can be coordinated and paid using a hybrid architecture combining off-chain execution with on-chain escrow.

The main idea is simple: keep computation flexible (off-chain), but enforce trust and payments using smart contracts.

---

## Why this exists

When autonomous agents perform tasks for users, three problems show up quickly:

- verifying that work was actually done
- removing dependence on a central coordinator
- ensuring fair payment between parties

This project is a working prototype that tries to model a solution.

---

## System Design

The system is split into four parts:

### Smart Contract
Handles:
- task lifecycle
- escrow locking
- payment release

Acts as the trust layer.

### Backend (Orchestrator)
Handles:
- task assignment
- coordinating execution
- submitting results on-chain

Simplifies flow, but is currently centralized.

### Agent Runtime
Responsible for:
- executing tasks
- returning outputs or references

Can be extended to support different types of agents.

### Frontend
Used to:
- create tasks
- monitor progress
- interact with the system

---

## Execution Flow

1. A task is created and funded (escrow)
2. Backend assigns task to an agent
3. Agent executes task off-chain
4. Output is generated and stored
5. Backend submits output hash / URI
6. Payment is released

---

## Design Choices

- Off-chain execution keeps the system flexible and cost-efficient
- On-chain escrow removes trust assumptions in payments
- Hybrid approach keeps implementation practical for an MVP

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

## Current State

This is an MVP focused on:
- validating architecture
- testing agent coordination
- integrating escrow-based payments

---

## Limitations

- verification is basic (hash-based)
- backend is a central point
- no fault tolerance yet
- limited scalability

---

## Future Improvements

- stronger verification (ZK / attestations)
- decentralized coordination
- reputation system for agents
- multi-agent workflows

---

## Notes

This project is experimental and focused on exploring how AI agents and blockchain systems can work together.

## License

MIT © Kunal Mathur
