import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { ErrorType } from '../../errors/utils.js'
import type { BlockTag } from '../../types/block.js'
import type { Chain } from '../../types/chain.js'
import type { Hash } from '../../types/misc.js'
import type { RequestErrorType } from '../../utils/buildRequest.js'
import type { BLOCK_WITH_TXS, PENDING_BLOCK_WITH_TXS } from '../../types/components.js'
import type { BlockNotFoundErrorType } from '../../errors/block.js'

export type GetBlockWithTxsParameters =
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

export type GetBlockWithTxsReturnType<T extends GetBlockWithTxsParameters> = T extends { block_tag: 'pending' } ? PENDING_BLOCK_WITH_TXS : T extends { block_tag: 'latest' } ? BLOCK_WITH_TXS : BLOCK_WITH_TXS | PENDING_BLOCK_WITH_TXS

export type GetBlockWithTxsErrorType = RequestErrorType | ErrorType | BlockNotFoundErrorType

/**
 * Returns the block with transactions.
 *
 * - Docs: https://starkweb.xyz/docs/actions/public/getBlockWithTxs
 * - JSON-RPC Methods:
 *   - Calls [`starknet_getBlockWithTxs`](https://docs.starknet.io/reference/rpc-api/#starknet_getblockwithtxs)
 *
 * @param client - Client to use
 * @param parameters - {@link GetBlockWithTxsParameters}
 * @returns The block with transactions. {@link GetBlockWithTxsReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'starkweb'
 * import { mainnet } from 'starkweb/chains'
 * import { getBlockWithTxs } from 'starkweb/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const count = await getBlockWithTxs(client)
 */
export async function getBlockWithTxs<TChain extends Chain | undefined, TParams extends GetBlockWithTxsParameters = GetBlockWithTxsParameters>(
  client: Client<Transport, TChain>,
  parameters: TParams = {} as TParams,
): Promise<GetBlockWithTxsReturnType<TParams>> {
  // Simplified block_id determination
  const block_id = parameters.block_hash
    ? { block_hash: parameters.block_hash }
    : parameters.block_number
      ? { block_number: parameters.block_number }
      : (parameters.block_tag ?? 'latest')

  // Directly return the result of the client request
  return await client.request({
    method: 'starknet_getBlockWithTxs',
    params: { block_id },
  })
}
