import {
  type ReadContractsErrorType as strkjs_ReadContractsErrorType,
  type ReadContractsParameters as strkjs_ReadContractsParameters,
  type ReadContractsReturnTypes as strkjs_ReadContractsReturnTypes,
  readContracts as strkjs_readContracts,
} from '../../actions/public/readContracts.js'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import { getAction } from '../utils/getAction.js'

export type ReadContractsParameters= strkjs_ReadContractsParameters &
  ChainIdParameter

export type ReadContractsReturnType = strkjs_ReadContractsReturnTypes

export type ReadContractsErrorType = strkjs_ReadContractsErrorType

/** https://starkweb.xyz/core/api/actions/readContracts */
export function readContracts(
  config: Config,
  parameters: ReadContractsParameters,
  ): Promise<ReadContractsReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, strkjs_readContracts, 'readContracts')
  return action(rest as any) as Promise<ReadContractsReturnType>
}
