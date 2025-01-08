import type { ContractFunctionArgs, ContractFunctionName, ContractFunctionParameters } from '../../types/contract.js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Abi } from '../../strk-types/abi.js'
import type { BlockTag } from '../../strk-types/lib.js'
import { calldataToHex, compile } from '../../strk-utils/calldata/compile.js'
import { getSelectorFromName } from '../../strk-utils/hash/selector.js'
import type { Chain } from '../../types/chain.js'
import type { Hash } from '../../types/misc.js'
import { type CallParameters, call } from './call.js'

// export type PrimaryReadContractParameters = {
//   address: string
//   abi: Abi
//   functionName: string
//   args?: any[]
// }

export type PrimaryReadContractParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'view'
  > = ContractFunctionName<abi, 'view'>,
  args extends ContractFunctionArgs<
    abi,
    'view',
    functionName
  > = ContractFunctionArgs<
    abi,
    'view',
    functionName
  >,
  allFunctionNames = ContractFunctionName<abi, 'view'>
> = ContractFunctionParameters<
  abi,
  'external',
  functionName,
  args,
  false,
  allFunctionNames
>

export type SecondaryReadContractParameters =
  | {
      blockHash?: Hash | undefined
      blockNumber?: undefined
      blockTag?: undefined
    }
  | {
      blockHash?: undefined
      blockNumber?: number | undefined
      blockTag?: undefined
    }
  | {
      blockHash?: undefined
      blockNumber?: undefined
      blockTag?: BlockTag | undefined
    }
  | {
      blockHash?: Hash | undefined
      blockNumber?: number | undefined
      blockTag?: BlockTag | undefined
    }

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
  > = ContractFunctionArgs<
    abi,
    'view',
    functionName
  >,
  allFunctionNames = ContractFunctionName<abi, 'view'>
> = PrimaryReadContractParameters<abi, functionName, args, allFunctionNames> &
  SecondaryReadContractParameters

export type ReadContractReturnTypes<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'view'>,
  args extends ContractFunctionArgs<abi, 'view', functionName>,
> = any | args 
export type ReadContractErrorType = any 

export async function readContract<
  TChain extends Chain | undefined,
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'view'
  > = ContractFunctionName<abi, 'view'>,
  args extends ContractFunctionArgs<
    abi,
    'view',
    functionName
  > = ContractFunctionArgs<
    abi,
    'view',
    functionName
  >
>(
  client: Client<Transport, TChain>,
  parameters: ReadContractParameters<abi, functionName, args>,
): Promise<ReadContractReturnTypes<abi, functionName, args> | ReadContractErrorType> {
  const { address, functionName, args, blockHash, blockNumber, blockTag } =
    parameters as ReadContractParameters<abi, functionName, args>
  const calldata: string[] = args ? compile(args as any) : []

  const txCall: CallParameters = {
    contract_address: address,
    entry_point_selector: getSelectorFromName(functionName),
    calldata: calldataToHex(calldata),
    block_hash: blockHash,
    block_number: blockNumber,
    block_tag: blockTag,
  }

  return call(client, txCall)
}