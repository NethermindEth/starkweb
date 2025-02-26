import type { PENDING_STATE_UPDATE, STATE_UPDATE } from '../../types/components.js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { ErrorType } from '../../errors/utils.js'
import type { BlockTag } from '../../types/block.js'
import type { Chain } from '../../types/chain.js'
import type { Hash } from '../../types/misc.js'
import type { RequestErrorType } from '../../utils/index.js'

export type GetBlockStateUpdateParameters =
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

export type GetBlockStateUpdateReturnType<T extends GetBlockStateUpdateParameters> = T extends { block_tag: 'pending' } ? PENDING_STATE_UPDATE : T extends { block_tag: 'latest' } ? STATE_UPDATE : STATE_UPDATE | PENDING_STATE_UPDATE

export type GetBlockStateUpdateErrorType = RequestErrorType | ErrorType

export async function getBlockStateUpdate<TChain extends Chain | undefined, TParams extends GetBlockStateUpdateParameters = GetBlockStateUpdateParameters>(
  client: Client<Transport, TChain>,
  parameters: TParams = {} as TParams,
): Promise<GetBlockStateUpdateReturnType<TParams>> {
  const block_id = parameters.block_hash
    ? { block_hash: parameters.block_hash }
    : parameters.block_number
      ? { block_number: parameters.block_number }
      : parameters.block_tag
      ? parameters.block_tag
      : 'latest'
  return await client.request(
    {
      method: 'starknet_getStateUpdate',
      params: { block_id },
    },
    { dedupe: Boolean(block_id) },
  )
}
