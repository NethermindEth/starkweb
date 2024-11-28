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
import type { StarkProfile } from '../../types/starknetId.js'
import type { Prettify } from '../../types/utils.js'
import {
  decodeDomain,
  getBlobbertContract,
  getIdentityContract,
  getMulticallContract,
  getNamingContract,
  getPfpVerifierContract,
  getUtilsMulticallContract,
} from '../../utils/starknetId/utils.js'

export type GetStarknetIdStarkProfilesParameters = Prettify<{
  /** Addresses to get the Stark profiles for. */
  addresses: string[]
  /** Whether to use default profile picture if not set. */
  useDefaultPfp?: boolean
  /** Optional PFP verifier contract address. */
  pfpVerifier?: string
}>

export type GetStarknetIdStarkProfilesReturnType = StarkProfile[]

export type GetStarknetIdStarkProfilesErrorType = Error

export async function getStarknetIdStarkProfiles<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  {
    addresses,
    useDefaultPfp = true,
    pfpVerifier,
  }: GetStarknetIdStarkProfilesParameters,
): Promise<GetStarknetIdStarkProfilesReturnType> {
  const chainId = client.chain?.chain_id as StarknetChainId

  const identityContract = getIdentityContract(chainId)
  const namingContract = getNamingContract(chainId)
  const pfpVerifierContract = pfpVerifier ?? getPfpVerifierContract(chainId)
  const multicallAddress = getMulticallContract(chainId)
  const utilsMulticallContract = getUtilsMulticallContract(chainId)
  const blobbertContract = getBlobbertContract(chainId)

  try {
    const calldata = getStarkProfilesCalldata(
      addresses,
      namingContract,
      identityContract,
      pfpVerifierContract,
      utilsMulticallContract,
      blobbertContract,
    )

    const result = await client.request({
      method: 'starknet_call',
      params: {
        request: {
          contract_address: multicallAddress,
          entry_point_selector: getSelectorFromName('aggregate'),
          calldata: calldata,
        },
        block_id: 'latest',
      },
    })

    if (Array.isArray(result)) {
      const profiles: StarkProfile[] = []
      // const nbInstructions = 5
      // const callResult = result.slice(0, addresses.length * nbInstructions)
      // const uriResult = result.slice(addresses.length * nbInstructions)
      // const uriIndex = 0

      for (let i = 0; i < addresses.length; i++) {
        const name = decodeDomain(result[0].slice(1))
        // const nftContract = BigInt(callResult[i * nbInstructions + 2][0])

        // const _hasPfp =
        //   nftContract !== BigInt(0) && nftContract !== BigInt(blobbertContract)

        const profilePictureMetadata = result[8]
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

        profiles.push({
          name: name.length > 0 ? name : undefined,
          profilePicture: profilePicture,
        } as Partial<StarkProfile>) as StarkProfile
      }
      return profiles
    }
    return []
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Could not get profiles from addresses')
  }
}

export const getStarkProfilesCalldata = (
  addresses: string[],
  namingContract: string,
  identityContract: string,
  pfpVerifierContract: string,
  utilsMulticallContract: string,
  blobbertContract: string,
): RawArgsArray => {
  const calldata: RawArgsArray = []
  const uriCalldata: RawArgsArray = []
  const nbInstructions = 5

  addresses.forEach((address, index) => {
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
        calldata: [arrayReference(index * nbInstructions, 0)], //  result of address_to_domain
      },
      {
        execution: staticExecution(),
        to: hardcoded(identityContract),
        selector: hardcoded(getSelectorFromName('get_verifier_data')),
        calldata: [
          reference(index * nbInstructions + 1, 0), // result of domain_to_id
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
          reference(index * nbInstructions + 1, 0), // result of domain_to_id
          hardcoded(encodeShortString('nft_pp_id')),
          hardcoded('2'),
          hardcoded(pfpVerifierContract),
          hardcoded('0'),
        ],
      },
      {
        execution: staticExecution(),
        to: hardcoded(utilsMulticallContract),
        selector: hardcoded(getSelectorFromName('not_zero_and_not_y')),
        calldata: [
          reference(index * nbInstructions + 2, 0), // result of nft_pp_contract
          hardcoded(blobbertContract),
        ],
      },
    )

    // we only fetch the uri if the nft_pp_contract is not 0 and is not the blobbert contract
    // we will handle blobbert token uris offchain
    uriCalldata.push({
      execution: notEqual(index * nbInstructions + 4, 0, 0), // result of not_zero_and_not_y is not 0
      to: reference(index * nbInstructions + 2, 0),
      selector: hardcoded(getSelectorFromName('tokenURI')),
      calldata: [
        reference(index * nbInstructions + 3, 1),
        reference(index * nbInstructions + 3, 2),
      ],
    })
  })

  return [...calldata, ...uriCalldata]
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
