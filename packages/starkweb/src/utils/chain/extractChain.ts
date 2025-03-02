import type { ErrorType } from '../../errors/utils.js'
import type { Chain } from '../../types/chain.js'

export type ExtractChainParameters<
  chains extends readonly Chain[],
  chainId extends chains[number]['chain_id'],
> = {
  chains: chains
  id: chainId | chains[number]['chain_id']
}

export type ExtractChainReturnType<
  chains extends readonly Chain[],
  chainId extends chains[number]['chain_id'],
> = Extract<chains[number], { chain_id: chainId }>

export type ExtractChainErrorType = ErrorType

export function extractChain<
  const chains extends readonly Chain[],
  chainId extends chains[number]['chain_id'],
>({
  chains,
  id,
}: ExtractChainParameters<chains, chainId>): ExtractChainReturnType<
  chains,
  chainId
> {
  return chains.find(
    (chain) => chain.chain_id === id,
  ) as ExtractChainReturnType<chains, chainId>
}
