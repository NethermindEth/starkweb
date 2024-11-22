import { createConnector } from "../core/connectors/createConnector.js"
import { ChainNotConfiguredError } from "../core/errors/config.js"
import type { Evaluate } from "../core/types/utils.js"
import { ResourceUnavailableRpcError, SwitchChainError } from "../errors/rpc.js"
import type { RpcError } from "../errors/rpc.js"
import { UserRejectedRequestError } from "../errors/rpc.js"
import type { Address, Hex } from "../types/misc.js"
import type { ProviderConnectInfo, SNIP1193Provider } from "../types/snip1193.js"
import '../window/index.js' 


  export  type ArgentXParameters = any
  
  argentX.type = 'argentX' as const
  export function argentX() {

    type Properties = {
      onConnect(connectInfo: ProviderConnectInfo): void
    }
    type StorageItem = { 'argentX.disconnected': true }
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
      id: 'argentX',
      name: 'Argent X',
      type: argentX.type,
       icon: "data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjQwIiBoZWlnaHQ9IjM2IiB2aWV3Qm94PSIwIDAgNDAgMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNC43NTgyIC0zLjk3MzY0ZS0wN0gxNC42MjM4QzE0LjI4NTEgLTMuOTczNjRlLTA3IDE0LjAxMzggMC4yODExNzggMTQuMDA2NCAwLjYzMDY4M0MxMy44MDE3IDEwLjQ1NDkgOC44MjIzNCAxOS43NzkyIDAuMjUxODkzIDI2LjM4MzdDLTAuMDIwMjA0NiAyNi41OTMzIC0wLjA4MjE5NDYgMjYuOTg3MiAwLjExNjczNCAyNy4yNzA5TDYuMDQ2MjMgMzUuNzM0QzYuMjQ3OTYgMzYuMDIyIDYuNjQwOTkgMzYuMDg3IDYuOTE3NjYgMzUuODc1NEMxMi4yNzY1IDMxLjc3MjggMTYuNTg2OSAyNi44MjM2IDE5LjY5MSAyMS4zMzhDMjIuNzk1MSAyNi44MjM2IDI3LjEwNTcgMzEuNzcyOCAzMi40NjQ2IDM1Ljg3NTRDMzIuNzQxIDM2LjA4NyAzMy4xMzQxIDM2LjAyMiAzMy4zMzYxIDM1LjczNEwzOS4yNjU2IDI3LjI3MDlDMzkuNDY0MiAyNi45ODcyIDM5LjQwMjIgMjYuNTkzMyAzOS4xMzA0IDI2LjM4MzdDMzAuNTU5NyAxOS43NzkyIDI1LjU4MDQgMTAuNDU0OSAyNS4zNzU5IDAuNjMwNjgzQzI1LjM2ODUgMC4yODExNzggMjUuMDk2OSAtMy45NzM2NGUtMDcgMjQuNzU4MiAtMy45NzM2NGUtMDdaIiBmaWxsPSIjRkY4NzVCIi8+Cjwvc3ZnPgo=",
      async setup() {
        if (typeof window === 'undefined') {
          return
        }
        const provider = await this.getProvider()
        if (provider) {
          this.onConnect.bind(this)
          provider.on('accountsChanged', this.onAccountsChanged.bind(this))
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
          provider.on('networkChanged', this.onChainChanged)
          // Switch to chain if provided
          let currentChainId = (await this.getChainId())

          if (chainId && currentChainId !== chainId) {
            const chain = await this.switchChain!({ chainId }).catch((error) => {
              if (error.code === UserRejectedRequestError.code) throw error
              return { chain_id: currentChainId }
            })
            currentChainId = chain?.chain_id ?? currentChainId
          }
  
          await config.storage?.removeItem('argentX.disconnected')
  
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
        await config.storage?.setItem('argentX.disconnected', true)
      },
      async getAccounts() {
        const provider = await this.getProvider()
        const accounts = (await provider.request({
          type: 'wallet_requestAccounts',
          params: {}
        })) as string[]
        return accounts.map((x) => getStarknetAddress(x))
      },
      async getChainId() {
        const provider = await this.getProvider()
        const chainId = await provider.request({ type: 'wallet_requestChainId', params: {} }) as Hex
        return chainId
      },
      async getProvider() {
        if (typeof window === 'undefined') {
          return undefined
        }
        
        // Get provider from window object
        const provider = (window as any).starknet_argentX
        
        // Ensure provider exists and has required methods
        if (!provider || typeof provider.request !== 'function') {
          throw new Error('Argent X provider not found')
        }

        return provider
      },
      async isAuthorized() {
        try {
          const isDisconnected =
            // If shim exists in storage, connector is disconnected
            await config.storage?.getItem('argentX.disconnected')
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
              config.emitter.once('change', ({ chainId: currentChainId }) => {
                if (currentChainId === chainId){
                  resolve()
                }
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
        // Disconnect if there are no accounts
        if (accounts.length === 0) this.onDisconnect()
        // Connect if emitter is listening for connect event (e.g. is disconnected and connects through wallet interface)
        else if (config.emitter.listenerCount('accountsChanged')) {
          const chainId = (await this.getChainId()) as Hex
          this.onConnect({ chainId })
          await config.storage?.removeItem('argentX.disconnected')
        }
        // Regular change event
        else{
          const chainId = (await this.getChainId()) as Hex
          config.emitter.emit('accountsChanged', {
            accounts: accounts.map((x) => getStarknetAddress(x)),
            chainId
          })
        }
      },
      onChainChanged(chain) {
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
  
        // Remove cached SDK properties.
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('ArgentX_cached_address')
          localStorage.removeItem('ArgentX_cached_chainId')
        }
  
        // No need to remove 'metaMaskSDK.disconnected' from storage because `onDisconnect` is typically
        // only called when the wallet is disconnected through the wallet's interface, meaning the wallet
        // actually disconnected and we don't need to simulate it.
        config.emitter.emit('accountsChanged', {
          accounts: [],
          chainId: undefined
        })

        provider.on('accountsChanged', this.onAccountsChanged.bind(this) as any)
        this.disconnect()
      },
    }))
  }

function getStarknetAddress(x: string): any {
  return x as Address
}