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

export type ReadContractsParameters = {
  contracts: PrimaryReadContractParameters[]
} & SecondaryReadContractParameters

export type ReadContractsReturnTypes = any[]
export type ReadContractsErrorType = any[]

export async function readContracts<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  parameters: ReadContractsParameters,
): Promise<ReadContractsReturnTypes | ReadContractsErrorType> {
  const { contracts, blockHash, blockNumber, blockTag } = parameters

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
