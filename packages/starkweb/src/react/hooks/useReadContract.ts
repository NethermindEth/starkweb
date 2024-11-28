'use client'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { readContractQueryOptions, type ReadContractData } from '../../core/query/readContract.js'
import type { ReadContractErrorType, ReadContractQueryFnData } from '../../core/query/readContract.js'
import type { Config } from '../../core/createConfig.js'
import type { ReadContractOptions } from '../../core/query/readContract.js'
import type { ReadContractQueryKey } from '../../core/query/readContract.js'
import type { ContractFunctionArgs, ContractFunctionParameters } from '../../types/contract.js'
import type { ContractFunctionName } from '../../types/contract.js'
import type { Abi } from '../../strk-types/abi.js'
import type { UnionCompute } from '../../core/types/utils.js'

export type UseReadContractParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<abi, 'view'> = ContractFunctionName<abi, 'view'>,
  args extends ContractFunctionArgs<abi, 'view', functionName> = ContractFunctionArgs<abi, 'view', functionName>,
  config extends Config = Config,
  selectData = ReadContractData<abi, functionName, args>,
> = UnionCompute<
  ReadContractOptions<abi, functionName, args, config> &
  ConfigParameter<config> &
  QueryParameter<
    ReadContractQueryFnData<abi, functionName, args>,
    ReadContractErrorType,
    selectData,
    ReadContractQueryKey<abi, functionName, args, config>
  >
>

export type UseReadContractReturnType<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<abi, 'view'> = ContractFunctionName<abi, 'view'>,
  args extends ContractFunctionArgs<abi, 'view', functionName> = ContractFunctionArgs<abi, 'view', functionName>,
> = UseQueryReturnType<ReadContractData<abi, functionName, args>, ReadContractErrorType>

/** Hook for reading data from a contract */
export function useReadContract<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<abi, 'view'> = ContractFunctionName<abi, 'view'>,
  args extends ContractFunctionArgs<abi, 'view', functionName> = ContractFunctionArgs<abi, 'view', functionName>,
  allFunctionNames = ContractFunctionName<abi, 'view'>,
  config extends Config = Config,
>(
  parameters: ContractFunctionParameters<abi, 'view', functionName, args, false, allFunctionNames> & ConfigParameter<config>
): UseReadContractReturnType<abi, functionName, args> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = readContractQueryOptions<abi, functionName, args, config>(
    config,
    { ...parameters, chainId } as ReadContractOptions<abi, functionName, args, config>
  )

  return useQuery(options) as UseReadContractReturnType<abi, functionName, args>
}
