import {
    type GetStarknetIdExtendedVerifierDataErrorType as strkjs_GetStarknetIdExtendedVerifierDataErrorType,
    type GetStarknetIdExtendedVerifierDataParameters as strkjs_GetStarknetIdExtendedVerifierDataParameters,
    type GetStarknetIdExtendedVerifierDataReturnType as strkjs_GetStarknetIdExtendedVerifierDataReturnType,
    getStarknetIdExtendedVerifierData as strkjs_getStarknetIdExtendedVerifierData,
  } from '../../actions/starknetId/getStarknetIdExtendedVerifierData.js'
  
  import type { Config } from '../createConfig.js'
  import type { ChainIdParameter } from '../types/properties.js'
  import { getAction } from '../utils/getAction.js'
  
  export type GetStarknetIdExtendedVerifierDataParameters = strkjs_GetStarknetIdExtendedVerifierDataParameters & ChainIdParameter
  
  export type GetStarknetIdExtendedVerifierDataReturnType = strkjs_GetStarknetIdExtendedVerifierDataReturnType
  
  export type GetStarknetIdExtendedVerifierDataErrorType = strkjs_GetStarknetIdExtendedVerifierDataErrorType
  
  /** https://starkweb.xyz/core/api/actions/getStarknetIdExtendedVerifierData */
  export function getStarknetIdExtendedVerifierData<config extends Config>(
    config: config,
    parameters: GetStarknetIdExtendedVerifierDataParameters,
  ): Promise<GetStarknetIdExtendedVerifierDataReturnType> {
    const { chainId, ...rest } = parameters
    const client = config.getClient({ chainId })
    const action = getAction(client, strkjs_getStarknetIdExtendedVerifierData, 'getStarknetIdExtendedVerifierData')
    return action(rest)
  }