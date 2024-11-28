import type { Hex } from '../../types/misc.js'
import type { Config } from '../createConfig.js'

export type GetChainIdReturnType = Hex

/** https://starkweb.xyz/core/api/actions/getChainId */
export function getChainId(
  config: Config,
): GetChainIdReturnType {
  return config.state.chainId
}
