// @ts-nocheck
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { StarknetChainId } from '../../constants/starknet.js'
import type { RawArgsArray } from '../../strk-types/lib.js'
import { CairoFelt } from '../../strk-utils/cairoDataTypes/felt.js'
import { CairoCustomEnum } from '../../strk-utils/calldata/enum/CairoCustomEnum.js'
import { getSelectorFromName } from '../../strk-utils/hash/selector.js'
import {
  decodeShortString,
  encodeShortString,
} from '../../strk-utils/shortString.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'
import type {
  StarkProfile,
  StarknetIdContracts,
} from '../../types/starknetId.js'
import type { Prettify } from '../../types/utils.js'
import {
  decodeDomain,
  getIdentityContract,
  getMulticallContract,
  getNamingContract,
  getPfpVerifierContract,
  getPopVerifierContract,
  getVerifierContract,
} from '../../utils/starknetId/utils.js'

export type GetStarknetIdProfileDataParameters = Prettify<{
  /** Address to get the profile data for. */
  address: string
  /** Whether to use a default profile picture if none is set. */
  useDefaultPfp?: boolean
  /** Optional verifier contract address. */
  verifier?: string
  /** Optional PFP verifier contract address. */
  pfpVerifier?: string
  /** Optional POP verifier contract address. */
  popVerifier?: string
}>

export type GetStarknetIdProfileDataReturnType = StarkProfile

export type GetStarknetIdProfileDataErrorType = Error

export async function getStarknetIdProfileData<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  {
    address,
    useDefaultPfp = true,
    verifier,
    pfpVerifier,
    popVerifier,
  }: GetStarknetIdProfileDataParameters,
): Promise<GetStarknetIdProfileDataReturnType> {
  const chainId = client.chain?.id as unknown as StarknetChainId
  if (!chainId) {
    throw new Error('Chain ID is required')
  }

  const StarknetIdContract: StarknetIdContracts = {
    identity: getIdentityContract(chainId),
    naming: getNamingContract(chainId),
  }

  if (!StarknetIdContract.identity || !StarknetIdContract.naming) {
    throw new Error(
      `Starknet ID contract addresses not found for chain ID: ${chainId}`,
    )
  }

  const verifierContract = verifier ?? getVerifierContract(chainId)
  const pfpVerifierContract = pfpVerifier ?? getPfpVerifierContract(chainId)
  const popVerifierContract = popVerifier ?? getPopVerifierContract(chainId)
  const multicallAddress = getMulticallContract(chainId)

  try {
    const result = await client.request({
      method: 'starknet_call',
      params: {
        request: {
          contract_address: multicallAddress,
          entry_point_selector: getSelectorFromName('aggregate'),
          calldata: getProfileDataCalldata(
            address,
            StarknetIdContract.naming,
            StarknetIdContract.identity,
            verifierContract,
            pfpVerifierContract,
            popVerifierContract,
          ),
        },
        block_id: 'latest',
      },
    })

    if (Array.isArray(result)) {
      const name = decodeDomain(result[0].slice(1))
      const twitter =
        result[2][0] !== BigInt(0) ? result[2][0].toString() : undefined
      const github =
        result[3][0] !== BigInt(0) ? result[3][0].toString() : undefined
      const discord =
        result[4][0] !== BigInt(0) ? result[4][0].toString() : undefined
      const proofOfPersonhood = result[5][0] === BigInt(1)

      const profilePictureMetadata =
        result.length === 9
          ? result[8]
              .slice(1)
              .map((val: bigint) => decodeShortString(val.toString()))
              .join('')
          : undefined

      const profilePicture = profilePictureMetadata
        ? profilePictureMetadata.includes('base64')
          ? parseBase64Image(profilePictureMetadata)
          : await fetchImageUrl(profilePictureMetadata)
        : useDefaultPfp
          ? `https://identicon.starknet.id/${result[1][0].toString()}`
          : undefined

      return {
        name: name || undefined,
        twitter: twitter || undefined,
        github: github || undefined,
        discord: discord || undefined,
        proofOfPersonhood: proofOfPersonhood || undefined,
        profilePicture: profilePicture || undefined,
      } as StarkProfile
    }
    throw new Error('Invalid response from contract call')
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error(`Could not get user profile data from address: ${error}`)
  }
}

