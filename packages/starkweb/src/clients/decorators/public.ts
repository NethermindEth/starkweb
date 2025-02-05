import {
  type GetStarknetIdParameters,
  type GetStarknetIdReturnType,
  getStarknetId,
} from '../../actions/starknetId/getStarknetId.js'

import {
  type GetStarknetIdAddressParameters,
  type GetStarknetIdAddressReturnType,
  getStarknetIdAddress,
} from '../../actions/starknetId/getStarknetIdAddress.js'

import {
  type GetStarknetIdExtendedUserDataParameters,
  type GetStarknetIdExtendedUserDataReturnType,
  getStarknetIdExtendedUserData,
} from '../../actions/starknetId/getStarknetIdExtendedUserData.js'

import {
  type GetStarknetIdExtendedVerifierDataParameters,
  type GetStarknetIdExtendedVerifierDataReturnType,
  getStarknetIdExtendedVerifierData,
} from '../../actions/starknetId/getStarknetIdExtendedVerifierData.js'

import {
  type GetStarknetIdNameParameters,
  type GetStarknetIdNameReturnType,
  getStarknetIdName,
} from '../../actions/starknetId/getStarknetIdName.js'

import {
  type GetStarknetIdNamesParameters,
  type GetStarknetIdNamesReturnType,
  getStarknetIdNames,
} from '../../actions/starknetId/getStarknetIdNames.js'

import {
  type GetStarknetIdPfpVerifierDataParameters,
  type GetStarknetIdPfpVerifierDataReturnType,
  getStarknetIdPfpVerifierData,
} from '../../actions/starknetId/getStarknetIdPfpVerifierData.js'

import {
  type GetStarknetIdProfileDataParameters,
  type GetStarknetIdProfileDataReturnType,
  getStarknetIdProfileData,
} from '../../actions/starknetId/getStarknetIdProfileData.js'

import {
  type GetStarknetIdStarkProfilesParameters,
  type GetStarknetIdStarkProfilesReturnType,
  getStarknetIdStarkProfiles,
} from '../../actions/starknetId/getStarknetIdStarkProfiles.js'

import {
  type GetStarknetIdUnboundedUserDataParameters,
  type GetStarknetIdUnboundedUserDataReturnType,
  getStarknetIdUnboundedUserData,
} from '../../actions/starknetId/getStarknetIdUnboundedUserData.js'

import {
  type GetStarknetIdUnboundedVerifierDataParameters,
  type GetStarknetIdUnboundedVerifierDataReturnType,
  getStarknetIdUnboundedVerifierData,
} from '../../actions/starknetId/getStarknetIdUnboundedVerifierData.js'

import {
  type GetStarknetIdUserDataParameters,
  type GetStarknetIdUserDataReturnType,
  getStarknetIdUserData,
} from '../../actions/starknetId/getStarknetIdUserData.js'

import {
  type GetStarknetIdVerifierDataParameters,
  type GetStarknetIdVerifierDataReturnType,
  getStarknetIdVerifierData,
} from '../../actions/starknetId/getStarknetIdVerifierData.js'

