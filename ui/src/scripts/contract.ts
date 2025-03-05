import type { Chain, Hex } from "viem";
import { getTokenPools, NATIVE_TOKEN, type Token } from "./utils";
import { config } from "./config";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { bridgeAbi } from "../abis/bridge";

const BridgeContract = {
  address: {
    5201420: "0x",
    534351: "0x",
    80002: "0x",
  } as {
    [key: number]: Hex;
  },

  async bridge(
    fromChain: Chain,
    toChain: Chain,
    token: Token,
    amount: bigint
  ): Promise<Hex | null> {
    try {
      const result = await writeContract(config, {
        abi: bridgeAbi,
        address: this.address[fromChain.id],
        functionName: "bridgeToken",
        args: [
          toChain.id,
          [{ tokenId: token.address[fromChain.id], amount: amount }],
          getTokenPools[fromChain.id],
        ],
        value: token.address[fromChain.id] == NATIVE_TOKEN ? amount : BigInt(0),
      });

      const receipt = await waitForTransactionReceipt(config, {
        hash: result,
      });

      return receipt.transactionHash;
    } catch (error) {
      return null;
    }
  },
};

export default BridgeContract;
