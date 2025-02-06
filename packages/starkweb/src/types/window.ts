import type { SNIP1193Provider } from './snip1193.js'

declare global {
  interface Window {
    starknet?: SNIP1193Provider | undefined
    starknet_metamask?: SNIP1193Provider | undefined
    starknet_argentX?: SNIP1193Provider | undefined
    starknet_braavos?: SNIP1193Provider | undefined
    starknet_keplr?: SNIP1193Provider | undefined
  }
}
// declare global {
//   interface Window {
//     starknet_argentX?: SNIP1193Provider | undefined
//   }
// }
