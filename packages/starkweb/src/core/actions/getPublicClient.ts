import { publicActions } from '../../clients/decorators/public.js'
import type { PublicClient } from '../../clients/createPublicClient.js'
import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import { getClient } from './getClient.js'
import type { Chain } from '../../types/chain.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Client } from '../../clients/createClient.js'

export type GetPublicClientParameters = ChainIdParameter

export type GetPublicClientReturnType = PublicClient<Transport, Chain>

export function getPublicClient(
  config: Config,
  parameters: GetPublicClientParameters = {},
): GetPublicClientReturnType {
  const client = {
    ...getClient(config, parameters),
    account: undefined
  } as Client<Transport, Chain>
  return client.extend(publicActions)
}
