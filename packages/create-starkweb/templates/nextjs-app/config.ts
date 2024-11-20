import { getDefaultConfig } from 'starkwebkit';
import { createConfig } from 'starkweb/core';
import { mainnet, sepolia } from 'starkweb/chains';

export const config = createConfig(
  getDefaultConfig({
    appName: 'ConnectKit Next.js demo',
    chains: [mainnet, sepolia],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  })
);

declare module 'starkweb' {
  interface Register {
    config: typeof config;
  }
}
