import type { QueryOptions } from '@tanstack/query-core';
import {
    type GetPaymasterStatusErrorType as strkjs_GetPaymasterStatusErrorType,
    type GetPaymasterStatusParameters,
    type GetPaymasterStatusReturnType,
    getPaymasterStatus,
} from "../actions/getPaymasterStatus.js";
import type { Config } from "../createConfig.js";
import type { Evaluate, ExactPartial } from 'src/types/utils.js';

export type GetPaymasterStatusOptions = Evaluate<
    ExactPartial<GetPaymasterStatusParameters>
>;
export function getPaymasterStatusQueryOptions(
    config: Config,
    parameters: GetPaymasterStatusParameters
): QueryOptions<GetPaymasterStatusReturnType, GetPaymasterStatusErrorType> {
    return {
        queryKey: getPaymasterStatusQueryKey(parameters),
        queryFn: () => getPaymasterStatus(config, parameters),
    };
}

export function getPaymasterStatusQueryKey(parameters: GetPaymasterStatusParameters) {
    return ['getPaymasterStatus', parameters] as const;
}

export type GetPaymasterStatusQueryKey = ReturnType<typeof getPaymasterStatusQueryKey>;
export type GetPaymasterStatusData = GetPaymasterStatusReturnType;
export type GetPaymasterStatusErrorType = strkjs_GetPaymasterStatusErrorType;
