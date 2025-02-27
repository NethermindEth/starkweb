import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'
import type { API_VERSION, PERMISSION } from '../../types/components.js'
import type { UnexpectedErrorType } from '../../errors/starkerror.js'
import type { API_VERSION_NOT_SUPPORTED } from '@starknet-io/types-js'

export type GetPermissionsParameters = {
  api_version?: API_VERSION
}

export type GetPermissionsReturnType = {
  result: PERMISSION[] | []
}

export type GetPermissionsErrorType = UnexpectedErrorType| API_VERSION_NOT_SUPPORTED

export async function getPermissions<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  { api_version }: GetPermissionsParameters,
): Promise<GetPermissionsReturnType | GetPermissionsErrorType> {
  return await client.request({
    method: 'wallet_getPermissions',
    params: api_version ? { api_version } : undefined,
  })
}
