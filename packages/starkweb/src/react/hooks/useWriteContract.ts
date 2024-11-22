'use client'

import type { ConfigParameter } from '../types/properties.js'
import { type UseMutationReturnType, useMutation, type UseMutationParameters } from '../utils/query.js'
import { useConfig } from './useConfig.js'
import type { Config } from '../../core/createConfig.js'
import { writeContractMutationOptions, type WriteContractData, type WriteContractMutate, type WriteContractMutateAsync, type WriteContractVariables } from '../../core/query/writeContract.js'
import type { WriteContractErrorType } from '../../actions/index.js'
import type { Abi } from '../../strk-types/abi.js'

export type UseWriteContractParameters<
  config extends Config = Config,
  context = unknown,
> = ConfigParameter<config> & {
  mutation?:
    | UseMutationParameters<
        WriteContractData,
        WriteContractErrorType,
        WriteContractVariables<
          Abi,
          string,
          unknown[],
          config,
          config['chains'][number]['chain_id']
        >,
        context
      >
    | undefined
}

export type UseWriteContractReturnType<
  config extends Config = Config,
  context = unknown,
> = UseMutationReturnType<
  WriteContractData,
  WriteContractErrorType,
  WriteContractVariables<
    Abi,
    string,
    unknown[],
    config,
    config['chains'][number]['chain_id']
  >,
  context
> & {
  writeContract: WriteContractMutate<config, context>
  writeContractAsync: WriteContractMutateAsync<config, context>
}

/** Hook for writing data to a contract */
export function useWriteContract<
  config extends Config = Config,
  context = unknown,
>(
  parameters: UseWriteContractParameters<config, context> = {}
): UseWriteContractReturnType<config, context> {
  const { mutation = {} } = parameters

  const config = useConfig(parameters)
  // const chainId = useChainId({ config })

  const mutationOptions = writeContractMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  return {
    ...result,
    writeContract: mutate,
    writeContractAsync: mutateAsync,
  } as UseWriteContractReturnType<config, context>
}
