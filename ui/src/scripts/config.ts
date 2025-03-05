import { walletConnect } from "@wagmi/connectors";
import { defaultWagmiConfig } from "@web3modal/wagmi";
import { defineChain } from "viem";
import { polygonAmoy, scrollSepolia } from 'viem/chains';

const metadata = {
  name: "ETNCall",
  description: "ETNCall",
  url: "https://etncall.netlify.app",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
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
