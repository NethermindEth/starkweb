import type { Address } from 'abitype'

import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { ErrorType } from '../../errors/utils.js'
import type { ContractClassResponse } from '../../strk-types/provider.js'
import type { BlockTag } from '../../types/block.js'
import type { Chain } from '../../types/chain.js'
import type { Hash } from '../../types/misc.js'
import type { RequestErrorType } from '../../utils/buildRequest.js'

export type GetClassAtParameters = {
  contract_address: Address
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
)

export type GetClassAtReturnType = ContractClassResponse

export type GetClassAtErrorType = RequestErrorType | ErrorType

/**
 * Retrieves the bytecode at an address.
 *
 * - Docs: https://starkweb.xyz/docs/contract/getCode
 * - JSON-RPC Methods: [`eth_getCode`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getcode)
 *
 * @param client - Client to use
 * @param parameters - {@link GetCodeParameters}
 * @returns The contract's bytecode. {@link GetCodeReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getClassAt } from 'viem/contract'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const classAt = await getClassAt(client, {
 *   contract_address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 * })
 */
export async function getClassAt<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  {
    contract_address,
    block_hash,
    block_number,
    block_tag = 'latest',
  }: GetClassAtParameters,
): Promise<GetClassAtReturnType> {
  const block_id = block_hash
    ? { block_hash }
    : block_number
      ? { block_number }
      : (block_tag ?? 'latest')
  return await client.request(
    {
      method: 'starknet_getClassAt',
      params: {
        contract_address,
        block_id,
      },
    },
    { dedupe: Boolean(block_hash) },
  )
}
