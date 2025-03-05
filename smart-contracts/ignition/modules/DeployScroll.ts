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

  m.call(etnCallConfig, "setFee", [5201420, parseEther("0.0012")]);

  m.call(etnCallConfig, "updateSupportedChains", [[5201420]]);

  m.call(etnCallConfig, "updateSupportedTokens", [
    [btc, bnb, usdt, usdc, wmatic, wetn],
  ]);

  // m.call(etnCallConfig, "setChainTokenId", [5201420 , "", btc], { id: "btc" });

  // m.call(etnCallConfig, "setChainTokenId", [5201420 , "", bnb], { id: "bnb" });

  // m.call(etnCallConfig, "setChainTokenId", [5201420 , "", usdt], { id: "usdt" });

  // m.call(etnCallConfig, "setChainTokenId", [5201420 , "", usdc], { id: "usdc" });

  // m.call(etnCallConfig, "setChainTokenId", [5201420 , "", wmatic], { id: "wmatic" });

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [5201420, "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", wetn],
    { id: "usdc" }
  );

  m.call(etnCallPay, "deposit", [bridge], { value: parseEther("0.05") });

  // m.call(bridge, "setContract", [5201420 , ""]);

  return { btc, bnb, usdt, usdc, wetn };
});

export default DeployScrollModule;
