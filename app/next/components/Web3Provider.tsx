import React from 'react';

import { http } from 'starkweb';
import {
  mainnet,
  sepolia,
} from 'starkweb/chains';
import {
  argentX,
  braavos,
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
import { useToast } from '@chakra-ui/react';

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia],
    connectors: [
      argentX(),
      braavos(),
      keplr(),
      metamask(),
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

const toast = useToast();

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

export const Web3Provider = ({ children, initialState }: { children: React.ReactNode, initialState: State }) => {
  return (
    <StarkwebProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </StarkwebProvider>
  );
};
