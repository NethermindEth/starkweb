import type { Hex } from '../../types/misc.js'
import {
  type GetBlockWithTxHashesErrorType as strkjs_GetBlockWithTxHashesErrorType,
  type GetBlockWithTxHashesParameters as strkjs_GetBlockWithTxHashesParameters,
  type GetBlockWithTxHashesReturnType as strkjs_GetBlockWithTxHashesReturnType,
  getBlockWithTxHashes as strkjs_getBlockWithTxHashes,
} from '../../actions/public/getBlockWithTxHashes.js'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from "../types/properties.js";
import type { Evaluate } from "../types/utils.js";
import { getAction } from "../utils/getAction.js";

export type GetBlockWithTxHashesParameters = Evaluate<
  strkjs_GetBlockWithTxHashesParameters & ChainIdParameter
>;

export type GetBlockWithTxHashesReturnType = Evaluate<
  strkjs_GetBlockWithTxHashesReturnType<GetBlockWithTxHashesParameters> & {
    chainId: Hex;
  }
>;

export type GetBlockWithTxHashesErrorType =
  strkjs_GetBlockWithTxHashesErrorType;

export async function getBlockWithTxHashes(
  config: Config,
  parameters: GetBlockWithTxHashesParameters
): Promise<GetBlockWithTxHashesReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(
    client,
    strkjs_getBlockWithTxHashes,
    "getBlockWithTxHashes"
  );
  return action(rest) as Promise<GetBlockWithTxHashesReturnType>;
}
