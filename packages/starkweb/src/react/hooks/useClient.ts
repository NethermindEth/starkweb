'use client'

import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector.js'
import {
  type GetClientParameters,
  type GetClientReturnType,
  getClient,
} from '../../core/actions/getClient.js'
import { watchClient } from '../../core/actions/watchClient.js'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type UseClientParameters = GetClientParameters & ConfigParameter

export type UseClientReturnType = GetClientReturnType

/** https://starkweb.xyz/react/api/hooks/useClient */
export function useClient(
  parameters: UseClientParameters = {},
): UseClientReturnType {
  const config = useConfig(parameters)

  return useSyncExternalStoreWithSelector(
    (onChange) => watchClient(config, { onChange }),
    () => getClient(config, parameters),
    () => getClient(config, parameters),
    (x) => x,
    (a, b) => a?.uid === b?.uid,
  ) as any
}
