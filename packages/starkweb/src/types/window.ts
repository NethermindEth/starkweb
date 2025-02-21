import type { SNIP1193Provider } from './snip1193.js'

declare global {
  interface Window {
    starknet?: SNIP1193Provider | undefined
    starknet_metamask?: {
      enable: () => Promise<string[]>
      isConnected: boolean
    }  & SNIP1193Provider
    starknet_argentX?: {
      enable: () => Promise<string[]>
      isConnected: boolean
    } & SNIP1193Provider | undefined
    starknet_braavos?: {
      enable: () => Promise<string[]>
      isConnected: boolean
    } & SNIP1193Provider | undefined
    starknet_keplr?: {
      enable: () => Promise<string[]>
      isConnected: boolean
    } & SNIP1193Provider | undefined
    starknet_catridge?: {
      enable: () => Promise<string[]>
      isConnected: boolean
      connect: () => Promise<{address: string}>
      disconnect: () => Promise<void>
    } & SNIP1193Provider | undefined
  }
}