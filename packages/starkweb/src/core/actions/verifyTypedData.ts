import {
  type VerifyTypedDataErrorType as strkjs_VerifyTypedDataErrorType,
  type VerifyTypedDataParameters as strkjs_VerifyTypedDataParameters,
  type VerifyTypedDataReturnType as strkjs_VerifyTypedDataReturnType,
  verifyTypedData as strkjs_verifyTypedData,
} from '../../actions/public/verifyTypedData.js'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import { getAction } from '../utils/getAction.js'

export type VerifyTypedDataParameters = strkjs_VerifyTypedDataParameters &
  ChainIdParameter

export type VerifyTypedDataReturnType = strkjs_VerifyTypedDataReturnType

export type VerifyTypedDataErrorType = strkjs_VerifyTypedDataErrorType

/** https://starkweb.xyz/core/api/actions/verifyTypedData */
export function verifyTypedData(
  config: Config,
  parameters: VerifyTypedDataParameters,
): Promise<VerifyTypedDataReturnType | VerifyTypedDataErrorType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, strkjs_verifyTypedData, 'verifySiwsData')
  return action(rest)
}
