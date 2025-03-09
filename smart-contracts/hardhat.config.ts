import { vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const MNEMONIC = vars.get("MNEMONIC");

module.exports = {
  mocha: {
    timeout: 100000,
  },
  solidity: {
    version: "0.8.28",
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    localhost: {
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      ],
    },
    electroneumMainnet: {
      url: "https://rpc.ankr.com/electroneum/9af32d7946dc60774ce7d7c522b46b635eb05a3b33beb4f3ea94468ec957a1c7",
      chainId: 52014,
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
    electroneumTestnet: {
      url: "https://rpc.ankr.com/electroneum_testnet/1676bc037edd5ef8284e1077d4c6f0f2c6924bb424e92ce921b5e1c9cc1c1631",
      chainId: 5201420,
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io",
      chainId: 534351,
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
    amoy: {
      url: "https://rpc.ankr.com/polygon_amoy/9af32d7946dc60774ce7d7c522b46b635eb05a3b33beb4f3ea94468ec957a1c7",
      chainId: 80002,
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
  },
  etherscan: {
    apiKey: {
      electroneumTestnet: "empty",
      electroneumMainnet: "empty",
    },
    customChains: [
      {
        network: "electroneumMainnet",
        chainId: 52014,
        urls: {
          apiURL: "https://blockexplorer.electroneum.com/api",
          browserURL: "https://blockexplorer.electroneum.com",
        },
      },
      {
        network: "electroneumTestnet",
        chainId: 5201420,
        urls: {
          apiURL: "https://testnet-blockexplorer.electroneum.com/api",
          browserURL: "https://testnet-blockexplorer.electroneum.com",
        },
      },
    ],
  },
};
