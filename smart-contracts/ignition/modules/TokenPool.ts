// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import ETNCallConfigModule from "./ETNConfig";
import ETNCallModule from "./ETNCall";

const TokenPoolModule = buildModule("TokenPoolModule", (m) => {
  const { etnCall } = m.useModule(ETNCallModule);
  const { etnCallConfig } = m.useModule(ETNCallConfigModule);

  const tokenPool = m.contract("TokenPool", [etnCallConfig, etnCall]);

  return { tokenPool };
});

export default TokenPoolModule;
