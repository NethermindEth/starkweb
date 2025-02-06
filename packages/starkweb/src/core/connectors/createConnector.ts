import type { Emitter } from '../createEmitter.js'
import type { Storage, } from '../createStorage.js'
import type { Evaluate, ExactPartial, Omit } from '../types/utils.js'
import type { AddStarknetChainParameters } from '../exports/chains.js'
import type { ProviderConnectInfo, ProviderMessage } from '../../types/snip1193.js'
import type { Chain } from '../../types/chain.js'
import type { Address, Hex } from '../../types/misc.js'
import type { Client } from '../../clients/createClient.js'

export type ConnectorEventMap = {
  accountsChanged: {
    accounts?: readonly Address[] | undefined
    chainId?: Hex | undefined
  }
  networkChanged: {
    chainId?: Hex | undefined
  }
  change: {
    accounts?: readonly Address[] | undefined
    chainId?: Hex | undefined
  }
  connect: { accounts: readonly Address[]; chainId: Hex }
  disconnect: never
  error: { error: Error }
  message: { type: string; data?: unknown | undefined }
}

export type CreateConnectorFn<
  provider = unknown,
  properties extends Record<string, unknown> = Record<string, unknown>,
  storageItem extends Record<string, unknown> = Record<string, unknown>,
> = (config: {
  chains: readonly Chain[]
  emitter: Emitter<ConnectorEventMap>
  storage?: Evaluate<Storage<storageItem>> | null | undefined
}) => Evaluate<
  {
    readonly icon?: string | undefined
    readonly id: string
    readonly name: string
    readonly supportsSimulation?: boolean | undefined
    readonly type: string

    setup?(): Promise<void>
    connect(
      parameters?:
        | { chainId?: Hex | undefined; isReconnecting?: boolean | undefined }
        | undefined,
    ): Promise<{
      accounts: readonly Address[]
      chainId: Hex
    }>
    disconnect(): Promise<void>
    getAccounts(): Promise<readonly Address[]>
    getChainId(): Promise<Hex>
    getProvider(
      parameters?: { chainId?: Hex | undefined } | undefined,
    ): Promise<provider>
    getClient?(
      parameters?: { chainId?: Hex | undefined } | undefined,
    ): Promise<Client>
    isAuthorized(): Promise<boolean>
    switchChain?(
      parameters: Evaluate<{
        addStarknetChainParameter?:
          | ExactPartial<Omit<AddStarknetChainParameters, 'chain_id'>>
          | undefined
        chainId: Hex
      }>,
    ): Promise<Chain>

    onAccountsChanged(accounts: string[]): void
    onChainChanged(chainId: Hex): void
    onConnect?(connectInfo: ProviderConnectInfo): void
    onDisconnect(error?: Error | undefined): void
    onMessage?(message: ProviderMessage): void
  } & properties
>

export function createConnector<
  provider,
  properties extends Record<string, unknown> = Record<string, unknown>,
  storageItem extends Record<string, unknown> = Record<string, unknown>,
>(createConnectorFn: CreateConnectorFn<provider, properties, storageItem>) {
  return createConnectorFn
}
