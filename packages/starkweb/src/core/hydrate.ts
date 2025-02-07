import { reconnect } from './actions/reconnect.js'
import type { Config, State } from './createConfig.js'

type HydrateParameters = {
  initialState?: State | undefined
  reconnectOnMount?: boolean | undefined
}

export function hydrate(config: Config, parameters: HydrateParameters) {
  const { initialState, reconnectOnMount } = parameters

  if (initialState && !config._internal.store.persist.hasHydrated())
    config.setState({
      ...initialState,
      connections: reconnectOnMount ? initialState.connections : new Map(),
      status: reconnectOnMount ? 'reconnecting' : 'disconnected',
    })

  return {
    async onMount() {
      if (config._internal.ssr) {
        await config._internal.store.persist.rehydrate()
      }

      if (reconnectOnMount) reconnect(config)
      else if (config.storage)
        // Reset connections that may have been hydrated from storage.
        config.setState((x) => ({
          ...x,
          connections: new Map(),
        }))
    },
  }
}
