// @ts-nocheck
'use client'

import type { Config } from '../../core/createConfig.js'
import type { GetTransactionReceiptErrorType } from '../../actions/public/getTransactionReceipt.js'
import type { ResolvedRegister } from '../../core/types/register.js'
import {
  type GetTransactionReceiptData,
  type GetTransactionReceiptOptions,
  type GetTransactionReceiptQueryFnData,
  type GetTransactionReceiptQueryKey,
  getTransactionReceiptQueryOptions,
} from '../../core/query/getTransactionReceipt.js'
import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseTransactionReceiptParameters<
  config extends Config = ResolvedRegister['config'],
  selectData = GetTransactionReceiptData
> = GetTransactionReceiptOptions &
  ConfigParameter<config> &
  QueryParameter<
    GetTransactionReceiptQueryFnData,
    GetTransactionReceiptErrorType,
    selectData,
    GetTransactionReceiptQueryKey
  >

export type UseTransactionReceiptReturnType<selectData = GetTransactionReceiptData> =
  UseQueryReturnType<selectData, GetTransactionReceiptErrorType>

/** https://starkweb.xyz/react/api/hooks/useTransactionReceipt */
export function useTransactionReceipt<
  config extends Config = ResolvedRegister['config'],
  selectData = GetTransactionReceiptData,
>(
  parameters: UseTransactionReceiptParameters<config, selectData> = {}
): UseTransactionReceiptReturnType<selectData> {
  const { hash, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getTransactionReceiptQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(hash && (query.enabled ?? true))

  return useQuery({ ...query, ...options, enabled })
}