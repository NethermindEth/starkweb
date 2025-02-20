import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import {
  mainnet,
  sepolia,
} from 'starkweb/chains';
import { argentX, braavos, catridge, metamask, keplr } from 'starkweb/connectors';
import {
  createConfig,
  StarkwebProvider,
} from 'starkweb/react';
import { ConnectKitProvider } from 'starkwebkit';

import { siweClient } from '@/utils/siweClient';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { http } from 'starkweb';
const catridgeChains = [
  {
    id: '0x534e5f5345504f4c4941',
    name: 'Sepolia',
    rpcUrl: 'https://api.cartridge.gg/x/starknet/sepolia',
  },
  {
    id: '0x534e5f4d41494e',
    name: 'Mainnet',
    rpcUrl: 'https://api.cartridge.gg/x/starknet/mainnet',
  },
]

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.chain_id]: http(),
    [sepolia.chain_id]: http(),
  },
  connectors: [
    argentX(),
    braavos(),
    catridge({
      chains: catridgeChains,
      defaultChainId: mainnet.chain_id,
    }),
    metamask(),
    keplr(),
  ],
});
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <StarkwebProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <siweClient.Provider>
          <ConnectKitProvider>
            <Component {...pageProps} />
          </ConnectKitProvider>
        </siweClient.Provider>
      </QueryClientProvider>
    </StarkwebProvider>
  );
}
