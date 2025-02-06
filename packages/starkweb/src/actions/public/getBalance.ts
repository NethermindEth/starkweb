import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import { erc20Abi } from '../../constants/abis.js'
import type { BlockTag } from '../../strk-types/lib.js'
import type { Chain } from '../../types/chain.js'
import { type ReadContractParameters, readContract } from './readContract.js'

export type GetBalanceParameters = {
  address: string
  blockNumber?: number
  blockTag?: BlockTag
}
export type GetBalanceReturnTypes = {
  balance: number
  decimals: number
  symbol: string
  formatted: string
}

export type GetBalanceErrorType = any

export async function getBalance<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  parameter: GetBalanceParameters,
): Promise<GetBalanceReturnTypes | GetBalanceErrorType> {
  const chain = client.chain
  const { address, blockNumber, blockTag } = parameter

  const readContractArgs: ReadContractParameters = {
    address: chain?.nativeCurrency?.address as `0x${string}`,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address],
    blockNumber: blockNumber,
    blockTag,
  }
  const balance = await readContract(client, readContractArgs)
  const decimals = chain?.nativeCurrency?.decimals ?? 18
  const symbol = chain?.nativeCurrency?.symbol ?? 'STRK'

  return {
    balance: balance.data,
    decimals: decimals,
    symbol: symbol,
    formatted: Number(balance.data) / 10 ** decimals,
  }
}
