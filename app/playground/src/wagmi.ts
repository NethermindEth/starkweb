import { createConfig, createStorage, cookieStorage } from 'starkweb/core'
import { mainnet, sepolia } from 'starkweb/chains'
import { argentX, braavos } from 'starkweb/connectors'
import { http } from 'starkweb'

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia],
    connectors: [argentX(), braavos()],
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

declare module 'starkweb' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
