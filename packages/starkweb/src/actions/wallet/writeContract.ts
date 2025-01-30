import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Abi, AbiStateMutability } from '../../strk-types/abi.js'
import { compile } from '../../strk-utils/calldata/compile.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'
import type {
  ContractFunctionArgs,
  ContractFunctionName,
  ContractFunctionParameters,
} from '../../types/contract.js'
import { type Call, addInvokeTransaction } from './addInvokeTransaction.js'

export type WriteContractParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    AbiStateMutability
  > = ContractFunctionName<abi, AbiStateMutability>,
  args extends ContractFunctionArgs<
    abi,
    AbiStateMutability,
    functionName
  > = ContractFunctionArgs<abi, AbiStateMutability, functionName>,
  ///
  allFunctionNames = ContractFunctionName<abi, AbiStateMutability>,
> = ContractFunctionParameters<
  abi,
  AbiStateMutability,
  functionName,
  args,
  false,
  allFunctionNames
>

export type WriteContractReturnTypes = any
export type WriteContractErrorType = any
/**
 * Executes a write function on a contract.
 *
 * - Docs: https://starkweb.xyz/docs/contract/writeContract
 * - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts/writing-to-contracts
 *
 * A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, and hence a [Transaction](https://starkweb.xyz/docs/glossary/terms) is needed to be broadcast in order to change the state.
 *
 * Internally, uses a [Wallet Client](https://starkweb.xyz/docs/clients/wallet) to call the [`sendTransaction` action](https://starkweb.xyz/docs/actions/wallet/sendTransaction) with [ABI-encoded `data`](https://starkweb.xyz/docs/contract/encodeFunctionData).
 *
 * __Warning: The `write` internally sends a transaction – it does not validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `contract.simulate`](https://starkweb.xyz/docs/contract/writeContract#usage) before you execute it.__
 *
 * @param client - Client to use
 * @param parameters - {@link WriteContractParameters}
 * @returns A [Transaction Hash](https://starkweb.xyz/docs/glossary/terms#hash). {@link WriteContractReturnType}
 *
 * @example
 * import { createWalletClient, custom, parseAbi } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { writeContract } from 'viem/contract'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 * const hash = await writeContract(client, {
 *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 *   abi: parseAbi(['function mint(uint32 tokenId) nonpayable']),
 *   functionName: 'mint',
 *   args: [69420],
 * })
 *
 * @example
 * // With Validation
 * import { createWalletClient, http, parseAbi } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { simulateContract, writeContract } from 'viem/contract'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const { request } = await simulateContract(client, {
 *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 *   abi: parseAbi(['function mint(uint32 tokenId) nonpayable']),
 *   functionName: 'mint',
 *   args: [69420],
 * }
 * const hash = await writeContract(client, request)
 */
export async function writeContract<
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
  > = ContractFunctionArgs<abi, 'external', functionName>,
>(
  client: Client<Transport, TChain, TAccount>,
  parameters: WriteContractParameters<abi, functionName, args>,
): Promise<WriteContractReturnTypes | WriteContractErrorType> {
  const { address, args, functionName } = parameters as WriteContractParameters

  const calldata: string[] = args ? compile(args as any[]) : []

  const txCalls: Call[] = [
    {
      contract_address: address,
      entry_point: functionName,
      calldata,
    },
  ]

  const params = {
    calls: txCalls,
  }

  return addInvokeTransaction(client, params)
}
