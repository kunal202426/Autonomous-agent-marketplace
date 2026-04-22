export const marketplaceAbi = [
  {
    type: "function",
    name: "registerAgent",
    stateMutability: "nonpayable",
    inputs: [
      { name: "metadataURI", type: "string" },
      { name: "capabilities", type: "string[]" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "createTask",
    stateMutability: "payable",
    inputs: [
      { name: "taskType", type: "string" },
      { name: "inputURI", type: "string" },
    ],
    outputs: [{ name: "taskId", type: "uint256" }],
  },
  {
    type: "function",
    name: "assignTask",
    stateMutability: "nonpayable",
    inputs: [
      { name: "taskId", type: "uint256" },
      { name: "agent", type: "address" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "releasePayment",
    stateMutability: "nonpayable",
    inputs: [{ name: "taskId", type: "uint256" }],
    outputs: [],
  },
  {
    type: "function",
    name: "getTask",
    stateMutability: "view",
    inputs: [{ name: "taskId", type: "uint256" }],
    outputs: [
      {
        type: "tuple",
        components: [
          { name: "id", type: "uint256" },
          { name: "creator", type: "address" },
          { name: "assignedAgent", type: "address" },
          { name: "reward", type: "uint256" },
          { name: "taskType", type: "string" },
          { name: "inputURI", type: "string" },
          { name: "status", type: "uint8" },
          { name: "outputHash", type: "bytes32" },
          { name: "outputURI", type: "string" },
          { name: "createdAt", type: "uint64" },
          { name: "completedAt", type: "uint64" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "getAgent",
    stateMutability: "view",
    inputs: [{ name: "agentAddress", type: "address" }],
    outputs: [
      {
        type: "tuple",
        components: [
          { name: "owner", type: "address" },
          { name: "metadataURI", type: "string" },
          { name: "active", type: "bool" },
          { name: "capabilities", type: "string[]" },
        ],
      },
    ],
  },
] as const;

export const taskStatusLabels = ["Open", "Assigned", "Completed", "Paid", "Cancelled"] as const;
