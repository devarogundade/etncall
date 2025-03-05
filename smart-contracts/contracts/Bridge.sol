// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Data} from "./libs/Data.sol";
import {IETNCall} from "./interfaces/IETNCall.sol";
import {ETNCallReceiver} from "./ETNCallReceiver.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Bridge is ETNCallReceiver {
    mapping(uint256 => address) internal _contracts;
    mapping(address => bytes32[]) internal _actions;

    constructor(
        address config_,
        address etnCall_
    ) ETNCallReceiver(config_, etnCall_) {}

    function setContract(uint256 chainId, address contractId) external {
        _contracts[chainId] = contractId;
    }

    function bridgeToken(
        uint256 toChainId,
        Data.Token[] memory tokens,
        address tokenPool
    ) external payable {
        Data.OutgoingMessage memory message = Data.OutgoingMessage({
            toChainId: toChainId,
            receiver: _contracts[toChainId],
            payload: abi.encode(_msgSender()),
            tokens: tokens,
            payMaster: Data.PayMaster.ETNCALL_PAY
        });

        // uint256 fee = _etnCall.estimateFee(toChainId);

        for (uint256 index = 0; index < tokens.length; index++) {
            Data.Token memory token = tokens[index];

            IERC20 tokenContract = IERC20(token.tokenId);

            tokenContract.transferFrom(
                _msgSender(),
                address(this),
                token.amount
            );

            tokenContract.approve(address(_etnCall), token.amount);
        }

        bytes32 messageId = _etnCall.sendMessage(message, tokenPool);

        _actions[_msgSender()].push(messageId);
    }

    function _etnCallReceive(
        Data.IncomingMessage memory message
    ) internal override {
        address receiver = abi.decode(message.payload, (address));

        for (uint256 index = 0; index < message.tokens.length; index++) {
            Data.Token memory token = message.tokens[index];

            if (token.tokenId == 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE) {
                payable(receiver).transfer(token.amount);
            } else {
                IERC20 tokenContract = IERC20(token.tokenId);
                tokenContract.transfer(receiver, token.amount);
            }
        }
    }
}
