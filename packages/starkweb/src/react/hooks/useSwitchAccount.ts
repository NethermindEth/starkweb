'use client'

import { useMutation } from '@tanstack/react-query'
import type { Config, Connector } from '../../core/createConfig.js'
import type { Evaluate } from '../../types/utils.js'
import {
  type SwitchAccountData,
  type SwitchAccountMutate,
  type SwitchAccountMutateAsync,
  type SwitchAccountVariables,
  switchAccountMutationOptions,
} from '../../core/query/switchAccount.js'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'
import { useConnections } from './useConnections.js'
import type { SwitchAccountErrorType } from '../../core/actions/switchAccount.js'
import type { ResolvedRegister } from '../../core/types/register.js'

export type UseSwitchAccountParameters<
  config extends Config = Config,
  context = unknown,
> = Evaluate<
  ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          SwitchAccountData,
          SwitchAccountErrorType,
          SwitchAccountVariables,
          context
        >
      | undefined
  }
>

export type UseSwitchAccountReturnType<context = unknown> = Evaluate<
  UseMutationReturnType<
    SwitchAccountData,
    SwitchAccountErrorType,
    SwitchAccountVariables,
    context
  > & {
    connectors: readonly Connector[]
    switchAccount: SwitchAccountMutate<context>
    switchAccountAsync: SwitchAccountMutateAsync<context>
  }
>

/** https://starkweb.xyz/react/api/hooks/useSwitchAccount */
export function useSwitchAccount<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSwitchAccountParameters<config, context> = {},
): UseSwitchAccountReturnType<context> {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = switchAccountMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  return {
    ...result,
    connectors: useConnections({ config }).map(
      (connection) => connection.connector,
    ),
    switchAccount: mutate,
    switchAccountAsync: mutateAsync,
  }
}
