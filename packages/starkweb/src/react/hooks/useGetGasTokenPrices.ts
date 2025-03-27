
import {
  type GetGasTokenPricesData,
    type GetGasTokenPricesErrorType,
    type GetGasTokenPricesOptions,
    type GetGasTokenPricesQueryKey,
    getGasTokenPricesQueryOptions,
  } from "../../core/query/getGasTokenPrices.js";

  import { type UseQueryReturnType, useQuery } from "../utils/query.js";


  import { useConfig } from "./useConfig.js";
  import type { Config } from "src/core/createConfig.js";
  import type { Evaluate } from "../../types/utils.js";
  import type { ConfigParameter, QueryParameter } from "../types/properties.js";
  


  export type UseGetGasTokenParameters<
  config extends Config = Config,
  selectData = GetGasTokenPricesData
> = Evaluate<
GetGasTokenPricesOptions &
  ConfigParameter<config>
   & QueryParameter<
      GetGasTokenPricesData,
      GetGasTokenPricesErrorType,
      selectData,
      GetGasTokenPricesQueryKey
  >
>;

export type UseGetGasTokenReturnType  =  UseQueryReturnType<GetGasTokenPricesData, GetGasTokenPricesErrorType>;


export function useGetGasTokenPrices(
  parameters: UseGetGasTokenParameters
): UseGetGasTokenReturnType {
  const { query = {} } = parameters;

  const config = useConfig(parameters);

  const options = getGasTokenPricesQueryOptions(config, parameters);

  

  return useQuery({ ...(query as any), ...options,}) as UseGetGasTokenReturnType;
}