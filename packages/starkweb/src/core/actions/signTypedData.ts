import {
  type SignTypedDataParameters as strkjs_SignTypedDataParameter,
  type SignTypedDataReturnType as strkjs_SignTypedDataReturnType,
  signTypedData as strkjs_signTypedData,
} from '../../actions/wallet/signTypedData.js'

import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type { ConnectorParameter } from '../types/properties.js'
import { getAction } from '../utils/getAction.js'
import {
  type GetConnectorClientErrorType,
  getConnectorClient,
} from './getConnectorClient.js'

export type SignTypedDataParameters = strkjs_SignTypedDataParameter &
  ConnectorParameter

export type SignTypedDataReturnType = strkjs_SignTypedDataReturnType

export type SignTypedDataErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType
  // strkjs

/** https://starkweb.xyz/core/api/actions/signTypedData */
export async function signTypedData(
  config: Config,
  parameters: SignTypedDataParameters,
): Promise<SignTypedDataReturnType> {
  const { connector, ...rest } = parameters

  const client = await getConnectorClient(config, { connector })
  const action = getAction(client, strkjs_signTypedData, 'signTypedData')
  return action(rest) as Promise<SignTypedDataReturnType>
}
