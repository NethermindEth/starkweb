"use client";

import { useConfig } from "./useConfig.js";
import { useChainId } from "./useChainId.js";
import {
  executeTransactionQueryOptions,
  type ExecuteTransactionQueryKey,
  type ExecuteTransactionData,
  type ExecuteTransactionErrorType,
  type ExecuteTransactionOptions,
} from "../../core/query/executeTransaction.js";
import type { Config } from "../../core/createConfig.js";
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import type { Hex } from "../../types/misc.js";
import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import type { Evaluate } from '../../core/types/utils.js'

export type UseExecuteTransactionParameters<
  config extends Config = Config,
  selectData = ExecuteTransactionData
> = Evaluate<
ExecuteTransactionOptions &
  ConfigParameter<config> & {
    chainId?: Hex;
  } & QueryParameter<
      ExecuteTransactionData,
      ExecuteTransactionErrorType,
      selectData,
      ExecuteTransactionQueryKey
    >
>;

export type UseExecuteTransactionReturnType  =  UseQueryReturnType<ExecuteTransactionData, ExecuteTransactionErrorType>;

export function useExecuteTransaction(
  parameters: UseExecuteTransactionParameters
): UseExecuteTransactionReturnType {
  const {userAddress, signature, typedData, query={}} = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });

  const options = executeTransactionQueryOptions(config, {
    ...parameters,
    userAddress: userAddress!,
    signature: signature!,
    typedData: typedData!,
    chainId: parameters.chainId ?? chainId,
  });

  const queryOptions = {
    ...(query as any),
    ...options,
    queryKey: options.queryKey
  }
  return useQuery(queryOptions) as UseExecuteTransactionReturnType


}