import type { TypedData } from '../../strk-types/typedData.js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { ErrorType } from '../../errors/utils.js'
import { getMessageHash } from '../../strk-utils/typedData.js'
import type { ByteArray, Hex, Signature } from '../../types/misc.js'
import type { HashTypedDataErrorType } from '../../utils/signature/hashTypedData.js'
import { accountABI } from '../../utils/siws/account-contract-abi.js'
import { readContract } from './readContract.js'
import type { Address } from 'abitype'
// import {
//   type VerifyHashErrorType,
//   type VerifyHashParameters,
//   verifyHash,
// } from '../public/verifyHash.js'

export type VerifyTypedDataParameters = {
  /** The address to verify the typed data for. */
  address: string
  /** The typed data to verify. */
  typedData: TypedData
  /** The signature to verify */
  signature: Hex | ByteArray | Signature
}

export type VerifyTypedDataReturnType = boolean

export type VerifyTypedDataErrorType = HashTypedDataErrorType | ErrorType

/**
 * Verify that typed data was signed by the provided address.
 *
 * - Docs {@link https://starkweb.xyz/docs/actions/public/verifyTypedData}
 *
 * @param client - Client to use.
 * @param parameters - {@link VerifyTypedDataParameters}
 * @returns Whether or not the signature is valid. {@link VerifyTypedDataReturnType}
 */
export async function verifyTypedData(
  client: Client<Transport>,
  parameters: VerifyTypedDataParameters,
): Promise<VerifyTypedDataReturnType> {
  const { address, typedData, signature } =
    parameters as VerifyTypedDataParameters
  const hash = getMessageHash(typedData, address)
  const verifyParams = {
    address: address as Address,
    abi: accountABI,
    functionName: 'isValidSignature',
    args: [hash, signature],
  }
  const result = await readContract(client, verifyParams)
  if (result === '0x56414c4944') {
    return true
  }
  return false
}
