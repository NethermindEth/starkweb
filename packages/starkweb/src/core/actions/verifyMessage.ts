import {
  type VerifyMessageErrorType as strkjs_VerifyMessageErrorType,
  type VerifyMessageParameters as strkjs_VerifyMessageParameters,
  type VerifyMessageReturnType as strkjs_VerifyMessageReturnType,
  verifyMessage as strkjs_verifyMessage,
} from '../../actions/public/verifyMessage.js'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'

export type VerifyMessageParameters = strkjs_VerifyMessageParameters &
  ChainIdParameter

export type VerifyMessageReturnType = strkjs_VerifyMessageReturnType

export type VerifyMessageErrorType = strkjs_VerifyMessageErrorType

/** https://starkweb.xyz/core/api/actions/verifyMessage */
export function verifyMessage(
  config: Config,
  parameters: VerifyMessageParameters,
): Promise<VerifyMessageReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return strkjs_verifyMessage(client, { ...rest, chainId })
}
