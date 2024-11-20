'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode } from 'react';
import { StarkwebProvider } from 'starkweb/react';

import { config } from '../config';
import { ConnectKitProvider } from 'starkwebkit';

const queryClient = new QueryClient();
export function Providers(props: { children: ReactNode }) {
  return (
    <StarkwebProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{props.children}</ConnectKitProvider>
      </QueryClientProvider>
    </StarkwebProvider>
  );
}
