// import { mainnet } from 'src/chains/definitions/mainnet.js';
// import { createPublicClient } from 'src/clients/createPublicClient.js';
// import { http } from 'src/clients/transports/http.js';

import type {
  ContractFunctionArgs,
  ContractFunctionParameters,
} from '../../abi/parser.js';
// import { testAbi } from '../../abi/testabi.js';
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

export type ReadContractReturnTypes<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'view'>,
  args extends ContractFunctionArgs<abi, 'view', functionName>,
> = any | args 
export type ReadContractErrorType = any 

export async function readContract<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends ContractFunctionName<TAbi, 'view'>,
>(
  client: Client<Transport, Chain>,
  parameters: ReadContractParameters<TAbi, TFunctionName>
) {
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

  return call(client, txCall)
}


// readContract(createPublicClient({
//   chain: mainnet,
//   transport: http(),
// }), {
//   address: '0x0000000000000000000000000000000000000000',
//   abi: testAbi,
//   functionName: 'is_guardian',
//   args: {
//     guardian: {
//       pubkey: '0x1' as 'felt252',
//     }
//   }
// })
