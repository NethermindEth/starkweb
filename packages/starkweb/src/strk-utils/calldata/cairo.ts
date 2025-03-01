import type { BigNumberish, Uint256, Uint512 } from '../../strk-types/lib.js'
import { CairoFelt } from '../cairoDataTypes/felt.js'
import { createUint256 } from '../cairoDataTypes/uint256.js'
import { toUint512 } from '../cairoDataTypes/uint512.js'

export function felt(it: BigNumberish): string {
  return CairoFelt(it)
}

export const uint256 = (it: BigNumberish): Uint256 => {
  return createUint256(it)
}

export const uint512 = (it: BigNumberish): Uint512 => {
  return toUint512(it)
}
