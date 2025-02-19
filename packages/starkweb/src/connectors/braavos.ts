import { createConnector } from "../core/connectors/createConnector.js"
import { ChainNotConfiguredError } from "../core/errors/config.js"
import type { Evaluate } from "../core/types/utils.js"
import { ResourceUnavailableRpcError, SwitchChainError } from "../errors/rpc.js"
import type { RpcError } from "../errors/rpc.js"
import { UserRejectedRequestError } from "../errors/rpc.js"
import type { Address, Hex } from "../types/misc.js"
import type { ProviderConnectInfo, SNIP1193Provider } from "../types/snip1193.js"
import '../window/index.js' 
import { ProviderRpcError } from "../errors/rpc.js"
  
  export type BraavosParameters = any
  
  braavos.type = 'braavos' as const
  export function braavos() {

    type Properties = {
      onConnect(connectInfo: ProviderConnectInfo): void
    }
    type StorageItem = { 'braavos.disconnected': true }
    type Provider = WalletProvider
    type WalletProvider = Evaluate<SNIP1193Provider & {
        providers?: WalletProvider[] | undefined
        /** Only exists in MetaMask as of 2022/04/03 */
        _events?: { connect?: (() => void) | undefined } | undefined
        /** Only exists in MetaMask as of 2022/04/03 */
        _state?:
          | {
              accounts?: string[]
              initialized?: boolean
              isConnected?: boolean
              isPermanentlyDisconnected?: boolean
              isUnlocked?: boolean
            }
          | undefined
      }>
  
    return createConnector<Provider, Properties, StorageItem>((config) => ({
      id: 'braavos',
      name: 'Braavos',
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aAogICAgICAgIGQ9Ik02Mi43MDUgMTMuOTExNkM2Mi44MzU5IDE0LjEzMzMgNjIuNjYyMSAxNC40MDcgNjIuNDAzOSAxNC40MDdDNTcuMTgwNyAxNC40MDcgNTIuOTM0OCAxOC41NDI3IDUyLjgzNTEgMjMuNjgxN0M1MS4wNDY1IDIzLjM0NzcgNDkuMTkzMyAyMy4zMjI2IDQ3LjM2MjYgMjMuNjMxMUM0Ny4yMzYxIDE4LjUxNTYgNDMuMDAwOSAxNC40MDcgMzcuNzk0OCAxNC40MDdDMzcuNTM2NSAxNC40MDcgMzcuMzYyNSAxNC4xMzMxIDM3LjQ5MzUgMTMuOTExMkM0MC4wMjE3IDkuNjI4MDkgNDQuNzIwNCA2Ljc1IDUwLjA5OTEgNi43NUM1NS40NzgxIDYuNzUgNjAuMTc2OSA5LjYyODI2IDYyLjcwNSAxMy45MTE2WiIKICAgICAgICBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMzcyXzQwMjU5KSIgLz4KICAgIDxwYXRoCiAgICAgICAgZD0iTTc4Ljc2MDYgNDUuODcxOEM4MC4yNzI1IDQ2LjMyOTcgODEuNzAyNSA0NS4wMDU1IDgxLjE3MTQgNDMuNTIyMkM3Ni40MTM3IDMwLjIzMzQgNjEuMzkxMSAyNC44MDM5IDUwLjAyNzcgMjQuODAzOUMzOC42NDQyIDI0LjgwMzkgMjMuMjg2OCAzMC40MDcgMTguODc1NCA0My41OTEyQzE4LjM4MjQgNDUuMDY0NSAxOS44MDgzIDQ2LjM0NDYgMjEuMjk3OCA0NS44ODgxTDQ4Ljg3MiAzNy40MzgxQzQ5LjUzMzEgMzcuMjM1NSA1MC4yMzk5IDM3LjIzNDQgNTAuOTAxNyAzNy40MzQ4TDc4Ljc2MDYgNDUuODcxOFoiCiAgICAgICAgZmlsbD0idXJsKCNwYWludDFfbGluZWFyXzM3Ml80MDI1OSkiIC8+CiAgICA8cGF0aAogICAgICAgIGQ9Ik0xOC44MTMyIDQ4LjE3MDdMNDguODkzNSAzOS4wNDcyQzQ5LjU1MDYgMzguODQ3OCA1MC4yNTI0IDM4Ljg0NzMgNTAuOTA5OCAzOS4wNDU2TDgxLjE3ODEgNDguMTc1MkM4My42OTEyIDQ4LjkzMzIgODUuNDExIDUxLjI0ODMgODUuNDExIDUzLjg3MzVWODEuMjIzM0M4NS4yOTQ0IDg3Ljg5OTEgNzkuMjk3NyA5My4yNSA3Mi42MjQ1IDkzLjI1SDYxLjU0MDZDNjAuNDQ0OSA5My4yNSA1OS41NTc3IDkyLjM2MzcgNTkuNTU3NyA5MS4yNjhWODEuNjc4OUM1OS41NTc3IDc3LjkwMzEgNjEuNzkyMSA3NC40ODU1IDY1LjI0OTggNzIuOTcyOUM2OS44ODQ5IDcwLjk0NTQgNzUuMzY4MSA2OC4yMDI4IDc2LjM5OTQgNjIuNjk5MkM3Ni43MzIzIDYwLjkyMjkgNzUuNTc0MSA1OS4yMDk0IDczLjgwMjQgNTguODU3M0M2OS4zMjI2IDU3Ljk2NjcgNjQuMzU2MiA1OC4zMTA3IDYwLjE1NjQgNjAuMTg5M0M1NS4zODg3IDYyLjMyMTkgNTQuMTQxNSA2NS44Njk0IDUzLjY3OTcgNzAuNjMzN0w1My4xMjAxIDc1Ljc2NjJDNTIuOTQ5MSA3Ny4zMzQ5IDUxLjQ3ODUgNzguNTM2NiA0OS45MDE0IDc4LjUzNjZDNDguMjY5OSA3OC41MzY2IDQ3LjA0NjUgNzcuMjk0IDQ2Ljg2OTYgNzUuNjcxMkw0Ni4zMjA0IDcwLjYzMzdDNDUuOTI0OSA2Ni41NTI5IDQ1LjIwNzkgNjIuNTg4NyA0MC45ODk1IDYwLjcwMThDMzYuMTc3NiA1OC41NDk0IDMxLjM0MTkgNTcuODM0NyAyNi4xOTc2IDU4Ljg1NzNDMjQuNDI2IDU5LjIwOTQgMjMuMjY3OCA2MC45MjI5IDIzLjYwMDcgNjIuNjk5MkMyNC42NDEgNjguMjUwNyAzMC4wODEyIDcwLjkzMDUgMzQuNzUwMyA3Mi45NzI5QzM4LjIwOCA3NC40ODU1IDQwLjQ0MjQgNzcuOTAzMSA0MC40NDI0IDgxLjY3ODlWOTEuMjY2M0M0MC40NDI0IDkyLjM2MiAzOS41NTU1IDkzLjI1IDM4LjQ1OTkgOTMuMjVIMjcuMzc1NkMyMC43MDI0IDkzLjI1IDE0LjcwNTcgODcuODk5MSAxNC41ODkxIDgxLjIyMzNWNTMuODY2M0MxNC41ODkxIDUxLjI0NDYgMTYuMzA0NSA0OC45MzE2IDE4LjgxMzIgNDguMTcwN1oiCiAgICAgICAgZmlsbD0idXJsKCNwYWludDJfbGluZWFyXzM3Ml80MDI1OSkiIC8+CiAgICA8ZGVmcz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMzcyXzQwMjU5IiB4MT0iNDkuMzA1NyIgeTE9IjIuMDc5IiB4Mj0iODAuMzYyNyIgeTI9IjkzLjY1OTciCiAgICAgICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0Y1RDQ1RSIgLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY5NjAwIiAvPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDFfbGluZWFyXzM3Ml80MDI1OSIgeDE9IjQ5LjMwNTciIHkxPSIyLjA3OSIgeDI9IjgwLjM2MjciIHkyPSI5My42NTk3IgogICAgICAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGNUQ0NUUiIC8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGOTYwMCIgLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQyX2xpbmVhcl8zNzJfNDAyNTkiIHgxPSI0OS4zMDU3IiB5MT0iMi4wNzkiIHgyPSI4MC4zNjI3IiB5Mj0iOTMuNjU5NyIKICAgICAgICAgICAgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRjVENDVFIiAvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRjk2MDAiIC8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDwvZGVmcz4KPC9zdmc+",
      type: braavos.type,
      async setup() {
        if (typeof window === 'undefined') return
        if (typeof window.starknet_braavos !== 'object') return
        const provider = await this.getProvider()
        await config.storage?.setItem('braavos.disconnected', true)
        if (provider && window.starknet_braavos?.isConnected) {
          this.onConnect.bind(this)
          provider.on('accountsChanged', this.onAccountsChanged.bind(this))
          provider.on('networkChanged', this.onChainChanged.bind(this))
        }
      },
      async connect({ chainId, isReconnecting } = {}) {
        const provider = await this.getProvider()
  
        let accounts: readonly Address[] = []
        if (isReconnecting) accounts = await this.getAccounts().catch(() => [])
  
        try {
          if (!accounts?.length) {
            const requestedAccounts = (await provider.request({
                type: 'wallet_requestAccounts',
                params: {}
            })) as string[]
            accounts = requestedAccounts.map((x) => getStarknetAddress(x))
          }

          provider.on(
            'accountsChanged',
            this.onAccountsChanged.bind(this),
          )
          provider.on('networkChanged', this.onChainChanged.bind(this))
  
          // Switch to chain if provided
          let currentChainId = (await this.getChainId())
          if (chainId && currentChainId !== chainId) {
            const chain = await this.switchChain!({ chainId }).catch((error) => {
              if (error.code === UserRejectedRequestError.code) throw error
              return { chain_id: currentChainId }
            })
            currentChainId = chain?.chain_id ?? currentChainId
          }
  
          await config.storage?.removeItem('braavos.disconnected')
  
          return { accounts, chainId: currentChainId }
        } catch (err) {
          const error = err as RpcError
          if (error.code === UserRejectedRequestError.code)
            throw new UserRejectedRequestError(error)
          if (error.code === ResourceUnavailableRpcError.code)
            throw new ResourceUnavailableRpcError(error)
          throw error
        }
      },
      async disconnect() {
        config.emitter.emit('disconnect')
        config.emitter.emit('accountsChanged', { accounts: [], chainId: undefined })
        await config.storage?.setItem('braavos.disconnected', true)
      },
      async getAccounts() {
        try {
          const provider = await this.getProvider()
          const accounts = (await provider.request({
            type: 'wallet_requestAccounts',
            params: {}
          })) as string[]
          return accounts.map((x) => getStarknetAddress(x))
        } catch (error) {
          throw new ProviderRpcError(
            error as Error,
            {
              shortMessage: 'Failed to retrieve accounts',
              code: (error as RpcError).code || -32000
            }
          )
        }
      },
      async getChainId() {
        const provider = await this.getProvider()
        const chainId = await provider.request({ type: 'wallet_requestChainId', params: {} })
        return chainId
      },
      async getProvider() {
        if (typeof window === 'undefined') {
          return undefined
        }
        const provider = (window as any).starknet_braavos
        if (!provider || typeof provider.request !== 'function') {
          throw new Error('Braavos provider not found')
        }
        return provider
      },
      async isAuthorized() {
        try {
          const isDisconnected =
            // If shim exists in storage, connector is disconnected
            await config.storage?.getItem('braavos.disconnected')
          if (isDisconnected) return false
  
          const accounts = await this.getAccounts()
          return !!accounts.length
        } catch {
          return false
        }
      },
      async switchChain({ chainId}) {
        const provider = await this.getProvider()
        const chain = config.chains.find((x: { chain_id: Hex }) => x.chain_id === chainId)
        if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())
  
        try {
          await Promise.all([
            provider.request({
              type: 'wallet_switchStarknetChain',
              params: { chainId, api_version: undefined },
            }),
            new Promise<void>((resolve) =>
              config.emitter.once('networkChanged', ({ chainId: currentChainId }) => {
                if (currentChainId === chainId) resolve()
              }),
            ),
          ])
          return chain
        } catch (err) {
          const error = err as RpcError
          if (error.code === UserRejectedRequestError.code)
            throw new UserRejectedRequestError(error)
          throw new SwitchChainError(error)
        }
      },
      async onAccountsChanged(accounts) {
        if (accounts.length === 0) {
          config.emitter.emit('accountsChanged', { accounts: [], chainId: undefined })
          await this.disconnect()
        }
      },
      async onChainChanged(chain) {
        const chainId = chain
        config.emitter.emit('networkChanged', { chainId })
        config.emitter.emit('change', { chainId })
      },
      async onConnect(connectInfo) {
        const accounts = await this.getAccounts()
        if (accounts.length === 0) return
  
        const chainId = connectInfo.chainId as Hex
        config.emitter.emit('accountsChanged', { accounts, chainId })
  
        const provider = await this.getProvider()
        if (provider) {
          provider.on('accountsChanged', this.onAccountsChanged.bind(this) as any)
          provider.on('networkChanged', this.onChainChanged as any)
          provider.on('disconnect', this.onDisconnect.bind(this) as any)
        }
      },
      async onDisconnect(error) {
        const provider = await this.getProvider()
  
        // If MetaMask emits a `code: 1013` error, wait for reconnection before disconnecting
        // https://github.com/MetaMask/providers/pull/120
        if (error && (error as RpcError<1013>).code === 1013) {
          if (provider && !!(await this.getAccounts()).length) return
        }
  
        try {
          if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('Braavos_cached_address')
            localStorage.removeItem('Braavos_cached_chainId')
          }
        } catch (storageError) {
          console.error('LocalStorage access error:', storageError)
        }
  
        // No need to remove 'metaMaskSDK.disconnected' from storage because `onDisconnect` is typically
        // only called when the wallet is disconnected through the wallet's interface, meaning the wallet
        // actually disconnected and we don't need to simulate it.
        config.emitter.emit('accountsChanged', {
          accounts: [],
          chainId: undefined
        })
  
        if (provider) {
          provider.removeListener(
            'accountsChanged',
            this.onAccountsChanged.bind(this),
          )
          provider.removeListener('networkChanged', this.onChainChanged.bind(this))
        }
      },
    }))
  }

function getStarknetAddress(x: string): any {
  return x as Address
}
  