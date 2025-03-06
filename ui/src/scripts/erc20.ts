import { config } from "./config";
import {
  waitForTransactionReceipt,
  getBalance,
  writeContract,
  readContract,
} from "@wagmi/core";
import { erc20Abi, type Hex } from "viem";
import type { Token } from "./utils";
import { mintableTokenAbi } from "@/abis/token";

const TokenContract = {
  async mint(
    chainId: number,
    token: Token,
    amount: bigint
  ): Promise<Hex | null> {
    try {
      const result = await writeContract(config, {
        abi: mintableTokenAbi,
        address: token.address[chainId],
        functionName: "mint",
        args: [amount],
      });

      const receipt = await waitForTransactionReceipt(config, {
        hash: result,
      });

      return receipt.transactionHash;
    } catch (error) {
      return null;
    }
  },
  async getAllowance(
    token: Hex,
    wallet: Hex,
    spender: Hex,
    chainId: number
  ): Promise<bigint> {
    try {
      return await readContract(config, {
        abi: erc20Abi,
        address: token,
        functionName: "allowance",
        args: [wallet, spender],
        chainId: chainId,
      });
    } catch (error) {
      return BigInt(0);
    }
  },

  async approve(token: Hex, spender: Hex, amount: bigint): Promise<Hex | null> {
    try {
      const result = await writeContract(config, {
        abi: erc20Abi,
        address: token,
        functionName: "approve",
        args: [spender, amount],
      });

      const receipt = await waitForTransactionReceipt(config, { hash: result });

      return receipt.transactionHash;
    } catch (error) {
      return null;
    }
  },

  async getTokenBalance(
    token: Hex | undefined,
    address: Hex,
    chainId: number
  ): Promise<bigint> {
    try {
      const { value } = await getBalance(config, { token, address, chainId });
      return value;
    } catch (error) {
      return BigInt(0);
    }
  },
};

export { TokenContract };
