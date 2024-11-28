'use client'

// Almost identical implementation to `useConnectorClient` (except for return type)
// Should update both in tandem

import { useQueryClient } from '@tanstack/react-query'
import {
  type GetWalletClientData,
  type GetWalletClientOptions,
  type GetWalletClientErrorType,
  type GetWalletClientQueryFnData,
  type GetWalletClientQueryKey,
  getWalletClientQueryOptions,
} from '../../core/query/getWalletClient.js'
import { useEffect, useRef } from 'react'
import type { Config } from '../../core/createConfig.js'
import type { ResolvedRegister } from '../../core/types/register.js'
import type { Compute } from '../../core/types/utils.js'
import type { ConfigParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryReturnType,
  useQuery,
} from '../utils/query.js'
import { useAccount } from './useAccount.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseWalletClientParameters<
  config extends Config = Config,
  selectData = GetWalletClientData,
> = Compute<
  GetWalletClientOptions &
    ConfigParameter<config> & {
      query?:
        | Compute<
            Omit<
              UseQueryParameters<
                GetWalletClientQueryFnData,
                GetWalletClientErrorType,
                selectData,
                GetWalletClientQueryKey
              >,
              'gcTime' | 'staleTime'
            >
          >
        | undefined
    }
>

export type UseWalletClientReturnType<
  selectData = GetWalletClientData,
> = UseQueryReturnType<selectData, GetWalletClientErrorType>

/** https://starkweb.xyz/react/api/hooks/useWalletClient */
export function useWalletClient<
  config extends Config = ResolvedRegister['config'],
  selectData = GetWalletClientData,
>(
  parameters: UseWalletClientParameters<config, selectData> = {},
): UseWalletClientReturnType {
  const { query = {}, ...rest } = parameters

  const config = useConfig(rest)
  const queryClient = useQueryClient()
  const { address, connector, status } = useAccount({ config })
  const chainId = useChainId({ config })
  const activeConnector = parameters.connector ?? connector

  const { queryKey, ...options } = getWalletClientQueryOptions(
    config,
    {
      ...parameters,
      chainId: parameters.chainId ?? chainId,
      connector: parameters.connector ?? connector,
    },
  )
  const enabled = Boolean(
    (status === 'connected' ||
      (status === 'reconnecting' && activeConnector?.getProvider)) &&
      (query.enabled ?? true),
  )

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
  } as any) as UseWalletClientReturnType
}
