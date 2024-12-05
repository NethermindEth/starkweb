import {
    type GetStarknetIdNamesErrorType as strkjs_GetStarknetIdNamesErrorType,
    type GetStarknetIdNamesParameters as strkjs_GetStarknetIdNamesParameters,
    type GetStarknetIdNamesReturnType as strkjs_GetStarknetIdNamesReturnType,
    getStarknetIdNames as strkjs_getStarknetIdNames,
  } from '../../actions/starknetId/getStarknetIdNames.js'
  
  import type { Config } from '../createConfig.js'
  import type { ChainIdParameter } from '../types/properties.js'
  import { getAction } from '../utils/getAction.js'
  
  export type GetStarknetIdNamesParameters = strkjs_GetStarknetIdNamesParameters & ChainIdParameter
  
  export type GetStarknetIdNamesReturnType = strkjs_GetStarknetIdNamesReturnType
  
  export type GetStarknetIdNamesErrorType = strkjs_GetStarknetIdNamesErrorType
  
  /** https://starkweb.xyz/core/api/actions/getStarknetIdNames */
  export function getStarknetIdNames<config extends Config>(
    config: config,
    parameters: GetStarknetIdNamesParameters,
  ): Promise<GetStarknetIdNamesReturnType> {
    const { chainId, ...rest } = parameters
    const client = config.getClient({ chainId })
    const action = getAction(client, strkjs_getStarknetIdNames, 'getStarknetIdNames')
    return action(rest)
  }