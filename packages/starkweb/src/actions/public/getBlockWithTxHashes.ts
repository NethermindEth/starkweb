import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { ErrorType } from '../../errors/utils.js'
import type { Block, PendingBlock } from '../../strk-types/provider.js'
import type { BlockTag } from '../../types/block.js'
import type { Chain } from '../../types/chain.js'
import type { Hash } from '../../types/misc.js'
import type { RequestErrorType } from '../../utils/buildRequest.js'

export type GetBlockWithTxHashesParameters =
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

export type GetBlockWithTxHashesReturnType = Block | PendingBlock

export type GetBlockWithTxHashesErrorType = RequestErrorType | ErrorType

/**
 * Returns the number of Transactions at a block number, hash, or tag.
 *
 * - Docs: https://starkweb.xyz/docs/actions/public/getBlockWithTxHashes
 * - JSON-RPC Methods:
 *   - Calls [`starknet_getBlockWithTxHashes`](https://docs.starknet.io/reference/rpc-api/#starknet_getblockwithtxhashes)
 *
 * @param client - Client to use
 * @param parameters - {@link GetBlockWithTxHashesParameters}
 * @returns The block transaction count. {@link GetBlockWithTxHashesReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'starkweb'
 * import { mainnet } from 'starkweb/chains'
 * import { getBlockWithTxHashes } from 'starkweb/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const count = await getBlockWithTxHashes(client)
 */
export async function getBlockWithTxHashes<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  { block_hash, block_number, block_tag }: GetBlockWithTxHashesParameters = {},
): Promise<GetBlockWithTxHashesReturnType> {
  // Simplified block_id determination
  const block_id = block_hash
    ? { block_hash }
    : block_number
      ? { block_number }
      : (block_tag ?? 'latest')

  // Directly return the result of the client request
  return await client.request({
    method: 'starknet_getBlockWithTxHashes',
    params: { block_id },
  })
}
