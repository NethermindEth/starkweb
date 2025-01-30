import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { ErrorType } from '../../errors/utils.js'
import type { BlockTag } from '../../types/block.js'
import type { Chain } from '../../types/chain.js'
import type { Hash, Hex } from '../../types/misc.js'
import type { RequestErrorType } from '../../utils/buildRequest.js'

export type CallParameters = {
  contract_address: string
  entry_point_selector: string
  calldata?: string[]
} & (
  | {
      block_hash?: Hash | undefined
      block_number?: undefined
      block_tag?: undefined
    }
  | {
      block_hash?: undefined
      block_number?: number | undefined
      block_tag?: undefined
    }
  | {
      block_hash?: undefined
      block_number?: undefined
      block_tag?: BlockTag | undefined
    }
  | {
      block_hash?: Hash | undefined
      block_number?: number | undefined
      block_tag?: BlockTag | undefined
    }
)

export type CallReturnType = Hex

export type CallErrorType = RequestErrorType | ErrorType

/**
 * Retrieves the bytecode at an address.
 *
 * - Docs: https://starkweb.xyz/docs/contract/getCode
 * - JSON-RPC Methods: [`eth_getCode`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getcode)
 *
 * @param client - Client to use
 * @param parameters - {@link CallParameters}
 * @returns The contract's bytecode. {@link CallReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'starkweb'
 * import { mainnet } from 'starkweb/chains'
 * import { getClassAt } from 'starkweb/contract'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const classAt = await getClassAt(client, {
 *   contract_address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 * })
 */
export async function call<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  {
    contract_address,
    entry_point_selector,
    calldata,
    block_hash,
    block_number,
    block_tag = 'latest',
  }: CallParameters,
): Promise<CallReturnType> {
  const block_id = block_hash
    ? { block_hash }
    : block_number
      ? { block_number }
      : (block_tag ?? 'latest')
  return await client.request({
    method: 'starknet_call',
    params: {
      request: {
        contract_address,
        entry_point_selector,
        calldata: calldata ?? [],
      },
      block_id,
    },
  })
}
