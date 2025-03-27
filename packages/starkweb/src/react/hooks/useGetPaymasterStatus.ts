"use client";

import type { Config } from "../../core/createConfig.js";
import type { Evaluate } from "../../types/utils.js";
import {
  type GetPaymasterStatusErrorType,
  type GetPaymasterStatusQueryKey,
  getPaymasterStatusQueryOptions,
  type GetPaymasterStatusOptions,
  type GetPaymasterStatusData,
} from "../../core/query/getPaymasterStatus.js";

import type { ConfigParameter, QueryParameter } from "../types/properties.js";
import { type UseQueryReturnType, useQuery } from "../utils/query.js";
import { useConfig } from "./useConfig.js";
// Paymaster Types
export type UseGetPaymasterStatusParameters<
  config extends Config = Config,
  selectData = GetPaymasterStatusData
> = Evaluate<
  GetPaymasterStatusOptions &
    ConfigParameter<config> &
    QueryParameter<
      GetPaymasterStatusData,
      GetPaymasterStatusErrorType,
      selectData,
      GetPaymasterStatusQueryKey
    >
>;

export type UseGetPaymasterStatusReturnType = UseQueryReturnType<
  GetPaymasterStatusData,
  GetPaymasterStatusErrorType
>;

export function useGetPaymasterStatus(
  parameters: UseGetPaymasterStatusParameters
): UseGetPaymasterStatusReturnType {
  const { query = {} } = parameters;

  const config = useConfig(parameters);

  const options = getPaymasterStatusQueryOptions(config, parameters);
  return useQuery({ ...(query as any), ...options}) as UseGetPaymasterStatusReturnType;
}
