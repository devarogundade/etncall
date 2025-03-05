// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Data} from "./libs/Data.sol";
import {IETNCall} from "./interfaces/IETNCall.sol";
import {IETNCallConfig} from "./interfaces/IETNCallConfig.sol";
import {IMessageReceiver} from "./interfaces/IMessageReceiver.sol";

import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

abstract contract ETNCallReceiver is IMessageReceiver, Context, Ownable {
    IETNCallConfig internal _config;
    IETNCall internal immutable _etnCall;

    constructor(address config_, address etnCall_) Ownable(msg.sender) {
        if (etnCall_ == address(0)) revert InvalidRouter(address(0));

        _etnCall = IETNCall(etnCall_);
        _config = IETNCallConfig(config_);
    }

    function etnCallPayMaster() external view override returns (address) {
        return owner();
    }

    function etnCallReceive(
        Data.IncomingMessage calldata message
    ) external virtual override onlyETNCall {
        Data.IncomingMessage memory updatedMessage = message;

        for (uint256 index = 0; index < updatedMessage.tokens.length; index++) {
            updatedMessage.tokens[index] = Data.Token({
                tokenId: _config.getChainTokenId(
                    message.fromChainId,
                    message.tokens[index].tokenId
                ),
                amount: message.tokens[index].amount
            });
        }

        _etnCallReceive(updatedMessage);
    }

    function _etnCallReceive(
        Data.IncomingMessage memory message
    ) internal virtual;

    function getETNCall() public view override returns (address) {
        return address(_etnCall);
    }

    error InvalidRouter(address router);

    modifier onlyETNCall() {
        if (address(_etnCall) != _msgSender())
            revert InvalidRouter(_msgSender());
        _;
    }
}
