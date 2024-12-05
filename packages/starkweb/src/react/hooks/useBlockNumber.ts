'use client'

import { useQueryClient } from "@tanstack/react-query";
import type {
  Config, 
} from '../../core/createConfig.js'
import type {
  Evaluate,
  UnionEvaluate,
  UnionOmit,
} from '../../core/types/utils.js'
import {
  type GetBlockNumberData,
  // @ts-ignore
  type GetBlockNumberOptions,
  type GetBlockNumberQueryFnData,
  type GetBlockNumberQueryKey,
  getBlockNumberQueryOptions,
} from '../../core/query/getBlockNumber.js'

import type { ConfigParameter, QueryParameter } from "../types/properties.js";
import { type UseQueryReturnType, useQuery } from "../utils/query.js";
import { useChainId } from "./useChainId.js";
import { useConfig } from "./useConfig.js";
import {
  type UseWatchBlockNumberParameters,
  useWatchBlockNumber,
} from "./useWatchBlockNumber.js";
import type { GetBlockNumberErrorType } from '../../core/actions/getBlockNumber.js';

export type UseBlockNumberParameters<
  config extends Config = Config,
  chainId extends config["chains"][number]["chain_id"] = config["chains"][number]["chain_id"],
  selectData = GetBlockNumberData
> = Evaluate<
  GetBlockNumberOptions &
    ConfigParameter<config> &
    QueryParameter<
      GetBlockNumberQueryFnData,
      GetBlockNumberErrorType,
      selectData,
      GetBlockNumberQueryKey
    > & {
      watch?:
        | boolean
        | UnionEvaluate<
            UnionOmit<
              UseWatchBlockNumberParameters<config, chainId>,
              "chainId" | "config" | "onBlockNumber" | "onError"
            >
          >
        | undefined;
    }
>;

export type UseBlockNumberReturnType<selectData = GetBlockNumberData> =
  UseQueryReturnType<selectData, GetBlockNumberErrorType>;

/** https://starkweb.xyz/react/api/hooks/useBlockNumber */
export function useBlockNumber<
  config extends Config = Config,
  chainId extends config["chains"][number]["chain_id"] = config["chains"][number]["chain_id"],
  selectData = GetBlockNumberData
>(
  parameters: UseBlockNumberParameters<config, chainId, selectData> = {}
): UseBlockNumberReturnType<selectData> {
  const { query = {}, watch } = parameters;

  const config = useConfig(parameters);
  const queryClient = useQueryClient();
  const configChainId = useChainId({ config });
  const chainId = parameters.chainId ?? configChainId;

  const options = getBlockNumberQueryOptions(config, {
    ...parameters,
    chainId,
  });

  useWatchBlockNumber({
    ...({
      config: parameters.config,
      chainId: parameters.chainId,
      ...(typeof watch === "object" ? watch : {}),
    } as UseWatchBlockNumberParameters),
    enabled: Boolean(
      (query.enabled ?? true) &&
        (typeof watch === "object" ? watch.enabled : watch)
    ),
    onBlockNumber(blockNumber: GetBlockNumberData) {
      queryClient.setQueryData(options.queryKey, blockNumber);
    },
  });

  return useQuery({ ...query, ...options }) as UseBlockNumberReturnType<selectData>;
}
