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
  getIdentityContract,
  getNamingContract,
} from '../../utils/starknetId/utils.js'

export type GetStarknetIdNameParameters = Prettify<{
  /** Address to get the name for. */
  address: string
}>

export type GetStarknetIdNameReturnType = string

export type GetStarknetIdNameErrorType = Error

export async function getStarknetIdName<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  { address }: GetStarknetIdNameParameters,
): Promise<GetStarknetIdNameReturnType> {
  const chainId = client.chain?.chain_id as unknown as StarknetChainId
  if (!chainId) {
    throw new Error('Chain ID is required')
  }

  let StarknetIdContract!: StarknetIdContracts
  StarknetIdContract = StarknetIdContract ?? {
    identity: getIdentityContract(chainId),
    naming: getNamingContract(chainId),
  }

  if (!StarknetIdContract.identity) {
    throw new Error(
      `Starknet ID contract address not found for chain ID: ${chainId}`,
    )
  }

  try {
    return await tryResolveAddress(
      client,
      StarknetIdContract.identity,
      address,
      [],
    )
  } catch (error) {
    if (error instanceof Error) {
      const data = extractArrayFromErrorMessage(String(error))
      if (!data || data?.errorType !== 'offchain_resolving') {
        throw new Error('Could not get name from stark address')
      }

      for (const uri of data.uris) {
        try {
          const serverRes = await queryServer(uri, data.domain_slice)
          if (serverRes.error) {
            continue
          }
          const hint = [
            serverRes.data.name,
            serverRes.data.r,
            serverRes.data.s,
            serverRes.data.max_validity,
          ]
          return await tryResolveAddress(
            client,
            StarknetIdContract.identity,
            address,
            hint,
          )
        } catch (error: any) {
          throw new Error(
            `Could not resolve address on URI ${uri} : ${error.message}`,
          )
        }
      }
      throw new Error('Could not get name from stark address')
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      throw new Error('Could not get name from stark address')
    }
  }
}

async function tryResolveAddress(
  client: Client<Transport, Chain | undefined, Account | undefined>,
  contract: string,
  address: string,
  hint: any = [],
): Promise<string> {
  const result = await client.request({
    method: 'starknet_call',
    params: {
      request: {
        contract_address: contract,
        entry_point_selector: getSelectorFromName('address_to_domain'),
        calldata: compile([address, hint]),
      },
      block_id: 'latest',
    },
  })

  if (Array.isArray(result) && result.length > 0) {
    // Decode the domain from the result
    const decodedDomain = result.map(BigInt).filter((x) => x !== 0n)
    return decodedDomain.map((x) => String.fromCharCode(Number(x))).join('')
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

export const extractArrayFromErrorMessage = (errorMsg: string) => {
  const pattern = /Execution failed\. Failure reason: \((.*?)\)\./
  const match = errorMsg.match(pattern)

  // biome-ignore lint/complexity/useOptionalChain: <explanation>
  if (match && match[1]) {
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
      result.domain_slice += decodeDomain([BigInt(array[index++]!)])
        .replace('.stark', '')
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
