import {
  type GetAccountRewardsErrorType as strkjs_GetAccountRewardsErrorType,
  type GetAccountRewardsParameters as strkjs_GetAccountRewardsParameters,
  type GetAccountRewardsReturnType as strkjs_GetAccountRewardsReturnType,
  getAccountRewards as strkjs_getAccountRewards,
} from "../../actions/paymaster/getAccountRewards.js";
import type { Hex } from "../../types/misc.js";

import type { Config } from "../createConfig.js";
import type { ChainIdParameter } from "../types/properties.js";
import type { Evaluate } from "../types/utils.js";
import { getAction } from "../utils/getAction.js";

export type GetAccountRewardsParameters = Evaluate<
  strkjs_GetAccountRewardsParameters & ChainIdParameter
>;

export type GetAccountRewardsReturnType = Evaluate<
  strkjs_GetAccountRewardsReturnType & {
    chainId: Hex;
  }
>;

export type GetAccountRewardsErrorType =
  strkjs_GetAccountRewardsErrorType;

export async function getAccountRewards(
  config: Config,
  parameters: GetAccountRewardsParameters
): Promise<GetAccountRewardsReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(
    client,
      strkjs_getAccountRewards,
    "getAccountRewards"
  );
  return action(rest) as Promise<GetAccountRewardsReturnType>;
}
