'use client'

import {
  type GetConnectionsReturnType,
  getConnections,
} from '../../core/actions/getConnections.js'
import { useSyncExternalStore } from 'react'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'
import { watchConnections } from '../../core/actions/watchConnections.js'

export type UseConnectionsParameters = ConfigParameter

export type UseConnectionsReturnType = GetConnectionsReturnType

/** https://starkweb.xyz/react/api/hooks/useConnections */
export function useConnections(
  parameters: UseConnectionsParameters = {},
): UseConnectionsReturnType {
  const config = useConfig(parameters)

  return useSyncExternalStore(
    (onChange) => watchConnections(config, { onChange }),
    () => getConnections(config),
    () => getConnections(config),
  )
}
