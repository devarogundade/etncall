/* eslint-disable prettier/prettier */

export const etnCallABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pay_',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'config_',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'messageId',
        type: 'bytes32',
      },
    ],
    name: 'AlreadyExecuted',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InsufficientGasFee',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidMessage',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
    ],
    name: 'UnsupportedChain',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'messageId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'feeToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sequenceNumber',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'toChainId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenId',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        indexed: false,
        internalType: 'struct Data.Token[]',
        name: 'tokens',
        type: 'tuple[]',
      },
      {
        indexed: false,
        internalType: 'enum Data.PayMaster',
        name: 'payMaster',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'payload',
        type: 'bytes',
      },
    ],
    name: 'Dispatch',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'messageId',
        type: 'bytes32',
      },
    ],
    name: 'PostMessage',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'toChainId',
        type: 'uint256',
      },
    ],
    name: 'estimateFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
    ],
    name: 'isChainSupported',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenId',
        type: 'address',
      },
    ],
    name: 'isTokenSupported',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'messageId',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'fromChainId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'payload',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'tokenId',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct Data.Token[]',
            name: 'tokens',
            type: 'tuple[]',
          },
          {
            internalType: 'enum Data.PayMaster',
            name: 'payMaster',
            type: 'uint8',
          },
        ],
        internalType: 'struct Data.IncomingMessage',
        name: 'message',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'tokenPool',
        type: 'address',
      },
    ],
    name: 'postMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'toChainId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'payload',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'tokenId',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct Data.Token[]',
            name: 'tokens',
            type: 'tuple[]',
          },
          {
            internalType: 'enum Data.PayMaster',
            name: 'payMaster',
            type: 'uint8',
          },
        ],
        internalType: 'struct Data.OutgoingMessage',
        name: 'message',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'tokenPool',
        type: 'address',
      },
    ],
    name: 'sendMessage',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
