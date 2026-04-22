export type DeploymentFile = {
  address: `0x${string}`;
  deployer: `0x${string}`;
  chainId: number;
  deployedAt: string;
};

export type TaskResult = {
  summary: string;
  classification: string;
  confidence: number;
  steps: string[];
  rawInput: unknown;
};

export type BackendTaskRecord = {
  id: number;
  status: "queued" | "running" | "completed" | "paid" | "cancelled" | "failed";
  taskType: string;
  inputURI: string;
  assignedAgent: string;
  outputHash?: string;
  outputURI?: string;
  error?: string;
  startedAt?: string;
  completedAt?: string;
};
