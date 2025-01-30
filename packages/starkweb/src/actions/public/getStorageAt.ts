import type { Address } from 'abitype'

import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { ErrorType } from '../../errors/utils.js'
import type { BlockTag } from '../../types/block.js'
import type { Chain } from '../../types/chain.js'
import type { STORAGE_KEY } from '../../types/components.js'
import type { Hash, Hex } from '../../types/misc.js'
import type { RequestErrorType } from '../../utils/buildRequest.js'

export type GetStorageAtParameters = {
  contract_address: Address
  key: Hex
} & (
  | {
      /** Hash of the block. */
      block_hash?: Hash | undefined
      block_number?: undefined
      block_tag?: undefined
    }
  | {
      block_hash?: undefined
      /** The block number. */
      block_number?: number | undefined
      block_tag?: undefined
    }
  | {
      block_hash?: undefined
      block_number?: undefined
      /** The block tag. Defaults to 'latest'. */
      block_tag?: BlockTag | undefined
    }
)

export type GetStorageAtReturnType = STORAGE_KEY

export type GetStorageAtErrorType = RequestErrorType | ErrorType

/**
 * Returns the value from a storage slot at a given address.
 *
 * - Docs: https://starkweb.xyz/docs/contract/getStorageAt
 * - JSON-RPC Methods: [`eth_getStorageAt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getstorageat)
 *
 * @param client - Client to use
 * @param parameters - {@link GetStorageAtParameters}
 * @returns The value of the storage slot. {@link GetStorageAtReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getStorageAt } from 'viem/contract'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const code = await getStorageAt(client, {
 *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 *   slot: toHex(0),
 * })
 */
export async function getStorageAt<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  {
    contract_address,
    block_hash,
    block_number,
    block_tag = 'latest',
    key,
  }: GetStorageAtParameters,
): Promise<GetStorageAtReturnType> {
  const block_id = block_hash
    ? { block_hash }
    : block_number
      ? { block_number }
      : (block_tag ?? 'latest')
  const data = await client.request({
    method: 'starknet_getStorageAt',
    params: { contract_address, key, block_id },
  })
  return data
}
