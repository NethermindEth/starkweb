import {
    type GetStarknetIdUnboundedUserDataErrorType as strkjs_GetStarknetIdUnboundedUserDataErrorType,
    type GetStarknetIdUnboundedUserDataParameters as strkjs_GetStarknetIdUnboundedUserDataParameters,
    type GetStarknetIdUnboundedUserDataReturnType as strkjs_GetStarknetIdUnboundedUserDataReturnType,
    getStarknetIdUnboundedUserData as strkjs_getStarknetIdUnboundedUserData,
  } from '../../actions/starknetId/getStarknetIdUnboundedUserData.js'
  
  import type { Config } from '../createConfig.js'
  import type { ChainIdParameter } from '../types/properties.js'
  import { getAction } from '../utils/getAction.js'
  
  export type GetStarknetIdUnboundedUserDataParameters = strkjs_GetStarknetIdUnboundedUserDataParameters & ChainIdParameter
  
  export type GetStarknetIdUnboundedUserDataReturnType = strkjs_GetStarknetIdUnboundedUserDataReturnType
  
  export type GetStarknetIdUnboundedUserDataErrorType = strkjs_GetStarknetIdUnboundedUserDataErrorType
  
  /** https://starkweb.xyz/core/api/actions/getStarknetIdUnboundedUserData */
  export function getStarknetIdUnboundedUserData<config extends Config>(
    config: config,
    parameters: GetStarknetIdUnboundedUserDataParameters,
  ): Promise<GetStarknetIdUnboundedUserDataReturnType> {
    const { chainId, ...rest } = parameters
    const client = config.getClient({ chainId })
    const action = getAction(client, strkjs_getStarknetIdUnboundedUserData, 'getStarknetIdUnboundedUserData')
    return action(rest)
  }