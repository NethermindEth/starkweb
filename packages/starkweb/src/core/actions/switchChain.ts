import type {
  Hex,
  // SwitchChainErrorType as strkjs_SwitchChainErrorType,
} from '../../types/misc.js'

import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import {
  ChainNotConfiguredError,
  type ChainNotConfiguredErrorType,
} from '../errors/config.js'
import {
  type ProviderNotFoundErrorType,
  SwitchChainNotSupportedError,
  type SwitchChainNotSupportedErrorType,
} from '../errors/connector.js'
import type { ConnectorParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import type { AddStarknetChainParameters } from '../exports/chains.js'
import type { UserRejectedRequestErrorType } from '../../errors/rpc.js'

export type SwitchChainParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['chain_id'] = config['chains'][number]['chain_id'],
> = Evaluate<
  ConnectorParameter & {
    chainId: chainId | config['chains'][number]['chain_id']
    addStarknetChainParameter?:
      | Evaluate<ExactPartial<Omit<AddStarknetChainParameters, 'chain_id'>>>
      | undefined
  }
>

export type SwitchChainReturnType<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['chain_id'] = config['chains'][number]['chain_id'],
> = Extract<
  config['chains'][number],
  { chain_id: Config extends config ? Hex : chainId }
>

export type SwitchChainErrorType =
  | SwitchChainNotSupportedErrorType
  | ChainNotConfiguredErrorType
  // connector.switchChain()
  | ProviderNotFoundErrorType
  | UserRejectedRequestErrorType
  // base
  | BaseErrorType
  | ErrorType
  // starkweb
  // | strkjs_SwitchChainErrorType

/** https://starkweb.xyz/core/api/actions/switchChain */
export async function switchChain<
  config extends Config,
  chainId extends config['chains'][number]['chain_id'],
>(
  config: config,
  parameters: SwitchChainParameters<config, chainId>,
): Promise<SwitchChainReturnType<config, chainId>> {
  const { addStarknetChainParameter, chainId } = parameters

  const connection = config.state.connections.get(
    parameters.connector?.uid ?? config.state.current!,
  )
  if (connection) {
    const connector = connection.connector
    if (!connector.switchChain)
      throw new SwitchChainNotSupportedError({ connector })
    const chain = await connector.switchChain({
      addStarknetChainParameter,
      chainId: chainId as Hex,
    })
    return chain as SwitchChainReturnType<config, chainId>
  }

  const chain = config.chains.find((x) => x.chain_id === chainId)
  if (!chain) throw new ChainNotConfiguredError()
  config.setState((x) => ({ ...x, chainId: chainId as Hex }))
  return chain as SwitchChainReturnType<config, chainId>
}
