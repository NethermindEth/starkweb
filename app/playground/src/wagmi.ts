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
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  })
}

declare module 'starkweb' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
