import type { Address } from 'abitype'
import type { Account, ParseAccount } from '../types/account.js'
import type { Chain } from '../types/chain.js'
import type { RpcSchema } from '../types/eip1193.js'
import type { Prettify } from '../types/utils.js'
import {
  type Client,
  type ClientConfig,
  createClient,
  type CreateClientErrorType,
} from './createClient.js'
import { type PaymasterActions, paymasterActions } from './decorators/paymaster.js'
import type { Transport } from './transports/createTransport.js'
import type { ErrorType } from '../errors/utils.js'

export type PaymasterClientConfig<
  transport extends Transport,
  chain extends Chain,
  accountOrAddress extends Account | Address | undefined = undefined,
  rpcSchema extends RpcSchema | undefined = undefined,
> = ClientConfig<transport, chain, accountOrAddress, rpcSchema>

export type PaymasterClient<
  transport extends Transport,
  chain extends Chain,
  accountOrAddress extends Account | Address | undefined = undefined,
  rpcSchema extends RpcSchema | undefined = undefined,
> = Client<transport, chain, ParseAccount<accountOrAddress>, rpcSchema, PaymasterActions>

export type CreatePaymasterClientErrorType = CreateClientErrorType | ErrorType

export function createPaymasterClient<
  transport extends Transport,
  chain extends Chain,
  accountOrAddress extends Account | Address | undefined = undefined,
  rpcSchema extends RpcSchema | undefined = undefined,
>(
  parameters: PaymasterClientConfig<transport, chain, accountOrAddress, rpcSchema>,
): Prettify<
  Client<transport, chain, ParseAccount<accountOrAddress>, rpcSchema, PaymasterActions>
> {
  const { key = 'paymaster', name = 'Paymaster Client' } = parameters
  const client = createClient({
    ...parameters,
    key,
    name,
    type: 'paymasterClient',
  })
  return client.extend(paymasterActions) as Prettify<
    Client<transport, chain, ParseAccount<accountOrAddress>, rpcSchema, PaymasterActions>
  >
}