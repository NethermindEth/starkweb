/* eslint-disable no-bitwise */
/**
 * Functions for handling cairo u512 data type
 */

import type { BigNumberish, Uint512 } from '../../strk-types/lib.js';
import { addHexPrefix } from '../encode.js';
import { CairoFelt } from './felt.js';
import { UINT_128_MAX } from './uint256.js';

export const UINT_512_MAX = (1n << 512n) - 1n;
export const UINT_512_MIN = 0n;
export const UINT_128_MIN = 0n;
export const UINT_512_ABI_SELECTOR = 'core::integer::u512';

/**
 * Validates if BigNumberish can be represented as Uint512
 * @param bigNumberish - The value to validate
 * @returns The validated bigint
 * @throws Error if the value is out of the valid range
 */
export function validateUint512(bigNumberish: BigNumberish): bigint {
  const bigInt = BigInt(bigNumberish);
  if (bigInt < UINT_512_MIN) throw Error('bigNumberish is smaller than UINT_512_MIN.');
  if (bigInt > UINT_512_MAX) throw Error('bigNumberish is bigger than UINT_512_MAX.');
  return bigInt;
}

/**
 * Validates if limbs can be represented as Uint512
 * @param limb0 - The first limb (least significant)
 * @param limb1 - The second limb
 * @param limb2 - The third limb
 * @param limb3 - The fourth limb (most significant)
 * @returns The validated limbs as bigints
 * @throws Error if any limb is out of the valid range
 */
export function validateUint512Props(
  limb0: BigNumberish,
  limb1: BigNumberish,
  limb2: BigNumberish,
  limb3: BigNumberish
): { limb0: bigint; limb1: bigint; limb2: bigint; limb3: bigint } {
  const l0 = BigInt(limb0);
  const l1 = BigInt(limb1);
  const l2 = BigInt(limb2);
  const l3 = BigInt(limb3);
  [l0, l1, l2, l3].forEach((value: bigint, index) => {
    if (value < UINT_128_MIN || value > UINT_128_MAX) {
      throw Error(`limb${index} is not in the range of a u128 number`);
    }
  });
  return { limb0: l0, limb1: l1, limb2: l2, limb3: l3 };
}

/**
 * Checks if BigNumberish can be represented as Uint512
 * @param bigNumberish - The value to check
 * @returns True if the value can be represented as Uint512, false otherwise
 */
export function isUint512(bigNumberish: BigNumberish): boolean {
  try {
    validateUint512(bigNumberish);
  } catch (error) {
    return false;
  }
  return true;
}

/**
 * Checks if provided abi type is the Uint512 data type
 * @param abiType - The ABI type to check
 * @returns True if the ABI type is Uint512, false otherwise
 */
export function isUint512AbiType(abiType: string): boolean {
  return abiType === UINT_512_ABI_SELECTOR;
}

/**
 * Converts a BigNumberish value to a Uint512 representation
 * @param value - The value to convert
 * @returns A Uint512 object
 */
export function toUint512(value: BigNumberish): Uint512;
/**
 * Converts limbs to a Uint512 representation
 * @param limb0 - The first limb (least significant)
 * @param limb1 - The second limb
 * @param limb2 - The third limb
 * @param limb3 - The fourth limb (most significant)
 * @returns A Uint512 object
 */
export function toUint512(
  limb0: BigNumberish,
  limb1: BigNumberish,
  limb2: BigNumberish,
  limb3: BigNumberish
): Uint512;
/**
 * Converts a Uint512 object to a Uint512 representation
 * @param uint512 - The Uint512 object
 * @returns A Uint512 object
 */
export function toUint512(uint512: Uint512): Uint512;

export function toUint512(...args: any[]): Uint512 {
  if (
    typeof args[0] === 'object' &&
    args.length === 1 &&
    'limb0' in args[0] &&
    'limb1' in args[0] &&
    'limb2' in args[0] &&
    'limb3' in args[0]
  ) {
    const props = validateUint512Props(
      args[0].limb0,
      args[0].limb1,
      args[0].limb2,
      args[0].limb3
    );
    return {
      limb0: props.limb0,
      limb1: props.limb1,
      limb2: props.limb2,
      limb3: props.limb3
    };
  } else if (args.length === 1) {
    const bigInt = validateUint512(args[0]);
    return {
      limb0: bigInt & UINT_128_MAX,
      limb1: (bigInt & (UINT_128_MAX << 128n)) >> 128n,
      limb2: (bigInt & (UINT_128_MAX << 256n)) >> 256n,
      limb3: bigInt >> 384n
    };
  } else if (args.length === 4) {
    const props = validateUint512Props(args[0], args[1], args[2], args[3]);
    return {
      limb0: props.limb0,
      limb1: props.limb1,
      limb2: props.limb2,
      limb3: props.limb3
    };
  } else {
    throw Error('Incorrect Uint512 parameters');
  }
}

/**
 * Converts a Uint512 object to a bigint
 * @param uint512 - The Uint512 object
 * @returns The bigint representation
 */
export function uint512ToBigInt(uint512: Uint512): bigint {
  return (BigInt(uint512.limb3) << 384n) + (BigInt(uint512.limb2) << 256n) + (BigInt(uint512.limb1) << 128n) + BigInt(uint512.limb0);
}

/**
 * Converts a Uint512 object to a hex string representation
 * @param uint512 - The Uint512 object
 * @returns An object with hex string representations of each limb
 */
export function uint512ToHexString(uint512: Uint512) {
  return {
    limb0: addHexPrefix(uint512.limb0.toString(16)),
    limb1: addHexPrefix(uint512.limb1.toString(16)),
    limb2: addHexPrefix(uint512.limb2.toString(16)),
    limb3: addHexPrefix(uint512.limb3.toString(16)),
  };
}

/**
 * Converts a Uint512 object to a decimal string representation
 * @param uint512 - The Uint512 object
 * @returns An object with decimal string representations of each limb
 */
export function uint512ToDecimalString(uint512: Uint512) {
  return {
    limb0: uint512.limb0.toString(10),
    limb1: uint512.limb1.toString(10),
    limb2: uint512.limb2.toString(10),
    limb3: uint512.limb3.toString(10),
  };
}

/**
 * Converts a Uint512 object to an API request representation
 * @param uint512 - The Uint512 object
 * @returns An array of felt strings
 */
export function uint512ToApiRequest(uint512: Uint512): string[] {
  // lower limb first : https://github.com/starkware-libs/cairo/blob/07484c52791b76abcc18fd86265756904557d0d2/corelib/src/test/integer_test.cairo#L767
  return [
    CairoFelt(uint512.limb0),
    CairoFelt(uint512.limb1),
    CairoFelt(uint512.limb2),
    CairoFelt(uint512.limb3),
  ];
}
