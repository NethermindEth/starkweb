import {
    type GetStarknetIdProfileDataErrorType as strkjs_GetStarknetIdProfileDataErrorType,
    type GetStarknetIdProfileDataParameters as strkjs_GetStarknetIdProfileDataParameters,
    type GetStarknetIdProfileDataReturnType as strkjs_GetStarknetIdProfileDataReturnType,
    getStarknetIdProfileData as strkjs_getStarknetIdProfileData,
  } from '../../actions/starknetId/getStarknetIdProfileData.js'
  
  import type { Config } from '../createConfig.js'
  import type { ChainIdParameter } from '../types/properties.js'
  import { getAction } from '../utils/getAction.js'
  
  export type GetStarknetIdProfileDataParameters = strkjs_GetStarknetIdProfileDataParameters & ChainIdParameter
  
  export type GetStarknetIdProfileDataReturnType = strkjs_GetStarknetIdProfileDataReturnType
  
  export type GetStarknetIdProfileDataErrorType = strkjs_GetStarknetIdProfileDataErrorType
  
  /** https://starkweb.xyz/core/api/actions/getStarknetIdProfileData */
  export function getStarknetIdProfileData<config extends Config>(
    config: config,
    parameters: GetStarknetIdProfileDataParameters,
  ): Promise<GetStarknetIdProfileDataReturnType> {
    const { chainId, ...rest } = parameters
    const client = config.getClient({ chainId })
    const action = getAction(client, strkjs_getStarknetIdProfileData, 'getStarknetIdProfileData')
    return action(rest)
  }