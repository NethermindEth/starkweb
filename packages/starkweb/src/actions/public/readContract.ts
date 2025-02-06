import { decodeFunctionCall } from '../../abi/output.js';
import type {
  ContractFunctionArgs,
  ContractFunctionParameters,
  ContractFunctionReturnType,
} from '../../abi/parser.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { Abi } from '../../strk-types/abi.js';
import type { BlockTag } from '../../strk-types/lib.js';
import {
  calldataToHex,
  compile,
} from '../../strk-utils/calldata/compile.js';
import { getSelectorFromName } from '../../strk-utils/hash/selector.js';
import type { Chain } from '../../types/chain.js';
import type { ContractFunctionName } from '../../types/contract.js';
import type { Hash } from '../../types/misc.js';
import {
  call,
  type CallParameters,
} from './call.js';

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
  'view',
  functionName,
  allFunctionNames,
  args
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
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends ContractFunctionName<
    TAbi,
    'view'
  > = ContractFunctionName<TAbi, 'view'>,
  TArgs extends ContractFunctionArgs<
    TAbi,
    'view',
    TFunctionName
  > = ContractFunctionArgs<
    TAbi,
    'view',
    TFunctionName
  >,
> = {
  address: string
  abi: TAbi
  functionName: TFunctionName
  args?: TArgs
} & SecondaryReadContractParameters

export type ReadContractReturnType<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'view'>,
> = ContractFunctionReturnType<abi, 'view', functionName>
export type ReadContractErrorType = any 

export async function readContract<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends ContractFunctionName<TAbi, 'view'>,
  TChain extends Chain | undefined = Chain | undefined,
>(
  client: Client<Transport, TChain>,
  parameters: ReadContractParameters<TAbi, TFunctionName>
) : Promise<ReadContractReturnType<TAbi, TFunctionName>> {
  const { address, functionName, args, blockHash, blockNumber, blockTag } =
    parameters as ReadContractParameters<TAbi, TFunctionName>
  const calldata: string[] = args ? compile(args as any) : []

  const txCall: CallParameters = {
    contract_address: address,
    entry_point_selector: getSelectorFromName(functionName),
    calldata: calldataToHex(calldata),
    block_hash: blockHash,
    block_number: blockNumber,
    block_tag: blockTag,
  }
  const result = await call(client, txCall) as unknown as string[]
  const decoded = decodeFunctionCall(result, functionName, parameters.abi as any)
  return decoded as ReadContractReturnType<TAbi, TFunctionName>
}
