import {
    type WriteContractsErrorType as strkjs_WriteContractsErrorType,
    type WriteContractsParameters as strkjs_WriteContractsParameters,
    type WriteContractsReturnTypes as strkjs_WriteContractsReturnTypes,
    writeContracts as strkjs_writeContracts,
  } from '../../actions/index.js'
  
  import type { Config } from '../createConfig.js'
  import type { ChainIdParameter, ConnectorParameter } from '../types/properties.js'
  import { getAction } from '../utils/getAction.js'
  import { getConnectorClient } from './getConnectorClient.js'
  export type WriteContractsParameters = strkjs_WriteContractsParameters &
    ChainIdParameter & ConnectorParameter
  
  export type WriteContractsReturnType = strkjs_WriteContractsReturnTypes
  
  export type WriteContractsErrorType = strkjs_WriteContractsErrorType
  
  /** https://starkweb.xyz/core/api/actions/writeContracts */
  export async function writeContracts(
    config: Config,
    parameters: WriteContractsParameters,
): Promise<WriteContractsReturnType> {
    const { chainId, ...rest } = parameters
    const client = await getConnectorClient(config, { connector: parameters.connector })
    const action = getAction(client, strkjs_writeContracts, 'writeContracts')
    return action({ ...rest }) as Promise<WriteContractsReturnType>
  }
  