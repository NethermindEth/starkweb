import { testAbi } from '../../packages/starkweb/src/abi/testabi.js';
import {
  createPublicClient,
} from '../../packages/starkweb/src/clients/createPublicClient.js';
import { http } from '../../packages/starkweb/src/clients/transports/http.js';

const client = createPublicClient({
  transport: http(),
})

const result = await client.readContract({
  abi: testAbi,
  address: '0x1',
  functionName: 'is_valid_signature',
  args: ['0x1', ['0x1']],
})

console.log("Hello via Bun!");