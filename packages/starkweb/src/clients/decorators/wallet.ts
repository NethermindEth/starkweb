import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'

import {
  type AddInvokeTransactionErrorType,
  type SignMessageErrorType,
  type SignMessageParameters,
  type SignMessageReturnType,
  addDeclareTransaction,
  addInvokeTransaction,
  signMessage,
} from '../../actions/index.js'
import type {
  AddDeclareTransactionErrorType,
  AddDeclareTransactionParameters,
  AddDeclareTransactionReturnType,
} from '../../actions/wallet/addDeclareTransaction.js'
import type {
  AddInvokeTransactionParameters,
  AddInvokeTransactionReturnType,
} from '../../actions/wallet/addInvokeTransaction.js'
import {
  type AddStarknetChainErrorType,
  type AddStarknetChainParameters,
  type AddStarknetChainReturnType,
  addStarknetChain,
} from '../../actions/wallet/addStarknetChain.js'
import {
  type GetDeploymentDataErrorType,
  type GetDeploymentDataParameters,
  type GetDeploymentDataReturnType,
  getDeploymentData,
} from '../../actions/wallet/getDeploymentData.js'
import {
  type GetPermissionsErrorType,
  type GetPermissionsParameters,
  type GetPermissionsReturnType,
  getPermissions,
} from '../../actions/wallet/getPermissions.js'
import {
  type RequestAccountsErrorType,
  type RequestAccountsParameters,
  type RequestAccountsReturnType,
  requestAccounts,
} from '../../actions/wallet/requestAccounts.js'
import {
  type RequestChainIdErrorType,
  type RequestChainIdParameters,
  type RequestChainIdReturnType,
  requestChainId,
} from '../../actions/wallet/requestChainId.js'
import {
  type SignTypedDataErrorType,
  type SignTypedDataParameters,
  type SignTypedDataReturnType,
  signTypedData,
} from '../../actions/wallet/signTypedData.js'
import {
  type SupportedSpecsErrorType,
  type SupportedSpecsReturnType,
  supportedSpecs,
} from '../../actions/wallet/supportedSpecs.js'
import {
  type SupportedWalletApiErrorType,
  type SupportedWalletApiReturnType,
  supportedWalletApi,
} from '../../actions/wallet/supportedWalletApi.js'
import {
  type SwitchStarknetChainErrorType,
  type SwitchStarknetChainParameters,
  type SwitchStarknetChainReturnType,
  switchStarknetChain,
} from '../../actions/wallet/switchStarknetChain.js'
import {
  type WatchAssetErrorType,
  type WatchAssetParameters,
  type WatchAssetReturnType,
  watchAsset,
} from '../../actions/wallet/watchAsset.js'
import type {
  WriteContractErrorType,
  WriteContractParameters,
  WriteContractReturnTypes,
} from '../../actions/wallet/writeContract.js'
import { writeContract } from '../../actions/wallet/writeContract.js'
import {
  type WriteContractsErrorType,
  type WriteContractsParameters,
  type WriteContractsReturnTypes,
  writeContracts,
} from '../../actions/wallet/writeContracts.js'
import type { Abi } from '../../strk-types/abi.js'
// import type { ContractFunctions } from '../../strk-types/parser.js'
import type {
  ContractFunctionArgs,
  ContractFunctionName,
} from '../../types/contract.js'

