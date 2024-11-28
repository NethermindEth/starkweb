import type { Config } from '../createConfig.js'
import type { Hex } from '../../types/misc.js'
export type WatchChainIdParameters = {
  onChange(
    chainId: Hex,
    prevChainId: Hex,
  ): void
}

export type WatchChainIdReturnType = () => void

/** https://starkweb.xyz/core/api/actions/watchChainId */
    export function watchChainId(
  config: Config,
  parameters: WatchChainIdParameters,
): WatchChainIdReturnType {
  const { onChange } = parameters
  return config.subscribe(
    (state) => state.chainId,
    (chainId, prevChainId) => onChange(chainId, prevChainId)
  )
}
