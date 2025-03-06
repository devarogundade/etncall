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

const getFaucets: { [key: number]: string } = {
  5201420: "https://faucet.electroneum.com",
  534351: "https://cloud.google.com/application/web3/faucet/ethereum/sepolia",
  80002: "https://faucet.polygon.technology/",
};

const getTokenPools: { [key: number]: Hex } = {
  5201420: "0x8E659DA3e81FddbD73c1511C990391F9486CF16C",
  534351: "0xd44bf2743f9bE03D97511235e38af1EA6e8C9ECE",
  80002: "0x92E1d7A42108f962e12E750B22edf97D1B66BeD9",
};

const getTokens: Token[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    image: "/images/btc.png",
    address: {
      5201420: "0x93cdD8AD086B719C7F56D540B38b373010481471",
      534351: "0x93cdD8AD086B719C7F56D540B38b373010481471",
      80002: "0xccC1cbFD3978ed0EaFAaE5BfCBCcBF44bE011484",
    },
    price: 90_441.12,
  },
  {
    name: "Binance",
    symbol: "BNB",
    image: "/images/bnb.png",
    address: {
      5201420: "0xF3F9b7d82650F38795200326B6DE933f4E78965f",
      534351: "0xF3F9b7d82650F38795200326B6DE933f4E78965f",
      80002: "0x4764B6bA270778A54C0E968F74364b9Cf888A223",
    },
    price: 597.73,
  },
  {
    name: "Tether USD",
    symbol: "USDT",
    image: "/images/usdt.png",
    address: {
      5201420: "0xb4bfa32e527D198CAaBFe21cf501Cd9906726569",
      534351: "0xb4bfa32e527D198CAaBFe21cf501Cd9906726569",
      80002: "0x64b7D2f159bC90Eae3e46c8b0331eFD66ff2b2BA",
    },
    price: 0.998,
  },
  {
    name: "Circle USD",
    symbol: "USDC",
    image: "/images/usdc.png",
    address: {
      5201420: "0xf8Fa105d9A78580f297364B9fD6575C095cE0553",
      534351: "0xf8Fa105d9A78580f297364B9fD6575C095cE0553",
      80002: "0x5c77247e37dBE17B2801f60bdcA956eCCA428477",
    },
    price: 1.012,
  },
  // {
  //   name: "Ethereum",
  //   symbol: "ETH",
  //   image: "/images/eth.png",
  //   address: {
  //     5201420: "0x4764B6bA270778A54C0E968F74364b9Cf888A223",
  //     534351: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  //     80002: "0xAB3c1d302dAcDFFBE420aAC9fb0D4C2ED5b7B905",
  //   },
  //   price: 2_234.4,
  // },
  // {
  //   name: "Polygon",
  //   symbol: "MATIC",
  //   image: "/images/matic.png",
  //   address: {
  //     5201420: "0x5c77247e37dBE17B2801f60bdcA956eCCA428477",
  //     534351: "0x5c77247e37dBE17B2801f60bdcA956eCCA428477",
  //     80002: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  //   },
  //   price: 0.2572,
  // },
  // {
  //   name: "ETN",
  //   symbol: "ETN",
  //   image: "/images/etn.png",
  //   address: {
  //     5201420: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  //     534351: "0xccC1cbFD3978ed0EaFAaE5BfCBCcBF44bE011484",
  //     80002: "0xCC571702197B98c4EB8a576FFa77c84E9202baDA",
  //   },
  //   price: 0.002339,
  // },
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
  getFaucets,
};
