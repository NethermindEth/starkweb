import {
  type SignMessageErrorType as strkjs_SignMessageErrorType,
  type SignMessageParameters as strkjs_SignMessageParameters,
  type SignMessageReturnType as strkjs_SignMessageReturnType,
  signMessage as strkjs_signMessage,
} from '../../actions/wallet/signMessage.js'

import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type { ConnectorParameter } from '../types/properties.js'
import type { Compute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import {
  type GetConnectorClientErrorType,
  getConnectorClient,
} from './getConnectorClient.js'

export type SignMessageParameters = Compute<
  strkjs_SignMessageParameters & ConnectorParameter
>

export type SignMessageReturnType = strkjs_SignMessageReturnType

export type SignMessageErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType
  // strkjs
  | strkjs_SignMessageErrorType

/** https://starkweb.xyz/core/api/actions/signMessage */
export async function signMessage(
  config: Config,
  parameters: SignMessageParameters,
): Promise<SignMessageReturnType> {
  const { connector, ...rest } = parameters

  const client = await getConnectorClient(config, { connector })
  const action = getAction(client, strkjs_signMessage, 'signTypedData')
  return action({
    ...rest,
  }) as Promise<SignMessageReturnType>
}
