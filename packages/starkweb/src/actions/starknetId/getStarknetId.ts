import type { Client } from '../../clients/createClient.js'
import type { StarknetChainId } from '../../constants/starknet.js'
import { compile } from '../../strk-utils/calldata/compile.js'
import { getSelectorFromName } from '../../strk-utils/hash/selector.js'
import type { StarknetIdContracts } from '../../types/starknetId.js'
import type { Prettify } from '../../types/utils.js'
import {
  getIdentityContract,
  getNamingContract,
} from '../../utils/starknetId/utils.js'
import { encodeDomain } from '../../utils/starknetId/utils.js'

export type GetStarknetIdParameters = Prettify<{
  /** Domain to get the Starknet ID for. */
  domain: string
}>

export type GetStarknetIdReturnType = string

export type GetStarknetIdErrorType = Error

export async function getStarknetId(
  client: Client,
  { domain }: GetStarknetIdParameters,
): Promise<GetStarknetIdReturnType> {
  const chainId = client.chain?.chain_id as StarknetChainId
  if (!chainId) {
    throw new Error('Chain ID is required')
  }

  const StarknetIdContract: StarknetIdContracts = {
    identity: getIdentityContract(chainId),
    naming: getNamingContract(chainId),
  }

  if (!StarknetIdContract.naming) {
    throw new Error(
      `Starknet ID naming contract address not found for chain ID: ${chainId}`,
    )
  }

  try {
    const encodedDomain = encodeDomain(domain).map((elem) => elem.toString(10))
    const result = await client.request({
      method: 'starknet_call',
      params: {
        request: {
          contract_address: StarknetIdContract.naming,
          entry_point_selector: getSelectorFromName('domain_to_id'),
          calldata: compile([encodedDomain]),
        },
        block_id: 'latest',
      },
    })
    if (Array.isArray(result) && result.length > 0 && result[0]) {
      return BigInt(result[0]).toString()
    }
    throw new Error('Invalid response from contract call')
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'Could not get stark name'
    ) {
      throw error
    }
    throw new Error(`Could not get starknet id from starkname: ${error}`)
  }
}
