// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import ETNCallConfigModule from "./ETNConfig";
import ETNCallModule from "./ETNCall";

const BridgeModule = buildModule("BridgeModule", (m) => {
  const { etnCall } = m.useModule(ETNCallModule);
  const { etnCallConfig } = m.useModule(ETNCallConfigModule);

  const bridge = m.contract("Bridge", [etnCallConfig, etnCall]);

  return { bridge };
});

export default BridgeModule;