import {
  type AddDeclareTransactionParameters,
  type AddDeclareTransactionReturnTypes,
  addDeclareTransaction,
} from '../../actions/public/addDeclareTransaction.js'
import {
  type AddDeployAccountTransactionParameters,
  type AddDeployAccountTransactionReturnTypes,
  addDeployAccountTransaction,
} from '../../actions/public/addDeployAccountTransaction.js'
import {
  type AddInvokeTransactionParameters,
  type AddInvokeTransactionReturnTypes,
  addInvokeTransaction,
} from '../../actions/public/addInvokeTransaction.js'
import {
  type CallParameters,
  type CallReturnType,
  call,
} from '../../actions/public/call.js'
import {
  type EstimateFeeParameters,
  type EstimateFeeReturnTypes,
  estimateFee,
} from '../../actions/public/estimateFee.js'
import {
  type EstimateMessageFeeParameters,
  type EstimateMessageFeeReturnTypes,
  estimateMessageFee,
} from '../../actions/public/estimateMessageFee.js'
import {
  type GetBalanceErrorType,
  type GetBalanceParameters,
  type GetBalanceReturnTypes,
  getBalance,
} from '../../actions/public/getBalance.js'
import {
  type GetBlockHashAndNumberReturnTypes,
  getBlockHashAndNumber,
} from '../../actions/public/getBlockHashAndNumber.js'
import {
  type GetBlockNumberParameters,
  type GetBlockNumberReturnType,
  getBlockNumber,
} from '../../actions/public/getBlockNumber.js'
import {
  type GetBlockStateUpdateParameters,
  type GetBlockStateUpdateReturnType,
  getBlockStateUpdate,
} from '../../actions/public/getBlockStateUpdate.js'
import {
  type GetBlockTransactionCountParameters,
  type GetBlockTransactionCountReturnType,
  getBlockTransactionCount,
} from '../../actions/public/getBlockTransactionCount.js'
import {
  type GetBlockTransactionsTracesParameters,
  type GetBlockTransactionsTracesReturnTypes,
  getBlockTransactionsTraces,
} from '../../actions/public/getBlockTransactionsTraces.js'
import {
  type GetBlockWithReceiptsParameters,
  type GetBlockWithReceiptsReturnType,
  getBlockWithReceipts,
} from '../../actions/public/getBlockWithReceipts.js'
import {
  type GetBlockWithTxHashesParameters,
  type GetBlockWithTxHashesReturnType,
  getBlockWithTxHashes,
} from '../../actions/public/getBlockWithTxHashes.js'
import {
  type GetBlockWithTxsParameters,
  type GetBlockWithTxsReturnType,
  getBlockWithTxs,
} from '../../actions/public/getBlockWithTxs.js'
import {
  type GetChainIdReturnType,
  getChainId,
} from '../../actions/public/getChainId.js'
import {
  type GetClassParameters,
  type GetClassReturnTypes,
  getClass,
} from '../../actions/public/getClass.js'
import {
  type GetClassAtParameters,
  type GetClassAtReturnType,
  getClassAt,
} from '../../actions/public/getClassAt.js'
import {
  type GetClassHashAtParameters,
  type GetClassHashAtReturnTypes,
  getClassHashAt,
} from '../../actions/public/getClassHashAt.js'
import {
  type GetEventsParameters,
  type GetEventsReturnTypes,
  getEvents,
} from '../../actions/public/getEvents.js'
import {
  type GetNonceParameters,
  type GetNonceReturnTypes,
  getNonce,
} from '../../actions/public/getNonce.js'
import {
  type GetSpecVersionReturnType,
  getSpecVersion,
} from '../../actions/public/getSpecVersion.js'
import {
  type GetStorageAtParameters,
  type GetStorageAtReturnType,
  getStorageAt,
} from '../../actions/public/getStorageAt.js'
import {
  type GetTraceTransactionParameters,
  type GetTraceTransactionReturnTypes,
  getTraceTransaction,
} from '../../actions/public/getTraceTransaction.js'
import {
  type GetTransactionByBlockIdAndIndexParameters,
  type GetTransactionByBlockIdAndIndexReturnTypes,
  getTransactionByBlockIdAndIndex,
} from '../../actions/public/getTransactionByBlockIdAndIndex.js'
import {
  type GetTransactionByHashParameters,
  type GetTransactionByHashReturnTypes,
  getTransactionByHash,
} from '../../actions/public/getTransactionByHash.js'
import {
  type GetTransactionReceiptParameters,
  type GetTransactionReceiptReturnType,
  getTransactionReceipt,
} from '../../actions/public/getTransactionReceipt.js'
import {
  type GetTransactionStatusParameters,
  type GetTransactionStatusReturnType,
  getTransactionStatus,
} from '../../actions/public/getTransactionStatus.js'
import {
  type ReadContractErrorType,
  type ReadContractParameters,
  type ReadContractReturnType,
  readContract,
} from '../../actions/public/readContract.js'
import {
  type ReadContractsErrorType,
  type ReadContractsParameters,
  type ReadContractsReturnTypes,
  readContracts,
} from '../../actions/public/readContracts.js'
import {
  type SimulateTransactionParameters,
  type SimulateTransactionReturnTypes,
  simulateTransaction,
} from '../../actions/public/simulateTransaction.js'
import {
  type SyncingReturnTypes,
  syncing,
} from '../../actions/public/syncing.js'
import {
  type VerifyMessageErrorType,
  type VerifyMessageParameters,
  type VerifyMessageReturnType,
  verifyMessage,
} from '../../actions/public/verifyMessage.js'
import {
  type WatchBlockNumberParameters,
  type WatchBlockNumberReturnType,
  watchBlockNumber,
} from '../../actions/public/watchBlockNumber.js'
import {
  type VerifySiwsDataErrorType,
  type VerifySiwsDataParameters,
  type VerifySiwsDataReturnType,
  verifySiwsData,
} from '../../actions/siws/verifySiwsData.js'
import {
  type VerifySiwsMessageErrorType,
  type VerifySiwsMessageParameters,
  type VerifySiwsMessageReturnType,
  verifySiwsMessage,
} from '../../actions/siws/verifySiwsMessage.js'
import type { Client } from '../createClient.js'
import type { ContractFunctionArgs, ContractFunctionName } from '../../types/contract.js'
import type { Abi } from '../../strk-types/abi.js'

