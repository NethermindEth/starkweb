import {
    type GetStarknetIdExtendedUserDataErrorType as strkjs_GetStarknetIdExtendedUserDataErrorType,
    type GetStarknetIdExtendedUserDataParameters as strkjs_GetStarknetIdExtendedUserDataParameters,
    type GetStarknetIdExtendedUserDataReturnType as strkjs_GetStarknetIdExtendedUserDataReturnType,
    getStarknetIdExtendedUserData as strkjs_getStarknetIdExtendedUserData,
  } from '../../actions/starknetId/getStarknetIdExtendedUserData.js'
  
  import type { Config } from '../createConfig.js'
  import type { ChainIdParameter } from '../types/properties.js'
  import { getAction } from '../utils/getAction.js'
  
  export type GetStarknetIdExtendedUserDataParameters = strkjs_GetStarknetIdExtendedUserDataParameters & ChainIdParameter
  
  export type GetStarknetIdExtendedUserDataReturnType = strkjs_GetStarknetIdExtendedUserDataReturnType
  
  export type GetStarknetIdExtendedUserDataErrorType = strkjs_GetStarknetIdExtendedUserDataErrorType
  
  /** https://starkweb.xyz/core/api/actions/getStarknetIdExtendedUserData */
  export function getStarknetIdExtendedUserData<config extends Config>(
    config: config,
    parameters: GetStarknetIdExtendedUserDataParameters,
  ): Promise<GetStarknetIdExtendedUserDataReturnType> {
    const { chainId, ...rest } = parameters
    const client = config.getClient({ chainId })
    const action = getAction(client, strkjs_getStarknetIdExtendedUserData, 'getStarknetIdExtendedUserData')
    return action(rest)
  }