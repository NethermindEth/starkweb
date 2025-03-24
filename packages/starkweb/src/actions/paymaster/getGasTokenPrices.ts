import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'
import type { GasTokenPrice } from '../../types/paymaster.js'

export type GetGasTokenPricesParameters = undefined

export type GetGasTokenPricesReturnType = GasTokenPrice[]

export type GetGasTokenPricesErrorType = Error

export async function getGasTokenPrices<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  args: GetGasTokenPricesParameters,
): Promise<GetGasTokenPricesReturnType> {
  const response = await client.request({
    method: 'pm_getGasTokenPrices',
    params: args,
  })
  return response as GetGasTokenPricesReturnType
} 