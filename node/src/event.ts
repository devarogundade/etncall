/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import * as fs from 'fs';
import * as path from 'path';
import { etnCallABI } from './abis';
import { createPublicClient, http } from 'viem';
import { Message } from './schemas/message';
import {
  ETN_CALL_ADDRESSES,
  ETN_CALL_START_BLOCKS,
  getChain,
  Status,
  SUPPORTED_CHAINS,
} from './types';

class Event {
  async fetch(chainId: SUPPORTED_CHAINS): Promise<Message[]> {
    const publicClient = createPublicClient({
      chain: getChain(chainId),
      transport: http(),
    });

    if (!fs.existsSync(path.join(__dirname, `block_number_${chainId}.txt`))) {
      fs.writeFileSync(
        path.join(__dirname, `block_number_${chainId}.txt`),
        ETN_CALL_START_BLOCKS[chainId].toString(),
      );
    }

    const data = fs.readFileSync(
      path.join(__dirname, `block_number_${chainId}.txt`),
      'utf-8',
    );

    const fromBlock: bigint = data
      ? BigInt(data)
      : ETN_CALL_START_BLOCKS[chainId];

    const lastestBlock = await publicClient.getBlockNumber();

    if (fromBlock >= lastestBlock) return [];

    const logs = await publicClient.getContractEvents({
      address: ETN_CALL_ADDRESSES[chainId],
      abi: etnCallABI,
      eventName: 'Dispatch',
      fromBlock: fromBlock,
      toBlock: lastestBlock,
    });

    console.log(logs);

    fs.writeFileSync(
      path.join(__dirname, `block_number_${chainId}.txt`),
      lastestBlock.toString(),
    );

    return logs.map((log: any) => {
      return {
        messageId: log.args.messageId,
        status: Status.INITIATED,
        fromTrxHash: log.transactionHash,
        fee: log.args.fee,
        feeToken: log.args.feeToken,
        sequenceNumber: Number(log.args.sequenceNumber),
        fromChainId: chainId,
        toChainId: Number(log.args.toChainId) as SUPPORTED_CHAINS,
        sender: log.args.sender,
        receiver: log.args.receiver,
        tokens: log.args.tokens,
        payMaster: log.args.payMaster,
        payload: log.args.payload,
      };
    });
  }
}

export default Event;
