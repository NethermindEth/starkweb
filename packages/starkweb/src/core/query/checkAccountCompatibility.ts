import type { QueryOptions } from '@tanstack/query-core';
import {
    type CheckAccountCompatibilityErrorType as strkjs_CheckAccountCompatibilityErrorType,
    type CheckAccountCompatibilityParameters,
    type CheckAccountCompatibilityReturnType,
    checkAccountCompatibility,
} from "../actions/checkAccountCompatibility.js";
import type { Config } from "../createConfig.js";
import type { Evaluate, ExactPartial } from '../types/utils.js';


export type CheckAccountCompatibilityOptions = Evaluate<
    ExactPartial<CheckAccountCompatibilityParameters>
>;

export function checkAccountCompatibilityQueryOptions(
    config: Config,
    parameters: CheckAccountCompatibilityParameters
): QueryOptions<CheckAccountCompatibilityReturnType, CheckAccountCompatibilityErrorType> {
    return {
        queryKey: checkAccountCompatibilityQueryKey(parameters),
        queryFn: () => checkAccountCompatibility(config, parameters),
    };
}

export function checkAccountCompatibilityQueryKey(parameters: CheckAccountCompatibilityParameters) {
    return ['checkAccountCompatibility', parameters] as const;
}

export type CheckAccountCompatibilityQueryKey = ReturnType<typeof checkAccountCompatibilityQueryKey>;
export type checkAccountCompatibilityData = CheckAccountCompatibilityReturnType;
export type CheckAccountCompatibilityErrorType = strkjs_CheckAccountCompatibilityErrorType