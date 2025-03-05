import { parseEther } from "viem";
// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import ETNCallPayModule from "./ETNCallPay";
import BridgeModule from "./Bridge";
import ETNCallConfigModule from "./ETNConfig";
import TokensModule from "./Tokens";

const DeployScrollModule = buildModule("DeployScrollModule", (m) => {
  const { btc, bnb, usdt, usdc, weth, wetn } = m.useModule(TokensModule);

  const { bridge } = m.useModule(BridgeModule);
  const { etnCallPay } = m.useModule(ETNCallPayModule);
  const { etnCallConfig } = m.useModule(ETNCallConfigModule);

  m.call(etnCallConfig, "setFee", [5201420, parseEther("0.1")]);

  m.call(etnCallConfig, "updateSupportedChains", [[5201420]]);

  m.call(etnCallConfig, "updateSupportedTokens", [
    [btc, bnb, usdt, usdc, weth, wetn],
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
    [5201420, "0x4764B6bA270778A54C0E968F74364b9Cf888A223", weth],
    { id: "weth" }
  );

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [5201420, "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", wetn],
    { id: "wetn" }
  );

  m.call(etnCallPay, "deposit", [bridge], {
    value: parseEther("0.2"),
  });

  m.call(bridge, "setContract", [
    5201420,
    "0x6c03225b209187A318AE6FF0E4c547c979167Ebc",
  ]);

  return { btc, bnb, usdt, usdc, wetn };
});

export default DeployScrollModule;
