import React from 'react';

import { http } from 'starkweb';
import {
  mainnet,
  sepolia,
} from 'starkweb/chains';
import {
  argentX,
  braavos,
  catridge,
  keplr,
  metamask,
} from 'starkweb/connectors';
import {
  cookieStorage,
  createConfig,
  createStorage,
  type State,
} from 'starkweb/core';
import { StarkwebProvider } from 'starkweb/react';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia],
    connectors: [
      argentX(),
      braavos(),
      keplr(),
      metamask(),
      catridge(),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.chain_id]: http(),
      [sepolia.chain_id]: http(),
    },
  })
}

declare module 'starkweb/react' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}


const config = getConfig();

const queryClient = new QueryClient();

export const Web3Provider = ({ children, initialState }: { children: React.ReactNode, initialState: State }) => {
  return (
    <StarkwebProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </StarkwebProvider>
  );
};
