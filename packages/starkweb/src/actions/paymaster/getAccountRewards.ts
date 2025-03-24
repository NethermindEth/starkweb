import type { PaymasterReward } from '../../types/paymaster.js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'
import type { ADDRESS } from '../../types/components.js'

export type GetAccountRewardsParameters = {
  accountAddress: ADDRESS
}

export type GetAccountRewardsReturnType = PaymasterReward[]

export type GetAccountRewardsErrorType = Error

export async function getAccountRewards<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  { accountAddress }: GetAccountRewardsParameters
): Promise<GetAccountRewardsReturnType> {
  const response = await client.request({
    method: 'pm_getAccountRewards',
    params: { accountAddress }
  })
  return response as GetAccountRewardsReturnType
} 