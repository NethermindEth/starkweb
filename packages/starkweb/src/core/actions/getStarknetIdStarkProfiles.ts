import {
    type GetStarknetIdStarkProfilesErrorType as strkjs_GetStarknetIdStarkProfilesErrorType,
    type GetStarknetIdStarkProfilesParameters as strkjs_GetStarknetIdStarkProfilesParameters,
    type GetStarknetIdStarkProfilesReturnType as strkjs_GetStarknetIdStarkProfilesReturnType,
    getStarknetIdStarkProfiles as strkjs_getStarknetIdStarkProfiles,
  } from '../../actions/starknetId/getStarknetIdStarkProfiles.js'
  
  import type { Config } from '../createConfig.js'
  import type { ChainIdParameter } from '../types/properties.js'
  import { getAction } from '../utils/getAction.js'
  
  export type GetStarknetIdStarkProfilesParameters = strkjs_GetStarknetIdStarkProfilesParameters & ChainIdParameter
  
  export type GetStarknetIdStarkProfilesReturnType = strkjs_GetStarknetIdStarkProfilesReturnType
  
  export type GetStarknetIdStarkProfilesErrorType = strkjs_GetStarknetIdStarkProfilesErrorType
  
  /** https://starkweb.xyz/core/api/actions/getStarknetIdStarkProfiles */
  export function getStarknetIdStarkProfiles<config extends Config>(
    config: config,
    parameters: GetStarknetIdStarkProfilesParameters,
  ): Promise<GetStarknetIdStarkProfilesReturnType> {
    const { chainId, ...rest } = parameters
    const client = config.getClient({ chainId })
    const action = getAction(client, strkjs_getStarknetIdStarkProfiles, 'getStarknetIdStarkProfiles')
    return action(rest)
  }