'use client'

import { getAccount, type GetAccountReturnType } from '../../core/actions/getAccount.js'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'
import { useSyncExternalStoreWithTracked } from './useSyncExternalStoreWithTracked.js'
import { watchAccount } from '../../core/actions/watchAccount.js'

export type UseAccountParameters = ConfigParameter

export type UseAccountReturnType = GetAccountReturnType

/** https://starkweb.xyz/react/api/hooks/useAccount */
export function useAccount(
  parameters: UseAccountParameters = {},
): UseAccountReturnType {
  const config = useConfig(parameters)
  return useSyncExternalStoreWithTracked(
    (onChange) => watchAccount(config, { onChange }),
    () => getAccount(config),
  ) as UseAccountReturnType
}
