
import type { QueryOptions } from '@tanstack/query-core'

import {
    type BuildTypedDataErrorType as strkjs_BuildTypedDataErrorType,
    type BuildTypedDataParameters,
    type BuildTypedDataReturnType,
    buildTypedData,
} from "../actions/buildTypedData.js";
import type { Config } from "../createConfig.js";
import { filterQueryOptions } from "./utils.js";
import type { Evaluate, ExactPartial } from '../types/utils.js';


export type BuildTypedDataOptions = Evaluate<
  ExactPartial<BuildTypedDataParameters>
>;

export function buildTypedDataQueryOptions(
    config: Config,
    parameters: BuildTypedDataParameters
): QueryOptions<BuildTypedDataReturnType, BuildTypedDataErrorType> {
    return {
        queryKey: buildTypedDataQueryKey(parameters),
        queryFn: () => buildTypedData(config, parameters),
    }
}

export function buildTypedDataQueryKey(parameters: BuildTypedDataParameters) {
    return ['buildTypedData', filterQueryOptions(parameters)] as const
}

export type BuildTypedDataQueryKey = ReturnType<typeof buildTypedDataQueryKey>
export type BuildTypedDataData = BuildTypedDataReturnType
export type BuildTypedDataErrorType = strkjs_BuildTypedDataErrorType
