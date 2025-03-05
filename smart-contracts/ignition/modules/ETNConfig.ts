// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ETNCallConfigModule = buildModule("ETNCallConfigModule", (m) => {
  const etnCallConfig = m.contract("ETNCallConfig");

  return { etnCallConfig };
});

export default ETNCallConfigModule;
