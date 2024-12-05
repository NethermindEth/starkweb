'use client'

import { useMutation } from '@tanstack/react-query'
import {
  type ConnectData,
  type ConnectMutate,
  type ConnectMutateAsync,
  type ConnectVariables,
  connectMutationOptions,
} from '../../core/query/connect.js'
import { useEffect } from 'react'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'
import { type UseConnectorsReturnType, useConnectors } from './useConnectors.js'
import type { ConnectErrorType } from '../../core/actions/connect.js'

export type UseConnectParameters<
  context = unknown,
> = ConfigParameter & {
    mutation?:
      | UseMutationParameters<
          ConnectData,
          ConnectErrorType,
          ConnectVariables,
          context
        >
      | undefined
  }

export type UseConnectReturnType = UseMutationReturnType<
    ConnectData,
    ConnectErrorType,
    ConnectVariables
  > & {
    connect: ConnectMutate
    connectAsync: ConnectMutateAsync
    connectors: UseConnectorsReturnType
  }

/** https://starkweb.xyz/react/api/hooks/useConnect */
export function useConnect(
  parameters: UseConnectParameters = {},
): UseConnectReturnType {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = connectMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  // Reset mutation back to an idle state when the connector disconnects.
  useEffect(() => {
    return config.subscribe(
      ({ status }) => status,
      (status, previousStatus) => {
        if (previousStatus === 'connected' && status === 'disconnected')
          result.reset()
      },
    )
  }, [config, result.reset])

  return {
    ...result,
    connect: mutate,
    connectAsync: mutateAsync,
    connectors: useConnectors({ config }),
  }
}
