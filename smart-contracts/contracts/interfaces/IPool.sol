// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Data} from "../libs/Data.sol";

interface IPool {
    function withdrawTo(
        address to,
        Data.IncomingMessage calldata message
    ) external;
}
