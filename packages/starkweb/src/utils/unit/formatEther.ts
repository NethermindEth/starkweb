import { etherUnits } from '../../constants/unit.js'

import { type FormatUnitsErrorType, formatUnits } from './formatUnits.js'

export type FormatEtherErrorType = FormatUnitsErrorType

/**
 * Converts numerical wei to a string representation of ether.
 *
 * - Docs: https://starkweb.xyz/docs/utilities/formatEther
 *
 * @example
 * import { formatEther } from 'starkweb'
 *
 * formatEther(1000000000000000000n)
 * // '1'
 */
export function formatEther(wei: bigint, unit: 'wei' | 'gwei' = 'wei') {
  return formatUnits(wei, etherUnits[unit])
}
