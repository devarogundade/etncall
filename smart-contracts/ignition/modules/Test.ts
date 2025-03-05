import { buildModule } from "@nomicfoundation/ignition-core";
import ETNCallModule from "./ETNCall";
import TokenPoolModule from "./TokenPool";
import BridgeModule from "./Bridge";

const TestModule = buildModule("TestModule", (m) => {
  const { bridge } = m.useModule(BridgeModule);
  const { etnCall } = m.useModule(ETNCallModule);
  const { tokenPool } = m.useModule(TokenPoolModule);

  m.call(etnCall, "postMessage", [
    bridge,
    {
      messageId:
        "0x66bc7dc55795737fcd65a243068afc0dff7cd6f032c7d16180ef46a7c9183d94",
      fromChainId: 5201420,
      sender: "0x6c03225b209187A318AE6FF0E4c547c979167Ebc",
      payload:
        "0x0000000000000000000000003e646e062f05e01e1860ea53a6dc81e7e9162de6",
      tokens: [
        {
          tokenId: "0xb4bfa32e527D198CAaBFe21cf501Cd9906726569",
          amount: "12000000000000000000",
        },
      ],
      payMaster: 1,
    },
    tokenPool,
  ]);

  return {};
});

export default TestModule;
