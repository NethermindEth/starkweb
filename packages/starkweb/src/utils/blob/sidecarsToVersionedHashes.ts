import type { ErrorType } from '../../errors/utils.js'
import type { BlobSidecars } from '../../types/eip4844.js'
import type { ByteArray, Hex } from '../../types/misc.js'
import {
  type CommitmentToVersionedHashErrorType,
  commitmentToVersionedHash,
} from './commitmentToVersionedHash.js'

type To = 'hex' | 'bytes'

export type SidecarsToVersionedHashesParameters<
  sidecars extends BlobSidecars = BlobSidecars,
  to extends To | undefined = undefined,
> = {
  /** Sidecars from blobs. */
  sidecars: sidecars | BlobSidecars
  /** Return type. */
  to?: to | To | undefined
  /** Version to tag onto the hashes. */
  version?: number | undefined
}

export type SidecarsToVersionedHashesReturnType<to extends To> =
  | (to extends 'bytes' ? readonly ByteArray[] : never)
  | (to extends 'hex' ? readonly Hex[] : never)

export type SidecarsToVersionedHashesErrorType =
  | CommitmentToVersionedHashErrorType
  | ErrorType

/**
 * Transforms a list of sidecars to their versioned hashes.
 *
 * @example
 * ```ts
 * import { toBlobSidecars, sidecarsToVersionedHashes, stringToHex } from 'starkweb'
 *
 * const sidecars = toBlobSidecars({ data: stringToHex('hello world') })
 * const versionedHashes = sidecarsToVersionedHashes({ sidecars })
 * ```
 */
export function sidecarsToVersionedHashes<
  const sidecars extends BlobSidecars,
  to extends To =
    | (sidecars extends BlobSidecars<Hex> ? 'hex' : never)
    | (sidecars extends BlobSidecars<ByteArray> ? 'bytes' : never),
>(
  parameters: SidecarsToVersionedHashesParameters<sidecars, to>,
): SidecarsToVersionedHashesReturnType<to> {
  const { sidecars, version } = parameters

  const to =
    parameters.to ?? (typeof sidecars[0]!.blob === 'string' ? 'hex' : 'bytes')

  const hashes: Uint8Array[] | Hex[] = []
  for (const { commitment } of sidecars) {
    hashes.push(
      commitmentToVersionedHash({
        commitment,
        to,
        version,
      }) as any,
    )
  }
  return hashes as any
}
