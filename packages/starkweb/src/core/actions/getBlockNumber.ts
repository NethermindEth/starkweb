import {
  type GetBlockNumberErrorType as strkjs_GetBlockNumberErrorType,
  type GetBlockNumberParameters as strkjs_GetBlockNumberParameters,
  type GetBlockNumberReturnType as strkjs_GetBlockNumberReturnType,
  getBlockNumber as strkjs_getBlockNumber,
} from '../../actions/public/getBlockNumber.js'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from "../types/properties.js";
import { getAction } from "../utils/getAction.js";

export type GetBlockNumberParameters = strkjs_GetBlockNumberParameters & ChainIdParameter;

export type GetBlockNumberReturnType = strkjs_GetBlockNumberReturnType;

export type GetBlockNumberErrorType = strkjs_GetBlockNumberErrorType;

/** https://starkweb.xyz/core/api/actions/getBlockNumber */
export function getBlockNumber(
  config: Config,
  parameters: GetBlockNumberParameters = {}
): Promise<GetBlockNumberReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(client, strkjs_getBlockNumber, "getBlockNumber");
  return action(rest);
}
