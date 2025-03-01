import type { BigNumberish } from '../../strk-types/lib.js'
import { isHex, isStringWholeNumber } from '../num.js'
import { encodeShortString, isShortString, isText } from '../shortString.js'
import { isBigInt, isBoolean, isString } from '../typed.js'


/**
 * Converts a BigNumberish value to a Cairo felt representation in string format
 * @param it The value to convert to a felt
 * @returns A string representation of the felt value
 * @throws Error if the value cannot be converted to a felt
 */
export function CairoFelt(it: BigNumberish): string {
  // Handle BigInt or integer numbers
  if (isBigInt(it) || Number.isInteger(it)) {
    return it.toString()
  }

  // Handle string types
  if (isString(it)) {
    // Convert hex strings
    if (isHex(it)) {
      return BigInt(it).toString()
    }
    // Handle text strings (must be short strings)
    if (isText(it)) {
      if (!isShortString(it)) {
        throw new Error(
          `${it} is a long string > 31 chars. Please split it into an array of short strings.`,
        )
      }
      // Convert short strings to felt
      return BigInt(encodeShortString(it)).toString()
    }
    // Handle whole number strings
    if (isStringWholeNumber(it)) {
      return it
    }
  }
  // Handle boolean values
  if (isBoolean(it)) {
    return `${+it}`
  }

  // Error for values that cannot be converted
  throw new Error(`${it} can't be computed by felt()`)
}
