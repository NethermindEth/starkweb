
import type { Evaluate } from "../../types/utils.js";
import type { ConfigParameter, QueryParameter } from "../types/properties.js";
import type { Config } from "src/core/createConfig.js";

import {
    type BuildTypedDataData,
      type BuildTypedDataErrorType,
      type BuildTypedDataOptions,
      type BuildTypedDataQueryKey,
      buildTypedDataQueryOptions,
    } from "../../core/query/buildTypedData.js";

import { useConfig } from "./useConfig.js";
import { type UseQueryReturnType, useQuery } from "../utils/query.js";


  export type UseBuildTypedDataParameters<
  config extends Config = Config,
  selectData = BuildTypedDataData
> = Evaluate<
BuildTypedDataOptions &
  ConfigParameter<config> &
  QueryParameter<
      BuildTypedDataData,
      BuildTypedDataErrorType,
      selectData,
      BuildTypedDataQueryKey
  >
>;

export type UseBuildTypedDataReturnType = UseQueryReturnType<BuildTypedDataData, BuildTypedDataErrorType>;

export function useBuildTypedData(
    parameters: UseBuildTypedDataParameters
): UseBuildTypedDataReturnType {
    const { query = {} } = parameters;

    const config = useConfig(parameters);


    const options = buildTypedDataQueryOptions(config, {
        ...parameters,
        userAddress: parameters.userAddress!,
        calls: parameters.calls!,

    });

    return useQuery({ ...(query as any), ...options }) as UseBuildTypedDataReturnType;
}
