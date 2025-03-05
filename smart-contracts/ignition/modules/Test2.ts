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
        "0xbf0cafaebd7117776f67f57ceeb775ab1afbb17b5f9fdccc8baf45498c4a0c19",
      fromChainId: 5201420,
      sender: "0x6c03225b209187A318AE6FF0E4c547c979167Ebc",
      payload:
        "0x0000000000000000000000003e646e062f05e01e1860ea53a6dc81e7e9162de6",
      tokens: [
        {
          tokenId: "0x93cdD8AD086B719C7F56D540B38b373010481471",
          amount: "5000000000000000000",
        },
      ],
      payMaster: 1,
    },
    tokenPool,
  ]);

  return {};
});

export default TestModule;
