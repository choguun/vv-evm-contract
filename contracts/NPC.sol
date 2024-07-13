// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./IAIOracle.sol";
import "./AIOracleCallbackReceiver.sol";

contract NPC is AIOracleCallbackReceiver {

    event promptsUpdated(
        uint256 modelId,
        string input,
        string output
    );

    event promptRequest(
        uint256 requestId,
        address sender, 
        uint256 modelId,
        string prompt
    );

    struct AIOracleRequest {
        address sender;
        uint256 modelId;
        bytes input;
        bytes output;
    }

    address immutable owner;
    uint256 llama = 11;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    // requestId => AIOracleRequest
    mapping(uint256 => AIOracleRequest) public requests;

    // modelId => callback gasLimit
    mapping(uint256 => uint64) public callbackGasLimit;

    mapping(uint256 => mapping(string => string)) public prompts;

    /// @notice Initialize the contract, binding it to a specified AIOracle.
    constructor(IAIOracle _aiOracle) AIOracleCallbackReceiver(_aiOracle) {
        owner = msg.sender;
        callbackGasLimit[11] = 1_500_000; // llama
    }

    function setCallbackGasLimit(uint256 modelId, uint64 gasLimit) external onlyOwner {
        callbackGasLimit[modelId] = gasLimit;
    }

    // the callback function, only the AI Oracle can call this function
    function aiOracleCallback(uint256 requestId, bytes calldata output, bytes calldata callbackData) external override onlyAIOracleCallback() {
        AIOracleRequest storage request = requests[requestId];
        require(request.sender != address(0), "request does not exist");
        request.output = output;
        prompts[request.modelId][string(request.input)] = string(output);
        emit promptsUpdated(request.modelId, string(request.input), string(output));
    }
    
    function storeAIResult(uint256 modelId, bytes calldata input, bytes calldata output) external onlyAIOracleCallback() {
        prompts[modelId][string(input)] = string(output);
        emit promptsUpdated(modelId, string(input), string(output));
    }

    function estimateFee(uint256 modelId) public view returns (uint256) {
        return aiOracle.estimateFee(modelId, callbackGasLimit[modelId]);
    }

    function calculateAIResult(string calldata prompt) payable external {
        bytes memory input = bytes(prompt);
        // we do not need to set the callbackData in this example
        uint256 requestId = aiOracle.requestCallback{value: msg.value}(
            llama, bytes(input), address(this), callbackGasLimit[llama], abi.encodePacked(bytes4(this.storeAIResult.selector))
        );
        AIOracleRequest storage request = requests[requestId];
        request.input = input;
        request.sender = msg.sender;
        request.modelId = llama;
        emit promptRequest(requestId, msg.sender, llama, prompt);
    }

    function getAIResult(uint256 modelId, string calldata prompt) external view returns (string memory) {
        return prompts[modelId][prompt];
    }
}
