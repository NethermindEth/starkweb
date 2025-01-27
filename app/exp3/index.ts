import { testAbi } from '../../packages/starkweb/src/abi/testabi.js';
import {
  readContract,
} from '../../packages/starkweb/src/actions/public/readContract.js';
import {
  sepolia,
} from '../../packages/starkweb/src/chains/definitions/sepolia.js';
import {
  createPublicClient,
} from '../../packages/starkweb/src/clients/createPublicClient.js';
import { http } from '../../packages/starkweb/src/clients/transports/http.js';
import { STRKAbi } from './ether.js';
import { decodeFromTypes, decodeFromParams, decodeCoreType } from '../../packages/starkweb/src/abi/decode.js';
import { BigNumber } from '@0x/utils';
import { StarknetCoreType, type AbiParameter } from '../../packages/starkweb/src/abi/types.js';

const client = createPublicClient({
  chain: sepolia,
  transport: http(),
})

// const result1 = await readContract(client, {
//   abi: testAbi,
//   address: '0x005c475b6089156c0CD4Fc9d64De149992431c442AF882d6332e7c736c99DE91',
//   functionName: 'is_valid_signature',
//   args: {
//     hash: '0x15a40e7b606a07809a3a8ef6c5c57a13cb3170ceeff54c658b80d4291e723e5' as 'felt252',
//     signature: [
//       '1' as 'felt252',
//       '0' as 'felt252',
//       '969608340573873002548328497463227700583087900647642632826265628162355070673' as 'felt252',
//       '3056899316822444645201691453412411654617515370270943362512517781923879823544' as 'felt252',
//       '1318377573252781875915557329760176527807637247213235526249349460792832175179' as 'felt252',
//     ],
//   },
// })

const result1  = await readContract(client, {
  abi: STRKAbi,
  address: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
  functionName: 'balance_of',
  args: {
    account: '0x005c475b6089156c0CD4Fc9d64De149992431c442AF882d6332e7c736c99DE91' as 'contract_address',
  },
})

console.log(result1)
const decoded3 = decodeCallResult(result1 as unknown as string[], [{ type: 'Uint256' }])
console.log(decoded3) 

console.log("Hello via Bun!");


export type DecodedResult = {
  [key: string]: string | bigint | DecodedResult[];
};

export function decodeCallResult(result: string[], outputs: ReadonlyArray<{name?: string, type: string}>): DecodedResult {
  let index = 0;
  const decoded: DecodedResult = {};

  // Helper functions
  const decodeFelt = (felt: string) => BigInt(felt).toString(10);
  const decodeUint256 = (uint256: string) => BigInt(uint256);
  const decodeShortString = (shortString: string) => {
      const hex = BigInt(shortString).toString(16);
      return Buffer.from(hex, 'hex').toString('utf8');
  };

  for (const output of outputs) {
      const name = output.name || `output${index}`;
      
      switch(output.type) {
          case 'felt':
              decoded[name] = decodeFelt(result[index] as string);
              index++;
              break;
              
          case 'Uint256':
              decoded[name] = decodeUint256(result[index] as string);
              index++;
              break;
              
          case 'felt*': {
              const length = parseInt(result[index] as string);
              index++;
              const arr: string[] = [];
              for(let i = 0; i < length; i++) {
                  arr.push(decodeFelt(result[index] as string));
                  index++;
              }
              decoded[name] = arr as unknown as DecodedResult[];
              break;
          }
              
          case 'shortString':
              decoded[name] = decodeShortString(result[index] as string);
              index++;
              break;
              
          default:
              throw new Error(`Unsupported type: ${output.type}`);
      }
  }
  
  return decoded;
}

// Example usage:
const exampleAbi = [
{
  "type": "function",
  "name": "get_balance",
  "inputs": [],
  "outputs": [
    {
      "name": "balance",
      "type": "Uint256"
    }
  ],
  "state_mutability": "view"
}
] as const;

const result = ['1234567890'];
const decoded = decodeCallResult(result, exampleAbi[0].outputs);
// decoded = { balance: 1234567890n }

// Example with multiple outputs and different types
const complexAbi = [
{
  "type": "function", 
  "name": "get_user_info",
  "inputs": [],
  "outputs": [
    {
      "name": "name", 
      "type": "shortString"
    },
    {
      "name": "balance",
      "type": "Uint256"  
    },
    {
      "name": "token_ids",
      "type": "felt*"
    }
  ],
  "state_mutability": "view"
}
] as const;

const complexResult = [
'0x416c696365', // "Alice" in hex
'1000000000',
'2',            // Array length
'1',            // First token ID
'2'             // Second token ID
];
const decodedComplex = decodeCallResult( complexResult, complexAbi[0].outputs);
console.log(decodedComplex)
// decodedComplex = {
//   name: "Alice",
//   balance: 1000000000n,
//   token_ids: ["1", "2"]
// }

// Example 1: decodeFromTypes - simple types
const typesExample = [
  StarknetCoreType.Bool,
  StarknetCoreType.U256,
  StarknetCoreType.Felt
];
const values1 = [
  new BigNumber(1),  // bool: true
  new BigNumber(100),  // U256 low 128 bits
  new BigNumber(200),  // U256 high 128 bits
  new BigNumber('123abc', 16)  // felt
];
const decoded1 = decodeFromTypes(typesExample, values1);
console.log(decoded1)
// Result: [true, 200*(2^128) + 100, "123abc"]

// Example 2: decodeFromParams - named parameters
const paramsExample = [
  { name: 'user', type: StarknetCoreType.Felt },
  { name: 'amounts', type: { type: 'array', elementType: StarknetCoreType.U256 } }
];
const values2 = [
  new BigNumber('deadbeef', 16),  // user address
  new BigNumber(2),  // array length
  new BigNumber(10),  // amount[0] low
  new BigNumber(20),  // amount[0] high
  new BigNumber(30),  // amount[1] low
  new BigNumber(40)   // amount[1] high
];
const decoded2 = decodeFromParams(paramsExample as AbiParameter[], values2);
console.log(decoded2)
/* Result:
{
  user: "deadbeef",
  amounts: [20*(2^128) + 10, 40*(2^128) + 30]
}
*/

// Example 3: decodeCoreType - individual type decoding
// Decoding a U256
const u256Value = decodeCoreType(
  StarknetCoreType.U256,
  [new BigNumber(100), new BigNumber(200)],
  0
);
// Result: [200*(2^128) + 100, 2]

// Decoding an array of felts
const arrayValue = decodeCoreType(
  { type: 'array', elementType: StarknetCoreType.Felt },
  [
    new BigNumber(3),  // array length
    new BigNumber('a', 16),
    new BigNumber('b', 16),
    new BigNumber('c', 16)
  ],
  0
);
console.log(arrayValue)
// Result: [["a", "b", "c"], 4]