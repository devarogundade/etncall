/* eslint-disable prettier/prettier */

import { Chain, defineChain, Hex } from 'viem';
import { polygonAmoy, scrollSepolia } from 'viem/chains';

export const ETN_CALL_ADDRESSES: {
  [key: number]: Hex;
} = {
  5201420: '0x',
  534351: '0x',
  80002: '0x',
};

export const ETN_CALL_START_BLOCKS: {
  [key: number]: bigint;
} = {
  5201420: BigInt(0),
  534351: BigInt(0),
  80002: BigInt(0),
};

export const electroneumTestnet = defineChain({
  id: 5201420,
  name: 'Electroneum Testnet',
  nativeCurrency: {
    name: 'ETN',
    symbol: 'ETN',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        'https://rpc.ankr.com/electroneum_testnet/9af32d7946dc60774ce7d7c522b46b635eb05a3b33beb4f3ea94468ec957a1c7',
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'Electroneum Block Explorer',
      url: 'https://blockexplorer.thesecurityteam.rocks',
    },
  },
  testnet: true,
});

export type SUPPORTED_CHAINS = 5201420 | 534351 | 80002;

export enum PayMaster {
  SENDER,
  ETNCALL_PAY,
}

export type IncomingMessage = {
  messageId: Hex;
  fromChainId: SUPPORTED_CHAINS;
  sender: Hex;
  payload?: Hex;
  tokens: Token[];
  payMaster: PayMaster;
};

export type JobOptions = {
  chainId: SUPPORTED_CHAINS;
};

export type Token = {
  tokenId: Hex;
  amount: string;
};

export enum Status {
  INITIATED,
  PROCESSING,
  DELIVERED,
  FAILED,
  RETRY,
  RETRYING,
}

export type DispatchLog = {
  messageId: Hex;
  fromTrxHash: Hex;
  transactionHash: Hex;
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
};

export const getChain = (chainId: SUPPORTED_CHAINS): Chain => {
  switch (chainId) {
    case 5201420:
      return electroneumTestnet;
    case 534351:
      return scrollSepolia;
    case 80002:
      return polygonAmoy;
    default:
      return electroneumTestnet;
  }
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
