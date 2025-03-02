/**
 * StarkWeb Client - A client for interacting with Starknet
 */

// Import from the starkweb workspace package
import {
  createPublicClient,
  createWalletClient,
  custom,
  erc20Abi,
  http,
} from 'starkweb';
import { getStarknetId, getStarknetIdName } from 'starkweb/actions';
import { mainnet, sepolia } from 'starkweb/chains';

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http('https://starknet-mainnet.infura.io/v3/db72641028ee47f5b18bcbb791a3f829'),
});
const id = await getStarknetId(publicClient, {
  domain: 'solene.stark',
})
// const name = await getStarknetIdName(publicClient, {
//   address: '0x061b6c0a78f9edf13cea17b50719f3344533fadd470b8cb29c2b4318014f52d3',
// })
console.log(id)
// console.log(name)

// const result = await publicClient.readContracts({
//   contracts: [
//     {
//       abi: erc20Abi,
//       functionName: 'balanceOf',
//       args: 
//         {
//           account: '0x005c475b6089156c0CD4Fc9d64De149992431c442AF882d6332e7c736c99DE91',
//       },
//       address:
//         '0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D',
//     },
//     {
//       abi: erc20Abi,
//       functionName: 'balanceOf',
//       args: 
//         {
//           account: '0x034abecf49cedc634d0c3145da7b1caea99d8d4f2da5b5d41e532ea05192d523',
//       },
//       address:
//         '0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D',
//     },
//   ],
// })

// console.log(result);
