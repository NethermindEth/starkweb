import {
    type GetStarknetIdVerifierDataErrorType as strkjs_GetStarknetIdVerifierDataErrorType,
    type GetStarknetIdVerifierDataParameters as strkjs_GetStarknetIdVerifierDataParameters,
    type GetStarknetIdVerifierDataReturnType as strkjs_GetStarknetIdVerifierDataReturnType,
    getStarknetIdVerifierData as strkjs_getStarknetIdVerifierData,
  } from '../../actions/starknetId/getStarknetIdVerifierData.js'
  
  import type { Config } from '../createConfig.js'
  import type { ChainIdParameter } from '../types/properties.js'
  import { getAction } from '../utils/getAction.js'
  
  export type GetStarknetIdVerifierDataParameters = strkjs_GetStarknetIdVerifierDataParameters & ChainIdParameter
  
  export type GetStarknetIdVerifierDataReturnType = strkjs_GetStarknetIdVerifierDataReturnType
  
  export type GetStarknetIdVerifierDataErrorType = strkjs_GetStarknetIdVerifierDataErrorType
  
  /** https://starkweb.xyz/core/api/actions/getStarknetIdVerifierData */
  export function getStarknetIdVerifierData<config extends Config>(
    config: config,
    parameters: GetStarknetIdVerifierDataParameters,
  ): Promise<GetStarknetIdVerifierDataReturnType> {
    const { chainId, ...rest } = parameters
    const client = config.getClient({ chainId })
    const action = getAction(client, strkjs_getStarknetIdVerifierData, 'getStarknetIdVerifierData')
    return action(rest)
  }