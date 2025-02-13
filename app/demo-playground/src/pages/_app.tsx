import '@/styles/globals.css';
import { siweClient } from '@/utils/siweClient';
import { ConnectKitProvider, getDefaultConfig } from 'starkwebkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { StarkwebProvider, createConfig } from 'starkweb/react';

const config = createConfig(
  getDefaultConfig({
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    appName: 'My ConnectKit App',
  })
);
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
