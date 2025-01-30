import type { ErrorType } from '../../errors/utils.js'
import type { Kzg } from '../../types/kzg.js'

export type DefineKzgParameters = Kzg
export type DefineKzgReturnType = Kzg
export type DefineKzgErrorType = ErrorType

/**
 * Defines a KZG interface.
 *
 * @example
 * ```ts
 * import * as cKzg from 'c-kzg'
 * import { defineKzg } from 'starkweb'
 * import { mainnetTrustedSetupPath } from 'starkweb/node'
 *
 * cKzg.loadTrustedSetup(mainnetTrustedSetupPath)
 *
 * const kzg = defineKzg(cKzg)
 * ```
 */
export function defineKzg({
  blobToKzgCommitment,
  computeBlobKzgProof,
}: DefineKzgParameters): DefineKzgReturnType {
  return {
    blobToKzgCommitment,
    computeBlobKzgProof,
  }
}
