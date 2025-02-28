import type { Abi } from '../../strk-types/abi.js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import { calldataToHex, compile } from '../../strk-utils/calldata/compile.js'
import { getSelectorFromName } from '../../strk-utils/hash/selector.js'
import type { Chain } from '../../types/chain.js'
import { call, type CallParameters } from './call.js'
import type {
  PrimaryReadContractParameters,
  SecondaryReadContractParameters,
} from './readContract.js'
import type { ContractFunctionName } from '../../types/contract.js'
import { createBatchScheduler } from '../../utils/promise/createBatchScheduler.js'
import { decodeFunctionCall } from '../../abi/output.js'

export type ReadContractsParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'view'
  > = ContractFunctionName<abi, 'view'>,
> = {
  contracts: PrimaryReadContractParameters<abi, functionName>[]
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
>(
  client: Client<Transport, TChain>,
  parameters: ReadContractsParameters<abi, functionName>,
): Promise<ReadContractsReturnTypes | ReadContractsErrorType> {
  const { contracts, blockHash, blockNumber, blockTag } = parameters as ReadContractsParameters

  if (contracts.length === 0) return []
  
  // Prepare all call requests
  const callRequests = contracts.map((callParams) => {
    const { address, functionName, args } = callParams
    const calldata: string[] = args ? compile(args as any) : []

    return {
      contract_address: address,
      entry_point_selector: getSelectorFromName(functionName),
      calldata: calldataToHex(calldata),
      block_hash: blockHash,
      block_number: blockNumber,
      block_tag: blockTag,
    }
  })

  // Create a batch scheduler for processing calls
  const { schedule } = createBatchScheduler({
    id: 'readContracts',
    fn: async (requests) => {
      // Process all requests in a batch
      const results = await Promise.all(
        requests.map(request => call(client, request as CallParameters))
      )
      return results
    }
  })
  // Schedule all calls and collect results
  const results = await Promise.all(
    callRequests.map((request, index) => {
      const contract = contracts[index];
      return schedule(request).then(([result]) => {
        return decodeFunctionCall(
          result as unknown as string[],
          contract?.functionName,
          contract?.abi as any
        );
      });
    })
  )
  return results
}
