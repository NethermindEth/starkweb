import {
  type ReadContractErrorType as starkweb_ReadContractErrorType,
  type ReadContractParameters as starkweb_ReadContractParameters,
  type ReadContractReturnType as starkweb_ReadContractReturnType,
  readContract as starkweb_readContract,
} from '../../actions/public/readContract.js'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import { getAction } from '../utils/getAction.js'
import type { ContractFunctionArgs } from '../../abi/parser.js'
import type { ContractFunctionName } from '../../types/contract.js'
import type { Abi } from '../../strk-types/abi.js'

export type ReadContractParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'view'
  > = ContractFunctionName<abi, 'view'>,
  args extends ContractFunctionArgs<
    abi,
    'view',
    functionName
  > = ContractFunctionArgs<abi, 'view', functionName>,
>  = starkweb_ReadContractParameters<abi, functionName, args> &
  ChainIdParameter

export type ReadContractReturnType<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'view'>,
  args extends ContractFunctionArgs<abi, 'view', functionName>,
> = starkweb_ReadContractReturnType<abi, functionName, args>

export type ReadContractErrorType = starkweb_ReadContractErrorType

/** https://starkweb.xyz/core/api/actions/readContract */
export function readContract<
  abi extends Abi,
  functionName extends ContractFunctionName<abi, 'view'>,
  args extends ContractFunctionArgs<abi, 'view', functionName>,
>(
  config: Config,
  parameters: ReadContractParameters<abi, functionName, args>,
): Promise<ReadContractReturnType<abi, functionName, args>> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, starkweb_readContract, 'readContract')
  return action(rest as any) as Promise<ReadContractReturnType<abi, functionName, args>>
}
