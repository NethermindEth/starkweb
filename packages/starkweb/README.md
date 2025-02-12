
<div align="center">
  <picture>
    <source media="(prefers-color-scheme: light)" srcset="app/starkweb/docs/public/starkweb_horizontal_dark.svg">
    <source media="(prefers-color-scheme: dark)" srcset="app/starkweb/docs/public/starkweb_horizontal_light.svg">
    <img alt="StarkWeb Logo" src="app/starkweb/docs/public/starkweb_horizontal_light.svg" width="200">
  </picture>
</div>


# Starkweb · all-in-one Starknet Toolkit

[![npm version](https://img.shields.io/npm/v/starkweb.svg)](https://www.npmjs.com/package/starkweb)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A TypeScript toolkit for Starknet development.

## Installation

```bash
npm install starkweb
```

## Quick Start

```typescript
// 1. Import modules
import { createPublicClient, http } from "starkweb";
import { mainnet } from "starkweb/chains";

// 2. Set up your client
const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

// 3. Consume an action!
const blockNumber = await client.getBlockNumber();
```

## Features

- Abstractions over [JSON-RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/)
- First-class Smart Contract APIs
- Aligned with official [Starknet terminology](https://docs.starknet.io/glossary/)
- Multiple wallet integration options (Browser Extension, WalletConnect, Private Key)
- Native [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) support
- ABI utilities (encoding/decoding/inspection)
- TypeScript support for ABIs and EIP-712 Typed Data
- Testing suite with network forking
- Integration with popular tools (Anvil, Hardhat, Ganache)

## Community

- Follow [@NethermindStark](https://twitter.com/NethermindStark) for updates
- Join [Telegram discussions](https://t.me/strkweb)

## License

MIT
