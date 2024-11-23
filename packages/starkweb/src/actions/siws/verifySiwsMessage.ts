import type { Signature } from '@starknet-io/types-js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import { getMessageHash } from '../../strk-utils/typedData.js'
import type { Chain } from '../../types/chain.js'
import { accountABI } from '../../utils/siws/account-contract-abi.js'
import { readContract } from '../public/readContract.js'
import type { Address } from 'abitype'

export type VerifySiwsMessageParameters = {
  statement: string
  signature: Signature
  uri: string
  nonce: string
  address: string
  chainId: string
  domain: string
  version: string
}

export type VerifySiwsMessageReturnType = boolean
export type VerifySiwsMessageErrorType = any

export async function verifySiwsMessage<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  parameters: VerifySiwsMessageParameters,
): Promise<VerifySiwsMessageReturnType | VerifySiwsMessageErrorType> {
  const {
    statement,
    uri,
    nonce,
    address,
    chainId,
    domain,
    version,
    signature,
  } = parameters
  // const account = client.account;

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
      name: domain,
      version: version,
      chainId: chainId,
      revision: '1',
    },
    message: {
      address: address,
      statement: statement,
      uri: uri,
      nonce: nonce,
    },
  }

  const account = siwsData.message.address
  const hash = getMessageHash(siwsData, account)

  const verifyParams = {
    address: account as Address,
    abi: accountABI,
    functionName: 'isValidSignature',
    args: [hash, signature],
  }

  return readContract(client, verifyParams)
}
