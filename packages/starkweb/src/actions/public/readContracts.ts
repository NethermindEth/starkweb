import type { Abi } from '../../strk-types/abi.js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import { calldataToHex, compile } from '../../strk-utils/calldata/compile.js'
import { getSelectorFromName } from '../../strk-utils/hash/selector.js'
import type { Chain } from '../../types/chain.js'
import { call } from './call.js'
import type {
  PrimaryReadContractParameters,
  SecondaryReadContractParameters,
} from './readContract.js'
import type { ContractFunctionArgs, ContractFunctionName } from '../../types/contract.js'

export type ReadContractsParameters<
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
> = {
  contracts: PrimaryReadContractParameters<abi, functionName, args, allFunctionNames>[]
} & SecondaryReadContractParameters

export type ReadContractsReturnTypes = any[]
export type ReadContractsErrorType = any[]

export async function readContracts<
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
  parameters: ReadContractsParameters<abi, functionName, args>,
): Promise<ReadContractsReturnTypes | ReadContractsErrorType> {
  const { contracts, blockHash, blockNumber, blockTag } = parameters as ReadContractsParameters

  const txCallsPromise = contracts.map((callParams) => {
    const { address, functionName, args } = callParams
    const calldata: string[] = args ? compile(args as any) : []

    const txCall = {
      contract_address: address,
      entry_point_selector: getSelectorFromName(functionName),
      calldata: calldataToHex(calldata),
      block_hash: blockHash,
      block_number: blockNumber,
      block_tag: blockTag,
    }

    return call(client, txCall)
  })

  return Promise.all(txCallsPromise)
}
