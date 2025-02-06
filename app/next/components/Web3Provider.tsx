import React from 'react';

import { cookieStorage, createConfig, createStorage } from 'starkweb/core';
import { StarkwebProvider } from 'starkweb/react'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { argentX, braavos, keplr, metamask } from 'starkweb/connectors';
import { mainnet, sepolia } from 'starkweb/chains';
import { http } from 'starkweb';

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [argentX(), braavos(), keplr(), metamask()],
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.chain_id]: http(),
    [sepolia.chain_id]: http(),
  },
});

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StarkwebProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </StarkwebProvider>
  );
};
