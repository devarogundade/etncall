// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Data} from "../libs/Data.sol";
import {BasePool} from "./BasePool.sol";

import {IETNCallConfig} from "../interfaces/IETNCallConfig.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenPool is BasePool {
    IETNCallConfig internal _config;

    constructor(address config_, address etnCall_) BasePool(etnCall_) {
        _config = IETNCallConfig(config_);
    }

    function _withdrawTo(
        address to,
        Data.IncomingMessage calldata message
    ) internal override {
        for (uint256 index = 0; index < message.tokens.length; index++) {
            Data.Token memory token = message.tokens[index];

            address tokenId = _config.getChainTokenId(
                message.fromChainId,
                token.tokenId
            );

            if (tokenId == 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE) {
                payable(to).transfer(token.amount);
            } else {
                IERC20 tokenContract = IERC20(tokenId);
                tokenContract.transfer(to, token.amount);
            }
        }
    }
}
