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

const MESSAGE_FETCH_INTERVAL = 20_000;

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

  async getMessages(
    page: number,
    take: number,
    status?: Status,
  ): Promise<AppResponse<Paged<Message[]>>> {
    try {
      const total = await this.messageModel.countDocuments({ status });

      const data = await this.messageModel
        .find({ status })
        .skip((page - 1) * take)
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
