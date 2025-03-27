import {
  type GetPaymasterStatusErrorType as strkjs_GetPaymasterStatusErrorType,
  type GetPaymasterStatusParameters as strkjs_GetPaymasterStatusParameters,
  type GetPaymasterStatusReturnType as strkjs_GetPaymasterStatusReturnType,
  getPaymasterStatus as strkjs_getPaymasterStatus,
} from "../../actions/paymaster/getPaymasterStatus.js";
import type { Hex } from "../../types/misc.js";

import type { Config } from "../createConfig.js";
import type { ChainIdParameter } from "../types/properties.js";
import type { Evaluate } from "../types/utils.js";
import { getAction } from "../utils/getAction.js";

export type GetPaymasterStatusParameters = Evaluate<
  strkjs_GetPaymasterStatusParameters & ChainIdParameter
>;

export type GetPaymasterStatusReturnType = Evaluate<
  strkjs_GetPaymasterStatusReturnType & {
    chainId: Hex;
  }
>;

export type GetPaymasterStatusErrorType =
  strkjs_GetPaymasterStatusErrorType;

export async function getPaymasterStatus(
  config: Config,
  parameters: GetPaymasterStatusParameters
): Promise<GetPaymasterStatusReturnType> {
  const { chainId } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(
    client,
    strkjs_getPaymasterStatus,
    "getPaymasterStatus"
  );
  return action(undefined) as Promise<GetPaymasterStatusReturnType>;
}