// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TokenPoolModule = buildModule("TokenPoolModule", (m) => {
  const tokenPool = m.contract("TokenPool");

  return { tokenPool };
});

export default TokenPoolModule;
