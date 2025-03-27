import { type UseQueryReturnType, useQuery } from "../utils/query.js";
import type { Hex } from "../../types/misc.js";
import { useChainId } from "./useChainId.js";
import { useConfig } from "./useConfig.js";
import type { Config } from "src/core/createConfig.js";
import {
    type CheckAccountCompatibilityErrorType,
    type CheckAccountCompatibilityQueryKey,
    checkAccountCompatibilityQueryOptions,
    type checkAccountCompatibilityData,
    type CheckAccountCompatibilityOptions,
  } from "../../core/query/checkAccountCompatibility.js";
import type { Evaluate } from "../../types/utils.js";
import type { ConfigParameter, QueryParameter } from "../types/properties.js";





export type UseCheckAccountCompatibilityParameters<
  config extends Config = Config,
  selectData = checkAccountCompatibilityData
> = Evaluate<
  CheckAccountCompatibilityOptions &
  ConfigParameter<config> & {
    accountAddress: string;
    chainId?: Hex;
  } & QueryParameter<
      checkAccountCompatibilityData,
      CheckAccountCompatibilityErrorType,
      selectData,
      CheckAccountCompatibilityQueryKey
    >
>;

export type UseCheckAccountCompatibilityReturnType  =  UseQueryReturnType<checkAccountCompatibilityData, CheckAccountCompatibilityErrorType>;
export function useCheckAccountCompatibility(
  parameters: UseCheckAccountCompatibilityParameters
): UseCheckAccountCompatibilityReturnType {
  const { query = {}, accountAddress } = parameters;

  const config = useConfig(parameters);
  const chainId = useChainId({ config });

  const options = checkAccountCompatibilityQueryOptions(config, {
    accountAddress,
    chainId: parameters.chainId ?? chainId,
  });


  return useQuery({ ...(query as any), ...options}) as UseCheckAccountCompatibilityReturnType;

}