export type WalletActions = {
  addDeclareTransaction: (
    args: AddDeclareTransactionParameters,
  ) => Promise<AddDeclareTransactionReturnType | AddDeclareTransactionErrorType>
  addInvokeTransaction: (
    args: AddInvokeTransactionParameters,
  ) => Promise<AddInvokeTransactionReturnType | AddInvokeTransactionErrorType>
  addStarknetChain: (
    args: AddStarknetChainParameters,
  ) => Promise<AddStarknetChainReturnType | AddStarknetChainErrorType>
  getDeploymentData: (
    args: GetDeploymentDataParameters,
  ) => Promise<GetDeploymentDataReturnType | GetDeploymentDataErrorType>
  getPermissions: (
    args: GetPermissionsParameters,
  ) => Promise<GetPermissionsReturnType | GetPermissionsErrorType>
  requestAccounts: (
    args: RequestAccountsParameters,
  ) => Promise<RequestAccountsReturnType | RequestAccountsErrorType>
  requestChainId: (
    args: RequestChainIdParameters,
  ) => Promise<RequestChainIdReturnType | RequestChainIdErrorType>
  signTypedData: (
    args: SignTypedDataParameters,
  ) => Promise<SignTypedDataReturnType | SignTypedDataErrorType>
  signMessage: (
    args: SignMessageParameters,
  ) => Promise<SignMessageReturnType | SignMessageErrorType>
  supportedSpecs: () => Promise<
    SupportedSpecsReturnType | SupportedSpecsErrorType
  >
  supportedWalletApi: () => Promise<
    SupportedWalletApiReturnType | SupportedWalletApiErrorType
  >
  switchStarknetChain: (
    args: SwitchStarknetChainParameters,
  ) => Promise<SwitchStarknetChainReturnType | SwitchStarknetChainErrorType>
  watchAsset: (
    args: WatchAssetParameters,
  ) => Promise<WatchAssetReturnType | WatchAssetErrorType>

  /**
   * Executes a write function on a contract.
   *
   * - Docs: https://viem.sh/docs/contract/writeContract
   * - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts/writing-to-contracts
   *
   * A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, and hence a [Transaction](https://viem.sh/docs/glossary/terms) is needed to be broadcast in order to change the state.
   *
   * Internally, uses a [Wallet Client](https://viem.sh/docs/clients/wallet) to call the [`sendTransaction` action](https://viem.sh/docs/actions/wallet/sendTransaction) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData).
   *
   * __Warning: The `write` internally sends a transaction – it does not validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `contract.simulate`](https://viem.sh/docs/contract/writeContract#usage) before you execute it.__
   *
   * @param args - {@link WriteContractParameters}
   * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms#hash). {@link WriteContractReturnType}
   *
   * @example
   * import { createWalletClient, custom, parseAbi } from 'viem'
   * import { mainnet } from 'viem/chains'
   *
   * const client = createWalletClient({
   *   chain: mainnet,
   *   transport: custom(window.ethereum),
   * })
   * const hash = await client.writeContract({
   *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
   *   abi: parseAbi(['function mint(uint32 tokenId) nonpayable']),
   *   functionName: 'mint',
   *   args: [69420],
   * })
   *
   * @example
   * // With Validation
   * import { createWalletClient, custom, parseAbi } from 'viem'
   * import { mainnet } from 'viem/chains'
   *
   * const client = createWalletClient({
   *   chain: mainnet,
   *   transport: custom(window.ethereum),
   * })
   * const { request } = await client.simulateContract({
   *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
   *   abi: parseAbi(['function mint(uint32 tokenId) nonpayable']),
   *   functionName: 'mint',
   *   args: [69420],
   * }
   * const hash = await client.writeContract(request)
   */
  writeContract: <
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, 'external'>,
    args extends ContractFunctionArgs<
      abi,
      'external',
      functionName
    >,
  >(
    args: WriteContractParameters<abi, functionName, args>,
  ) => Promise<WriteContractReturnTypes | WriteContractErrorType>
  writeContracts: <abi extends Abi | readonly unknown[]>(
    args: WriteContractsParameters<abi>,
  ) => Promise<WriteContractsReturnTypes | WriteContractsErrorType>
}

export function walletActions<
  TTransport extends Transport,
  TChain extends Chain | undefined = Chain | undefined,
  TAccount extends Account | undefined = Account | undefined,
>(client: Client<TTransport, TChain, TAccount>): WalletActions {
  return {
    addDeclareTransaction: (args) => addDeclareTransaction(client, args),
    addInvokeTransaction: (args) => addInvokeTransaction(client, args),
    addStarknetChain: (args) => addStarknetChain(client, args),
    getDeploymentData: (args) => getDeploymentData(client, args),
    getPermissions: (args) => getPermissions(client, args),
    requestAccounts: (args) => requestAccounts(client, args),
    requestChainId: (args) => requestChainId(client, args),
    signTypedData: (args) => signTypedData(client, args),
    supportedSpecs: () => supportedSpecs(client),
    supportedWalletApi: () => supportedWalletApi(client),
    switchStarknetChain: (args) => switchStarknetChain(client, args),
    watchAsset: (args) => watchAsset(client, args),
    writeContract: (args) => writeContract(client, args),
    writeContracts: (args) => writeContracts(client, args),
    signMessage: (args) => signMessage(client, args),
  }
}
