/* eslint-disable prettier/prettier */

import fs from 'fs';
import { etnCallABI } from './abis';
import { createPublicClient, http } from 'viem';
import { Message } from './schemas/message';
import {
  ETN_CALL_ADDRESSES,
  ETN_CALL_START_BLOCKS,
  getChain,
  SUPPORTED_CHAINS,
} from './types';

class Event {
  async fetch(chainId: SUPPORTED_CHAINS): Promise<Message[]> {
    const publicClient = createPublicClient({
      chain: getChain(chainId),
      transport: http(),
    });

    const data = fs.readFileSync(`block_number_${chainId}.txt`, 'utf-8');

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

    fs.writeFileSync(`block_number_${chainId}.txt`, lastestBlock.toString());

    return [];

    // return logs.map((log: DispatchLog) => {
    //   return {
    //     messageId: log.messageId,
    //     status: Status.INITIATED,
    //     fromTrxHash: log.transactionHash,
    //     fee: log.fee,
    //     feeToken: log.feeToken,
    //     sequenceNumber: log.sequenceNumber,
    //     fromChainId: chainId,
    //     toChainId: log.toChainId,
    //     sender: log.sender,
    //     receiver: log.receiver,
    //     tokens: log.tokens,
    //     payMaster: log.payMaster,
    //     payload: log.payload,
    //   };
    // });
  }
}

export default Event;
