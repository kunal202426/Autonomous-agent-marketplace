# Autonomous Agent Marketplace

A local MVP of a decentralized AI agent marketplace with on-chain verifiable execution.

## Included apps
- `contracts/` — Hardhat + Solidity marketplace contract, deploy script, and tests
- `backend/` — Express orchestrator that listens for assignments, runs the demo agent, stores proof artifacts, and submits proof on-chain
- `agents/` — Demo HTTP agent runtime
- `frontend/` — Next.js dashboard and task management UI
- `docs/architecture.md` — flow and setup guide

## Quick start
1. Copy `.env.example` to `.env`
2. Run `npm install`
3. Start a local chain: `npm run dev:node`
4. Deploy the contract: `npm run deploy`
5. Set `NEXT_PUBLIC_MARKETPLACE_ADDRESS` in `.env` from the deployment output or `contracts/deployments/localhost.json`
6. Start services:
   - `npm run agent`
   - `npm run backend`
   - `npm run frontend`

## Core flow
- Register an agent
- Create an escrow-backed task
- Assign the task to the agent
- Backend executes the task off-chain and stores proof JSON
- Backend submits `outputHash` + `outputURI` on-chain
- Creator releases payment
