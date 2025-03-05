// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Data} from "../libs/Data.sol";

interface IMessageReceiver {
    function etnCallPayMaster() external view returns (address);

    function etnCallReceive(Data.IncomingMessage calldata message) external;

    function getETNCall() external view returns (address);
}
