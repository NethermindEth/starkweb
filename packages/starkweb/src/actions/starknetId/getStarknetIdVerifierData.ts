// @ts-nocheck
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { StarknetChainId } from '../../constants/starknet.js'
import {
  getChecksumAddress,
  validateChecksumAddress,
} from '../../strk-utils/address.js'
import { compile } from '../../strk-utils/calldata/compile.js'
import { getSelectorFromName } from '../../strk-utils/hash/selector.js'
import { encodeShortString } from '../../strk-utils/shortString.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'
import type { StarknetIdContracts } from '../../types/starknetId.js'
import type { Prettify } from '../../types/utils.js'
import {
  getIdentityContract,
  getVerifierContract,
} from '../../utils/starknetId/utils.js'
import { isStarkDomain } from '../../utils/starknetId/utils.js'
import { getStarknetId } from './getStarknetId.js'
import { getStarknetIdName } from './getStarknetIdName.js'

export type GetStarknetIdVerifierDataParameters = Prettify<{
  /** Starknet ID, domain, or address to get the verifier data for. */
  idDomainOrAddr: string
  /** Field to retrieve from verifier data. */
  field: string
  /** Optional verifier contract address. */
  verifier?: string
}>

export type GetStarknetIdVerifierDataReturnType = bigint

export type GetStarknetIdVerifierDataErrorType = Error

export async function getStarknetIdVerifierData<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  { idDomainOrAddr, field, verifier }: GetStarknetIdVerifierDataParameters,
): Promise<GetStarknetIdVerifierDataReturnType> {
  const chainId = client.chain?.id as unknown as StarknetChainId
  if (!chainId) {
    throw new Error('Chain ID is required')
  }

  const StarknetIdContract: StarknetIdContracts = {
    identity: getIdentityContract(chainId),
  }

  if (!StarknetIdContract.identity) {
    throw new Error(
      `Starknet ID identity contract address not found for chain ID: ${chainId}`,
    )
  }

  const verifierAddress = verifier ?? getVerifierContract(chainId)
  const id = await checkArguments(client, idDomainOrAddr)

  try {
    const result = await client.request({
      method: 'starknet_call',
      params: {
        request: {
          contract_address: StarknetIdContract.identity,
          entry_point_selector: getSelectorFromName('get_verifier_data'),
          calldata: compile([
            id.toString(),
            encodeShortString(field),
            verifierAddress,
            '0',
          ]),
        },
        block_id: 'latest',
      },
    })

    if (Array.isArray(result) && result.length > 0) {
      return BigInt(result[0])
    }
    throw new Error('Invalid response from contract call')
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      throw error
    }
    throw new Error(
      `Could not get user verifier data from starknet id: ${error}`,
    )
  }
}

async function checkArguments(
  client: Client<Transport, Chain | undefined, Account | undefined>,
  idDomainOrAddr: string,
): Promise<string> {
  if (typeof idDomainOrAddr !== 'string') {
    throw new Error('Invalid idDomainOrAddr argument')
  }

  if (/^\d+$/.test(idDomainOrAddr)) {
    // is a positive number
    return idDomainOrAddr
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else if (isStarkDomain(idDomainOrAddr)) {
    // is a starkDomain
    return await getStarknetId(client, { domain: idDomainOrAddr })
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else if (/^[-+]?0x[0-9a-f]+$/i.test(idDomainOrAddr)) {
    // is a hex address
    const checkSumAddr = getChecksumAddress(idDomainOrAddr)
    if (validateChecksumAddress(checkSumAddr)) {
      const starkName = await getStarknetIdName(client, {
        address: idDomainOrAddr,
      })
      if (starkName === '') {
        throw new Error('User not found')
      }
      return await getStarknetId(client, { domain: starkName })
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      throw new Error('Invalid Starknet address')
    }
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    throw new Error('Invalid idDomainOrAddr argument')
  }
}
