import { walletConnect } from "@wagmi/connectors";
import { defaultWagmiConfig } from "@web3modal/wagmi";
import { defineChain } from "viem";
import { polygonAmoy, scrollSepolia } from "viem/chains";

const metadata = {
  name: "ETNCall",
  description: "ETNCall",
  url: "https://etncall.netlify.app",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const electroneumTestnet = defineChain({
  id: 5201420,
  name: "Electroneum Testnet",
  nativeCurrency: {
    name: "ETN",
    symbol: "ETN",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        "https://rpc.ankr.com/electroneum_testnet/1676bc037edd5ef8284e1077d4c6f0f2c6924bb424e92ce921b5e1c9cc1c1631",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "Electroneum Block Explorer",
      url: "https://blockexplorer.thesecurityteam.rocks",
    },
  },
  testnet: true,
});

export const chains = [electroneumTestnet, polygonAmoy, scrollSepolia];

export const config = defaultWagmiConfig({
  // @ts-ignore
  chains,
  projectId: import.meta.env.VITE_PROJECT_ID,
  metadata,
  connectors: [
    walletConnect({
      projectId: import.meta.env.VITE_PROJECT_ID,
    }),
  ],
});
