import type { Chain } from '../../types/chain.js'
import type { Config } from '../createConfig.js'
import { deepEqual } from '../utils/deepEqual.js'

export type GetChainsReturnType = readonly Chain[]

let previousChains: readonly Chain[] = []

/** https://starkweb.xyz/core/api/actions/getChains */
export function getChains(
  config: Config,
): GetChainsReturnType {
  const chains = config.chains
  if (deepEqual(previousChains, chains))
    return previousChains as GetChainsReturnType
  previousChains = chains
  return chains as unknown as GetChainsReturnType
}
