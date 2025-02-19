import { createConnector } from "../core/connectors/createConnector.js"
import { ChainNotConfiguredError } from "../core/errors/config.js"
import { ResourceUnavailableRpcError, SwitchChainError } from "../errors/rpc.js"
import type { RpcError } from "../errors/rpc.js"
import { UserRejectedRequestError } from "../errors/rpc.js"
import type { Address, Hex } from "../types/misc.js"
import type { ProviderConnectInfo, SNIP1193Provider } from "../types/snip1193.js"
import '../window/index.js' 
import { ProviderRpcError } from "../errors/rpc.js"
import { ProviderNotFoundError } from "../core/errors/connector.js"
import { injectMetamaskBridge } from './metamask-bridge.js'


  export  type MetaMaskParameters = any
  
  metamask.type = 'metamask' as const
  export function metamask() {

    type Properties = {
      onConnect(connectInfo: ProviderConnectInfo): void
    }
    type StorageItem = { 'metamask.disconnected': true }
    type Provider = WalletProvider
    type WalletProvider = SNIP1193Provider & {
      providers?: SNIP1193Provider[] | undefined
      /** Only exists in MetaMask as of 2022/04/03 */
      _events?: { connect?: (() => void) | undefined } | undefined
      /** Only exists in MetaMask as of 2022/04/03 */
      _state?: {
        accounts?: string[]
        initialized?: boolean
        isConnected?: boolean
        isPermanentlyDisconnected?: boolean
        isUnlocked?: boolean
      } | undefined
    }
  
    return createConnector<Provider, Properties, StorageItem>((config) => ({
      id: 'metamask',
      name: 'MetaMask',
      type: metamask.type,
       icon: "data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMTIiIGhlaWdodD0iMTg5IiB2aWV3Qm94PSIwIDAgMjEyIDE4OSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cG9seWdvbiBmaWxsPSIjQ0RCREIyIiBwb2ludHM9IjYwLjc1IDE3My4yNSA4OC4zMTMgMTgwLjU2MyA4OC4zMTMgMTcxIDkwLjU2MyAxNjguNzUgMTA2LjMxMyAxNjguNzUgMTA2LjMxMyAxODAgMTA2LjMxMyAxODcuODc1IDg5LjQzOCAxODcuODc1IDY4LjYyNSAxNzguODc1Ii8+PHBvbHlnb24gZmlsbD0iI0NEQkRCMiIgcG9pbnRzPSIxMDUuNzUgMTczLjI1IDEzMi43NSAxODAuNTYzIDEzMi43NSAxNzEgMTM1IDE2OC43NSAxNTAuNzUgMTY4Ljc1IDE1MC43NSAxODAgMTUwLjc1IDE4Ny44NzUgMTMzLjg3NSAxODcuODc1IDExMy4wNjMgMTc4Ljg3NSIgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgMjU2LjUgMCkiLz48cG9seWdvbiBmaWxsPSIjMzkzOTM5IiBwb2ludHM9IjkwLjU2MyAxNTIuNDM4IDg4LjMxMyAxNzEgOTEuMTI1IDE2OC43NSAxMjAuMzc1IDE2OC43NSAxMjMuNzUgMTcxIDEyMS41IDE1Mi40MzggMTE3IDE0OS42MjUgOTQuNSAxNTAuMTg4Ii8+PHBvbHlnb24gZmlsbD0iI0Y4OUMzNSIgcG9pbnRzPSI3NS4zNzUgMjcgODguODc1IDU4LjUgOTUuMDYzIDE1MC4xODggMTE3IDE1MC4xODggMTIzLjc1IDU4LjUgMTM2LjEyNSAyNyIvPjxwb2x5Z29uIGZpbGw9IiNGODlEMzUiIHBvaW50cz0iMTYuMzEzIDk2LjE4OCAuNTYzIDE0MS43NSAzOS45MzggMTM5LjUgNjUuMjUgMTM5LjUgNjUuMjUgMTE5LjgxMyA2NC4xMjUgNzkuMzEzIDU4LjUgODMuODEzIi8+PHBvbHlnb24gZmlsbD0iI0Q4N0MzMCIgcG9pbnRzPSI0Ni4xMjUgMTAxLjI1IDkyLjI1IDEwMi4zNzUgODcuMTg4IDEyNiA2NS4yNSAxMjAuMzc1Ii8+PHBvbHlnb24gZmlsbD0iI0VBOEQzQSIgcG9pbnRzPSI0Ni4xMjUgMTAxLjgxMyA2NS4yNSAxMTkuODEzIDY1LjI1IDEzNy44MTMiLz48cG9seWdvbiBmaWxsPSIjRjg5RDM1IiBwb2ludHM9IjY1LjI1IDEyMC4zNzUgODcuNzUgMTI2IDk1LjA2MyAxNTAuMTg4IDkwIDE1MyA2NS4yNSAxMzguMzc1Ii8+PHBvbHlnb24gZmlsbD0iI0VCOEYzNSIgcG9pbnRzPSI2NS4yNSAxMzguMzc1IDYwLjc1IDE3My4yNSA5MC41NjMgMTUyLjQzOCIvPjxwb2x5Z29uIGZpbGw9IiNFQThFM0EiIHBvaW50cz0iOTIuMjUgMTAyLjM3NSA5NS4wNjMgMTUwLjE4OCA4Ni42MjUgMTI1LjcxOSIvPjxwb2x5Z29uIGZpbGw9IiNEODdDMzAiIHBvaW50cz0iMzkuMzc1IDEzOC45MzggNjUuMjUgMTM4LjM3NSA2MC43NSAxNzMuMjUiLz48cG9seWdvbiBmaWxsPSIjRUI4RjM1IiBwb2ludHM9IjEyLjkzOCAxODguNDM4IDYwLjc1IDE3My4yNSAzOS4zNzUgMTM4LjkzOCAuNTYzIDE0MS43NSIvPjxwb2x5Z29uIGZpbGw9IiNFODgyMUUiIHBvaW50cz0iODguODc1IDU4LjUgNjQuNjg4IDc4Ljc1IDQ2LjEyNSAxMDEuMjUgOTIuMjUgMTAyLjkzOCIvPjxwb2x5Z29uIGZpbGw9IiNERkNFQzMiIHBvaW50cz0iNjAuNzUgMTczLjI1IDkwLjU2MyAxNTIuNDM4IDg4LjMxMyAxNzAuNDM4IDg4LjMxMyAxODAuNTYzIDY4LjA2MyAxNzYuNjI1Ii8+PHBvbHlnb24gZmlsbD0iI0RGQ0VDMyIgcG9pbnRzPSIxMjEuNSAxNzMuMjUgMTUwLjc1IDE1Mi40MzggMTQ4LjUgMTcwLjQzOCAxNDguNSAxODAuNTYzIDEyOC4yNSAxNzYuNjI1IiB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAgMSAyNzIuMjUgMCkiLz48cG9seWdvbiBmaWxsPSIjMzkzOTM5IiBwb2ludHM9IjcwLjMxMyAxMTIuNSA2NC4xMjUgMTI1LjQzOCA4Ni4wNjMgMTE5LjgxMyIgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgMTUwLjE4OCAwKSIvPjxwb2x5Z29uIGZpbGw9IiNFODhGMzUiIHBvaW50cz0iMTIuMzc1IC41NjMgODguODc1IDU4LjUgNzUuOTM4IDI3Ii8+PHBhdGggZmlsbD0iIzhFNUEzMCIgZD0iTTEyLjM3NTAwMDIsMC41NjI1MDAwMDggTDIuMjUwMDAwMDMsMzEuNTAwMDAwNSBMNy44NzUwMDAxMiw2NS4yNTAwMDEgTDMuOTM3NTAwMDYsNjcuNTAwMDAxIEw5LjU2MjUwMDE0LDcyLjU2MjUgTDUuMDYyNTAwMDgsNzYuNTAwMDAxMSBMMTEuMjUsODIuMTI1MDAxMiBMNy4zMTI1MDAxMSw4NS41MDAwMDEzIEwxNi4zMTI1MDAyLDk2Ljc1MDAwMTQgTDU4LjUwMDAwMDksODMuODEyNTAxMiBDNzkuMTI1MDAxMiw2Ny4zMTI1MDA0IDg5LjI1MDAwMTMsNTguODc1MDAwMyA4OC44NzUwMDEzLDU4LjUwMDAwMDkgQzg4LjUwMDAwMTMsNTguMTI1MDAwOSA2My4wMDAwMDA5LDM4LjgxMjUwMDYgMTIuMzc1MDAwMiwwLjU2MjUwMDAwOCBaIi8+PGcgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgMjExLjUgMCkiPjxwb2x5Z29uIGZpbGw9IiNGODlEMzUiIHBvaW50cz0iMTYuMzEzIDk2LjE4OCAuNTYzIDE0MS43NSAzOS45MzggMTM5LjUgNjUuMjUgMTM5LjUgNjUuMjUgMTE5LjgxMyA2NC4xMjUgNzkuMzEzIDU4LjUgODMuODEzIi8+PHBvbHlnb24gZmlsbD0iI0Q4N0MzMCIgcG9pbnRzPSI0Ni4xMjUgMTAxLjI1IDkyLjI1IDEwMi4zNzUgODcuMTg4IDEyNiA2NS4yNSAxMjAuMzc1Ii8+PHBvbHlnb24gZmlsbD0iI0VBOEQzQSIgcG9pbnRzPSI0Ni4xMjUgMTAxLjgxMyA2NS4yNSAxMTkuODEzIDY1LjI1IDEzNy44MTMiLz48cG9seWdvbiBmaWxsPSIjRjg5RDM1IiBwb2ludHM9IjY1LjI1IDEyMC4zNzUgODcuNzUgMTI2IDk1LjA2MyAxNTAuMTg4IDkwIDE1MyA2NS4yNSAxMzguMzc1Ii8+PHBvbHlnb24gZmlsbD0iI0VCOEYzNSIgcG9pbnRzPSI2NS4yNSAxMzguMzc1IDYwLjc1IDE3My4yNSA5MCAxNTMiLz48cG9seWdvbiBmaWxsPSIjRUE4RTNBIiBwb2ludHM9IjkyLjI1IDEwMi4zNzUgOTUuMDYzIDE1MC4xODggODYuNjI1IDEyNS43MTkiLz48cG9seWdvbiBmaWxsPSIjRDg3QzMwIiBwb2ludHM9IjM5LjM3NSAxMzguOTM4IDY1LjI1IDEzOC4zNzUgNjAuNzUgMTczLjI1Ii8+PHBvbHlnb24gZmlsbD0iI0VCOEYzNSIgcG9pbnRzPSIxMi45MzggMTg4LjQzOCA2MC43NSAxNzMuMjUgMzkuMzc1IDEzOC45MzggLjU2MyAxNDEuNzUiLz48cG9seWdvbiBmaWxsPSIjRTg4MjFFIiBwb2ludHM9Ijg4Ljg3NSA1OC41IDY0LjY4OCA3OC43NSA0Ni4xMjUgMTAxLjI1IDkyLjI1IDEwMi45MzgiLz48cG9seWdvbiBmaWxsPSIjMzkzOTM5IiBwb2ludHM9IjcwLjMxMyAxMTIuNSA2NC4xMjUgMTI1LjQzOCA4Ni4wNjMgMTE5LjgxMyIgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgMTUwLjE4OCAwKSIvPjxwb2x5Z29uIGZpbGw9IiNFODhGMzUiIHBvaW50cz0iMTIuMzc1IC41NjMgODguODc1IDU4LjUgNzUuOTM4IDI3Ii8+PHBhdGggZmlsbD0iIzhFNUEzMCIgZD0iTTEyLjM3NTAwMDIsMC41NjI1MDAwMDggTDIuMjUwMDAwMDMsMzEuNTAwMDAwNSBMNy44NzUwMDAxMiw2NS4yNTAwMDEgTDMuOTM3NTAwMDYsNjcuNTAwMDAxIEw5LjU2MjUwMDE0LDcyLjU2MjUgTDUuMDYyNTAwMDgsNzYuNTAwMDAxMSBMMTEuMjUsODIuMTI1MDAxMiBMNy4zMTI1MDAxMSw4NS41MDAwMDEzIEwxNi4zMTI1MDAyLDk2Ljc1MDAwMTQgTDU4LjUwMDAwMDksODMuODEyNTAxMiBDNzkuMTI1MDAxMiw2Ny4zMTI1MDA0IDg5LjI1MDAwMTMsNTguODc1MDAwMyA4OC44NzUwMDEzLDU4LjUwMDAwMDkgQzg4LjUwMDAwMTMsNTguMTI1MDAwOSA2My4wMDAwMDA5LDM4LjgxMjUwMDYgMTIuMzc1MDAwMiwwLjU2MjUwMDAwOCBaIi8+PC9nPjwvZz48L3N2Zz4=",
      async setup() {
        if (typeof window === 'undefined') {
          return
        }

        // Initialize the MetaMask bridge before checking provider
        await injectMetamaskBridge(window as any)
        
        if (typeof window.starknet_metamask !== 'object') {
          return
        }

        await config.storage?.setItem('metamask.disconnected', true)
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
  
          await config.storage?.removeItem('metamask.disconnected')
  
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
        await config.storage?.setItem('metamask.disconnected', true)
      },
      async getAccounts() {
        const provider = await this.getProvider()
        const accounts = (await provider?.request({
          type: 'wallet_requestAccounts',
          params: {}
        })) as string[]
        return accounts.map((x) => getStarknetAddress(x))
      },
      async getChainId() {
        try {
          const provider = await this.getProvider()
          const chainId = await provider?.request({ type: 'wallet_requestChainId', params: {} }) as Hex
          return chainId
        } catch (error) {
          throw new ProviderRpcError(error as Error, {
            code: (error as RpcError).code || -32000,
            shortMessage: 'Failed to get chain ID',
            data: error as unknown as undefined
          })
        }
      },
      async getProvider() {
        if (typeof window === 'undefined') {
          throw new Error('Metamask provider unavailable in server environment')
        }
        
        // Ensure bridge is initialized
        await injectMetamaskBridge(window as any)
        
        const provider = window.starknet_metamask
        if (!window.starknet_metamask?.isConnected) {
          await window.starknet_metamask?.enable()
        }
        
        if (!provider) throw new ProviderNotFoundError()
        return provider
      },
      async isAuthorized() {
        try {
          const isDisconnected =
            // If shim exists in storage, connector is disconnected
            await config.storage?.getItem('metamask.disconnected')
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
        if (accounts.length === 0) this.onDisconnect(undefined);
        // Connect if emitter is listening for connect event (e.g. is disconnected and connects through wallet interface)
        else if (config.emitter.listenerCount('accountsChanged')) {
          const chainId = (await this.getChainId()) as Hex;
          await this.onConnect({ chainId });
          await config.storage?.removeItem('metamask.disconnected')
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
      async onDisconnect() {
        config.emitter.emit('disconnect')
        await config.storage?.setItem('metamask.disconnected', true)
      },
    }))
  }

function getStarknetAddress(x: string): any {
  return x as Address
}