export const getProfileDataCalldata = (
  address: string,
  namingContract: string,
  identityContract: string,
  verifierContract: string,
  pfpVerifierContract: string,
  popVerifierContract: string,
): RawArgsArray => {
  const calldata: RawArgsArray = []

  calldata.push(
    {
      execution: staticExecution(),
      to: hardcoded(namingContract),
      selector: hardcoded(getSelectorFromName('address_to_domain')),
      calldata: [hardcoded(address), hardcoded('0')],
    },
    {
      execution: staticExecution(),
      to: hardcoded(namingContract),
      selector: hardcoded(getSelectorFromName('domain_to_id')),
      calldata: [arrayReference(0, 0)],
    },
    {
      execution: staticExecution(),
      to: hardcoded(identityContract),
      selector: hardcoded(getSelectorFromName('get_verifier_data')),
      calldata: [
        reference(1, 0),
        hardcoded(encodeShortString('twitter')),
        hardcoded(verifierContract),
        hardcoded('0'),
      ],
    },
    {
      execution: staticExecution(),
      to: hardcoded(identityContract),
      selector: hardcoded(getSelectorFromName('get_verifier_data')),
      calldata: [
        reference(1, 0),
        hardcoded(encodeShortString('github')),
        hardcoded(verifierContract),
        hardcoded('0'),
      ],
    },
    {
      execution: staticExecution(),
      to: hardcoded(identityContract),
      selector: hardcoded(getSelectorFromName('get_verifier_data')),
      calldata: [
        reference(1, 0),
        hardcoded(encodeShortString('discord')),
        hardcoded(verifierContract),
        hardcoded('0'),
      ],
    },
    {
      execution: staticExecution(),
      to: hardcoded(identityContract),
      selector: hardcoded(getSelectorFromName('get_verifier_data')),
      calldata: [
        reference(1, 0),
        hardcoded(encodeShortString('proof_of_personhood')),
        hardcoded(popVerifierContract),
        hardcoded('0'),
      ],
    },
    // PFP
    {
      execution: staticExecution(),
      to: hardcoded(identityContract),
      selector: hardcoded(getSelectorFromName('get_verifier_data')),
      calldata: [
        reference(1, 0),
        hardcoded(encodeShortString('nft_pp_contract')),
        hardcoded(pfpVerifierContract),
        hardcoded('0'),
      ],
    },
    {
      execution: staticExecution(),
      to: hardcoded(identityContract),
      selector: hardcoded(getSelectorFromName('get_extended_verifier_data')),
      calldata: [
        reference(1, 0),
        hardcoded(encodeShortString('nft_pp_id')),
        hardcoded('2'),
        hardcoded(pfpVerifierContract),
        hardcoded('0'),
      ],
    },
    {
      execution: notEqual(6, 0, 0),
      to: reference(6, 0),
      selector: hardcoded(getSelectorFromName('tokenURI')),
      calldata: [reference(7, 1), reference(7, 2)],
    },
  )

  return calldata
}

export const arrayReference = (call: number, pos: number): CairoCustomEnum => {
  return new CairoCustomEnum({
    ArrayReference: [CairoFelt(call), CairoFelt(pos)],
  })
}

export const hardcoded = (arg: string | number): CairoCustomEnum => {
  return new CairoCustomEnum({
    Hardcoded: arg,
  })
}

export const reference = (call: number, pos: number): CairoCustomEnum => {
  return new CairoCustomEnum({
    Reference: [CairoFelt(call), CairoFelt(pos)],
  })
}

export const staticExecution = () => {
  return new CairoCustomEnum({
    Static: {},
  })
}

export const notEqual = (call: number, pos: number, value: number) => {
  return new CairoCustomEnum({
    IfNotEqual: [CairoFelt(call), CairoFelt(pos), CairoFelt(value)],
  })
}

export const parseBase64Image = (metadata: string): string => {
  return JSON.parse(atob(metadata.split(',')[1]!.slice(0, -1))).image
}

export const parseImageUrl = (url: string): string => {
  return url.startsWith('ipfs://')
    ? url.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/')
    : url
}

export const fetchImageUrl = async (url: string): Promise<string> => {
  try {
    const response = await fetch(parseImageUrl(url))

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()

    // Check if the "image" key exists and is not null
    if (data.image) {
      return parseImageUrl(data.image)
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      return 'Image is not set'
    }
  } catch (error) {
    console.error('There was a problem fetching the image URL:', error)
    return 'Error fetching data'
  }
}
