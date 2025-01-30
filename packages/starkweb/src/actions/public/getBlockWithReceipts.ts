import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { ErrorType } from '../../errors/utils.js'
import type { Block, PendingBlock } from '../../strk-types/provider.js'
import type { BlockTag } from '../../types/block.js'
import type { Chain } from '../../types/chain.js'
import type { Hash } from '../../types/misc.js'
import type { RequestErrorType } from '../../utils/buildRequest.js'

export type GetBlockWithReceiptsParameters =
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

export type GetBlockWithReceiptsReturnType = Block | PendingBlock

export type GetBlockWithReceiptsErrorType = RequestErrorType | ErrorType

/**
 * Returns the block with transactions.
 *
 * - Docs: https://starkweb.xyz/docs/actions/public/getBlockWithTxs
 * - JSON-RPC Methods:
 *   - Calls [`starknet_getBlockWithTxs`](https://docs.starknet.io/reference/rpc-api/#starknet_getblockwithtxs)
 *
 * @param client - Client to use
 * @param parameters - {@link GetBlockWithReceiptsParameters}
 * @returns The block with transactions. {@link GetBlockWithReceiptsReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getBlockWithReceipts } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const count = await getBlockWithReceipts(client)
 */
export async function getBlockWithReceipts<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  { block_hash, block_number, block_tag }: GetBlockWithReceiptsParameters = {},
): Promise<GetBlockWithReceiptsReturnType> {
  // Simplified block_id determination
  const block_id = block_hash
    ? { block_hash }
    : block_number
      ? { block_number }
      : (block_tag ?? 'latest')

  // Directly return the result of the client request
  return await client.request({
    method: 'starknet_getBlockWithReceipts',
    params: { block_id },
  })
}
