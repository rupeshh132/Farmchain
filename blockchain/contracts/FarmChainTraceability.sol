// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title FarmChainTraceability
 * @dev A smart contract to log traceability events for agricultural produce batches.
 * This ensures that once a batch event is recorded, it cannot be tampered with.
 */
contract FarmChainTraceability {
    
    struct Event {
        bytes32 batchId;
        string eventType;
        address actor;
        uint256 timestamp;
    }
    
    // Emitted when a new event is logged
    event TraceabilityLogged(
        bytes32 indexed batchId, 
        string eventType, 
        address indexed actor, 
        uint256 timestamp
    );
    
    // Owner of the contract
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    /**
     * @dev Log a traceability event. For the MVP, we use a custodial wallet (owner)
     * to sign transactions on behalf of the farmer to avoid gas fees for end users.
     * @param batchId The unique identifier of the produce batch.
     * @param eventType The type of event (e.g., "HARVESTED", "TRANSFERRED").
     */
    function logEvent(bytes32 batchId, string calldata eventType) external onlyOwner {
        emit TraceabilityLogged(batchId, eventType, msg.sender, block.timestamp);
    }
}
