import type { Call } from '../../strk-types/lib.js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'
import type { TypedData } from '@starknet-io/types-js'

export type BuildTypedDataParameters = {
  userAddress: string
  calls: Call[]
  gasTokenAddress?: string
  maxGasTokenAmount?: string
  accountClassHash?: string
}

export type BuildTypedDataReturnType = TypedData

export type BuildTypedDataErrorType = Error

export async function buildTypedData<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  parameters: BuildTypedDataParameters
): Promise<BuildTypedDataReturnType> {
  const response = await client.request({
    method: 'pm_buildTypedData',
    params: parameters
  })
  return response as BuildTypedDataReturnType
} 