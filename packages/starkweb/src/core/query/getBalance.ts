import type { QueryOptions } from '@tanstack/query-core';

import {
  type GetBalanceErrorType as strkjs_GetBalanceErrorType,
  type GetBalanceParameters,
  type GetBalanceReturnType,
  getBalance,
} from '../actions/getBalance.js'

import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js';
import { filterQueryOptions } from './utils.js';

export type GetBalanceOptions = Evaluate<
  ExactPartial<GetBalanceParameters> & ScopeKeyParameter
>;

/** https://starkweb.xyz/core/api/actions/getBalance */
export function getBalanceQueryOptions<
  config extends Config,
>(
  config: config,
  options: GetBalanceOptions = {},
): QueryOptions<GetBalanceReturnType, GetBalanceErrorType, GetBalanceData, GetBalanceQueryKey> {
  return {
    gcTime: 0,
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1];
      const balance = await getBalance(config, parameters as any);
      return balance ?? null;
    },
    queryKey: getBalanceQueryKey(options),
  } as const satisfies QueryOptions<GetBalanceReturnType, GetBalanceErrorType, GetBalanceData, GetBalanceQueryKey>
}

export function getBalanceQueryKey(options: GetBalanceOptions = {}) {
  return ["balance", filterQueryOptions(options)] as const;
}

export type GetBalanceQueryKey = ReturnType<typeof getBalanceQueryKey>;

export type GetBalanceQueryFnData = GetBalanceReturnType;

export type GetBalanceData = GetBalanceQueryFnData;

export type GetBalanceErrorType = strkjs_GetBalanceErrorType;