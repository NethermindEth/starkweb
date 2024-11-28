import {
    type GetStarknetIdErrorType as strkjs_GetStarknetIdErrorType,
    type GetStarknetIdParameters as strkjs_GetStarknetIdParameters,
    type GetStarknetIdReturnType as strkjs_GetStarknetIdReturnType,
  getStarknetId as strkjs_getStarknetId,
} from '../../actions/starknetId/getStarknetId.js'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import { getAction } from '../utils/getAction.js'

export type GetStarknetIdParameters = strkjs_GetStarknetIdParameters &
  ChainIdParameter
  
  export type GetStarknetIdReturnType = strkjs_GetStarknetIdReturnType
  
  export type GetStarknetIdErrorType = strkjs_GetStarknetIdErrorType
  
  /** https://starkweb.xyz/core/api/actions/getStarknetId */
  export function getStarknetId<config extends Config>(
    config: config  ,
    parameters: GetStarknetIdParameters,
  ): Promise<GetStarknetIdReturnType> {
    const { chainId, ...rest } = parameters
    const client = config.getClient({ chainId })
    const action = getAction(client, strkjs_getStarknetId, 'getStarknetId')
    return action(rest)
  }
  