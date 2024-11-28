'use client'

import { useMutation } from '@tanstack/react-query'
import type { Config } from '../../core/createConfig.js'
import type { Evaluate } from '../../types/utils.js'
import {
  type SwitchChainData,
  type SwitchChainMutate,
  type SwitchChainMutateAsync,
  type SwitchChainVariables,
  switchChainMutationOptions,
} from '../../core/query/switchChain.js'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useChains } from './useChains.js'
import { useConfig } from './useConfig.js'
import type { SwitchChainErrorType } from '../../core/actions/switchChain.js'

export type UseSwitchChainParameters<
  config extends Config = Config,
  context = unknown,
> = Evaluate<
  ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          SwitchChainData<config, config['chains'][number]['chain_id']>,
          SwitchChainErrorType,
          SwitchChainVariables<config, config['chains'][number]['chain_id']>,
          context
        >
      | undefined
  }
>

export type UseSwitchChainReturnType<
  config extends Config = Config,
  context = unknown,
> = Evaluate<
  UseMutationReturnType<
    SwitchChainData<config, config['chains'][number]['chain_id']>,
    SwitchChainErrorType,
    SwitchChainVariables<config, config['chains'][number]['chain_id']>,
    context
  > & {
    chains: config['chains']
    switchChain: SwitchChainMutate<config, context>
    switchChainAsync: SwitchChainMutateAsync<config, context>
  }
>

/** https://starkweb.xyz/react/api/hooks/useSwitchChain */
export function useSwitchChain(
  parameters: UseSwitchChainParameters = {},
): UseSwitchChainReturnType {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = switchChainMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  type Return = UseSwitchChainReturnType
  return {
    ...result,
    chains: useChains({ config }) ,
    switchChain: mutate as Return['switchChain'],
    switchChainAsync: mutateAsync as Return['switchChainAsync'],
  }
}
