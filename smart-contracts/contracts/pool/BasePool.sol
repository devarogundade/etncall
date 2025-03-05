// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Data} from "../libs/Data.sol";
import {IPool} from "../interfaces/IPool.sol";

import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

abstract contract BasePool is IPool, Context, Ownable {
    address internal immutable _etnCall;

    constructor(address etnCall_) Ownable(msg.sender) {
        if (etnCall_ == address(0)) revert InvalidRouter(address(0));
        _etnCall = etnCall_;
    }

    function withdrawTo(
        address to,
        Data.IncomingMessage calldata message
    ) external virtual override onlyETNCall {
        _withdrawTo(to, message);
    }

    function _withdrawTo(
        address to,
        Data.IncomingMessage calldata message
    ) internal virtual;

    error InvalidRouter(address router);

    modifier onlyETNCall() {
        if (_etnCall != _msgSender()) revert InvalidRouter(_msgSender());
        _;
    }
}
