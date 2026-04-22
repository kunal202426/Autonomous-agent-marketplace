export const marketplaceAbi = [
  "function registerAgent(string metadataURI, string[] capabilities)",
  "function updateAgentStatus(bool active)",
  "function createTask(string taskType, string inputURI) payable returns (uint256 taskId)",
  "function assignTask(uint256 taskId, address agent)",
  "function submitProof(uint256 taskId, bytes32 outputHash, string outputURI)",
  "function releasePayment(uint256 taskId)",
  "function cancelTask(uint256 taskId)",
  "function nextTaskId() view returns (uint256)",
  "function getTask(uint256 taskId) view returns ((uint256 id,address creator,address assignedAgent,uint256 reward,string taskType,string inputURI,uint8 status,bytes32 outputHash,string outputURI,uint64 createdAt,uint64 completedAt))",
  "function getAgent(address agentAddress) view returns ((address owner,string metadataURI,bool active,string[] capabilities))",
  "event AgentRegistered(address indexed owner, string metadataURI, string[] capabilities)",
  "event AgentStatusUpdated(address indexed owner, bool active)",
  "event TaskCreated(uint256 indexed taskId, address indexed creator, string taskType, string inputURI, uint256 reward)",
  "event TaskAssigned(uint256 indexed taskId, address indexed agent)",
  "event ProofSubmitted(uint256 indexed taskId, address indexed agent, bytes32 outputHash, string outputURI)",
  "event PaymentReleased(uint256 indexed taskId, address indexed agent, uint256 reward)",
  "event TaskCancelled(uint256 indexed taskId)"
] as const;
