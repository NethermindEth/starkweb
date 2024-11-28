import type { QueryFunctionContext, QueryOptions } from '@tanstack/query-core'
import type {
  ReadContractErrorType as strkjs_ReadContractErrorType,
  ReadContractParameters,
  ReadContractReturnType,
} from '../actions/readContract.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { UnionExactPartial } from '../types/utils.js'
import { readContract } from '../actions/readContract.js'
import type { ContractFunctionName } from '../../types/contract.js'
import type { Abi } from 'abitype'
import type { ContractFunctionArgs } from '../../exports/starkweb.js'

export type ReadContractOptions<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'view'>,
  args extends ContractFunctionArgs<abi, 'view', functionName>,
  config extends Config,
> = UnionExactPartial<ReadContractParameters<abi, functionName, args, config>> &
  ScopeKeyParameter
export type ReadContractQueryKey<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'view'>,
  args extends ContractFunctionArgs<abi, 'view', functionName>,
  config extends Config,
> = ['readContract', ReadContractOptions<abi, functionName, args, config>]
export type ReadContractData<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'view'>,
  args extends ContractFunctionArgs<abi, 'view', functionName>,
> = ReadContractReturnType<abi, functionName, args>

export function readContractQueryOptions<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'view'>,
  args extends ContractFunctionArgs<abi, 'view', functionName>,
  config extends Config,
>(
  config: Config,
  options: ReadContractOptions<abi, functionName, args, config>,
) {
  return {
    queryKey: ['readContract', options] as const,
    queryFn({ queryKey: [, options] }: QueryFunctionContext<ReadContractQueryKey<abi, functionName, args, config>>) {
      return readContract(config, options as ReadContractParameters<Abi, string, readonly unknown[], Config>)
    },
  } as const satisfies QueryOptions<
    ReadContractReturnType<abi, functionName, args>,
    ReadContractErrorType,
    ReadContractData<abi, functionName, args>,
    ReadContractQueryKey<abi, functionName, args, config>
  >
}

export type ReadContractQueryFnData<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'view'>,
  args extends ContractFunctionArgs<abi, 'view', functionName>,
> = ReadContractData<abi, functionName, args>
export type ReadContractQueryData<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'view'>,
  args extends ContractFunctionArgs<abi, 'view', functionName>,
> = ReadContractData<abi, functionName, args>
export type ReadContractErrorType = strkjs_ReadContractErrorType
