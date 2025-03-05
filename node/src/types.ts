/* eslint-disable prettier/prettier */

import { Chain, defineChain, Hex } from 'viem';
import { polygonAmoy, scrollSepolia } from 'viem/chains';

export const ETN_CALL_ADDRESSES: {
  [key: number]: Hex;
} = {
  5201420: '0x8b643a9F90365D5AAEA397Cb76E99DFe9D0cf1cB',
  534351: '0x239DDD71fcb1B8E6cEb43AE592644D637f44C089',
  80002: '0xd44bf2743f9bE03D97511235e38af1EA6e8C9ECE',
};

export const ETN_CALL_START_BLOCKS: {
  [key: number]: bigint;
} = {
  5201420: BigInt(5730686),
  534351: BigInt(8405334),
  80002: BigInt(18845107),
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
