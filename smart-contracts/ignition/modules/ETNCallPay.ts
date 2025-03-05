// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ETNCallPayModule = buildModule("ETNCallPayModule", (m) => {
  const etnCallPay = m.contract("ETNCallPay");

  return { etnCallPay };
});

export default ETNCallPayModule;
