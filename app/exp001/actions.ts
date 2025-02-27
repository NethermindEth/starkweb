import {
  sepolia,
} from '../../packages/starkweb/dist/esm/chains/definitions/sepolia';
import {
  createPublicClient,
} from '../../packages/starkweb/dist/esm/clients/createPublicClient';
import { http } from '../../packages/starkweb/dist/esm/clients/transports/http';

export const client = createPublicClient({
    transport: http('https://starknet-sepolia.infura.io/v3/db72641028ee47f5b18bcbb791a3f829'),
    chain: sepolia,
  })
 
const specVersion = await client.getSpecVersion()
console.log(specVersion)