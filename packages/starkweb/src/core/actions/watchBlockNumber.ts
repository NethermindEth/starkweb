import type { Chain } from '../../types/chain.js'
import {
  type WatchBlockNumberParameters as strkjs_WatchBlockNumberParameters,
  type WatchBlockNumberReturnType as strkjs_WatchBlockNumberReturnType,
  watchBlockNumber as strkjs_watchBlockNumber,
} from '../../actions/public/watchBlockNumber.js'

import type {  Hex } from '../../types/misc.js'
import type { Config, Transport } from '../createConfig.js'
import type { SelectChains } from '../types/chain.js'
import type {
  ChainIdParameter,
  SyncConnectedChainParameter,
} from '../types/properties.js'
import type { UnionEvaluate } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import type { WebSocketTransport } from '../../clients/transports/webSocket.js'

export type WatchBlockNumberParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['chain_id'] = config['chains'][number]['chain_id'],
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: UnionEvaluate<
    strkjs_WatchBlockNumberParameters<
      config['_internal']['transports'][chains[key]['chain_id']] extends infer transport extends
        Transport
        ? Transport extends transport
          ? WebSocketTransport
          : transport
        : WebSocketTransport
    > &
      ChainIdParameter &
      SyncConnectedChainParameter
  >
}[number]

export type WatchBlockNumberReturnType = strkjs_WatchBlockNumberReturnType

// TODO: wrap in viem's `observe` to avoid duplicate invocations.
/** https://wagmi.sh/core/api/actions/watchBlockNumber */
export function watchBlockNumber<
  config extends Config,
  chainId extends
    config['chains'][number]['chain_id'] = config['chains'][number]['chain_id'],
>(
  config: config,
  parameters: WatchBlockNumberParameters<config, chainId>,
): WatchBlockNumberReturnType {
  const { syncConnectedChain = config._internal.syncConnectedChain, ...rest } =
    parameters as WatchBlockNumberParameters

  let unwatch: WatchBlockNumberReturnType | undefined
  const listener = (chainId: Hex | undefined) => {
    if (unwatch) unwatch()

    const client = config.getClient({ chainId })
    const action = getAction(client, strkjs_watchBlockNumber, 'watchBlockNumber')
    unwatch = action(rest as strkjs_WatchBlockNumberParameters)
    return unwatch
  }

  // set up listener for block number changes
  const unlisten = listener(parameters.chainId)

  // set up subscriber for connected chain changes
  let unsubscribe: (() => void) | undefined
  if (syncConnectedChain && !parameters.chainId)
    unsubscribe = config.subscribe(
      ({ chainId }) => chainId,
      async (chainId) => listener(chainId),
    )

  return () => {
    unlisten?.()
    unsubscribe?.()
  }
}
