console.log("Hello via Bun!");

import { createPublicClient } from '../../packages/starkweb/dist/esm/clients/createPublicClient'
import { http } from '../../packages/starkweb/dist/esm/clients/transports/http'
import { sepolia } from '../../packages/starkweb/dist/esm/chains/definitions/sepolia'
import { accountABI } from '../../packages/starkweb/dist/esm/utils/siws/account-contract-abi';
import { stringify } from '../../packages/starkweb/dist/esm/utils/json';
// export const client = createPublicClient({
//   transport: http('https://starknet-sepolia.infura.io/v3/db72641028ee47f5b18bcbb791a3f829'),
//   chain: sepolia,
// })

const result = await http('https://starknet-sepolia.infura.io/v3/db72641028ee47f5b18bcbb791a3f829')
const client = result({
  chain: sepolia,
  retryCount: 0,
  timeout: 10000,
})
// console.log(client)
const elll =await  client.request(
  {
    
  method: 'starknet_call',
  params: [
    {
      "calldata":["0x03b56013adf5ce1febefc5dbea283d4a5fb0ce2b9d9e8a174b8e8df005e88fe2"],
"contract_address":"0x01f7e900d8d0eb877e48c7637496f7727efaccd221c9006ee26f2b2376c9773f","entry_point_selector":"0x00cf37a862e5bf34bd0e858865ea02d4ba6db9cc722f3424eb452c94d4ea567f"

},
"latest"
],
},
  {
  method: 'starknet_call',
  params: [
    {
      "calldata":["0x03b56013adf5ce1febefc5dbea283d4a5fb0ce2b9d9e8a174b8e8df005e88fe2"],
"contract_address":"0x01f7e900d8d0eb877e48c7637496f7727efaccd221c9006ee26f2b2376c9773f","entry_point_selector":"0x00cf37a862e5bf34bd0e858865ea02d4ba6db9cc722f3424eb452c94d4ea567f"

},
"latest"
],
}
)

console.log(elll)