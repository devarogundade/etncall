/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Hex } from 'viem';

import { type Token, PayMaster, Status, SUPPORTED_CHAINS } from '../types';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ required: true, unique: true })
  messageId: Hex;

  @Prop({ required: true })
  status: Status;

  @Prop({ required: true })
  fromTrxHash: string;

  @Prop()
  toTrxHash?: string;

  @Prop({ required: true })
  fee: string;

  @Prop({ required: true })
  feeToken: Hex;

  @Prop({ required: true })
  sequenceNumber: number;

  @Prop({ required: true })
  fromChainId: SUPPORTED_CHAINS;

  @Prop({ required: true })
  toChainId: SUPPORTED_CHAINS;

  @Prop({ required: true })
  sender: Hex;

  @Prop({ required: true })
  receiver: Hex;

  @Prop({ type: Types.Array })
  tokens: Token[];

  @Prop({ required: true })
  payMaster: PayMaster;

  @Prop({ required: true })
  payload?: Hex;

  @Prop()
  initializedTimestamp?: number;

  @Prop()
  deliveredTimestamp?: number;

  @Prop()
  failedTimestamp?: number;

  @Prop()
  retriedTimestamp?: number;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