export type PublicActions = {
  /**
   * Returns the number of the most recent block seen.
   *
   * - Docs: https://strk.sh/docs/actions/public/getBlockNumber
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/blocks/fetching-blocks
   * - JSON-RPC Methods: [`starknet_blockNumber`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_blocknumber)
   *
   * @param args - {@link CallParameters}
   * @returns The number of the block. {@link CallReturnType}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const blockNumber = await client.call()
   * // 69420n
   */
  call: (args: CallParameters) => Promise<CallReturnType>

  getBalance: (
    args: GetBalanceParameters,
  ) => Promise<GetBalanceReturnTypes | GetBalanceErrorType>

  /**
   * Returns the number of the most recent block seen.
   *
   * - Docs: https://strk.sh/docs/actions/public/getBlockNumber
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/blocks/fetching-blocks
   * - JSON-RPC Methods: [`starknet_blockNumber`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_blocknumber)
   *
   * @param args - {@link GetBlockNumberParameters}
   * @returns The number of the block. {@link GetBlockNumberReturnType}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const blockNumber = await client.getBlockNumber()
   * // 69420n
   */
  getBlockNumber: (
    args?: GetBlockNumberParameters | undefined,
  ) => Promise<GetBlockNumberReturnType>

  /**
   * Returns the block with transaction hashes.
   *
   * - Docs: https://strk.sh/docs/actions/public/getBlockWithTxHashes
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/blocks/fetching-blocks-with-tx-hashes
   * - JSON-RPC Methods: [`starknet_getBlockWithTxHashes`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_getblockwithtxhashes)
   *
   * @param args - {@link GetBlockWithTxHashesParameters}
   * @returns The block with transaction hashes. {@link GetBlockWithTxHashesReturnType}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const blockWithTxHashes = await client.getBlockWithTxHashes({ blockNumber: 12345 })
   * // { blockNumber: 12345, transactions: ['0x...', '0x...'] }
   */
  getBlockWithReceipts: (
    args?: GetBlockWithReceiptsParameters | undefined,
  ) => Promise<GetBlockWithReceiptsReturnType>
  /**
   * Returns the block with transaction hashes.
   *
   * - Docs: https://strk.sh/docs/actions/public/getBlockWithTxHashes
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/blocks/fetching-blocks-with-tx-hashes
   * - JSON-RPC Methods: [`starknet_getBlockWithTxHashes`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_getblockwithtxhashes)
   *
   * @param args - {@link GetBlockWithTxHashesParameters}
   * @returns The block with transaction hashes. {@link GetBlockWithTxHashesReturnType}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const blockWithTxHashes = await client.getBlockWithTxHashes({ blockNumber: 12345 })
   * // { blockNumber: 12345, transactions: ['0x...', '0x...'] }
   */
  getBlockWithTxs: (
    args?: GetBlockWithTxsParameters | undefined,
  ) => Promise<GetBlockWithTxsReturnType>
  /**
   * Returns the block with transactions.
   *
   * - Docs: https://strk.sh/docs/actions/public/getBlockWithTxHashes
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/blocks/fetching-blocks-with-tx-hashes
   * - JSON-RPC Methods: [`starknet_getBlockWithTxHashes`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_getblockwithtxhashes)
   *
   * @param args - {@link GetBlockWithTxHashesParameters}
   * @returns The block with transaction hashes. {@link GetBlockWithTxHashesReturnType}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const blockWithTxHashes = await client.getBlockWithTxHashes({ blockNumber: 12345 })
   * // { blockNumber: 12345, transactions: ['0x...', '0x...'] }
   */
  getBlockWithTxHashes: (
    args?: GetBlockWithTxHashesParameters | undefined,
  ) => Promise<GetBlockWithTxHashesReturnType>

  /**
   * Returns the class at a specific address.
   *
   * - Docs: https://strk.sh/docs/actions/public/getClassAt
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/classes/fetching-class-at
   * - JSON-RPC Methods: [`starknet_getClassAt`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_getclassat)
   *
   * @param args - {@link GetClassAtParameters}
   * @returns The class at the specified address. {@link GetClassAtReturnType}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const classAt = await client.getClassAt({ address: '0x...' })
   * // { classHash: '0x...', abi: [...] }
   */
  getClassAt: (args: GetClassAtParameters) => Promise<GetClassAtReturnType>

  /**
   * Returns the spec version.
   *
   * - Docs: https://strk.sh/docs/actions/public/getSpecVersion
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/spec/fetching-spec-version
   * - JSON-RPC Methods: [`starknet_getSpecVersion`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_getspecversion)
   *
   * @returns The spec version. {@link GetSpecVersionReturnType}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const specVersion = await client.getSpecVersion()
   * // '0.1.0'
   */
  getSpecVersion: () => Promise<GetSpecVersionReturnType>

  /**
   * Returns the chain ID.
   *
   * - Docs: https://strk.sh/docs/actions/public/getChainId
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/chains/fetching-chain-id
   * - JSON-RPC Methods: [`starknet_chainId`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_chainid)
   *
   * @returns The chain ID. {@link GetChainIdReturnType}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const chainId = await client.getChainId()
   * // 1
   */
  getChainId: () => Promise<GetChainIdReturnType>

  /**
   * Returns the block state update.
   *
   * - Docs: https://strk.sh/docs/actions/public/getBlockStateUpdate
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/blocks/fetching-block-state-update
   * - JSON-RPC Methods: [`starknet_getBlockStateUpdate`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_getblockstateupdate)
   *
   * @param args - {@link GetBlockStateUpdateParameters}
   * @returns The block state update. {@link GetBlockStateUpdateReturnType}
   *
   */
  getBlockStateUpdate: (
    args: GetBlockStateUpdateParameters,
  ) => Promise<GetBlockStateUpdateReturnType>

  /**
   * Returns the transaction by hash.
   *
   * - Docs: https://strk.sh/docs/actions/public/getTransactionByHash
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/transactions/fetching-transaction-by-hash
   * - JSON-RPC Methods: [`starknet_getTransactionByHash`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_blocknumber)
   *
   * @param args - {@link GetTransactionByHashParameters}
   * @returns The transaction by hash. {@link GetTransactionByHashReturnTypes}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const transactionByHash = await client.getTransactionByHash({
   *   transaction_hash: '0x7641514f46a77013e80215cdce2e55d5aca49c13428b885c7ecb9d3ddb4ab11',
   * })
   * // { transaction_hash: '0x7641514f46a77013e80215cdce2e55d5aca49c13428b885c7ecb9d3ddb4ab11' }
   */
  getStorageAt: (
    args: GetStorageAtParameters,
  ) => Promise<GetStorageAtReturnType>
  /**
   * Returns the transaction by hash.
   *
   * - Docs: https://strk.sh/docs/actions/public/getTransactionByHash
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/transactions/fetching-transaction-by-hash
   * - JSON-RPC Methods: [`starknet_getTransactionByHash`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_blocknumber)
   *
   * @param args - {@link GetTransactionByHashParameters}
   * @returns The transaction by hash. {@link GetTransactionByHashReturnTypes}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const transactionByHash = await client.getTransactionByHash({
   *   transaction_hash: '0x7641514f46a77013e80215cdce2e55d5aca49c13428b885c7ecb9d3ddb4ab11',
   * })
   * // { transaction_hash: '0x7641514f46a77013e80215cdce2e55d5aca49c13428b885c7ecb9d3ddb4ab11' }
   */
  getTransactionByHash: (
    args: GetTransactionByHashParameters,
  ) => Promise<GetTransactionByHashReturnTypes>
  /**
   * Returns the transaction by hash.
   *
   * - Docs: https://strk.sh/docs/actions/public/getTransactionByHash
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/transactions/fetching-transaction-by-hash
   * - JSON-RPC Methods: [`starknet_getTransactionByHash`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_blocknumber)
   *
   * @param args - {@link GetTransactionByHashParameters}
   * @returns The transaction by hash. {@link GetTransactionByHashReturnTypes}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const transactionByHash = await client.getTransactionByHash({
   *   transaction_hash: '0x7641514f46a77013e80215cdce2e55d5aca49c13428b885c7ecb9d3ddb4ab11',
   * })
   * // { transaction_hash: '0x7641514f46a77013e80215cdce2e55d5aca49c13428b885c7ecb9d3ddb4ab11' }
   */
  getTransactionStatus: (
    args: GetTransactionStatusParameters,
  ) => Promise<GetTransactionStatusReturnType>

  /**
   * Returns the transaction receipt.
   *
   * - Docs: https://strk.sh/docs/actions/public/getTransactionReceipt
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/transactions/fetching-transaction-receipt
   * - JSON-RPC Methods: [`starknet_getTransactionReceipt`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_gettransactionreceipt)
   *
   * @param args - {@link GetTransactionReceiptParameters}
   * @returns The transaction receipt. {@link GetTransactionReceiptReturnType}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const transactionReceipt = await client.getTransactionReceipt({
   *   transaction_hash: '0x7641514f46a77013e80215cdce2e55d5aca49c13428b885c7ecb9d3ddb4ab11',
   * })
   * // { status: 'success', transaction_hash: '0x7641514f46a77013e80215cdce2e55d5aca49c13428b885c7ecb9d3ddb4ab11' }
   */
  getTransactionReceipt: (
    args: GetTransactionReceiptParameters,
  ) => Promise<GetTransactionReceiptReturnType>

  /**
   * Returns the transaction by block id and index.
   *
   * - Docs: https://strk.sh/docs/actions/public/getTransactionByBlockIdAndIndex
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/transactions/fetching-transaction-by-hash
   * - JSON-RPC Methods: [`starknet_getTransactionByHash`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_blocknumber)
   *
   * @param args - {@link GetTransactionByBlockIdAndIndexParameters}
   * @returns The transaction by block id and index. {@link GetTransactionByBlockIdAndIndexReturnTypes}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const transactionByBlockIdAndIndex = await client.getTransactionByBlockIdAndIndex({
   *   block_tag: 'latest',
   *   index: 0,
   * })
   * // { transaction_hash: '0x7641514f46a77013e80215cdce2e55d5aca49c13428b885c7ecb9d3ddb4ab11' }
   */
  getTransactionByBlockIdAndIndex: (
    args: GetTransactionByBlockIdAndIndexParameters,
  ) => Promise<GetTransactionByBlockIdAndIndexReturnTypes>
  /**
   * Returns the class.
   *
   * - Docs: https://strk.sh/docs/actions/public/getClass
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/classes/fetching-class
   * - JSON-RPC Methods: [`starknet_getClass`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_getclass)
   *
   * @param args - {@link GetClassParameters}
   * @returns The class. {@link GetClassReturnTypes}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const class = await client.getClass({ classHash: '0x...' })
   * // { classHash: '0x...', abi: [...] }
   */
  getClass: (args: GetClassParameters) => Promise<GetClassReturnTypes>

  /**
   * Returns the class hash at a specific address.
   *
   * - Docs: https://strk.sh/docs/actions/public/getClassHashAt
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/classes/fetching-class-hash-at
   * - JSON-RPC Methods: [`starknet_getClassHashAt`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_getclasshashat)
   *
   * @param args - {@link GetClassHashAtParameters}
   * @returns The class hash at the specified address. {@link GetClassHashAtReturnTypes}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const classHashAt = await client.getClassHashAt({ address: '0x...' })
   * // { classHash: '0x...' }
   */
  getClassHashAt: (
    args: GetClassHashAtParameters,
  ) => Promise<GetClassHashAtReturnTypes>

  /**
   * Estimates the fee for a transaction.
   *
   * - Docs: https://strk.sh/docs/actions/public/estimateFee
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/transactions/estimating-fee
   * - JSON-RPC Methods: [`starknet_estimateFee`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_estimatefee)
   *
   * @param args - {@link EstimateFeeParameters}
   * @returns The estimated fee. {@link EstimateFeeReturnTypes}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const fee = await client.estimateFee({ transaction: { ... } })
   * // { gas: 21000, fee: 0.01 }
   */
  estimateFee: (args: EstimateFeeParameters) => Promise<EstimateFeeReturnTypes>

  /**
   * Estimates the fee for a message.
   *
   * - Docs: https://strk.sh/docs/actions/public/estimateMessageFee
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/messages/estimating-message-fee
   * - JSON-RPC Methods: [`starknet_estimateMessageFee`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_estimatemessagefee)
   *
   * @param args - {@link EstimateMessageFeeParameters}
   * @returns The estimated message fee. {@link EstimateMessageFeeReturnTypes}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const messageFee = await client.estimateMessageFee({ message: { ... } })
   * // { gas: 21000, fee: 0.01 }
   */
  estimateMessageFee: (
    args: EstimateMessageFeeParameters,
  ) => Promise<EstimateMessageFeeReturnTypes>

  /**
   * Returns the block hash and number.
   *
   * - Docs: https://strk.sh/docs/actions/public/getBlockHashAndNumber
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/blocks/fetching-block-hash-and-number
   * - JSON-RPC Methods: [`starknet_getBlockHashAndNumber`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_getblockhashandnumber)
   *
   * @returns The block hash and number. {@link GetBlockHashAndNumberReturnTypes}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const blockHashAndNumber = await client.getBlockHashAndNumber()
   * // { blockHash: '0x...', blockNumber: 12345 }
   */
  getBlockHashAndNumber: () => Promise<GetBlockHashAndNumberReturnTypes>

  /**
   * Returns the syncing status.
   *
   * - Docs: https://strk.sh/docs/actions/public/syncing
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/syncing/fetching-syncing-status
   * - JSON-RPC Methods: [`starknet_syncing`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_syncing)
   *
   * @returns The syncing status. {@link SyncingReturnTypes}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const syncingStatus = await client.syncing()
   * // { startingBlock: 12345, currentBlock: 12346, highestBlock: 12347 }
   */
  syncing: () => Promise<SyncingReturnTypes>

  /**
   * Returns the events.
   *
   * - Docs: https://strk.sh/docs/actions/public/getEvents
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/events/fetching-events
   * - JSON-RPC Methods: [`starknet_getEvents`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_getevents)
   *
   * @param args - {@link GetEventsParameters}
   * @returns The events. {@link GetEventsReturnTypes}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const events = await client.getEvents({ fromBlock: 12345, toBlock: 12346 })
   * // [{ event: '0x...', data: [...] }]
   */
  getEvents: (args: GetEventsParameters) => Promise<GetEventsReturnTypes>

  /**
   * Returns the nonce.
   *
   * - Docs: https://strk.sh/docs/actions/public/getNonce
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/nonce/fetching-nonce
   * - JSON-RPC Methods: [`starknet_getNonce`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_getnonce)
   *
   * @param args - {@link GetNonceParameters}
   * @returns The nonce. {@link GetNonceReturnTypes}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const nonce = await client.getNonce({ address: '0x...' })
   * // 1
   */
  getNonce: (args: GetNonceParameters) => Promise<GetNonceReturnTypes>

  /**
   * Returns the number of transactions in a block.
   *
   * - Docs: https://strk.sh/docs/actions/public/getBlockTransactionCount
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/transactions/fetching-transaction-receipt
   * - JSON-RPC Methods: [`starknet_getTransactionReceipt`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_gettransactionreceipt)
   *
   * @param args - {@link GetBlockTransactionCountParameters}
   * @returns The transaction receipt. {@link GetBlockTransactionCountReturnType}
   *
   * @example
   * import { createPublicClient, http } from 'strkjs'
   * import { mainnet } from 'strkjs/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const transactionReceipt = await client.getBlockTransactionCount({
   *   block_hash: '0x7641514f46a77013e80215cdce2e55d5aca49c13428b885c7ecb9d3ddb4ab11',
   * })
   * // { transaction_hash: '0x7641514f46a77013e80215cdce2e55d5aca49c13428b885c7ecb9d3ddb4ab11' }
   */
  getBlockTransactionCount: (
    args: GetBlockTransactionCountParameters,
  ) => Promise<GetBlockTransactionCountReturnType>

  /**
   * Returns the trace of a transaction.
   *
   * - Docs: https://strk.sh/docs/actions/public/getTraceTransaction
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/transactions/fetching-trace-transaction
   * - JSON-RPC Methods: [`starknet_getTraceTransaction`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_gettracetransaction)
   *
   * @param args - {@link GetTraceTransactionParameters}
   * @returns The trace of the transaction. {@link GetTraceTransactionReturnTypes}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const traceTransaction = await client.getTraceTransaction({ transactionHash: '0x...' })
   * // { trace: [...] }
   */
  getTraceTransaction: (
    args: GetTraceTransactionParameters,
  ) => Promise<GetTraceTransactionReturnTypes>

  /**
   * Returns the traces of transactions in a block.
   *
   * - Docs: https://strk.sh/docs/actions/public/getBlockTransactionsTraces
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/blocks/fetching-block-transactions-traces
   * - JSON-RPC Methods: [`starknet_getBlockTransactionsTraces`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_getblocktransactionstraces)
   *
   * @param args - {@link GetBlockTransactionsTracesParameters}
   * @returns The traces of transactions in the block. {@link GetBlockTransactionsTracesReturnTypes}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const blockTransactionsTraces = await client.getBlockTransactionsTraces({ blockHash: '0x...' })
   * // { traces: [...] }
   */
  getBlockTransactionsTraces: (
    args: GetBlockTransactionsTracesParameters,
  ) => Promise<GetBlockTransactionsTracesReturnTypes>

  /**
   * Simulates a transaction.
   *
   * - Docs: https://strk.sh/docs/actions/public/simulateTransaction
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/transactions/simulating-transaction
   * - JSON-RPC Methods: [`starknet_simulateTransaction`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_simulatetransaction)
   *
   * @param args - {@link SimulateTransactionParameters}
   * @returns The simulation result. {@link SimulateTransactionReturnTypes}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const simulationResult = await client.simulateTransaction({ transaction: { ... } })
   * // { result: [...] }
   */
  simulateTransaction: (
    args: SimulateTransactionParameters,
  ) => Promise<SimulateTransactionReturnTypes>

  /**
   * Adds an invoke transaction.
   *
   * - Docs: https://strk.sh/docs/actions/public/addInvokeTransaction
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/transactions/adding-invoke-transaction
   * - JSON-RPC Methods: [`starknet_addInvokeTransaction`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_addinvoketransaction)
   *
   * @param args - {@link AddInvokeTransactionParameters}
   * @returns The result of adding the invoke transaction. {@link AddInvokeTransactionReturnTypes}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const result = await client.addInvokeTransaction({ transaction: { ... } })
   * // { transactionHash: '0x...' }
   */
  addInvokeTransaction: (
    args: AddInvokeTransactionParameters,
  ) => Promise<AddInvokeTransactionReturnTypes>

  /**
   * Adds a declare transaction.
   *
   * - Docs: https://strk.sh/docs/actions/public/addDeclareTransaction
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/transactions/adding-declare-transaction
   * - JSON-RPC Methods: [`starknet_addDeclareTransaction`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_adddeclaretransaction)
   *
   * @param args - {@link AddDeclareTransactionParameters}
   * @returns The result of adding the declare transaction. {@link AddDeclareTransactionReturnTypes}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const result = await client.addDeclareTransaction({ transaction: { ... } })
   * // { transactionHash: '0x...' }
   */
  addDeclareTransaction: (
    args: AddDeclareTransactionParameters,
  ) => Promise<AddDeclareTransactionReturnTypes>

  /**
   * Adds a deploy account transaction.
   *
   * - Docs: https://strk.sh/docs/actions/public/addDeployAccountTransaction
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/transactions/adding-deploy-account-transaction
   * - JSON-RPC Methods: [`starknet_addDeployAccountTransaction`](https://docs.starknet.io/api-references/json-rpc-api-reference#starknet_adddeployaccounttransaction)
   *
   * @param args - {@link AddDeployAccountTransactionParameters}
   * @returns The result of adding the deploy account transaction. {@link AddDeployAccountTransactionReturnTypes}
   *
   * @example
   * import { createPublicClient, http } from 'strk'
   * import { mainnet } from 'strk/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const result = await client.addDeployAccountTransaction({ transaction: { ... } })
   * // { transactionHash: '0x...' }
   */
  addDeployAccountTransaction: (
    args: AddDeployAccountTransactionParameters,
  ) => Promise<AddDeployAccountTransactionReturnTypes>

  /**
   * Watches and returns incoming block numbers.
   *
   * - Docs: https://strk.sh/docs/actions/public/watchBlockNumber
   * - Examples: https://stackblitz.com/github/wevm/starkweb/tree/main/examples/blocks/watching-blocks
   * - JSON-RPC Methods:
   *   - When `poll: true`, calls [`eth_blockNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber) on a polling interval.
   *   - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newHeads"` event.
   */
  watchBlockNumber: (
    args: WatchBlockNumberParameters,
  ) => WatchBlockNumberReturnType

  getStarknetId: (
    args: GetStarknetIdParameters,
  ) => Promise<GetStarknetIdReturnType>
  getStarknetIdAddress: (
    args: GetStarknetIdAddressParameters,
  ) => Promise<GetStarknetIdAddressReturnType>
  getStarknetIdExtendedUserData: (
    args: GetStarknetIdExtendedUserDataParameters,
  ) => Promise<GetStarknetIdExtendedUserDataReturnType>
  getStarknetIdExtendedVerifierData: (
    args: GetStarknetIdExtendedVerifierDataParameters,
  ) => Promise<GetStarknetIdExtendedVerifierDataReturnType>
  getStarknetIdName: (
    args: GetStarknetIdNameParameters,
  ) => Promise<GetStarknetIdNameReturnType>
  getStarknetIdNames: (
    args: GetStarknetIdNamesParameters,
  ) => Promise<GetStarknetIdNamesReturnType>
  getStarknetIdPfpVerifierData: (
    args: GetStarknetIdPfpVerifierDataParameters,
  ) => Promise<GetStarknetIdPfpVerifierDataReturnType>
  getStarknetIdProfileData: (
    args: GetStarknetIdProfileDataParameters,
  ) => Promise<GetStarknetIdProfileDataReturnType>
  getStarknetIdStarkProfiles: (
    args: GetStarknetIdStarkProfilesParameters,
  ) => Promise<GetStarknetIdStarkProfilesReturnType>
  getStarknetIdUnboundedUserData: (
    args: GetStarknetIdUnboundedUserDataParameters,
  ) => Promise<GetStarknetIdUnboundedUserDataReturnType>
  getStarknetIdUnboundedVerifierData: (
    args: GetStarknetIdUnboundedVerifierDataParameters,
  ) => Promise<GetStarknetIdUnboundedVerifierDataReturnType>
  getStarknetIdUserData: (
    args: GetStarknetIdUserDataParameters,
  ) => Promise<GetStarknetIdUserDataReturnType>
  getStarknetIdVerifierData: (
    args: GetStarknetIdVerifierDataParameters,
  ) => Promise<GetStarknetIdVerifierDataReturnType>
  readContract: <
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, 'view'>,
  >(
    args: ReadContractParameters<abi, functionName>,
  ) => Promise<ReadContractReturnType<abi, functionName> | ReadContractErrorType>

  readContracts: <
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, 'view'>,
    args extends ContractFunctionArgs<
      abi,
      'view',
      functionName
    >,
  >(
    args: ReadContractsParameters<abi, functionName, args>,
  ) => Promise<ReadContractsReturnTypes | ReadContractsErrorType>

  verifySiwsData: (
    args: VerifySiwsDataParameters,
  ) => Promise<VerifySiwsDataReturnType | VerifySiwsDataErrorType>

  verifySiwsMessage: (
    args: VerifySiwsMessageParameters,
  ) => Promise<VerifySiwsMessageReturnType | VerifySiwsMessageErrorType>
  verifyMessage: (
    args: VerifyMessageParameters,
  ) => Promise<VerifyMessageReturnType | VerifyMessageErrorType>
}

