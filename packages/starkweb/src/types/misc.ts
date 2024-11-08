import type { OneOf } from './utils.js'

export type ByteArray = Uint8Array
export type Hex = `0x${string}`
export type Hash = `0x${string}`
export type Address = `0x${string}`
export type Felt = `0x${string}`
export type LogTopic = Hex | Hex[] | null
export type SignableMessage =
  | string
  | {
      /** Raw data representation of the message. */
      raw: Hex | ByteArray
    }
export type SignatureLegacy = {
  r: Hex
  s: Hex
  v: bigint
}
export type Signature = OneOf<
  | SignatureLegacy
  | {
      r: Hex
      s: Hex
      /** @deprecated use `yParity`. */
      v: bigint
      yParity?: number | undefined
    }
  | {
      r: Hex
      s: Hex
      /** @deprecated use `yParity`. */
      v?: bigint | undefined
      yParity: number
    }
>
export type CompactSignature = {
  r: Hex
  yParityAndS: Hex
}
