import type { Hex } from '../../types/misc.js'
import {
  type GetTransactionStatusErrorType as strkjs_GetTransactionStatusErrorType,
  type GetTransactionStatusParameters as strkjs_GetTransactionStatusParameters,
  type GetTransactionStatusReturnType as strkjs_GetTransactionStatusReturnType,
  getTransactionStatus as strkjs_getTransactionStatus,
} from '../../actions/public/getTransactionStatus.js'

import type { Config } from "../createConfig.js";
import type { ChainIdParameter } from "../types/properties.js";
import type { Evaluate } from "../types/utils.js";
import { getAction } from "../utils/getAction.js";

export type GetTransactionStatusParameters = Evaluate<
  strkjs_GetTransactionStatusParameters & ChainIdParameter
>;

export type GetTransactionStatusReturnType = Evaluate<
  strkjs_GetTransactionStatusReturnType & {
    chainId: Hex;
  }
>;

export type GetTransactionStatusErrorType =
  strkjs_GetTransactionStatusErrorType;

/** https://starkweb.xyz/core/api/actions/getTransactionStatus */
export function getTransactionStatus(
  config: Config,
  parameters: GetTransactionStatusParameters
): Promise<GetTransactionStatusReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(
    client,
    strkjs_getTransactionStatus,
    "getTransactionStatus"
  );
  return action(rest) as unknown as Promise<GetTransactionStatusReturnType>;
}
