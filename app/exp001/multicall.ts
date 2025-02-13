

import { createPublicClient } from '../../packages/starkweb/dist/esm/clients/createPublicClient'
import { http } from '../../packages/starkweb/dist/esm/clients/transports/http'
import { sepolia } from '../../packages/starkweb/dist/esm/chains/definitions/sepolia'


export const client = createPublicClient({
    transport: http('https://starknet-sepolia.infura.io/v3/db72641028ee47f5b18bcbb791a3f829'),
    chain: sepolia,
  })
  

const result = await client.request({
    "jsonrpc": "2.0",
    "method": "starknet_call",
    "params": [
                      {
                        "calldata":["0x03b56013adf5ce1febefc5dbea283d4a5fb0ce2b9d9e8a174b8e8df005e88fe2"],
            "contract_address":"0x01f7e900d8d0eb877e48c7637496f7727efaccd221c9006ee26f2b2376c9773f","entry_point_selector":"0x00cf37a862e5bf34bd0e858865ea02d4ba6db9cc722f3424eb452c94d4ea567f"
            
            },
             "latest"
          ],
    "id": 1
},
{
    "jsonrpc": "2.0",
    "method": "starknet_call",
    "params": [
                      {
                        "calldata":["0x1c1b60b780a463c4ff2b53d0cc968ad405831d81dbd67433e746c4ef6bc96fd"],
            "contract_address":"0x03745ab04a431fc02871a139be6b93d9260b0ff3e779ad9c8b377183b23109f1","entry_point_selector":"0x00fa056b19478e3f960cebf556d1647d09d204483c114c03476357ee128d45b8"
            
            },
            {"block_number": 223319}
          ],
    "id": 2
});

console.log(result);