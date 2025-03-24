import { createPaymasterClient, http, parseEther } from "starkweb"
import { mainnet, sepolia } from "starkweb/chains"

const paymasterClient = createPaymasterClient({
  chain: sepolia,
  transport: http('http://localhost:3000/gasless/sepolia'),
  type: 'paymasterClient',
})  
// get paymaster status
const status = await paymasterClient.getPaymasterStatus()
// console.log(status)

// // check account compatibility
// const compatibility = await paymasterClient.checkAccountCompatibility({
//   accountAddress: "0x005c475b6089156c0CD4Fc9d64De149992431c442AF882d6332e7c736c99DE91",
// })
// console.log(compatibility)

// get gas token prices
const gasTokenPrices = await paymasterClient.getGasTokenPrices()
// console.log(gasTokenPrices)

// get account rewards 
const accountRewards = await paymasterClient.getAccountRewards({
  accountAddress: "0x005c475b6089156c0CD4Fc9d64De149992431c442AF882d6332e7c736c99DE91",
})
// console.log(accountRewards)

// Check if account is compatible with paymaster
const isCompatible = await paymasterClient.checkAccountCompatibility({
  accountAddress: "0x005c475b6089156c0CD4Fc9d64De149992431c442AF882d6332e7c736c99DE91",
})
console.log(isCompatible)


// build transaction
const transaction = await paymasterClient.buildTypedData({
  userAddress: "0x005c475b6089156c0CD4Fc9d64De149992431c442AF882d6332e7c736c99DE91",
  calls: [
    {
      entrypoint: "approve",
      contractAddress: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
      calldata: ['0x005c475b6089156c0CD4Fc9d64De149992431c442AF882d6332e7c736c99DE91', '0xf', '0x0'],
    },
  ],
})
console.log(transaction)
