import type { Account } from '../../accounts/types.js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { ErrorType } from '../../errors/utils.js'
import type { Chain } from '../../types/chain.js'
import type { RequestErrorType } from '../../utils/buildRequest.js'

export type GetSpecVersionReturnType = string

export type GetSpecVersionErrorType = RequestErrorType | ErrorType

/**
 * Returns the current spec version.
 *
 * - Docs: https://starkweb.xyz/docs/actions/public/getChainId
 * - JSON-RPC Methods: [`starknet_specVersion`](https://docs.starknet.io/reference/rpc-api/#starknet_specversion)
 *
 * @param client - Client to use
 * @returns The current spec version. {@link GetSpecVersionReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'starkweb'
 * import { mainnet } from 'starkweb/chains'
 * import { getSpecVersion } from 'starkweb/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const specVersion = await getSpecVersion(client)
 * // '0x0000000000000000000000000000000000000000000000000000000000000001'
 */
export async function getSpecVersion<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
): Promise<GetSpecVersionReturnType> {
  const specVersion = await client.request(
    {
      method: 'starknet_specVersion',
    },
    { dedupe: true },
  )
  return specVersion
}
