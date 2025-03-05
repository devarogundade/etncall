// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TokensModule = buildModule("TokensModule", (m) => {
  const btc = m.contract("MintableToken", ["Bitcoin", "BTC"], { id: "btc" });
  const bnb = m.contract("MintableToken", ["Binance", "BNB"], { id: "bnb" });
  const usdt = m.contract("MintableToken", ["Tether USD", "USDT"], {
    id: "usdt",
  });
  const usdc = m.contract("MintableToken", ["Circle USD", "USDC"], {
    id: "usdc",
  });
  const weth = m.contract("MintableToken", ["Wrapped ETH", "WETH"], {
    id: "weth",
  });
  const wmatic = m.contract("MintableToken", ["Wrapped Polygon", "WMATIC"], {
    id: "wmatic",
  });
  const wetn = m.contract("MintableToken", ["Wrapped ETN", "WETN"], {
    id: "wetn",
  });

  return { btc, bnb, usdt, usdc, weth, wmatic, wetn };
});

export default TokensModule;
