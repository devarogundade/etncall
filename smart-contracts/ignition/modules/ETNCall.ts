// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import ETNCallPayModule from "./ETNCallPay";
import ETNCallConfigModule from "./ETNConfig";

const ETNCallModule = buildModule("ETNCallModule", (m) => {
  const { etnCallPay } = m.useModule(ETNCallPayModule);
  const { etnCallConfig } = m.useModule(ETNCallConfigModule);

  const etnCall = m.contract("ETNCall", [etnCallPay, etnCallConfig]);

  return { etnCall };
});

export default ETNCallModule;
