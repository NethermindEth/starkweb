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

const result = await readContract(client, {
  abi: STRKAbi,
  address: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
  functionName: 'balance_of',
  args: {
    account: '0x005c475b6089156c0CD4Fc9d64De149992431c442AF882d6332e7c736c99DE91' as 'contract_address',
  },
})

console.log(result)

console.log(result)
console.log("Hello via Bun!");