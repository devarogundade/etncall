import { chains } from "./config";
import type { Chain, Hex } from "viem";
import type { SUPPORTED_CHAINS } from "./types";

type Token = {
  name: string;
  symbol: string;
  image: string;
  address: { [key: number]: Hex };
  price: number;
};

const fineId = (address: Hex): string => {
  return `${address.substring(0, 4)}---${address.substring(
    address.length - 4,
    address.length
  )}`;
};

const getChains = chains;

const getChain = (chainId: number): Chain | undefined => {
  return chains.find((chain) => chain.id == chainId);
};

const getTokenPools: { [key: number]: Hex } = {
  5201420: "0x",
  534351: "0x",
  80002: "0x",
};

const getTokens: Token[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    image: "/images/btc.png",
    address: {
      5201420: "0x",
      534351: "0x",
      80002: "0x",
    },
    price: 1,
  },
  {
    name: "Binance",
    symbol: "BNB",
    image: "/images/bnb.png",
    address: {
      5201420: "0x",
      534351: "0x",
      80002: "0x",
    },
    price: 1,
  },
  {
    name: "Tether USD",
    symbol: "USDT",
    image: "/images/usdt.png",
    address: {
      5201420: "0x",
      534351: "0x",
      80002: "0x",
    },
    price: 1,
  },
  {
    name: "Circle USD",
    symbol: "USDC",
    image: "/images/usdc.png",
    address: {
      5201420: "0x",
      534351: "0x",
      80002: "0x",
    },
    price: 1,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    image: "/images/eth.png",
    address: {
      5201420: "0x",
      534351: "0x",
      80002: "0x",
    },
    price: 1,
  },
  {
    name: "Polygon",
    symbol: "MATIC",
    image: "/images/matic.png",
    address: {
      5201420: "0x",
      534351: "0x",
      80002: "0x",
    },
    price: 1,
  },
  {
    name: "ETN",
    symbol: "ETN",
    image: "/images/etn.png",
    address: {
      5201420: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      534351: "0x",
      80002: "0x",
    },
    price: 1,
  },
];

const getToken = (
  chainId: SUPPORTED_CHAINS,
  address: Hex
): Token | undefined => {
  return getTokens.find(
    (token) => token.address[chainId].toLowerCase() == address.toLowerCase()
  );
};

const toMoney = (amount: number) => {
  return Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 5,
  }).format(amount);
};
const NATIVE_TOKEN: Hex = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

export {
  type Token,
  getChains,
  getChain,
  getTokens,
  getToken,
  getTokenPools,
  fineId,
  toMoney,
  NATIVE_TOKEN,
};
