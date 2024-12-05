'use client'

import { useQueryClient } from '@tanstack/react-query'

import {
  type GetConnectorClientData,
  type GetConnectorClientOptions,
  type GetConnectorClientQueryFnData,
  type GetConnectorClientQueryKey,
  getConnectorClientQueryOptions,
} from '../../core/query/getConnectorClient.js'
import { useEffect, useRef } from 'react'

import type { ConfigParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryReturnType,
  useQuery,
} from '../utils/query.js'
import { useAccount } from './useAccount.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import type { ResolvedRegister } from '../../core/types/register.js'
import type { Config } from '../../core/createConfig.js'
import type { GetConnectorClientErrorType } from '../../core/actions/getConnectorClient.js'
import type { Evaluate } from '../../types/utils.js'

export type UseConnectorClientParameters<
  config extends Config = Config,
  selectData = GetConnectorClientData,
> = Evaluate<
  GetConnectorClientOptions &
    ConfigParameter<config> & {
      query?:
        | Evaluate<
            Omit<
              UseQueryParameters<
                GetConnectorClientQueryFnData,
                GetConnectorClientErrorType,
                selectData,
                GetConnectorClientQueryKey
              >,
              'gcTime' | 'staleTime'
            >
          >
        | undefined
    }
>

export type UseConnectorClientReturnType<selectData = GetConnectorClientData> = UseQueryReturnType<selectData, GetConnectorClientErrorType>

/** https://starkweb.xyz/react/api/hooks/useConnectorClient */
export function useConnectorClient<
  config extends Config = ResolvedRegister['config'],
  selectData = GetConnectorClientData,
>(
  parameters: UseConnectorClientParameters<config, selectData> = {},
): UseConnectorClientReturnType<selectData> {
  const { query = {}, ...rest } = parameters

  const config = useConfig(rest)
  const queryClient = useQueryClient()
  const { address, connector, status } = useAccount({ config })
  const chainId = useChainId({ config })

  const { queryKey, ...options } = getConnectorClientQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    connector: parameters.connector ?? connector,
  })
  const enabled = Boolean(status !== 'disconnected' && (query.enabled ?? true))

  const addressRef = useRef(address)
  // biome-ignore lint/correctness/useExhaustiveDependencies: `queryKey` not required
  useEffect(() => {
    const previousAddress = addressRef.current
    if (!address && previousAddress) {
      // remove when account is disconnected
      queryClient.removeQueries({ queryKey })
      addressRef.current = undefined
    } else if (address !== previousAddress) {
      // invalidate when address changes
      queryClient.invalidateQueries({ queryKey })
      addressRef.current = address
    }
  }, [address, queryClient])

  return useQuery({
    ...query,
    ...options,
    queryKey,
    enabled,
    staleTime: Number.POSITIVE_INFINITY,
  })
}
