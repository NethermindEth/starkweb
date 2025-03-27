import type { QueryOptions } from '@tanstack/query-core';
import {
    type ExecuteTransactionErrorType as strkjs_ExecuteTransactionErrorType,
    type ExecuteTransactionParameters,
    type ExecuteTransactionReturnType,
    executeTransaction,
} from "../actions/executeTransaction.js";
import type { Evaluate, ExactPartial } from '../types/utils.js';
import type { ScopeKeyParameter } from '../types/properties.js'

import type { Config } from "../createConfig.js";

export type ExecuteTransactionOptions = Evaluate<
  ExactPartial<ExecuteTransactionParameters> & ScopeKeyParameter
>;
// Placeholder for executeTransactionQueryKey function
function executeTransactionQueryKey(parameters: ExecuteTransactionParameters) {
    return ['executeTransaction', parameters] as const;
}

export function executeTransactionQueryOptions(
    config: Config,
    parameters: ExecuteTransactionParameters
): QueryOptions<ExecuteTransactionReturnType, ExecuteTransactionErrorType> {
    return {
        queryKey: executeTransactionQueryKey(parameters),
        queryFn: () => executeTransaction(config, parameters),
    };
}

export function GetExecuteTransactionData(parameters: ExecuteTransactionParameters) {
    return ['executeTransaction', parameters] as const;
}

export type ExecuteTransactionQueryKey = ReturnType<typeof executeTransactionQueryKey>;
export type ExecuteTransactionData = ExecuteTransactionReturnType;
export type ExecuteTransactionErrorType = strkjs_ExecuteTransactionErrorType;