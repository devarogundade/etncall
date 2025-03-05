// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

library Data {
    enum PayMaster {
        SENDER,
        ETNCALL_PAY
    }

    struct Token {
        address tokenId;
        uint256 amount;
    }

    struct IncomingMessage {
        bytes32 messageId;
        uint256 fromChainId;
        address sender;
        bytes payload;
        Token[] tokens;
        PayMaster payMaster;
    }

    struct OutgoingMessage {
        uint256 toChainId;
        address receiver;
        bytes payload;
        Token[] tokens;
        PayMaster payMaster;
    }
}
