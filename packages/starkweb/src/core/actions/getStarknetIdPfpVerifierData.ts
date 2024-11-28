import {
    type GetStarknetIdPfpVerifierDataErrorType as strkjs_GetStarknetIdPfpVerifierDataErrorType,
    type GetStarknetIdPfpVerifierDataParameters as strkjs_GetStarknetIdPfpVerifierDataParameters,
    type GetStarknetIdPfpVerifierDataReturnType as strkjs_GetStarknetIdPfpVerifierDataReturnType,
    getStarknetIdPfpVerifierData as strkjs_getStarknetIdPfpVerifierData,
  } from '../../actions/starknetId/getStarknetIdPfpVerifierData.js'
  
  import type { Config } from '../createConfig.js'
  import type { ChainIdParameter } from '../types/properties.js'
  import { getAction } from '../utils/getAction.js'
  
  export type GetStarknetIdPfpVerifierDataParameters = strkjs_GetStarknetIdPfpVerifierDataParameters & ChainIdParameter
  
  export type GetStarknetIdPfpVerifierDataReturnType = strkjs_GetStarknetIdPfpVerifierDataReturnType
  
  export type GetStarknetIdPfpVerifierDataErrorType = strkjs_GetStarknetIdPfpVerifierDataErrorType
  
  /** https://starkweb.xyz/core/api/actions/getStarknetIdPfpVerifierData */
  export function getStarknetIdPfpVerifierData<config extends Config>(
    config: config,
    parameters: GetStarknetIdPfpVerifierDataParameters,
  ): Promise<GetStarknetIdPfpVerifierDataReturnType> {
    const { chainId, ...rest } = parameters
    const client = config.getClient({ chainId })
    const action = getAction(client, strkjs_getStarknetIdPfpVerifierData, 'getStarknetIdPfpVerifierData')
    return action(rest)
  }