import type { ContractFunctionArgs, ContractFunctionName } from '../../abi/parser.js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Abi } from '../../strk-types/abi.js'
import { compile } from '../../strk-utils/calldata/compile.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'
import { type Call, addInvokeTransaction } from './addInvokeTransaction.js'
import type { WriteContractParameters } from './writeContract.js'

export type WriteContractsParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'external'
  > = ContractFunctionName<abi, 'external'>,
  args extends ContractFunctionArgs<
    abi,
    'external',
    functionName
  > = ContractFunctionArgs<abi, 'external', functionName>,
  allFunctionNames = ContractFunctionName<abi, 'external'>
> = {
  contracts: WriteContractParameters<abi, functionName, args, allFunctionNames>[]
}

export type WriteContractsReturnTypes = any
export type WriteContractsErrorType = any

export async function writeContracts<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'external'
  > = ContractFunctionName<abi, 'external'>,
  args extends ContractFunctionArgs<
    abi,
    'external',
    functionName
  > = ContractFunctionArgs<abi, 'external', functionName>
>(
  client: Client<Transport, TChain, TAccount>,
  parameters: WriteContractsParameters<abi, functionName, args>,
): Promise<WriteContractsReturnTypes | WriteContractsErrorType> {
  const { contracts } = parameters as WriteContractsParameters

  const txCalls: Call[] = contracts.map((writeParams) => {
    const { address, functionName, args } = writeParams
    const calldata: string[] = args ? compile(args as any[]) : []

    return {
      contract_address: address,
      entry_point: functionName as string,
      calldata,
    }
  })

  const params = {
    calls: txCalls,
  }

  return addInvokeTransaction(client, params)
}
