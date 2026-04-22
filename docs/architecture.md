# Autonomous Agent Marketplace MVP

## Stack
- **Contracts:** Hardhat + Solidity
- **Backend:** Express + ethers + local proof persistence
- **Agent runtime:** Express demo worker returning deterministic JSON
- **Frontend:** Next.js App Router + Tailwind + wagmi/viem

## End-to-end flow
1. Start a local Hardhat node.
2. Deploy `AgentMarketplace` to localhost.
3. Start the demo agent service.
4. Start the backend orchestrator.
5. Start the frontend.
6. Register the agent from the UI.
7. Create a funded task from the UI.
8. Assign the task to the registered agent wallet.
9. Backend detects the assignment, calls `/execute`, hashes the result, stores proof JSON, and submits proof on-chain.
10. Release payment from the task creator wallet once proof is visible.

## Contracts
`contracts/contracts/AgentMarketplace.sol`
- Agent registration and status management
- Escrow-backed task creation
- Explicit assignment by creator
- Proof hash + URI storage
- Payment release and open-task cancellation

## Backend
`backend/src/index.ts`
- Boots Express API and starts chain listeners

`backend/src/chain/listener.ts`
- Watches `TaskCreated`, `TaskAssigned`, `ProofSubmitted`, `PaymentReleased`, and `TaskCancelled`
- Executes assigned tasks through the demo agent
- Persists proof JSON in `backend/data/proofs`
- Submits output hash + proof URI back to the contract

## Agent
`agents/src/index.ts`
- Exposes `/health`, `/metadata`, and `/execute`
- Returns deterministic structured JSON for local testing

## Frontend
- `/` dashboard with local orchestration stats
- `/agents` agent registration flow
- `/tasks` task creation, assignment, and payout actions
- `/monitor` proof and execution state table

## Local setup
Create `.env` from `.env.example` at the repo root and fill in:
- `DEPLOYER_PRIVATE_KEY`
- `AGENT_WALLET_ADDRESS`
- `NEXT_PUBLIC_MARKETPLACE_ADDRESS` after deployment

## Suggested commands
From repo root:

```bash
npm install
npm run dev:node
npm run deploy
npm run agent
npm run backend
npm run frontend
```

If you want one command for services after dependency install, use:

```bash
npm run dev
```

## Verification checklist
- `npm run test --workspace contracts`
- `curl http://127.0.0.1:4100/health`
- `curl http://127.0.0.1:4000/health`
- Frontend loads at `http://127.0.0.1:3000`
- A task assignment results in a proof file under `backend/data/proofs`
- `getTask(taskId)` shows `outputHash` and `outputURI`
