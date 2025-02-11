'use client'

import type { CallErrorType } from '../../core/actions/call.js'
import {
  type CallData,
  type CallOptions,
  type CallQueryKey,
  callQueryOptions,
} from '../../core/query/call.js'
import type { CallQueryFnData } from '../../core/query/call.js'
import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseCallParameters = CallOptions &
    ConfigParameter &
    QueryParameter<
      CallQueryFnData,
      CallErrorType,
      CallData,
      CallQueryKey
    >

export type UseCallReturnType = UseQueryReturnType<
  CallData,
  CallErrorType
>

/** https://starkweb.xyz/react/api/hooks/useCall */
export function useCall(
  parameters: UseCallParameters = {},
): UseCallReturnType {
  const { query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = callQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })

  return useQuery({ ...query, ...options })
}
