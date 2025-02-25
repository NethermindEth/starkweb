/**
 * StarkWeb Client - A client for interacting with Starknet
 */

// Import from the starkweb workspace package
import {
  createPublicClient,
  http,
} from 'starkweb';
import { sepolia } from 'starkweb/chains';

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

// Use 'as const' to let TypeScript know this is a literal 'pending' value
const pendingBlock = await publicClient.getBlockWithTxHashes({
    block_tag: 'pending',
});

// Now TypeScript should infer this is a PendingBlock
console.log(pendingBlock);