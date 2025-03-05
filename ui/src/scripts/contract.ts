import type { Chain, Hex } from "viem";
import { getTokenPools, NATIVE_TOKEN, type Token } from "./utils";
import { config } from "./config";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { bridgeAbi } from "../abis/bridge";

const BridgeContract = {
  address: {
    5201420: "0x6c03225b209187A318AE6FF0E4c547c979167Ebc",
    534351: "0x98d0a92C3752949E1b359BC3D6532B679F17BC0B",
    80002: "0x848F5e09bC24663cC0451c0c44826b1C7706Ad78",
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
