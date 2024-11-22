import {
  type WriteContractErrorType as starkweb_WriteContractErrorType,
  type WriteContractParameters as starkweb_WriteContractParameters,
  type WriteContractReturnTypes as starkweb_WriteContractReturnTypes,
  writeContract as starkweb_writeContract,
} from '../../actions/index.js'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import { getAction } from '../utils/getAction.js'

export type WriteContractParameters = starkweb_WriteContractParameters &
  ChainIdParameter

export type WriteContractReturnType = starkweb_WriteContractReturnTypes

export type WriteContractErrorType = starkweb_WriteContractErrorType

/** https://starkweb.xyz/core/api/actions/writeContract */
export function writeContract(
  config: Config,
  parameters: WriteContractParameters,
): Promise<WriteContractReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, starkweb_writeContract, 'writeContract')
  return action(rest) as Promise<WriteContractReturnType>
}
