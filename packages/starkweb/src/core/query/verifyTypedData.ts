import type { QueryOptions } from "@tanstack/query-core";

import {
  type VerifyTypedDataErrorType,
  type VerifyTypedDataParameters,
  type VerifyTypedDataReturnType,
  verifyTypedData,
} from "../actions/verifyTypedData.js";
import type { Config } from "../createConfig.js";
import type { ScopeKeyParameter } from "../types/properties.js";
import type { Evaluate, ExactPartial } from "../types/utils.js";
import { filterQueryOptions } from "./utils.js";

export type VerifyTypedDataOptions = Evaluate<
  ExactPartial<VerifyTypedDataParameters> & ScopeKeyParameter
>;

export type VerifyTypedDataQueryKey = readonly ['verifyTypedData', VerifyTypedDataOptions];

export type VerifyTypedDataQueryFnData = VerifyTypedDataReturnType;

export type VerifyTypedDataData = VerifyTypedDataQueryFnData;

export type VerifyTypedDataQueryOptions = QueryOptions<
  VerifyTypedDataQueryFnData,
  VerifyTypedDataErrorType,
  VerifyTypedDataData,
  VerifyTypedDataQueryKey
>;

export function verifyTypedDataQueryKey(options: VerifyTypedDataOptions): VerifyTypedDataQueryKey {
  return ["verifyTypedData", filterQueryOptions(options)] as const;
}

export function verifyTypedDataQueryOptions<config extends Config>(
  config: config,
  options: VerifyTypedDataOptions = {}
): VerifyTypedDataQueryOptions {
  return {
    queryFn: async ({ queryKey }): Promise<boolean> => {
      const { typedData, signature, address, scopeKey: _, ...parameters } = queryKey[1];
      if (!typedData || !signature || !address)
        throw new Error("typedData and signature are required");
      const result = await verifyTypedData(config, {
        ...parameters,
        typedData,
        signature,
        address,
      });
      if (result instanceof Error) {
        throw result;
      }
      return result;
    },
    queryKey: verifyTypedDataQueryKey(options),
  };
}
