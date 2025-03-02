import type { BigNumberish, Uint256 } from '../../strk-types/lib.js'
import { addHexPrefix } from '../encode.js'
import { CairoFelt } from './felt.js'

export const UINT_128_MAX = (1n << 128n) - 1n
export const UINT_256_MAX = (1n << 256n) - 1n
export const UINT_256_MIN = 0n
export const UINT_256_LOW_MAX = 340282366920938463463374607431768211455n
export const UINT_256_HIGH_MAX = 340282366920938463463374607431768211455n
export const UINT_256_LOW_MIN = 0n
export const UINT_256_HIGH_MIN = 0n
export const UINT_256_ABI_SELECTOR = 'core::integer::u256'

/**
 * Validates if BigNumberish can be represented as Uint256
 * @param bigNumberish - The value to validate
 * @returns The validated bigint
 * @throws Error if the value is out of the valid range
 */
export function validateUint256(bigNumberish: BigNumberish): bigint {
  const bigInt = BigInt(bigNumberish)
  if (bigInt < UINT_256_MIN)
    throw Error('bigNumberish is smaller than UINT_256_MIN')
  if (bigInt > UINT_256_MAX)
    throw new Error('bigNumberish is bigger than UINT_256_MAX')
  return bigInt
}

/**
 * Validates if low and high values can be represented as Uint256
 * @param low - The low part of the uint256 value
 * @param high - The high part of the uint256 value
 * @returns The validated low and high as bigints
 * @throws Error if any value is out of the valid range
 */
export function validateUint256Props(
  low: BigNumberish,
  high: BigNumberish
): { low: bigint; high: bigint } {
  const bigIntLow = BigInt(low)
  const bigIntHigh = BigInt(high)
  if (bigIntLow < UINT_256_LOW_MIN || bigIntLow > UINT_256_LOW_MAX) {
    throw new Error('low is out of range UINT_256_LOW_MIN - UINT_256_LOW_MAX')
  }
  if (bigIntHigh < UINT_256_HIGH_MIN || bigIntHigh > UINT_256_HIGH_MAX) {
    throw new Error(
      'high is out of range UINT_256_HIGH_MIN - UINT_256_HIGH_MAX',
    )
  }
  return { low: bigIntLow, high: bigIntHigh }
}

/**
 * Checks if the given ABI type is a Uint256
 * @param abiType - The ABI type to check
 * @returns True if the ABI type is a Uint256, false otherwise
 */
export function isUint256AbiType(abiType: string): boolean {
  return abiType === UINT_256_ABI_SELECTOR
}

/**
 * Creates a Uint256 object from various input formats
 * @param args - The arguments to create the Uint256 from
 * @returns A Uint256 object
 * @throws Error if the arguments are invalid
 */
export function createUint256(...args: any[]): Uint256 {
  if (
    typeof args[0] === 'object' &&
    args.length === 1 &&
    'low' in args[0] &&
    'high' in args[0]
  ) {
    const props = validateUint256Props(args[0].low, args[0].high)
    return {
      low: props.low,
      high: props.high
    }
  } else if (args.length === 1) {
    const bigInt = validateUint256(args[0])
    return {
      low: bigInt & UINT_128_MAX,
      high: bigInt >> 128n
    }
  } else if (args.length === 2) {
    const props = validateUint256Props(args[0], args[1])
    return {
      low: props.low,
      high: props.high
    }
  } else {
    throw Error('Incorrect Uint256 parameters')
  }
}

/**
 * Converts a Uint256 object to a bigint
 * @param uint256 - The Uint256 object
 * @returns The bigint representation
 */
export function uint256ToBigInt(uint256: Uint256): bigint {
  return (BigInt(uint256.high) << 128n) + BigInt(uint256.low)
}

/**
 * Converts a Uint256 object to a hex string representation
 * @param uint256 - The Uint256 object
 * @returns An object with hex string representations of low and high
 */
export function uint256ToHexString(uint256: Uint256) {
  return {
    low: addHexPrefix(uint256.low.toString(16)),
    high: addHexPrefix(uint256.high.toString(16)),
  }
}

/**
 * Converts a Uint256 object to a decimal string representation
 * @param uint256 - The Uint256 object
 * @returns An object with decimal string representations of low and high
 */
export function uint256ToDecimalString(uint256: Uint256) {
  return {
    low: uint256.low.toString(10),
    high: uint256.high.toString(10),
  }
}

/**
 * Converts a Uint256 object to an API request representation
 * @param uint256 - The Uint256 object
 * @returns An array of felt strings
 */
export function uint256ToApiRequest(uint256: Uint256): string[] {
  return [CairoFelt(uint256.low), CairoFelt(uint256.high)]
}
