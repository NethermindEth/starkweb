/**
 * StarkWeb Client - A client for interacting with Starknet
 */

// Import from the starkweb workspace package
import { http, type Transport } from 'starkweb';
import { mainnet, sepolia } from 'starkweb/chains';
import { createPublicClient } from 'starkweb';


const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

const specVersion = await publicClient.getSpecVersion();

console.log(specVersion);