import {
    type GetGasTokenPricesErrorType as strkjs_GetGasTokenPricesErrorType,
    type GetGasTokenPricesParameters as strkjs_GetGasTokenPricesParameters,
    type GetGasTokenPricesReturnType as strkjs_GetGasTokenPricesReturnType,
    getGasTokenPrices as strkjs_getGasTokenPrices,
  } from "../../actions/paymaster/getGasTokenPrices.js";
  import type { Hex } from "../../types/misc.js";
  
  import type { Config } from "../createConfig.js";
  import type { ChainIdParameter } from "../types/properties.js";
  import type { Evaluate } from "../types/utils.js";
  import { getAction } from "../utils/getAction.js";
  
  export type GetGasTokenPricesParameters = Evaluate<
    strkjs_GetGasTokenPricesParameters & ChainIdParameter
  >;
  
  export type GetGasTokenPricesReturnType = Evaluate<
    strkjs_GetGasTokenPricesReturnType & {
      chainId: Hex;
    }
  >;
  
  export type GetGasTokenPricesErrorType =
    strkjs_GetGasTokenPricesErrorType;
  
  export async function getGasTokenPrices(
    config: Config,
    parameters: GetGasTokenPricesParameters & Record<string, unknown>
  ): Promise<GetGasTokenPricesReturnType> {
    const { chainId } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(
      client,
      strkjs_getGasTokenPrices,
      "getGasTokenPrices"
    );
    return action(chainId) as Promise<GetGasTokenPricesReturnType>;
  }