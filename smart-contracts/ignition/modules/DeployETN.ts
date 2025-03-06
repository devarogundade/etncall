import { parseEther } from "viem";
// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import ETNCallPayModule from "./ETNCallPay";
import BridgeModule from "./Bridge";
import ETNCallConfigModule from "./ETNConfig";
import TokensModule from "./Tokens";

const DeployETNModule = buildModule("DeployETNModule", (m) => {
  const { btc, bnb, usdt, usdc, weth, wmatic } = m.useModule(TokensModule);

  const { bridge } = m.useModule(BridgeModule);
  const { etnCallPay } = m.useModule(ETNCallPayModule);
  const { etnCallConfig } = m.useModule(ETNCallConfigModule);

  m.call(etnCallConfig, "setFee", [80002, parseEther("0.67")], {
    id: "amoy",
  });

  m.call(etnCallConfig, "setFee", [534351, parseEther("0.5")], {
    id: "scroll",
  });

  m.call(etnCallConfig, "updateSupportedChains", [[80002, 534351]]);

  m.call(etnCallConfig, "updateSupportedTokens", [
    [btc, bnb, usdt, usdc, weth, wmatic],
  ]);

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [80002, "0xccC1cbFD3978ed0EaFAaE5BfCBCcBF44bE011484", btc],
    {
      id: "btc_amoy",
    }
  );

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [80002, "0x4764B6bA270778A54C0E968F74364b9Cf888A223", bnb],
    {
      id: "bnb_amoy",
    }
  );

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [80002, "0x64b7D2f159bC90Eae3e46c8b0331eFD66ff2b2BA", usdt],
    {
      id: "usdt_amoy",
    }
  );

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [80002, "0x5c77247e37dBE17B2801f60bdcA956eCCA428477", usdc],
    {
      id: "usdc_amoy",
    }
  );

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [80002, "0xAB3c1d302dAcDFFBE420aAC9fb0D4C2ED5b7B905", weth],
    {
      id: "weth_amoy",
    }
  );

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [80002, "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", wmatic],
    { id: "wmatic_amoy" }
  );

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [534351, "0x93cdD8AD086B719C7F56D540B38b373010481471", btc],
    {
      id: "btc_scroll",
    }
  );

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [534351, "0xF3F9b7d82650F38795200326B6DE933f4E78965f", bnb],
    {
      id: "bnb_scroll",
    }
  );

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [534351, "0xb4bfa32e527D198CAaBFe21cf501Cd9906726569", usdt],
    {
      id: "usdt_scroll",
    }
  );

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [534351, "0xf8Fa105d9A78580f297364B9fD6575C095cE0553", usdc],
    {
      id: "usdc_scroll",
    }
  );

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [80002, "0x5c77247e37dBE17B2801f60bdcA956eCCA428477", wmatic],
    {
      id: "wmatic_scroll",
    }
  );

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [534351, "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", weth],
    { id: "weth_scroll" }
  );

  m.call(etnCallPay, "deposit", [bridge], { value: parseEther("5") });

  m.call(
    bridge,
    "setContract",
    [80002, "0x848F5e09bC24663cC0451c0c44826b1C7706Ad78"],
    { id: "amoy_setContract" }
  );

  m.call(
    bridge,
    "setContract",
    [534351, "0x98d0a92C3752949E1b359BC3D6532B679F17BC0B"],
    { id: "scroll_setContract" }
  );

  m.call(etnCallPay, "deposit", [bridge], {
    value: parseEther("5"),
    id: "topup_1",
  });

  m.call(etnCallConfig, "setFee", [80002, parseEther("0.067")], {
    id: "fee_amoy_adjusted",
  });

  m.call(etnCallConfig, "setFee", [534351, parseEther("0.05")], {
    id: "fee_scroll_adjusted",
  });

  return { btc, bnb, usdt, usdc, weth, wmatic };
});

export default DeployETNModule;
