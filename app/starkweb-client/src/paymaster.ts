import { createPaymasterClient, http } from "starkweb"
import { mainnet } from "starkweb/chains"

const paymasterClient = createPaymasterClient({
  chain: mainnet,
  transport: http(),
  type: 'paymasterClient',
})  

const status = await paymasterClient.getPaymasterStatus()
console.log(status)

