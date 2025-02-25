/**
 * Example usage of the StarkWeb Client
 */
import { Client } from './index';

// Create a client with default settings (mainnet)
const client = new Client();
console.log('Default client config:', client.getClientConfig());

// Create a client with custom configuration for Sepolia testnet
const testnetClient = new Client({
  providerUrl: 'https://sepolia.starknet.io',
  chainId: 'sepolia',
  options: {
    // You can add custom options here
  }
});
console.log('Testnet client config:', testnetClient.getClientConfig());

// Get the starkweb configuration (can be used with StarkwebProvider)
const config = client.getConfig();
console.log('Starkweb config is available:', !!config);

// Connect to a different provider
client.connect('https://alpha-mainnet.starknet.io', 'mainnet');
console.log('After reconnect client config:', client.getClientConfig());

/**
 * Example integration with StarkwebProvider (React)
 * 
 * ```tsx
 * import { StarkwebProvider } from 'starkweb/react';
 * import { Client } from 'starkweb-client';
 * 
 * const client = new Client({
 *   providerUrl: 'https://alpha-mainnet.starknet.io',
 *   chainId: 'mainnet',
 * });
 * 
 * const App = () => {
 *   return (
 *     <StarkwebProvider config={client.getConfig()}>
 *       <YourApp />
 *     </StarkwebProvider>
 *   );
 * };
 * ```
 */ 