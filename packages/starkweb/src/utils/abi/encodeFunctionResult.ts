import {
  AbiFunctionNotFoundError,
  AbiFunctionOutputsNotFoundError,
} from '../../errors/abi.js'
import type {
  ContractFunctionName,
  ContractFunctionReturnType,
} from '../../types/contract.js'

import type { ErrorType } from '../../errors/utils.js'
import type { Hex } from '../../types/misc.js'
import type { IsNarrowable, UnionEvaluate } from '../../types/utils.js'
import {
  type EncodeAbiParametersErrorType,
  encodeAbiParameters,
} from './encodeAbiParameters.js'
import { type GetAbiItemErrorType, getAbiItem } from './getAbiItem.js'
import type { Abi, AbiStateMutability } from '../../strk-types/abi.js'
import type { ExtractAbiFunctions } from '../../strk-types/parser.js'

const docsPath = '/docs/contract/encodeFunctionResult'

export type EncodeFunctionResultParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends
    | ContractFunctionName<abi>
    | undefined = ContractFunctionName<abi>,
  ///
  hasFunctions = abi extends Abi
    ? Abi extends abi
      ? true
      : [ExtractAbiFunctions<abi>] extends [never]
        ? false
        : true
    : true,
  allFunctionNames = ContractFunctionName<abi>,
> = {
  abi: abi
  result?:
    | ContractFunctionReturnType<
        abi,
        AbiStateMutability,
        functionName extends ContractFunctionName<abi>
          ? functionName
          : ContractFunctionName<abi>,
        never // allow all args. required for overloads to work.
      >
    | undefined
} & UnionEvaluate<
  IsNarrowable<abi, Abi> extends true
    ? abi['length'] extends 1
      ? { functionName?: functionName | allFunctionNames | undefined }
      : { functionName: functionName | allFunctionNames }
    : { functionName?: functionName | allFunctionNames | undefined }
> &
  (hasFunctions extends true ? unknown : never)

export type EncodeFunctionResultReturnType = Hex

export type EncodeFunctionResultErrorType =
  | AbiFunctionOutputsNotFoundError
  | AbiFunctionNotFoundError
  | EncodeAbiParametersErrorType
  | GetAbiItemErrorType
  | ErrorType

export function encodeFunctionResult<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi> | undefined = undefined,
>(
  parameters: EncodeFunctionResultParameters<abi, functionName>,
): EncodeFunctionResultReturnType {
  const { abi, functionName, result } =
    parameters as EncodeFunctionResultParameters

  let abiItem = abi[0]
  if (functionName) {
    const item = getAbiItem({ abi, name: functionName })
    if (!item) throw new AbiFunctionNotFoundError(functionName, { docsPath })
    abiItem = item
  }

  if (abiItem!.type !== 'function')
    throw new AbiFunctionNotFoundError(undefined, { docsPath })

  if (!abiItem!.outputs)
    throw new AbiFunctionOutputsNotFoundError(abiItem!.name, { docsPath })

  let values = Array.isArray(result) ? result : [result]
  if (abiItem!.outputs.length === 0 && !values[0]) values = []

  return encodeAbiParameters(abiItem!.outputs, values)
}
