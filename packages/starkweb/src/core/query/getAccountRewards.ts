import type { QueryOptions } from '@tanstack/query-core';
import {
    type GetAccountRewardsErrorType as strkjs_GetAccountRewardsErrorType,
    type GetAccountRewardsParameters,
    type GetAccountRewardsReturnType,
    getAccountRewards,
    
} from "../actions/getAccountRewards.js";
import type { Config } from "../createConfig.js";
import type { Evaluate, ExactPartial } from '../types/utils.js';
import type { ScopeKeyParameter } from '../types/properties.js'


export type GetAccountRewardsOptions = Evaluate<
  ExactPartial<GetAccountRewardsParameters> & ScopeKeyParameter
>;

export function getAccountRewardsQueryOptions(
    config: Config,
    parameters: GetAccountRewardsParameters
): QueryOptions<GetAccountRewardsReturnType, GetAccountRewardsErrorType> {
    return {
        queryKey: getAccountRewardsQueryKey(parameters),
        queryFn: () => getAccountRewards(config, parameters),
    };
}

export function getAccountRewardsQueryKey(parameters: GetAccountRewardsParameters) {
    return ['getAccountRewards', parameters] as const;
}

export type GetAccountRewardsQueryKey = ReturnType<typeof getAccountRewardsQueryKey>;
export type GetAccountRewardsErrorType = strkjs_GetAccountRewardsErrorType
export type GetAccountRewardsData = GetAccountRewardsReturnType;