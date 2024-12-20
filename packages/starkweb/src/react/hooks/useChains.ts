'use client'

import {
  type GetChainsReturnType,
  getChains,
} from '../../core/actions/getChains.js'
import { watchChains } from '../../core/actions/watchChains.js'
import { useSyncExternalStore } from 'react'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type UseChainsParameters = ConfigParameter

export type UseChainsReturnType = GetChainsReturnType

/** https://starkweb.xyz/react/api/hooks/useChains */
export function useChains(parameters: UseChainsParameters = {}): UseChainsReturnType {
  const config = useConfig(parameters)

  return useSyncExternalStore(
    (onChange) => watchChains(config, { onChange }),
    () => getChains(config),
    () => getChains(config),
  )
}
