import {
    type GetStarknetIdNameErrorType as strkjs_GetStarknetIdNameErrorType,
    type GetStarknetIdNameParameters as strkjs_GetStarknetIdNameParameters,
    type GetStarknetIdNameReturnType as strkjs_GetStarknetIdNameReturnType,
    getStarknetIdName as strkjs_getStarknetIdName,
  } from '../../actions/starknetId/getStarknetIdName.js'
  
  import type { Config } from '../createConfig.js'
  import type { ChainIdParameter } from '../types/properties.js'
  import { getAction } from '../utils/getAction.js'
  
  export type GetStarknetIdNameParameters = strkjs_GetStarknetIdNameParameters & ChainIdParameter
  
  export type GetStarknetIdNameReturnType = strkjs_GetStarknetIdNameReturnType
  
  export type GetStarknetIdNameErrorType = strkjs_GetStarknetIdNameErrorType
  
  /** https://starkweb.xyz/core/api/actions/getStarknetIdName */
  export function getStarknetIdName(
    config: Config,
    parameters: GetStarknetIdNameParameters,
  ): Promise<GetStarknetIdNameReturnType> {
    const { chainId, ...rest } = parameters
    const client = config.getClient({ chainId })
    const action = getAction(client, strkjs_getStarknetIdName, 'getStarknetIdName')
    return action(rest)
  }
  