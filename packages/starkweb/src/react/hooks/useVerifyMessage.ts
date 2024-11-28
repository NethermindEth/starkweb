
'use client'


import {
  type VerifyMessageData,
  type VerifyMessageOptions,
  type VerifyMessageQueryKey,
  verifyMessageQueryOptions,
} from '../../core/query/verifyMessage.js'
import type { VerifyMessageQueryFnData } from '../../core/query/verifyMessage.js'
import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import type { QueryKey } from '@tanstack/react-query'
import type { QueryFunction } from '@tanstack/react-query'
import type { Config } from '../../core/createConfig.js'
import type { ResolvedRegister } from '../../core/types/register.js'
import type { Compute } from '../../core/types/utils.js'

export type UseVerifyMessageParameters<
  config extends Config = Config,
  selectData = VerifyMessageData,
> = Compute<
  VerifyMessageOptions &
    ConfigParameter<config> &
    QueryParameter<
      VerifyMessageQueryFnData,
      selectData,
      VerifyMessageQueryKey
    >
>

export type UseVerifyMessageReturnType<selectData = VerifyMessageData> =
  UseQueryReturnType<selectData>

/** https://starkweb.xyz/react/api/hooks/useVerifyMessage */
export function useVerifyMessage<
  config extends Config = ResolvedRegister['config'],
  selectData = VerifyMessageData,
>(
  parameters: UseVerifyMessageParameters<config, selectData> = {},
): UseVerifyMessageReturnType<selectData> {
  const { 
    address, 
    statement, 
    uri, 
    nonce, 
    version, 
    domain, 
    signature, 
    query = {} 
  } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  // Combine all required parameters into a single enabled check
  const requiredParams = [
    address,
    statement, 
    uri,
    nonce,
    version,
    chainId,
    domain,
    signature,
    query.enabled ?? true
  ]
  const enabled = requiredParams.every(Boolean)

  const options = verifyMessageQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  console.log(options)
  return useQuery({
    ...query,
    ...options,
    enabled,
    queryKey: options.queryKey,
    queryFn: options.queryFn as QueryFunction<boolean, QueryKey, never>
  }) as UseVerifyMessageReturnType<selectData>
}
