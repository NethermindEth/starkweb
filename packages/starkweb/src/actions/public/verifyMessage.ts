import type { Address } from 'abitype'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { ErrorType } from '../../errors/utils.js'
import { getMessageHash } from '../../strk-utils/typedData.js'
import type { SIGNATURE } from '../../types/components.js'
import type { HashTypedDataErrorType } from '../../utils/signature/hashTypedData.js'
import { accountABI } from '../../utils/siws/account-contract-abi.js'
import { readContract } from './readContract.js'

export type VerifyMessageParameters = {
  /** The address to verify the typed data for. */
  address: string
  statement: string
  uri: string
  nonce: string
  version: string
  chainId: string
  domain: string
  /** The signature to verify */
  signature: SIGNATURE
}

export type VerifyMessageReturnType = boolean

export type VerifyMessageErrorType = HashTypedDataErrorType | ErrorType

/**
 * Verify that typed data was signed by the provided address.
 *
 * - Docs {@link https://starkweb.xyz/docs/actions/public/verifyTypedData}
 *
 * @param client - Client to use.
 * @param parameters - {@link VerifyTypedDataParameters}
 * @returns Whether or not the signature is valid. {@link VerifyTypedDataReturnType}
 */
export async function verifyMessage(
  client: Client<Transport>,
  parameters: VerifyMessageParameters,
): Promise<VerifyMessageReturnType> {
  const {
    address: sn_address,
    statement: sn_statement,
    uri: sn_uri,
    nonce: sn_nonce,
    version: sn_version,
    chainId: sn_chainId,
    domain: sn_domain,
    signature: sn_signature,
  } = parameters
  const siwsData = {
    types: {
      StarknetDomain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'felt' },
        { name: 'chainId', type: 'felt' },
      ],
      Message: [
        { name: 'address', type: 'felt' },
        { name: 'statement', type: 'string' },
        { name: 'uri', type: 'string' },
        { name: 'nonce', type: 'string' },
      ],
    },
    primaryType: 'Message',
    domain: {
      name: sn_domain,
      version: sn_version,
      chainId: sn_chainId,
      revision: '1',
    },
    message: {
      address: sn_address,
      statement: sn_statement,
      uri: sn_uri,
      nonce: sn_nonce,
    },
  }

  const account = siwsData.message.address
  const hash = getMessageHash(siwsData, account)
  const verifyParams = {
    abi: accountABI,
    address: account as Address,
    functionName: 'is_valid_signature',
    args: {
      hash,
      signature: sn_signature,
    },
  }
  const result = await readContract(client, {
    abi: accountABI,
    address: account as Address,
    functionName: 'is_valid_signature',
    args: {
      hash,
      sig_len: sn_signature.length,
      sig: sn_signature,
    },
  })
  if (result.data === '0x56414c4944') {
    return true
  }
  return false
}
