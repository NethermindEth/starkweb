'use client'

import { useContext } from 'react'

import { StarkwebContext } from '../context.js'
import { StarkwebProviderNotFoundError } from '../errors/context.js'
import type { ConfigParameter } from '../types/properties.js'
import type { Config } from '../../core/createConfig.js'

export type UseConfigParameters = ConfigParameter

export type UseConfigReturnType = Config

/** https://starkweb.xyz/react/api/hooks/useConfig */
export function useConfig(
  parameters: UseConfigParameters = {},
): UseConfigReturnType {
  // const config = useContext(StarkwebContext)
  // // @ts-ignore
  // const _parameters = parameters
  const config = parameters.config ?? useContext(StarkwebContext)
  if (!config) throw new StarkwebProviderNotFoundError()
  return config as UseConfigReturnType
}
