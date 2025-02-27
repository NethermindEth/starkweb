import type { MutateOptions, MutationOptions } from '@tanstack/query-core'
import {
  type WriteContractErrorType,
  type WriteContractParameters,
  type WriteContractReturnType,
  writeContract,
} from '../actions/writeContract.js'
import type { Config } from '../createConfig.js'
import type { Compute } from '../types/utils.js'
import type { ContractFunctionArgs, ContractFunctionName } from '../../abi/parser.js'
import type { Abi } from '../../strk-types/abi.js'

export function writeContractMutationOptions<
  config extends Config = Config,
>(
  config: config,
) {
  return {
    mutationFn(variables) {
      return writeContract(config, variables) // Type assertion to bypass type error
    },
    mutationKey: ['writeContract'],
  } as const satisfies MutationOptions<
    WriteContractData,
    WriteContractErrorType,
    WriteContractVariables<
      Abi,
      string,
      unknown[],
      config,
      config['chains'][number]['chain_id']
    >
  >
}

export type WriteContractData = Compute<WriteContractReturnType>

export type WriteContractVariables<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'external'>,
  args extends ContractFunctionArgs<
    abi,
    'external',
    functionName
  >,
  config extends Config,
  chainId extends config['chains'][number]['chain_id'],
  allFunctionNames = ContractFunctionName<abi, 'external'>,
> = WriteContractParameters<
  abi,
  functionName,
  args,
  config,
  chainId,
  allFunctionNames
>

export type WriteContractMutate<config extends Config, context = unknown> = <
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'external'>,
  args extends ContractFunctionArgs<
    abi,
    'external',
    functionName
  >,
>(
  variables: WriteContractVariables<
    abi,
    functionName,
    args,
    config,
    config['chains'][number]['chain_id']
  >,
  options?:
    | MutateOptions<
        WriteContractData,
        WriteContractErrorType,
        WriteContractVariables<
          abi,
          functionName,
          args,
          config,
          config['chains'][number]['chain_id']
        >,
        context
      >
    | undefined,
) => void

export type WriteContractMutateAsync<
  config extends Config,
  context = unknown,
> = <
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'external'>,
  args extends ContractFunctionArgs<
    abi,
    'external',
    functionName
  >,
>(
  variables: WriteContractVariables<
    abi,
    functionName,
    args,
    config,
    config['chains'][number]['chain_id']
  >,
  options?:
    | MutateOptions<
        WriteContractData,
        WriteContractErrorType,
        WriteContractVariables<
          abi,
          functionName,
          args,
          config,
          config['chains'][number]['chain_id']
        >,
        context
      >
    | undefined,
) => Promise<WriteContractData>
