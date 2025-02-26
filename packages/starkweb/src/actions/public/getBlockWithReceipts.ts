import type { BLOCK_WITH_RECEIPTS, PENDING_BLOCK_WITH_RECEIPTS } from '../../types/components.js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { ErrorType } from '../../errors/utils.js'
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

export type GetBlockWithReceiptsReturnType<T extends GetBlockWithReceiptsParameters> = T extends { block_tag: 'pending' } ? PENDING_BLOCK_WITH_RECEIPTS : T extends { block_tag: 'latest' } ? BLOCK_WITH_RECEIPTS : BLOCK_WITH_RECEIPTS | PENDING_BLOCK_WITH_RECEIPTS

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
 * import { createPublicClient, http } from 'starkweb'
 * import { mainnet } from 'starkweb/chains'
 * import { getBlockWithReceipts } from 'starkweb/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const count = await getBlockWithReceipts(client)
 */
export async function getBlockWithReceipts<TChain extends Chain | undefined, TParams extends GetBlockWithReceiptsParameters = GetBlockWithReceiptsParameters>(
  client: Client<Transport, TChain>,
  parameters: TParams = {} as TParams,
): Promise<GetBlockWithReceiptsReturnType<TParams>> {
  // Simplified block_id determination
  const block_id = parameters.block_hash
    ? { block_hash: parameters.block_hash }
    : parameters.block_number
      ? { block_number: parameters.block_number }
      : { block_tag: parameters.block_tag ?? 'latest' }

  // Directly return the result of the client request
  return await client.request({
    method: 'starknet_getBlockWithReceipts',
    params: { block_id },
  })
}
