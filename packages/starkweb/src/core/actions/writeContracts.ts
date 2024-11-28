// @ts-nocheck
import {
    type WriteContractsErrorType as strkjs_WriteContractsErrorType,
    type WriteContractsParameters as strkjs_WriteContractsParameters,
    type WriteContractsReturnTypes as strkjs_WriteContractsReturnTypes,
    writeContracts as strkjs_writeContracts,
  } from 'strkjs/actions'
  
  import type { Config } from '../createConfig.js'
  import type { ChainIdParameter } from '../types/properties.js'
  import { getAction } from '../utils/getAction.js'
  
  export type WriteContractsParameters = strkjs_WriteContractsParameters &
    ChainIdParameter
  
  export type WriteContractsReturnType = strkjs_WriteContractsReturnTypes
  
  export type WriteContractsErrorType = strkjs_WriteContractsErrorType
  
  /** https://starkweb.xyz/core/api/actions/writeContracts */
  export function writeContracts(
    config: Config,
    parameters: WriteContractsParameters,
): Promise<WriteContractsReturnType> {
    const { chainId, ...rest } = parameters
    const client = config.getClient({ chainId })
    const action = getAction(client, strkjs_writeContracts, 'writeContracts')
    return action({ ...rest, client }) as Promise<WriteContractsReturnType>
  }
  