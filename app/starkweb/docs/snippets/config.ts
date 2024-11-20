import { http, createConfig } from "sn-wolf";
import { mainnet, sepolia } from "sn-wolf/chains";

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.chain_id]: http(),
    [sepolia.chain_id]: http(),
  },
});