export function publicActions(
  client: Client
): PublicActions {
  return {
    call: (args) => call(client, args),
    getBalance: (args) => getBalance(client, args),
    getBlockNumber: (args) => getBlockNumber(client, args),
    getBlockWithTxHashes: (args) => getBlockWithTxHashes(client, args),
    getBlockWithTxs: (args) => getBlockWithTxs(client, args),
    getBlockWithReceipts: (args) => getBlockWithReceipts(client, args),
    getChainId: () => getChainId(client),
    getClassAt: (args) => getClassAt(client, args),
    getSpecVersion: () => getSpecVersion(client),
    getStorageAt: (args) => getStorageAt(client, args),
    getBlockStateUpdate: (args) => getBlockStateUpdate(client, args),
    getTransactionStatus: (args) => getTransactionStatus(client, args),
    getTransactionByHash: (args) => getTransactionByHash(client, args),
    getTransactionReceipt: (args) => getTransactionReceipt(client, args),
    getTransactionByBlockIdAndIndex: (args) =>
      getTransactionByBlockIdAndIndex(client, args),
    getClass: (args) => getClass(client, args),
    getClassHashAt: (args) => getClassHashAt(client, args),
    estimateFee: (args) => estimateFee(client, args),
    estimateMessageFee: (args) => estimateMessageFee(client, args),
    getBlockHashAndNumber: () => getBlockHashAndNumber(client),
    syncing: () => syncing(client),
    getEvents: (args) => getEvents(client, args),
    getNonce: (args) => getNonce(client, args),
    getBlockTransactionCount: (args) => getBlockTransactionCount(client, args),
    getTraceTransaction: (args) => getTraceTransaction(client, args),
    getBlockTransactionsTraces: (args) =>
      getBlockTransactionsTraces(client, args),
    simulateTransaction: (args) => simulateTransaction(client, args),
    addInvokeTransaction: (args) => addInvokeTransaction(client, args),
    addDeclareTransaction: (args) => addDeclareTransaction(client, args),
    addDeployAccountTransaction: (args) =>
      addDeployAccountTransaction(client, args),
    watchBlockNumber: (args) => watchBlockNumber(client, args),
    getStarknetId: (args) => getStarknetId(client, args),
    getStarknetIdAddress: (args) => getStarknetIdAddress(client, args),
    getStarknetIdExtendedUserData: (args) =>
      getStarknetIdExtendedUserData(client, args),
    getStarknetIdExtendedVerifierData: (args) =>
      getStarknetIdExtendedVerifierData(client, args),
    getStarknetIdName: (args) => getStarknetIdName(client, args),
    getStarknetIdNames: (args) => getStarknetIdNames(client, args),
    getStarknetIdPfpVerifierData: (args) =>
      getStarknetIdPfpVerifierData(client, args),
    getStarknetIdProfileData: (args) => getStarknetIdProfileData(client, args),
    getStarknetIdStarkProfiles: (args) =>
      getStarknetIdStarkProfiles(client, args),
    getStarknetIdUnboundedUserData: (args) =>
      getStarknetIdUnboundedUserData(client, args),
    getStarknetIdUnboundedVerifierData: (args) =>
      getStarknetIdUnboundedVerifierData(client, args),
    getStarknetIdUserData: (args) => getStarknetIdUserData(client, args),
    getStarknetIdVerifierData: (args) =>
      getStarknetIdVerifierData(client, args),
    readContract: (args) => readContract(client, args),
    readContracts: (args) => readContracts(client, args),
    verifySiwsData: (args) => verifySiwsData(client, args),
    verifySiwsMessage: (args) => verifySiwsMessage(client, args),
    verifyMessage: (args) => verifyMessage(client, args),
  }
}
