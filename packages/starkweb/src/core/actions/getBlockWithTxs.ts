import type { Hex } from '../../types/misc.js'
import {
  type GetBlockWithTxsErrorType as strkjs_GetBlockWithTxsErrorType,
  type GetBlockWithTxsParameters as strkjs_GetBlockWithTxsParameters,
  type GetBlockWithTxsReturnType as strkjs_GetBlockWithTxsReturnType,
  getBlockWithTxs as strkjs_getBlockWithTxs,
} from '../../actions/public/getBlockWithTxs.js'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from "../types/properties.js";
import type { Evaluate } from "../types/utils.js";
import { getAction } from "../utils/getAction.js";

export type GetBlockWithTxsParameters = Evaluate<
  strkjs_GetBlockWithTxsParameters & ChainIdParameter
>;

export type GetBlockWithTxsReturnType = Evaluate<
  strkjs_GetBlockWithTxsReturnType<GetBlockWithTxsParameters> & {
    chainId: Hex;
  }
>;

export type GetBlockWithTxsErrorType = strkjs_GetBlockWithTxsErrorType;

export async function getBlockWithTxs(
  config: Config,
  parameters: GetBlockWithTxsParameters
): Promise<GetBlockWithTxsReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, strkjs_getBlockWithTxs, "getBlockWithTxs");
  return action(rest) as Promise<GetBlockWithTxsReturnType>;
}
