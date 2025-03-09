/* eslint-disable prettier/prettier */

import { Queue } from 'bullmq';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Message } from './schemas/message';
import { InjectModel } from '@nestjs/mongoose';
import MessageWorker from './message-worker';
import { InjectQueue } from '@nestjs/bullmq';
import {
  AppResponse,
  JobOptions,
  Paged,
  Status,
  SUPPORTED_CHAINS,
} from './types';
import { Hex } from 'viem';

const MESSAGE_FETCH_INTERVAL = 60_000;

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectQueue(MessageWorker.name) private messageWorkerQueue: Queue,
  ) {
    const chains: SUPPORTED_CHAINS[] = [5201420, 534351, 80002];

    chains.forEach((chain) => {
      const options: JobOptions = { chainId: chain };

      this.messageWorkerQueue
        .add(`Chain_${chain}`, options, {
          repeat: {
            every: MESSAGE_FETCH_INTERVAL,
            immediately: true,
          },
          attempts: 2,
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  async getMessage(messageId: Hex): Promise<AppResponse<Message | null>> {
    try {
      const data = await this.messageModel.findOne({ messageId });

      return { status: 200, data };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
      };
    }
  }

  async getMessages(
    page: number,
    take: number,
    status?: Status,
  ): Promise<AppResponse<Paged<Message[]>>> {
    try {
      const total = await this.messageModel.countDocuments(
        status ? { status } : {},
      );

      const data = await this.messageModel
        .find(status ? { status } : {})
        .skip((page - 1) * take)
        .sort({ initializedTimestamp: 'desc' })
        .limit(take);

      const lastPage = Math.ceil(total / take);

      return {
        status: 200,
        data: { total, data, lastPage },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
      };
    }
  }
}
