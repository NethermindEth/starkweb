import type { QueryOptions } from '@tanstack/query-core';
import {
    type GetGasTokenPricesErrorType as strkjs_GetGasTokenPricesErrorType,
    type GetGasTokenPricesParameters,
    type GetGasTokenPricesReturnType,
    getGasTokenPrices,
} from "../actions/getGasTokenPrices.js";
import type { Config } from "../createConfig.js";
import type { Evaluate, ExactPartial } from '../types/utils.js';
import type { ScopeKeyParameter } from '../types/properties.js'


export type GetGasTokenPricesOptions = Evaluate<
  ExactPartial<GetGasTokenPricesParameters> & ScopeKeyParameter
>;
export function getGasTokenPricesQueryOptions(
    config: Config,
    parameters: GetGasTokenPricesParameters
): QueryOptions<GetGasTokenPricesReturnType, GetGasTokenPricesErrorType> {
    return {
        queryKey: getGasTokenPricesQueryKey(parameters),
        queryFn: () => getGasTokenPrices(config, parameters),
    };
}

export function getGasTokenPricesQueryKey(parameters: GetGasTokenPricesParameters) {
    return ['getGasTokenPrices', parameters] as const;
}

export type GetGasTokenPricesQueryKey = ReturnType<typeof getGasTokenPricesQueryKey>;
export type GetGasTokenPricesData = GetGasTokenPricesReturnType;
export type GetGasTokenPricesErrorType = strkjs_GetGasTokenPricesErrorType