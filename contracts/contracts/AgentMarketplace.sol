// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AgentMarketplace {
    enum TaskStatus {
        Open,
        Assigned,
        Completed,
        Paid,
        Cancelled
    }

    struct Agent {
        address owner;
        string metadataURI;
        bool active;
        string[] capabilities;
    }

    struct Task {
        uint256 id;
        address creator;
        address assignedAgent;
        uint256 reward;
        string taskType;
        string inputURI;
        TaskStatus status;
        bytes32 outputHash;
        string outputURI;
        uint64 createdAt;
        uint64 completedAt;
    }

    mapping(address => Agent) private agents;
    mapping(address => bool) public isAgentRegistered;
    mapping(uint256 => Task) private tasks;
    uint256 public nextTaskId;

    event AgentRegistered(address indexed owner, string metadataURI, string[] capabilities);
    event AgentStatusUpdated(address indexed owner, bool active);
    event TaskCreated(uint256 indexed taskId, address indexed creator, string taskType, string inputURI, uint256 reward);
    event TaskAssigned(uint256 indexed taskId, address indexed agent);
    event ProofSubmitted(uint256 indexed taskId, address indexed agent, bytes32 outputHash, string outputURI);
    event PaymentReleased(uint256 indexed taskId, address indexed agent, uint256 reward);
    event TaskCancelled(uint256 indexed taskId);

    error AgentAlreadyRegistered();
    error AgentNotRegistered();
    error AgentInactive();
    error TaskNotFound();
    error InvalidTaskStatus();
    error Unauthorized();
    error InvalidReward();
    error ZeroAddressAgent();
    error TaskAlreadyAssigned();
    error TransferFailed();

    function registerAgent(string calldata metadataURI, string[] calldata capabilities) external {
        if (isAgentRegistered[msg.sender]) revert AgentAlreadyRegistered();

        Agent storage agent = agents[msg.sender];
        agent.owner = msg.sender;
        agent.metadataURI = metadataURI;
        agent.active = true;

        for (uint256 i = 0; i < capabilities.length; i++) {
            agent.capabilities.push(capabilities[i]);
        }

        isAgentRegistered[msg.sender] = true;

        emit AgentRegistered(msg.sender, metadataURI, capabilities);
    }

    function updateAgentStatus(bool active) external {
        if (!isAgentRegistered[msg.sender]) revert AgentNotRegistered();
        agents[msg.sender].active = active;
        emit AgentStatusUpdated(msg.sender, active);
    }

    function createTask(string calldata taskType, string calldata inputURI) external payable returns (uint256 taskId) {
        if (msg.value == 0) revert InvalidReward();

        taskId = nextTaskId;
        nextTaskId += 1;

        tasks[taskId] = Task({
            id: taskId,
            creator: msg.sender,
            assignedAgent: address(0),
            reward: msg.value,
            taskType: taskType,
            inputURI: inputURI,
            status: TaskStatus.Open,
            outputHash: bytes32(0),
            outputURI: "",
            createdAt: uint64(block.timestamp),
            completedAt: 0
        });

        emit TaskCreated(taskId, msg.sender, taskType, inputURI, msg.value);
    }

    function assignTask(uint256 taskId, address agentAddress) external {
        Task storage task = _getTask(taskId);
        if (task.creator != msg.sender) revert Unauthorized();
        if (task.status != TaskStatus.Open) revert InvalidTaskStatus();
        if (agentAddress == address(0)) revert ZeroAddressAgent();
        if (!isAgentRegistered[agentAddress]) revert AgentNotRegistered();
        if (!agents[agentAddress].active) revert AgentInactive();
        if (task.assignedAgent != address(0)) revert TaskAlreadyAssigned();

        task.assignedAgent = agentAddress;
        task.status = TaskStatus.Assigned;

        emit TaskAssigned(taskId, agentAddress);
    }

    function submitProof(uint256 taskId, bytes32 outputHash, string calldata outputURI) external {
        Task storage task = _getTask(taskId);
        if (task.assignedAgent != msg.sender) revert Unauthorized();
        if (task.status != TaskStatus.Assigned) revert InvalidTaskStatus();

        task.outputHash = outputHash;
        task.outputURI = outputURI;
        task.status = TaskStatus.Completed;
        task.completedAt = uint64(block.timestamp);

        emit ProofSubmitted(taskId, msg.sender, outputHash, outputURI);
    }

    function releasePayment(uint256 taskId) external {
        Task storage task = _getTask(taskId);
        if (task.creator != msg.sender) revert Unauthorized();
        if (task.status != TaskStatus.Completed) revert InvalidTaskStatus();

        task.status = TaskStatus.Paid;
        uint256 reward = task.reward;
        address payable recipient = payable(task.assignedAgent);

        (bool success, ) = recipient.call{value: reward}("");
        if (!success) revert TransferFailed();

        emit PaymentReleased(taskId, task.assignedAgent, reward);
    }

    function cancelTask(uint256 taskId) external {
        Task storage task = _getTask(taskId);
        if (task.creator != msg.sender) revert Unauthorized();
        if (task.status != TaskStatus.Open) revert InvalidTaskStatus();

        task.status = TaskStatus.Cancelled;
        uint256 reward = task.reward;
        address payable recipient = payable(task.creator);

        (bool success, ) = recipient.call{value: reward}("");
        if (!success) revert TransferFailed();

        emit TaskCancelled(taskId);
    }

    function getAgent(address agentAddress) external view returns (Agent memory) {
        if (!isAgentRegistered[agentAddress]) revert AgentNotRegistered();
        return agents[agentAddress];
    }

    function getTask(uint256 taskId) external view returns (Task memory) {
        return _getTask(taskId);
    }

    function getAgentCapabilities(address agentAddress) external view returns (string[] memory) {
        if (!isAgentRegistered[agentAddress]) revert AgentNotRegistered();
        return agents[agentAddress].capabilities;
    }

    function _getTask(uint256 taskId) internal view returns (Task storage task) {
        if (taskId >= nextTaskId) revert TaskNotFound();
        task = tasks[taskId];
    }
}
