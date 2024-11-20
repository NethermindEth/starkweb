import React from 'react';

import { createConfig } from 'starkweb/core';
import { StarkwebProvider } from 'starkweb/react'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, SIWEProvider, getDefaultConfig } from 'starkwebkit';

const config = createConfig(
  getDefaultConfig({
    appName: 'StarkWebKit Next.js demo',
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StarkwebProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider debugMode>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </StarkwebProvider>
  );
};
