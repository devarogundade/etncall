/* eslint-disable prettier/prettier */

import Event from './event';
import { Job } from 'bullmq';
import { Model } from 'mongoose';
import { Message } from './schemas/message';
import {
  getChain,
  JobOptions,
  Status,
  IncomingMessage,
  ETN_CALL_ADDRESSES,
} from './types';
import { InjectModel } from '@nestjs/mongoose';
import { createPublicClient, createWalletClient, type Hex, http } from 'viem';
import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { mnemonicToAccount } from 'viem/accounts';
import { etnCallABI } from './abis';

const TOKEN_POOL_ADDRESSES: {
  [key: number]: Hex;
} = {
  5201420: '0x8E659DA3e81FddbD73c1511C990391F9486CF16C',
  534351: '0xd44bf2743f9bE03D97511235e38af1EA6e8C9ECE',
  80002: '0x92E1d7A42108f962e12E750B22edf97D1B66BeD9',
};

@Processor('MessageWorker')
class MessageWorker extends WorkerHost {
  private readonly event: Event;

  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {
    super();
    this.event = new Event();
  }

  private async initializeTrx(message: Message) {
    try {
      await this.recordMessage(message);

      const signedMessage = await this.signTransaction(message);

      await this.recordMessage(signedMessage);
    } catch (error) {
      console.log(error);

      message.failedTimestamp = Math.ceil(Date.now() / 1000);
      message.status = Status.FAILED;

      await this.recordMessage(message);
    }
  }

  private async recordMessage(message: Message): Promise<void> {
    const savedMessage = await this.messageModel.findOne({
      $or: [{ messageId: message.messageId }],
    });

    if (
      savedMessage?.status == Status.DELIVERED ||
      savedMessage?.status == Status.FAILED
    ) {
      return;
    }

    await this.messageModel.findOneAndUpdate(
      { messageId: message.messageId },
      { $set: message },
      {
        upsert: true,
        returnNewDocument: true,
        returnDocument: 'after',
      },
    );
  }

  private async signTransaction(message: Message): Promise<Message> {
    const walletClient = createWalletClient({
      account: mnemonicToAccount(process.env.MNEMONIC!),
      chain: getChain(message.toChainId),
      transport: http(),
    });

    const publicClient = createPublicClient({
      chain: getChain(message.toChainId),
      transport: http(),
    });

    const incomingMessage: IncomingMessage = {
      messageId: message.messageId,
      fromChainId: message.fromChainId,
      sender: message.sender,
      payload: message.payload,
      tokens: message.tokens,
      payMaster: message.payMaster,
    };

    const tokenPool = TOKEN_POOL_ADDRESSES[message.toChainId];

    const toTrxHash = await walletClient.writeContract({
      abi: etnCallABI,
      address: ETN_CALL_ADDRESSES[message.toChainId],
      functionName: 'postMessage',
      args: [message.receiver, incomingMessage, tokenPool],
    });

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: toTrxHash,
    });

    message.toTrxHash = receipt.transactionHash;

    message.deliveredTimestamp = Math.ceil(Date.now() / 1000);
    message.status = Status.DELIVERED;

    return message;
  }

  async process(job: Job<JobOptions>): Promise<any> {
    try {
      const messages = await this.event.fetch(job.data.chainId);

      for (let index = 0; index < messages.length; index++) {
        const message = messages[index];
        switch (message.status) {
          case Status.INITIATED:
            message.initializedTimestamp = Math.ceil(Date.now() / 1000);
            await this.initializeTrx(message);
            break;

          case Status.RETRY:
            message.retriedTimestamp = Math.ceil(Date.now() / 1000);
            break;

          default:
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  @OnWorkerEvent('completed')
  onCompleted() {}
}

export default MessageWorker;
