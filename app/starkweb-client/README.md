# StarkWeb Client

A client library for interacting with Starknet using the StarkWeb package.

## Installation

```bash
pnpm add starkweb-client
```

## Usage

```typescript
import { Client } from 'starkweb-client';

// Create a new client with default settings (mainnet)
const client = new Client();

// Create a client with custom configuration
const customClient = new Client({
  providerUrl: 'https://your-starknet-provider.com',
  chainId: 'sepolia', // 'mainnet' or 'sepolia'
  options: {
    // Additional options
  }
});

// Get the starkweb configuration
const config = client.getConfig();

// Get client configuration
const clientConfig = client.getClientConfig();

// Connect to a different provider
client.connect('https://another-provider.com', 'sepolia');
```

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Run tests
pnpm test
```

## License

MIT 