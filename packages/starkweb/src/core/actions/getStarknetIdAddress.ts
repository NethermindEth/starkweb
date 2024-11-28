import {
    type GetStarknetIdAddressErrorType as strkjs_GetStarknetIdAddressErrorType,
    type GetStarknetIdAddressParameters as strkjs_GetStarknetIdAddressParameters,
    type GetStarknetIdAddressReturnType as strkjs_GetStarknetIdAddressReturnType,
    getStarknetIdAddress as strkjs_getStarknetIdAddress,
  } from '../../actions/starknetId/getStarknetIdAddress.js'
  
  import type { Config } from '../createConfig.js'
  import type { ChainIdParameter } from '../types/properties.js'
  import { getAction } from '../utils/getAction.js'
  
  export type GetStarknetIdAddressParameters = strkjs_GetStarknetIdAddressParameters & ChainIdParameter
  
  export type GetStarknetIdAddressReturnType = strkjs_GetStarknetIdAddressReturnType
  
  export type GetStarknetIdAddressErrorType = strkjs_GetStarknetIdAddressErrorType
  
  /** https://starkweb.xyz/core/api/actions/getStarknetIdAddress */
  export function getStarknetIdAddress(
    config: Config,
    parameters: GetStarknetIdAddressParameters,
  ): Promise<GetStarknetIdAddressReturnType> {
    const { chainId, ...rest } = parameters
    const client = config.getClient({ chainId })
    const action = getAction(client, strkjs_getStarknetIdAddress, 'getStarknetIdAddress')
    return action(rest)
  }
  