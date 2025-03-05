// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Data} from "../libs/Data.sol";

interface IETNCall {
    error UnsupportedChain(uint256 chainId);
    error InsufficientGasFee();
    error InvalidMessage();
    error AlreadyExecuted(bytes32 messageId);

    event Dispatch(
        bytes32 messageId,
        uint256 fee,
        address feeToken,
        uint256 sequenceNumber,
        uint256 toChainId,
        address sender,
        address receiver,
        Data.Token[] tokens,
        Data.PayMaster payMaster,
        bytes payload
    );

    event PostMessage(bytes32 messageId);

    function isChainSupported(uint256 chainId) external view returns (bool);

    function isTokenSupported(address tokenId) external view returns (bool);

    function estimateFee(uint256 toChainId) external view returns (uint256);

    function sendMessage(
        Data.OutgoingMessage calldata message,
        address tokenPool
    ) external payable returns (bytes32);

    function postMessage(
        address receiver,
        Data.IncomingMessage calldata message,
        address tokenPool
    ) external;
}
