import {
  sepolia,
} from '../../packages/starkweb/dist/esm/chains/definitions/sepolia';
import {
  createPublicClient,
} from '../../packages/starkweb/dist/esm/clients/createPublicClient';
import { http } from '../../packages/starkweb/dist/esm/clients/transports/http';

export const client = createPublicClient({
    transport: http(`https://starknet-sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`),
    chain: sepolia,
  })
 
const specVersion = await client.getSpecVersion()
console.log(specVersion)