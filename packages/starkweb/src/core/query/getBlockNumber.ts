import type { QueryOptions } from "@tanstack/query-core";

import {
  type GetBlockNumberErrorType,
  type GetBlockNumberParameters,
  type GetBlockNumberReturnType,
  getBlockNumber,
} from "../actions/getBlockNumber.js";
import type { Config } from "../createConfig.js";
import type { ScopeKeyParameter } from "../types/properties.js";
import type { Evaluate, ExactPartial } from "../types/utils.js";
import { filterQueryOptions } from "./utils.js";

export type GetBlockNumberOptions = Evaluate<
  ExactPartial<GetBlockNumberParameters> & ScopeKeyParameter
>;

export function getBlockNumberQueryOptions<
  config extends Config,
>(config: config, options: GetBlockNumberOptions = {}) {
  return {
    gcTime: 0,
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1];
      const blockNumber = await getBlockNumber(config, parameters);
      return blockNumber ?? null;
    },
    queryKey: getBlockNumberQueryKey(options),
  } as const satisfies QueryOptions<
    GetBlockNumberQueryFnData,
    GetBlockNumberErrorType,
    GetBlockNumberData,
    GetBlockNumberQueryKey
  >;
}

export type GetBlockNumberQueryFnData = GetBlockNumberReturnType;

export type GetBlockNumberData = GetBlockNumberQueryFnData;

export function getBlockNumberQueryKey(options: GetBlockNumberOptions = {}) {
  return ["blockNumber", filterQueryOptions(options)] as const;
}

export type GetBlockNumberQueryKey = ReturnType<typeof getBlockNumberQueryKey>;
