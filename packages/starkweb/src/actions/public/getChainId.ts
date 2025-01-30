import type { Account } from '../../accounts/types.js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { ErrorType } from '../../errors/utils.js'
import type { Chain } from '../../types/chain.js'
import type { CHAIN_ID } from '../../types/components.js'
import type { RequestErrorType } from '../../utils/buildRequest.js'
import type { HexToNumberErrorType } from '../../utils/encoding/fromHex.js'

export type GetChainIdReturnType = CHAIN_ID

export type GetChainIdErrorType =
  | HexToNumberErrorType
  | RequestErrorType
  | ErrorType

/**
 * Returns the chain ID associated with the current network.
 *
 * - Docs: https://starkweb.xyz/docs/actions/public/getChainId
 * - JSON-RPC Methods: [`eth_chainId`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_chainid)
 *
 * @param client - Client to use
 * @returns The current chain ID. {@link GetChainIdReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'starkjs'
 * import { mainnet } from 'starkjs/chains'
 * import { getChainId } from 'starkjs/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const chainId = await getChainId(client)
 * // 1
 */
export async function getChainId<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(client: Client<Transport, TChain, TAccount>): Promise<GetChainIdReturnType> {
  const chainIdHex = await client.request(
    {
      method: 'starknet_chainId',
    },
    { dedupe: true },
  )
  return chainIdHex
}
