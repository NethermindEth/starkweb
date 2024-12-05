import {
    type GetStarknetIdUserDataErrorType as strkjs_GetStarknetIdUserDataErrorType,
    type GetStarknetIdUserDataParameters as strkjs_GetStarknetIdUserDataParameters,
    type GetStarknetIdUserDataReturnType as strkjs_GetStarknetIdUserDataReturnType,
    getStarknetIdUserData as strkjs_getStarknetIdUserData,
  } from '../../actions/starknetId/getStarknetIdUserData.js'
  
  import type { Config } from '../createConfig.js'
  import type { ChainIdParameter } from '../types/properties.js'
  import { getAction } from '../utils/getAction.js'
  
  export type GetStarknetIdUserDataParameters = strkjs_GetStarknetIdUserDataParameters & ChainIdParameter
  
  export type GetStarknetIdUserDataReturnType = strkjs_GetStarknetIdUserDataReturnType
  
  export type GetStarknetIdUserDataErrorType = strkjs_GetStarknetIdUserDataErrorType
  
  /** https://starkweb.xyz/core/api/actions/getStarknetIdUserData */
  export function getStarknetIdUserData<config extends Config>(
    config: config,
    parameters: GetStarknetIdUserDataParameters,
  ): Promise<GetStarknetIdUserDataReturnType> {
    const { chainId, ...rest } = parameters
    const client = config.getClient({ chainId })
    const action = getAction(client, strkjs_getStarknetIdUserData, 'getStarknetIdUserData')
    return action(rest)
  }