import { http } from 'starkweb'
import {  createConfig, createStorage } from 'starkweb/react'
import { mainnet, sepolia } from 'starkweb/chains'
import { injected , argentX, braavos } from 'starkweb/connectors'

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia],
    connectors: [
      injected(),
      argentX(),
      braavos(),
    ],
    ssr: true,
    transports: {
      [mainnet.chain_id]: http(),
      [sepolia.chain_id]: http(),
    },
  })
}

declare module 'starkweb' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
