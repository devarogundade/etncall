# ETNCall

Enabling dApps on Electroneum go cross-chain, by powering seamless transfer of arbitrarily any data from other blockchains and vice versa.

ETNCall’s vision is to build a decentralized system that connects the Electroneum Network to other existing blockchain networks, enabling cross-chain communications and asset transfers seamlessly. Our main goals are interoperability, user experience, and facilitating secure and efficient cross-chain transactions. Ultimately, we seek to connecting the Electroneum ecosystem to the existing Web3 world to foster users adoption and smoothen developers transition to the Electroneum Network.

ETNCall is a blockchain interoperability infrastructure that aims to connect the Electroneum Network to other blockchain networks. It provides a decentralized network of relayers (called Node) that facilitate secure and efficient cross-chain transactions. The Node uses the proof of stake consensus mechanism as a security layer, which validators are required to stake $ETC as collateral to validate relayed transactions.

ETNCall is not a token bridge but a general messaging passing (GMP) protocol that can be use to send and receive any arbitrary size of data from Electroneum Network to any other chain and vice versa, which serves as the underlying API to build any type of bridge on or other interoperability structures.

The ETNCall is shipped with its own transaction Explorer including APIs, tools, and a user interface that enables anyone to index, query or visualize the transactions and activities happening within the ETNCall network.

![Architecture](https://github.com/user-attachments/assets/5c964136-668b-46c9-895e-3ce4a2d636a8)

# Developers Guide

## Send Message

```solidity
Data.OutgoingMessage memory message = Data.OutgoingMessage({
  toChainId: toChainId,
  receiver: _contracts[toChainId],
  payload: abi.encode(_msgSender()),
  tokens: tokens,
  payMaster: Data.PayMaster.SENDER
});

uint256 fee = _etnCall.estimateFee(toChainId);

bytes32 messageId = _etnCall.sendMessage{value: fee}(message, tokenPool);
```

## Receive Message

```solidity
function _etnCallReceive(
  Data.IncomingMessage memory message
) internal override {
  address data = abi.decode(message.payload, (address));

  
}
```

## Contracts

#### Chain Id 52014 | Electroneum Mainnet (In progress)
```json
{
  "ETNCallConfigModule#ETNCallConfig": "0x48A60Bb5b671f91aa4ea8a523a68917a80b3FA06",
  "ETNCallPayModule#ETNCallPay": "0xF42A8457851E209d95f876937f8f043b14dA23c1",
  "TokensModule#bnb": "0xF3F9b7d82650F38795200326B6DE933f4E78965f",
  "TokensModule#btc": "0x93cdD8AD086B719C7F56D540B38b373010481471",
  "TokensModule#usdc": "0xf8Fa105d9A78580f297364B9fD6575C095cE0553",
  "TokensModule#usdt": "0xb4bfa32e527D198CAaBFe21cf501Cd9906726569",
  "ETNCallModule#ETNCall": "0x6319a4aa37cBdeB936F766232911d4076D0aaAfD",
  "BridgeModule#Bridge": "0x92E1d7A42108f962e12E750B22edf97D1B66BeD9"
}
```

#### Chain Id 5201420 | Electroneum Testnet (Active)

```json
{
  "ETNCallConfigModule#ETNCallConfig": "0x48A60Bb5b671f91aa4ea8a523a68917a80b3FA06",
  "ETNCallPayModule#ETNCallPay": "0xF42A8457851E209d95f876937f8f043b14dA23c1",
  "TokensModule#bnb": "0xF3F9b7d82650F38795200326B6DE933f4E78965f",
  "TokensModule#usdc": "0xf8Fa105d9A78580f297364B9fD6575C095cE0553",
  "TokensModule#usdt": "0xb4bfa32e527D198CAaBFe21cf501Cd9906726569",
  "TokensModule#btc": "0x93cdD8AD086B719C7F56D540B38b373010481471",
  "ETNCallModule#ETNCall": "0x8b643a9F90365D5AAEA397Cb76E99DFe9D0cf1cB",
  "BridgeModule#Bridge": "0x6c03225b209187A318AE6FF0E4c547c979167Ebc",
  "TokenPoolModule#TokenPool": "0x8E659DA3e81FddbD73c1511C990391F9486CF16C"
}
```

#### Chain Id 534351 | Scroll Sepolia (Active)

```json
{
  "ETNCallConfigModule#ETNCallConfig": "0x48A60Bb5b671f91aa4ea8a523a68917a80b3FA06",
  "ETNCallPayModule#ETNCallPay": "0xF42A8457851E209d95f876937f8f043b14dA23c1",
  "TokensModule#bnb": "0xF3F9b7d82650F38795200326B6DE933f4E78965f",
  "TokensModule#btc": "0x93cdD8AD086B719C7F56D540B38b373010481471",
  "TokensModule#usdc": "0xf8Fa105d9A78580f297364B9fD6575C095cE0553",
  "TokensModule#usdt": "0xb4bfa32e527D198CAaBFe21cf501Cd9906726569",
  "ETNCallModule#ETNCall": "0x239DDD71fcb1B8E6cEb43AE592644D637f44C089",
  "BridgeModule#Bridge": "0x98d0a92C3752949E1b359BC3D6532B679F17BC0B",
  "TokenPoolModule#TokenPool": "0xd44bf2743f9bE03D97511235e38af1EA6e8C9ECE"
}
```

#### Chain Id 80001 | Polygon Amoy (Active)

```json
{
  "ETNCallConfigModule#ETNCallConfig": "0xf8Fa105d9A78580f297364B9fD6575C095cE0553",
  "ETNCallPayModule#ETNCallPay": "0xb4bfa32e527D198CAaBFe21cf501Cd9906726569",
  "TokensModule#bnb": "0x4764B6bA270778A54C0E968F74364b9Cf888A223",
  "TokensModule#btc": "0xccC1cbFD3978ed0EaFAaE5BfCBCcBF44bE011484",
  "TokensModule#usdc": "0x5c77247e37dBE17B2801f60bdcA956eCCA428477",
  "TokensModule#usdt": "0x64b7D2f159bC90Eae3e46c8b0331eFD66ff2b2BA",
  "ETNCallModule#ETNCall": "0xd44bf2743f9bE03D97511235e38af1EA6e8C9ECE",
  "BridgeModule#Bridge": "0x848F5e09bC24663cC0451c0c44826b1C7706Ad78",
  "TokenPoolModule#TokenPool": "0x92E1d7A42108f962e12E750B22edf97D1B66BeD9"
}
```

## APIs

#### Get Messages
`https://etncall-f4e8hbe7c2dfhgcc.canadacentral-01.azurewebsites.net/messages?page=1&take=10`

#### Get Message
`https://etncall-f4e8hbe7c2dfhgcc.canadacentral-01.azurewebsites.net/messages/:messsageId`

