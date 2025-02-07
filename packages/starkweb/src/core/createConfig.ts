import {
  createStore as createMipd,
  type Store as MipdStore,
} from 'mipd';
import {
  persist,
  subscribeWithSelector,
} from 'zustand/middleware';
import {
  createStore,
  type Mutate,
  type StoreApi,
} from 'zustand/vanilla';

import type {
  ClientConfig as strkjs_ClientConfig,
} from '../clients/createClient.js';
import {
  type Client,
  createClient,
} from '../clients/createClient.js';
import type {
  Transport as strkjs_Transport,
} from '../clients/transports/createTransport.js';
import type { Chain } from '../types/chain.js';
import type {
  Address,
  Hex,
} from '../types/misc.js';
import { stringToHex } from '../utils/index.js';
import { version } from '../version.js';
import type {
  ConnectorEventMap,
  CreateConnectorFn,
} from './connectors/createConnector.js';
import {
  createEmitter,
  type Emitter,
  type EventData,
} from './createEmitter.js';
import {
  createStorage,
  noopStorage,
  type Storage,
} from './createStorage.js';
import { ChainNotConfiguredError } from './errors/config.js';
import type {
  Evaluate,
  ExactPartial,
  LooseOmit,
  OneOf,
} from './types/utils.js';
import { uid } from './utils/uid.js';

export type CreateConfigParameters<
  chains extends readonly [Chain, ...Chain[]] = readonly [Chain, ...Chain[]],
  transports extends Record<chains[number]['chain_id'], Transport> = Record<
    chains[number]['chain_id'],
    Transport
  >,
> = Evaluate<
  {
    chains: chains
    connectors?: CreateConnectorFn[] | undefined
    multiInjectedProviderDiscovery?: boolean | undefined
    storage?: Storage | null | undefined
    ssr?: boolean | undefined
    syncConnectedChain?: boolean | undefined
  } & OneOf<
    | ({ transports: transports } & {
        [key in keyof ClientConfig]?:
          | ClientConfig[key]
          | { [_ in chains[number]['id']]?: ClientConfig[key] | undefined }
          | undefined
      })
    | {
        client(parameters: { chain: chains[number] }): Client<
          transports[chains[number]['chain_id']],
          chains[number]
        >
      }
  >
>

export function createConfig<
  chains extends readonly [Chain, ...Chain[]],
  transports extends Record<chains[number]['chain_id'], Transport>,
