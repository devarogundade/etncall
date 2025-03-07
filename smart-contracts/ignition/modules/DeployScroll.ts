import { parseEther } from "viem";
// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import ETNCallPayModule from "./ETNCallPay";
import BridgeModule from "./Bridge";
import ETNCallConfigModule from "./ETNConfig";
import TokensModule from "./Tokens";

const DeployScrollModule = buildModule("DeployScrollModule", (m) => {
  const { btc, bnb, usdt, usdc, wmatic, wetn } = m.useModule(TokensModule);

  const { bridge } = m.useModule(BridgeModule);
  const { etnCallPay } = m.useModule(ETNCallPayModule);
  const { etnCallConfig } = m.useModule(ETNCallConfigModule);

  m.call(etnCallConfig, "setFee", [5201420, parseEther("0.0005")]);

  // m.call(etnCallConfig, "updateSupportedChains", [[5201420]]);

  m.call(etnCallConfig, "updateSupportedTokens", [
    [btc, bnb, usdt, usdc, wmatic, wetn],
  ]);

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [5201420, "0x93cdD8AD086B719C7F56D540B38b373010481471", btc],
    { id: "btc" }
  );

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [5201420, "0xF3F9b7d82650F38795200326B6DE933f4E78965f", bnb],
    { id: "bnb" }
  );

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [5201420, "0xb4bfa32e527D198CAaBFe21cf501Cd9906726569", usdt],
    { id: "usdt" }
  );

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [5201420, "0xf8Fa105d9A78580f297364B9fD6575C095cE0553", usdc],
    { id: "usdc" }
  );

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [5201420, "0x5c77247e37dBE17B2801f60bdcA956eCCA428477", wmatic],
    {
      id: "wmatic",
    }
  );

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [5201420, "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", wetn],
    { id: "wetn" }
  );

  m.call(etnCallPay, "deposit", [bridge], { value: parseEther("0.001") });

  m.call(bridge, "setContract", [
    5201420,
    "0x6c03225b209187A318AE6FF0E4c547c979167Ebc",
  ]);

  m.call(etnCallConfig, "updateSupportedChains", [[5201420, 80002]], {
    id: "updated_chains",
  });

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
    [80002, "0xCDF66fB8Ffe346693fF738Ac655bBB3Ae0F4AC10", wmatic],
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
    bridge,
    "setContract",
    [80002, "0x848F5e09bC24663cC0451c0c44826b1C7706Ad78"],
    { id: "amoy_setContract" }
  );

  m.call(etnCallConfig, "setFee", [5201420, parseEther("0.00005")], {
    id: "fee_adjusted",
  });

  m.call(etnCallConfig, "setFee", [80002, parseEther("0.000056")], {
    id: "fee_amoy_adjusted",
  });

  m.call(etnCallPay, "deposit", [bridge], {
    value: parseEther("0.001"),
    id: "topup",
  });

  return { btc, bnb, usdt, usdc, wetn };
});

export default DeployScrollModule;
