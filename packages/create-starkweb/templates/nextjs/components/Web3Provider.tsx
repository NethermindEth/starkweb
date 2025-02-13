import React from 'react';

import { createConfig } from 'starkweb/core';
import { StarkwebProvider } from 'starkweb/react'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, SIWEProvider, getDefaultConfig } from 'starkwebkit';
import { toast } from 'react-hot-toast';

const config = createConfig(
  getDefaultConfig({
    appName: 'StarkWebKit Next.js demo',
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const connectWallet = async () => {
    try {
      // ... existing connect code ...
    } catch (error: any) {
      if (error.message?.includes('KeyRing is locked')) {
        toast({
          title: 'Wallet Locked',
          description: 'Please unlock your wallet and try again',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Connection Error',
          description: error.message || 'Failed to connect wallet',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
      console.error('Wallet connection error:', error);
    }
  };

  return (
    <StarkwebProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider debugMode>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </StarkwebProvider>
  );
};
