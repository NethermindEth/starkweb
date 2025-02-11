

import type { Signature } from '../../strk-types/lib.js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import { getMessageHash } from '../../strk-utils/typedData.js'
import type { Chain } from '../../types/chain.js'
import type { ISiwsTypedData } from '../../utils/siws/types.js'
import { readContract } from '../public/readContract.js'
import type { Address } from 'abitype'
import { argentAccountABI } from '../../abi/argentAccountABI.js'
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
const result = await readContract(client, {
  abi: argentAccountABI,
  address: account as Address,
  functionName: 'is_valid_signature',
  args: {
    hash: hash as 'felt252',
    signature: signature as unknown as 'felt252'[],
  },
})
if (result.data === '56414c4944' as 'felt252') {
  return true
}
return false
}
