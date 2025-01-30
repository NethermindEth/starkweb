////////////////////////////////////////////////////////////////////////////////
// starkweb/chains
////////////////////////////////////////////////////////////////////////////////

import type { Hex } from '../../types/misc.js'

// biome-ignore lint/performance/noBarrelFile: entrypoint module
// biome-ignore lint/performance/noReExportAll: entrypoint module
// export { mainnet, sepolia } from '../../clients/chains.js'

export type AddStarknetChainParameters = {
  id: number
  chain_id: Hex
  chain_name: string
  rpc_urls?: string[]
  block_explorer_url?: string[]
  native_currency?: {
    name: string
    symbol: string
    decimals: number
  }
  icon_urls?: string[]
}