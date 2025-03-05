// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MintableToken is ERC20 {
    event Minted(address to, uint256 amount);

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        mint(1_000_000_000_000_000_000_000_000_000_000);
    }

    function mint(uint256 amount) public {
        _mint(msg.sender, amount);

        emit Minted(msg.sender, amount);
    }
}
