// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Data} from "./Data.sol";
import {MerkleProof} from "./MerkleProof.sol";

library Hash {
    function addressToBytes32(
        address _address
    ) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_address)));
    }

    function getHash(
        Data.OutgoingMessage memory message,
        bytes32 sequence
    ) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    MerkleProof.LEAF_DOMAIN_SEPARATOR,
                    sequence,
                    message.toChainId,
                    message.receiver,
                    message.payload,
                    message.tokens,
                    message.payMaster
                )
            );
    }
}
