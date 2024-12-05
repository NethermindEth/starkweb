import {
    type GetStarknetIdUnboundedVerifierDataErrorType as strkjs_GetStarknetIdUnboundedVerifierDataErrorType,
    type GetStarknetIdUnboundedVerifierDataParameters as strkjs_GetStarknetIdUnboundedVerifierDataParameters,
    type GetStarknetIdUnboundedVerifierDataReturnType as strkjs_GetStarknetIdUnboundedVerifierDataReturnType,
    getStarknetIdUnboundedVerifierData as strkjs_getStarknetIdUnboundedVerifierData,
  } from '../../actions/starknetId/getStarknetIdUnboundedVerifierData.js'
  
  import type { Config } from '../createConfig.js'
  import type { ChainIdParameter } from '../types/properties.js'
  import { getAction } from '../utils/getAction.js'
  
  export type GetStarknetIdUnboundedVerifierDataParameters = strkjs_GetStarknetIdUnboundedVerifierDataParameters & ChainIdParameter
  
  export type GetStarknetIdUnboundedVerifierDataReturnType = strkjs_GetStarknetIdUnboundedVerifierDataReturnType
  
  export type GetStarknetIdUnboundedVerifierDataErrorType = strkjs_GetStarknetIdUnboundedVerifierDataErrorType
  
  /** https://starkweb.xyz/core/api/actions/getStarknetIdUnboundedVerifierData */
  export function getStarknetIdUnboundedVerifierData<config extends Config>(
    config: config,
    parameters: GetStarknetIdUnboundedVerifierDataParameters,
  ): Promise<GetStarknetIdUnboundedVerifierDataReturnType> {
    const { chainId, ...rest } = parameters
    const client = config.getClient({ chainId })
    const action = getAction(client, strkjs_getStarknetIdUnboundedVerifierData, 'getStarknetIdUnboundedVerifierData')
    return action(rest)
  }