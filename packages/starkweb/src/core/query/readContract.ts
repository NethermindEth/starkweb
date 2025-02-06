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

export type ReadContractOptions<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'view'>,
> = UnionExactPartial<ReadContractParameters<abi, functionName>> &
  ScopeKeyParameter
export type ReadContractQueryKey<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'view'>,
> = ['readContract', ReadContractOptions<abi, functionName>]
export type ReadContractData<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'view'>,
> = ReadContractReturnType<abi, functionName>

export function readContractQueryOptions<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'view'>,
>(
  config: Config,
  options: ReadContractOptions<abi, functionName>,
) {
  return {
    queryKey: ['readContract', options] as const,
    queryFn({ queryKey: [, options] }: QueryFunctionContext<ReadContractQueryKey<abi, functionName>>) {
      return readContract(config, options as ReadContractParameters<abi, functionName>)
    },
  } as const satisfies QueryOptions<
    ReadContractReturnType<abi, functionName>,
    ReadContractErrorType,
    ReadContractData<abi, functionName>,
    ReadContractQueryKey<abi, functionName>
  >
}

export type ReadContractQueryFnData<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'view'>,
> = ReadContractData<abi, functionName>
export type ReadContractQueryData<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'view'>,
> = ReadContractData<abi, functionName>
export type ReadContractErrorType = strkjs_ReadContractErrorType
