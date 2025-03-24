

import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { Chain } from '../../types/chain.js';
import type { GaslessStatus } from '../../types/paymaster.js';

export type GetPaymasterStatusParameters = undefined
export type GetPaymasterStatusReturnType = GaslessStatus
export type GetPaymasterStatusErrorType = any

export async function getPaymasterStatus<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  args: GetPaymasterStatusParameters,
): Promise<GetPaymasterStatusReturnType> {
  const result = await client.request({
    method: 'pm_getPaymasterStatus',
    params: args,
  })
  return result
}
