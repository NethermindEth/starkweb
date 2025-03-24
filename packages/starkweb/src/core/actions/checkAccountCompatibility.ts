import {
  type CheckAccountCompatibilityErrorType as strkjs_CheckAccountCompatibilityErrorType,
  type CheckAccountCompatibilityParameters as strkjs_CheckAccountCompatibilityParameters,
  type CheckAccountCompatibilityReturnType as strkjs_CheckAccountCompatibilityReturnType,
  checkAccountCompatibility as strkjs_checkAccountCompatibility,
} from "../../actions/paymaster/checkAccountCompatibility.js";
import type { Hex } from "../../types/misc.js";

import type { Config } from "../createConfig.js";
import type { ChainIdParameter } from "../types/properties.js";
import type { Evaluate } from "../types/utils.js";
import { getAction } from "../utils/getAction.js";

export type CheckAccountCompatibilityParameters = Evaluate<
  strkjs_CheckAccountCompatibilityParameters & ChainIdParameter
>;

export type CheckAccountCompatibilityReturnType = Evaluate<
  strkjs_CheckAccountCompatibilityReturnType & {
    chainId: Hex;
  }
>;

export type CheckAccountCompatibilityErrorType =
  strkjs_CheckAccountCompatibilityErrorType;

export async function checkAccountCompatibility(
  config: Config,
  parameters: CheckAccountCompatibilityParameters
): Promise<CheckAccountCompatibilityReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(
    client,
    strkjs_checkAccountCompatibility,
    "checkAccountCompatibility"
  );
  return action(rest) as Promise<CheckAccountCompatibilityReturnType>;
}
