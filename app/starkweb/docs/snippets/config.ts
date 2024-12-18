import { http, createConfig } from "starkweb/react";
import { mainnet, sepolia } from "starkweb/chains";

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.chain_id]: http(),
    [sepolia.chain_id]: http(),
  },
});
