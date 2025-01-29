

<p align="center">
  <img alt="Starkweb" src="https://raw.githubusercontent.com/nethermindeth/starkweb/main/app/starkweb/docs/public/starkweb_horizontal_dark.svg" height="64">
</p>

[![Chat on Telegram](https://img.shields.io/badge/telegram-join%20chat-blue.svg)](https://t.me/strkweb)
[![Follow us on Twitter](https://img.shields.io/twitter/follow/NethermindStark?style=social&label=Follow)](https://twitter.com/NethermindStark)


Building on Starknet is complex—wallet connections, multi-chain support, transactions, event monitoring, and state updates all require seamless handling, and constant ecosystem changes add to the challenge.

Starkweb simplifies development with a focus on performance, stability, and developer experience, letting teams build without friction.



## Documentation

Starkweb documentation is available at [starkweb.xyz](https://starkweb.xyz).

## Installing

### Package Managers

- **npm**
  ```bash
  npm install starkweb
  ```

- **pnpm**
  ```bash
  pnpm create starkweb
  ```

- **yarn**
  ```bash
  yarn create starkweb
  ```

Once installed, you can initialize Starkweb as follows:

```typescript
// 1. Import modules.
import { createPublicClient, http } from "starkweb";
import { mainnet } from "starkweb/chains";
 
// 2. Set up your client with desired chain & transport.
const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});
 
// 3. Consume an action!
 
const blockNumber = await client.getBlockNumber();
```

For further instructions, [Visit the docs](https://www.starkweb.xyz/).


## Community

Join our community channels:
- Follow [@NethermindStark](https://twitter.com/NethermindStark) on Twitter.
- Join our [Telegram channel](https://t.me/strkweb).

## Contributing

Before starting work on a feature or fix, please read our [contributing guidelines](./CONTRIBUTING.md) to ensure efficient collaboration.

## License

Starkweb is open-source software licensed under the Apache License 2.0 License.