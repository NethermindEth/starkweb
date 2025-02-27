import type { Abi, AbiStateMutability } from '../../strk-types/abi.js'
import {
  type WriteContractErrorType as starkweb_WriteContractErrorType,
  type WriteContractParameters as starkweb_WriteContractParameters,
  type WriteContractReturnTypes as starkweb_WriteContractReturnTypes,
  writeContract as starkweb_writeContract,
} from '../../actions/index.js'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter, ConnectorParameter } from '../types/properties.js'
import { getAction } from '../utils/getAction.js'
import type { ContractFunctionArgs, ContractFunctionName } from '../../abi/parser.js'
import type { UnionCompute } from '../types/utils.js'
import type { Chain } from '../../types/chain.js'
import type { SelectChains } from '../types/chain.js'
import type { Compute } from '../types/utils.js'
import { getConnectorClient } from './getConnectorClient.js'


export type WriteContractParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    AbiStateMutability
  > = ContractFunctionName<abi, AbiStateMutability>,
  args extends ContractFunctionArgs<
    abi,
    AbiStateMutability,
    functionName
  > = ContractFunctionArgs<abi, AbiStateMutability, functionName>,
  config extends Config = Config,
  chainId extends
    config['chains'][number]['chain_id'] = config['chains'][number]['chain_id'],
  ///
  allFunctionNames = ContractFunctionName<abi, AbiStateMutability>,
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = UnionCompute<
  {
    // TODO: Should use `UnionStrictOmit<..., 'chain'>` on `starkweb_WriteContractParameters` result instead
    // temp workaround that doesn't affect runtime behavior for for https://github.com/wevm/wagmi/issues/3981
    [key in keyof chains]: starkweb_WriteContractParameters<
      abi,
      functionName,
      args,
      allFunctionNames
    >
  }[number] &
    Compute<ChainIdParameter> &
    ConnectorParameter 
>


export type WriteContractReturnType = starkweb_WriteContractReturnTypes

export type WriteContractErrorType = starkweb_WriteContractErrorType

/** https://starkweb.xyz/core/api/actions/writeContract */
export async function writeContract<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'external'> = ContractFunctionName<abi, 'external'>,
  args extends ContractFunctionArgs<abi, 'external', functionName> = ContractFunctionArgs<abi, 'external', functionName>,
>(
  config: Config,
  parameters: WriteContractParameters<abi, functionName, args>,
): Promise<WriteContractReturnType> {
  const { chainId, ...rest } = parameters
  const client = await getConnectorClient(config, { connector: parameters.connector })
  const action = getAction(client, starkweb_writeContract, 'writeContract')
  return action({
    ...rest,
    abi: parameters.abi,
    functionName: parameters.functionName,
    args: parameters.args,
  } as starkweb_WriteContractParameters<abi, functionName, args>) as Promise<WriteContractReturnType>
}
