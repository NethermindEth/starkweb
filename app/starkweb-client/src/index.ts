/**
 * StarkWeb Client - A client for interacting with Starknet
 */

// Import from the starkweb workspace package
import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
} from 'starkweb';
import { sepolia } from 'starkweb/chains';

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

const block = await publicClient.getBlockStateUpdate({
  block_tag: 'latest',
});
console.log(block.state_diff);