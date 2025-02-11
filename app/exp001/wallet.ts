console.log("Wallet Client");

import { createWalletClient } from '../../packages/starkweb/dist/esm/clients/createWalletClient'
import { custom } from '../../packages/starkweb/dist/esm/clients/transports/custom'
import { sepolia } from '../../packages/starkweb/dist/esm/chains/definitions/sepolia'
import { accountABI } from '../../packages/starkweb/dist/esm/utils/siws/account-contract-abi';

// const walletClient = createWalletClient({
//   transport: custom(window.starknet!),
//   chain: sepolia,
// })

// const signature = await walletClient.signTypedData({
//     account: '0x034abecf49cedc634d0c3145da7b1caea99d8d4f2da5b5d41e532ea05192d523',
//     domain: {
//       name: 'Ether Mail',
//       version: '1',
//       chainId: 1,
//       verifyingContract: '0x0000000000000000000000000000000000000000',
//     },
//     types: {
//       Person: [
//         { name: 'name', type: 'string' },
//         { name: 'wallet', type: 'address' },
//       ],
//       Mail: [
//         { name: 'from', type: 'Person' },
//         { name: 'to', type: 'Person' },
//         { name: 'contents', type: 'string' },
//       ],
//     },
//     primaryType: 'Mail',
//     message: {
//       from: {
//         name: 'Cow',
//         wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
//       },
//       to: {
//         name: 'Bob',
//         wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
//       },
//       contents: 'Hello, Bob!',
//     },
//   })


// console.log(signature)