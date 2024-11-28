import {
  type GetBalanceErrorType as strkjs_GetBalanceErrorType,
  type GetBalanceParameters as strkjs_GetBalanceParameters,
  type GetBalanceReturnTypes as strkjs_GetBalanceReturnTypes,
  getBalance as strkjs_getBalance,
} from '../../actions/public/getBalance.js'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import { getAction } from '../utils/getAction.js'

export type GetBalanceParameters= strkjs_GetBalanceParameters &
ChainIdParameter
export type GetBalanceReturnType = strkjs_GetBalanceReturnTypes

export type GetBalanceErrorType = strkjs_GetBalanceErrorType

/** https://starkweb.xyz/core/api/actions/readContract */
export function getBalance(
  config: Config,
  parameters: GetBalanceParameters,
): Promise<GetBalanceReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, strkjs_getBalance, 'getBalance')
  return action(rest as any) as Promise<GetBalanceReturnType>
}
