'use client'

import { useSyncExternalStore } from 'react';

import { watchChainId } from '../../core/actions/watchChainId.js';

import {
  getChainId,
  type GetChainIdReturnType,
} from '../../core/actions/getChainId.js';
import type { ConfigParameter } from '../types/properties.js';
import { useConfig } from './useConfig.js';

export type UseChainIdParameters = ConfigParameter

export type UseChainIdReturnType = GetChainIdReturnType

/** https://starkweb.xyz/react/api/hooks/useChainId */
export function useChainId(
  parameters: UseChainIdParameters = {},
): UseChainIdReturnType {
  const config = useConfig(parameters)
  return useSyncExternalStore(
    (onChange: any) => watchChainId(config, { onChange }),
    () => getChainId(config),
    () => getChainId(config),
  )
}
