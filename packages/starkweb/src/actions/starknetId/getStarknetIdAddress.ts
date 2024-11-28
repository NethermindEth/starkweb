import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { StarknetChainId } from '../../constants/starknet.js'
import { compile } from '../../strk-utils/calldata/compile.js'
import { getSelectorFromName } from '../../strk-utils/hash/selector.js'
import { decodeShortString } from '../../strk-utils/shortString.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'
import type {
  DecodedData,
  StarknetIdContracts,
} from '../../types/starknetId.js'
import type { Prettify } from '../../types/utils.js'
import {
  decodeDomain,
  encodeDomain,
  getIdentityContract,
  getNamingContract,
} from '../../utils/starknetId/utils.js'

export type GetStarknetIdAddressParameters = Prettify<{
  /** Domain to get the address for. */
  domain: string
}>

export type GetStarknetIdAddressReturnType = string

export type GetStarknetIdAddressErrorType = Error

export async function getStarknetIdAddress<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  { domain }: GetStarknetIdAddressParameters,
): Promise<GetStarknetIdAddressReturnType> {
  const chainId = client.chain?.id as unknown as StarknetChainId
  if (!chainId) {
    throw new Error('Chain ID is required')
  }
  let StarknetIdContract!: StarknetIdContracts
  StarknetIdContract = StarknetIdContract ?? {
    identity: getIdentityContract(chainId),
    naming: getNamingContract(chainId),
  }

  if (!StarknetIdContract.naming) {
    throw new Error(
      `Starknet ID contract address not found for chain ID: ${chainId}`,
    )
  }

  const encodedDomain = encodeDomain(domain).map((elem: any) =>
    elem.toString(10),
  )

  try {
    return await tryResolveDomain(
      client,
      StarknetIdContract.naming,
      encodedDomain,
      [],
    )
  } catch (error) {
    if (error instanceof Error) {
      const data = extractArrayFromErrorMessage(String(error))
      if (!data || data?.errorType !== 'offchain_resolving') {
        throw new Error('Could not get address from stark name')
      }

      for (const uri of data.uris) {
        try {
          const serverRes = await queryServer(uri, data.domain_slice)
          if (serverRes.error) {
            continue
          }
          const hint = [
            serverRes.data.address,
            serverRes.data.r,
            serverRes.data.s,
            serverRes.data.max_validity,
          ]
          return await tryResolveDomain(
            client,
            StarknetIdContract.naming,
            encodedDomain,
            hint,
          )
        } catch (error: any) {
          throw new Error(
            `Could not resolve domain on URI ${uri} : ${error.message}`,
          )
        }
      }
      throw new Error('Could not get address from stark name')
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      throw new Error('Could not get address from stark name')
    }
  }
}

async function tryResolveDomain(
  client: Client<Transport, Chain | undefined, Account | undefined>,
  contract: string,
  encodedDomain: string[],
  hint: any = [],
): Promise<string> {
  const result = await client.request({
    method: 'starknet_call',
    params: {
      request: {
        contract_address: contract,
        entry_point_selector: getSelectorFromName('domain_to_address'),
        calldata: compile([encodedDomain, hint]),
      },
      block_id: 'latest',
    },
  })

  if (Array.isArray(result) && result.length > 0 && result[0]) {
    return result[0]
  }
  throw new Error('Invalid response from contract call')
}

export const queryServer = async (serverUri: string, domain: string) => {
  try {
    const response = await fetch(`${serverUri}${domain}`)

    if (!response.ok) {
      const errorResponse = await response.text()
      throw new Error(errorResponse || 'Error while querying server')
    }
    const data = await response.json()
    return { data }
  } catch (error) {
    return { error }
  }
}

// TODO: This is a temporary solution to extract the array from the error message.
// We need to find a better way to handle this.
export const extractArrayFromErrorMessage = (errorMsg: string) => {
  const pattern = /Execution failed\. Failure reason: \((.*?)\)\./
  const match = errorMsg.match(pattern)

  if (match?.[1]) {
    const values = match[1].split(',').map((value) => value.trim())
    const res = values.map((entry) => {
      const hexMatch = entry.match(/(0x[0-9a-f]+)/i)
      if (hexMatch?.[1]) {
        return hexMatch[1]
      }
      return entry
    })
    return decodeErrorMsg(res as string[])
  }

  return null
}

export const decodeErrorMsg = (array: string[]): DecodedData | null => {
  try {
    let index = 0
    const result: DecodedData = {
      errorType: decodeShortString(array[index++]!),
      domain_slice: '',
      uris: [],
    }

    // Decode domain
    const domainSize: number = Number.parseInt(array[index++]!, 16)
    for (let i = 0; i < domainSize; i++) {
      result.domain_slice += decodeDomain([BigInt(array[index++]!)]).replace(
        '.stark',
        '',
      )
      if (i < domainSize - 1) result.domain_slice += '.'
    }

    // Decode URIs
    while (index < array.length) {
      const uriSize = Number.parseInt(array[index++]!, 16)
      let uri = ''
      for (let i = 0; i < uriSize; i++) {
        uri += decodeShortString(array[index++]!)
      }
      result.uris.push(uri)
    }
    return result
  } catch (error) {
    console.error('Error decoding array:', error)
    return null
  }
}