>(
  parameters: CreateConfigParameters<chains, transports>,
): Config<chains, transports> {
  const {
    multiInjectedProviderDiscovery = true,
    storage = createStorage({
      storage:
        typeof window !== 'undefined' && window.localStorage
          ? window.localStorage
          : noopStorage,
    }),
    syncConnectedChain = true,
    ssr,
    ...rest
  } = parameters

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Set up connectors, clients, etc.
  /////////////////////////////////////////////////////////////////////////////////////////////////

  const mipd =
    typeof window !== 'undefined' && multiInjectedProviderDiscovery
      ? createMipd()
      : undefined

  const chains = createStore(() => rest.chains)
  const connectors = createStore(() =>
    [
      ...(rest.connectors ?? []),
    ].map(setup),
  )
  function setup(connectorFn: CreateConnectorFn): Connector {
    // Only run setup on client-side
    if (typeof window === 'undefined') {
      return {} as Connector; // Return empty connector for SSR
    }

    const emitter = createEmitter<ConnectorEventMap>(uid())
    const connector = {
      ...connectorFn({ 
        emitter, 
        chains: chains.getState() as readonly [Chain, ...Chain[]],
        storage 
      }),
      emitter,
      uid: emitter.uid,
    }

    emitter.on('connect', connect)
    connector.setup?.()

    return connector
  }

  const clients = new Map<Hex, Client<Transport, chains[number]>>()
  // function getClient(
  function getClient(
    parameters?: { chainId?: Hex | undefined },
  ): Client<Transport, Extract<chains[number], { chain_id: Hex}>> {
    const chainId = parameters?.chainId ?? store.getState().chainId
    const chain = chains.getState().find((x) => x.chain_id === chainId)

    // chainId specified and not configured
    if (parameters?.chainId && !chain) throw new ChainNotConfiguredError()

    // If the target chain is not configured, use the client of the current chain.
    type Return = Client<Transport, Extract<chains[number], { chain_id: Hex }>>
    {
      const client = clients.get(chainId)
      if (client && !chain) return client as Return
      if (!chain) throw new ChainNotConfiguredError()
    }

    // If a memoized client exists for a chain id, use that.
    {
      const client = clients.get(chainId)
      if (client) return client as Return
    }

    let client: Client<Transport, chains[number]>
    if (rest.client) client = rest.client({ chain })
    else {
      const chainId = chain.chain_id
      const chainIds = chains.getState().map((x) => x.chain_id)
      // Grab all properties off `rest` and resolve for use in `createClient`
      const properties: Partial<strkjs_ClientConfig> = {}
      const entries = Object.entries(rest) as [keyof typeof rest, any][]

      for (const [key, value] of entries) {
        if (
          key === 'chains' ||
          key === 'client' ||
          key === 'connectors' ||
          key === 'transports'
        )
          continue

        if (typeof value === 'object') {
          // check if value is chainId-specific since some values can be objects
          // e.g. { batch: { multicall: { batchSize: 1024 } } }
          if (chainId in value) properties[key] = value[chainId]
          else {
            // check if value is chainId-specific, but does not have value for current chainId
            const hasChainSpecificValue = chainIds.some((x) => x in value)
            if (hasChainSpecificValue) continue
            properties[key] = value
          }
        } else properties[key] = value
      }

      client = createClient({
        ...properties,
        chain,
        batch: properties.batch ?? { multicall: true },
        transport: (parameters) =>
          rest.transports[chainId as keyof typeof rest.transports]({ ...parameters, connectors }),
      })
    }

    clients.set(chainId, client)
    return client as Return
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Create store
  /////////////////////////////////////////////////////////////////////////////////////////////////

  function getInitialState() {
    return {
      chainId: chains.getState()[0].chain_id,
      connections: new Map<string, Connection>(),
      current: null,
      status: 'disconnected',
    } satisfies State
  }

  let currentVersion: number
  const prefix = '0.0.0-canary-'
  if (version.startsWith(prefix))
    currentVersion = Number.parseInt(version.replace(prefix, ''))
  else currentVersion = Number.parseInt(version.split('.')[0] ?? '0')

  const store = createStore(
    subscribeWithSelector(
      // only use persist middleware if storage exists
      storage
        ? persist(getInitialState, {
            migrate(persistedState, version) {
              if (version === currentVersion) return persistedState as State

              const initialState = getInitialState()
              const chainId =
                persistedState &&
                typeof persistedState === 'object' &&
                'chainId' in persistedState &&
                typeof persistedState.chainId === 'string'
                  ? stringToHex(persistedState.chainId)
                  : initialState.chainId
              return { ...initialState, chainId }
            },
            name: 'store',
            partialize(state) {
              // Only persist "critical" store properties to preserve storage size.
              return {
                connections: {
                  __type: 'Map',
                  value: Array.from(state.connections.entries()).map(
                    ([key, connection]) => {
                      const { chain_id, id, name, type, uid } = connection.connector
                      const connector = { chain_id, id, name, type, uid }
                      return [key, { ...connection, connector }]
                    },
                  ),
                } as unknown as PartializedState['connections'],
                chainId: state.chainId,
                current: state.current,
              } satisfies PartializedState
            },
            skipHydration: ssr,
            storage: storage as Storage<Record<string, unknown>>,
            version: currentVersion,
          })
        : getInitialState,
    ),
  )

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Subscribe to changes
  /////////////////////////////////////////////////////////////////////////////////////////////////

  // Update default chain when connector chain changes
  if (syncConnectedChain)
    store.subscribe(
      ({ connections, current }) =>
        current ? connections.get(current)?.chainId : undefined,
      (chainId) => {
        // If chain is not configured, then don't switch over to it.
        const isChainConfigured = chains
          .getState()
            .some((x) => x.chain_id === chainId)
        if (!isChainConfigured) return

        return store.setState((x) => ({
          ...x,
          chainId: chainId,
        }))
      },
    )


  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Emitter listeners
  /////////////////////////////////////////////////////////////////////////////////////////////////

  function change(data: EventData<ConnectorEventMap, 'change'>) {
    store.setState((x) => {
      const connection = x.connections.get(data.uid)
      if (!connection) return x
      return {
        ...x,
        connections: new Map(x.connections).set(data.uid, {
          accounts:
            (data.accounts as readonly [Address, ...Address[]]) ??
            connection.accounts,
          chainId: data.chainId ?? connection.chainId,
          connector: connection.connector,
        }),
      }
    })
  }
  function connect(data: EventData<ConnectorEventMap, 'connect'>) {
    // Disable handling if reconnecting/connecting
    if (
      store.getState().status === 'connecting' ||
      store.getState().status === 'reconnecting'
    )
      return

    store.setState((x) => {
      const connector = connectors.getState().find((x) => x.uid === data.uid)
      if (!connector) return x

      if (connector.emitter.listenerCount('connect'))
        connector.emitter.off('connect', change)
      if (!connector.emitter.listenerCount('change'))
        connector.emitter.on('change', change)
      if (!connector.emitter.listenerCount('disconnect'))
        connector.emitter.on('disconnect', disconnect)

      return {
        ...x,
        connections: new Map(x.connections).set(data.uid, {
          accounts: data.accounts as readonly [Address, ...Address[]],
          chainId: data.chainId,
          connector: connector,
        }),
        current: data.uid,
        status: 'connected',
      }
    })
  }
  function disconnect(data: EventData<ConnectorEventMap, 'disconnect'>) {
    store.setState((x) => {
      const connection = x.connections.get(data.uid)
      if (connection) {
        const connector = connection.connector
        if (connector.emitter.listenerCount('change'))
          connection.connector.emitter.off('change', change)
        if (connector.emitter.listenerCount('disconnect'))
          connection.connector.emitter.off('disconnect', disconnect)
        if (!connector.emitter.listenerCount('connect'))
          connection.connector.emitter.on('connect', connect)
      }

      x.connections.delete(data.uid)

      if (x.connections.size === 0)
        return {
          ...x,
          connections: new Map(),
          current: null,
          status: 'disconnected',
        }

      const nextConnection = x.connections.values().next().value as Connection
      return {
        ...x,
        connections: new Map(x.connections),
        current: nextConnection.connector.uid,
      }
    })
  }

  return {
    get chains() {
      return chains.getState() as chains
    },
    get connectors() {
      return connectors.getState()
    },
    storage,

    getClient,
    get state() {
      return store.getState() as unknown as State
    },
    setState(value) {
      let newState: State
      if (typeof value === 'function') newState = value(store.getState() as any)
      else newState = value

      // Reset state if it got set to something not matching the base state
      const initialState = getInitialState()
      if (typeof newState !== 'object') newState = initialState
      const isCorrupt = Object.keys(initialState).some((x) => !(x in newState))
      if (isCorrupt) newState = initialState

      store.setState(newState, true)
    },
    subscribe(selector, listener, options) {
      return store.subscribe(
        selector as unknown as (state: State) => any,
        listener,
        options
          ? { ...options, fireImmediately: options.emitImmediately }
          : undefined,
      )
    },

    _internal: {
      mipd,
      store,
      ssr: Boolean(ssr),
      syncConnectedChain,
      transports: rest.transports as transports,
      chains: {
        setState(value) {
          const nextChains = (
            typeof value === 'function' ? value(chains.getState()) : value
          ) as chains
          if (nextChains.length === 0) return
          return chains.setState(nextChains, true)
        },
        subscribe(listener) {
          return chains.subscribe(listener)
        },
      },
      connectors: {
        setup,
        setState(value) {
          return connectors.setState(
            typeof value === 'function' ? value(connectors.getState()) : value,
            true,
          )
        },
        subscribe(listener) {
          return connectors.subscribe(listener)
        },
      },
      events: { change, connect, disconnect },
    },
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// Types
/////////////////////////////////////////////////////////////////////////////////////////////////

export type Config<
  chains extends readonly Chain[] = readonly Chain[],
  transports extends Record<chains[number]['chain_id'], Transport> = Record<
    chains[number]['chain_id'],
    Transport
  >,
> = {
  readonly chains: chains
  readonly connectors: readonly Connector[]
  readonly storage: Storage | null

  readonly state: State
  setState(
    value: State | ((state: State) => State),
  ): void
  subscribe<state>(
    selector: (state: State) => state,
    listener: (state: state, previousState: state) => void,
    options?:
      | {
          emitImmediately?: boolean | undefined
          equalityFn?: ((a: state, b: state) => boolean) | undefined
        }
      | undefined,
  ): () => void

  getClient(parameters?: {
    chainId?: Hex | undefined
  }): Client<
    transports[chains[number]['chain_id']],
    Extract<chains[number], { chain_id: Hex }>
  >

  /**
   * Not part of versioned API, proceed with caution.
   * @internal
   */
  _internal: {
    readonly mipd: MipdStore | undefined
    readonly store: Mutate<StoreApi<any>, [['zustand/persist', any]]>
    readonly ssr: boolean
    readonly syncConnectedChain: boolean
    readonly transports: transports

    chains: {
      setState(
        value:
          | readonly Chain[]
          | ((
              state: readonly Chain[],
            ) => readonly Chain[]),
      ): void
      subscribe(
        listener: (
          state: readonly Chain[],
          prevState: readonly Chain[],
        ) => void,
      ): () => void
    }
    connectors: {
      setup(connectorFn: CreateConnectorFn): Connector
      setState(value: Connector[] | ((state: Connector[]) => Connector[])): void
      subscribe(
        listener: (state: Connector[], prevState: Connector[]) => void,
      ): () => void
    }
    events: {
      change(data: EventData<ConnectorEventMap, 'change'>): void
      connect(data: EventData<ConnectorEventMap, 'connect'>): void
      disconnect(data: EventData<ConnectorEventMap, 'disconnect'>): void
    }
  }
}

export type State = {
  chainId: Hex
  connections: Map<string, Connection>
  current: string | null
  status: 'connected' | 'connecting' | 'disconnected' | 'reconnecting'
}

export type PartializedState = Evaluate<
  ExactPartial<Pick<State, 'chainId' | 'connections' | 'current' | 'status'>>
>

export type Connection = {
  accounts: readonly [Address, ...Address[]]
  chainId: Hex
  connector: Connector
}

export type Connector = ReturnType<CreateConnectorFn> & {
  emitter: Emitter<ConnectorEventMap>
  uid: string
}

export type Transport = (
  params: Parameters<strkjs_Transport>[0] & {
    connectors?: StoreApi<Connector[]>
  },
) => ReturnType<strkjs_Transport>

type ClientConfig = LooseOmit<
  strkjs_ClientConfig,
  'account' | 'chain' | 'key' | 'name' | 'transport' | 'type'
>
