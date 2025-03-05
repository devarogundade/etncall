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

  // m.call(etnCallConfig, "setChainTokenId", [80002, "", btc], {
  //   id: "btc_amoy",
  // });

  // m.call(etnCallConfig, "setChainTokenId", [80002, "", bnb], { id: "bnb_amoy" });

  // m.call(etnCallConfig, "setChainTokenId", [80002, "", usdt], { id: "usdt_amoy" });

  // m.call(etnCallConfig, "setChainTokenId", [80002, "", usdc], { id: "usdc_amoy" });

  // m.call(etnCallConfig, "setChainTokenId", [80002, "", weth], { id: "weth_amoy" });

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [80002, "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", wmatic],
    { id: "wmatic_amoy" }
  );

  // m.call(etnCallConfig, "setChainTokenId", [534351, "", btc], { id: "btc_scroll" });

  // m.call(etnCallConfig, "setChainTokenId", [534351, "", bnb], { id: "bnb_scroll" });

  // m.call(etnCallConfig, "setChainTokenId", [534351, "", usdt], { id: "usdt_scroll" });

  // m.call(etnCallConfig, "setChainTokenId", [534351, "", usdc], { id: "usdc_scroll" });

  // m.call(etnCallConfig, "setChainTokenId", [80002, "", wmatic], { id: "wmatic_scroll" });

  m.call(
    etnCallConfig,
    "setChainTokenId",
    [534351, "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", weth],
    { id: "weth_scroll" }
  );

  m.call(etnCallPay, "deposit", [bridge], { value: parseEther("5") });

  // m.call(bridge, "setContract", [80002, ""], { id: "amoy" });

  // m.call(bridge, "setContract", [534351, ""], { id: "scroll" });

  return { btc, bnb, usdt, usdc, weth, wmatic };
});

export default DeployETNModule;
