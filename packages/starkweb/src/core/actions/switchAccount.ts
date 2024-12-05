import type { Address, Hex } from '../../types/misc.js'

import type { Config, Connector } from '../createConfig.js'
import type { BaseError, ErrorType } from '../errors/base.js'
import {
  ConnectorNotConnectedError,
  type ConnectorNotConnectedErrorType,
} from '../errors/config.js'

export type SwitchAccountParameters = {
  connector: Connector
}

export type SwitchAccountReturnType = {
  accounts: readonly [Address, ...Address[]]
  chainId: Hex
}

export type SwitchAccountErrorType =
  | ConnectorNotConnectedErrorType
  | BaseError
  | ErrorType

/** https://starkweb.xyz/core/api/actions/switchAccount */
export async function switchAccount(
  config: Config,
  parameters: SwitchAccountParameters,
): Promise<SwitchAccountReturnType> {
  const { connector } = parameters

  const connection = config.state.connections.get(connector.uid)
  if (!connection) throw new ConnectorNotConnectedError()

  await config.storage?.setItem('recentConnectorId', connector.id)
  config.setState((x) => ({
    ...x,
    current: connector.uid,
  }))
  return {
    accounts: connection.accounts,
    chainId: connection.chainId,
  }
}
