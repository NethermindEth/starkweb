import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'
import type { GaslessCompatibility } from '../../types/paymaster.js'
import type { ADDRESS } from '../../types/components.js'
export type CheckAccountCompatibilityParameters = {
  accountAddress: ADDRESS
}

export type CheckAccountCompatibilityReturnType = GaslessCompatibility

export type CheckAccountCompatibilityErrorType = Error

export async function checkAccountCompatibility<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  { accountAddress }: CheckAccountCompatibilityParameters
): Promise<CheckAccountCompatibilityReturnType> {
  const response = await client.request({
    method: 'pm_checkAccountCompatibility',
    params: { accountAddress }
  })
  return response as CheckAccountCompatibilityReturnType
} 