import { type Hex } from "viem";

export type SUPPORTED_CHAINS = 5201420 | 534351 | 80002;

export enum Status {
  INITIATED,
  PROCESSING,
  DELIVERED,
  FAILED,
  RETRY,
  RETRYING,
}

export enum PayMaster {
  SENDER,
  ETNCALL_PAY,
}

export type Token = {
  tokenId: Hex;
  amount: string;
};

export type Message = {
  messageId: Hex;
  fromTrxHash: Hex;
  toTrxHash: Hex;
  fee: string;
  feeToken: Hex;
  sequenceNumber: number;
  fromChainId: SUPPORTED_CHAINS;
  toChainId: SUPPORTED_CHAINS;
  sender: Hex;
  receiver: Hex;
  tokens: Token[];
  payMaster: PayMaster;
  payload: Hex;
  status: Status;
  initializedTimestamp?: number;
  deliveredTimestamp?: number;
  failedTimestamp?: number;
  retriedTimestamp?: number;
};

export type Paged<T> = {
  total: number;
  lastPage: number;
  data?: T;
};

export type AppResponse<T> = {
  status: number;
  data?: T;
  message?: string;
};

export type Notification = {
  title: string;
  description: string;
  category: string;
  linkTitle?: string;
  linkUrl?: string;
};
