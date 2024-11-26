import type { Signature } from '../../strk-types/lib.js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import { getMessageHash } from '../../strk-utils/typedData.js'
import type { Chain } from '../../types/chain.js'
import { accountABI } from '../../utils/siws/account-contract-abi.js'
import type { ISiwsTypedData } from '../../utils/siws/types.js'
import { readContract } from '../public/readContract.js'
import type { Address } from 'abitype'

export type VerifySiwsDataParameters = {
  siwsData: ISiwsTypedData
  signature: Signature
}

export type VerifySiwsDataReturnType = boolean
export type VerifySiwsDataErrorType = any

export async function verifySiwsData<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  parameters: VerifySiwsDataParameters,
): Promise<VerifySiwsDataReturnType | VerifySiwsDataErrorType> {
  const { siwsData, signature } = parameters
  const account = siwsData.message.address
  const hash = getMessageHash(siwsData, account)
  const verifyParams = {
    abi: accountABI,
    address: account[0]! as Address,
    args: [hash, signature],
    functionName: 'is_valid_signature',
  }
  const result = await readContract(client, verifyParams)
  if (
    Array.isArray(result) &&
    result.length === 1 &&
    result[0] === '0x56414c4944'
  ) {
    return true
  }
  return false
}
