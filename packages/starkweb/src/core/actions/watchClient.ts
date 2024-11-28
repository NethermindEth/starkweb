import type { Config } from '../createConfig.js'
import { type GetClientReturnType, getClient } from './getClient.js'

export type WatchClientParameters = {
  onChange(publicClient: GetClientReturnType, prevClient: GetClientReturnType): void
}

export type WatchClientReturnType = () => void

/** https://starkweb.xyz/core/api/actions/watchClient */
export function watchClient(
  config: Config,
  parameters: WatchClientParameters,
): WatchClientReturnType {
  const { onChange } = parameters
  return config.subscribe(
    () => getClient(config),
    onChange,
    {
      equalityFn(a, b) {
        return a?.uid === b?.uid
      },
    },
  )
}
