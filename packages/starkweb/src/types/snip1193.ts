import type { PADDED_FELT, PADDED_TXN_HASH } from '@starknet-io/types-js'
import type {
  AddInvokeTransactionParameters,
  AddInvokeTransactionResult,
} from './../actions/wallet/addInvokeTransaction.js'
import type { Address } from './misc.js'
import type { Prettify } from './utils.js'

import type {
  ACCOUNT_DEPLOYMENT_DATA,
  ADDRESS,
  API_VERSION,
  ASSET,
  BLOCK_HASH,
  BLOCK_ID,
  BLOCK_NUMBER,
  BLOCK_WITH_RECEIPTS,
  BLOCK_WITH_TXS,
  BLOCK_WITH_TX_HASHES,
  BROADCASTED_DECLARE_TXN,
  BROADCASTED_DEPLOY_ACCOUNT_TXN,
  BROADCASTED_INVOKE_TXN,
  BROADCASTED_TXN,
  CHAIN_ID,
  CONTRACT_CLASS,
  DECLARE_TXN,
  DEPRECATED_CONTRACT_CLASS,
  EVENTS_CHUNK,
  EVENT_FILTER,
  FEE_ESTIMATE,
  FELT,
  FUNCTION_CALL,
  // @ts-ignore
  INVOKE_CALL,
  MSG_FROM_L1,
  PENDING_BLOCK_WITH_RECEIPTS,
  PENDING_BLOCK_WITH_TXS,
  PENDING_BLOCK_WITH_TX_HASHES,
  PENDING_STATE_UPDATE,
  PERMISSION,
  RESULT_PAGE_REQUEST,
  SIGNATURE,
  SIMULATION_FLAG_FOR_ESTIMATE_FEE,
  SPEC_VERSION,
  STARKNET_CHAIN,
  STATE_UPDATE,
  STORAGE_KEY,
  SYNC_STATUS,
  TRANSACTION_TRACE,
  TXN,
  TXN_EXECUTION_STATUS,
  TXN_HASH,
  TXN_RECEIPT_WITH_BLOCK_INFO,
  TXN_STATUS,
  TYPED_DATA,
} from './components.js'

//////////////////////////////////////////////////
// Provider

export type SNIP1474Methods = [...PublicRpcSchema, ...WalletRpcSchema]

export type SNIP1193Provider = Prettify<
  SNIP1193Events & {
    request: SNIP1193RequestFn<SNIP1474Methods>
  }
>

//////////////////////////////////////////////////
// Errors

export type ProviderRpcErrorType = ProviderRpcError & {
  name: 'ProviderRpcError'
}

class ProviderRpcError extends Error {
  code: number
  details: string

  constructor(code: number, message: string) {
    super(message)
    this.code = code
    this.details = message
  }
}

//////////////////////////////////////////////////
// Provider Events

export type ProviderConnectInfo = {
  chainId: string
}

export type ProviderMessage = {
  type: string
  data: unknown
}

export type SNIP1193EventMap = {
  accountsChanged(accounts: Address[]): void
  chainChanged(chainId: string): void
  networkChanged(network: string): void
  connect(connectInfo: ProviderConnectInfo): void
  disconnect(error: ProviderRpcError): void
  message(message: ProviderMessage): void
}

export type SNIP1193Events = {
  on<TEvent extends keyof SNIP1193EventMap>(
    event: TEvent,
    listener: SNIP1193EventMap[TEvent],
  ): void
  removeListener<TEvent extends keyof SNIP1193EventMap>(
    event: TEvent,
    listener: SNIP1193EventMap[TEvent],
  ): void
}

export type PublicRpcSchema = [
  // Returns the version of the Starknet JSON-RPC specification being used
  {
    Method: 'starknet_specVersion'
    Parameters: undefined
    ReturnType: string
  },
  // Getting Contract and Block Information

  /**
   * @description Get the contract class hash in the given block for the contract deployed at the given address
   * @example
   * provider.request({ method: 'starknet_getClassHashAt' })
   * // => ''
   */
  {
    Method: 'starknet_getClassHashAt'
    Parameters: {
      contract_address: ADDRESS
      block_id: BLOCK_ID
    }
    ReturnType: FELT
  },
  /**
   * @description Get the value of the storage at the given address and key
   * @example
   * provider.request({ method: 'starknet_getStorageAt', params: ['0x...', '0x...', 'latest'] })
   * // => '0x...'
   */
  {
    Method: 'starknet_getStorageAt'
    Parameters: {
      contract_address: ADDRESS
      key: STORAGE_KEY
      block_id: BLOCK_ID
    }
    ReturnType: FELT
  },
  /**
   * @description Get the information about the result of executing the requested block
   * @example
   * provider.request({ method: 'starknet_getStorageAt', params: ['0x...', '0x...', 'latest'] })
   * // => '0x...'
   */
  {
    Method: 'starknet_getStateUpdate'
    Parameters: {
      block_id: BLOCK_ID
    }
    ReturnType: STATE_UPDATE | PENDING_STATE_UPDATE
  },
  /**
   * @description Get block information with transaction hashes given the block id
   * @example
   * provider.request({ method: 'starknet_getBlockWithTxHashes', params: ['0x...', '0x...', 'latest'] })
   * // => '0x...'
   */
  {
    Method: 'starknet_getBlockWithTxHashes'
    Parameters: {
      block_id: BLOCK_ID
    }
    ReturnType: BLOCK_WITH_TX_HASHES | PENDING_BLOCK_WITH_TX_HASHES
  },
  /**
   * @description Get the information about the state update of the requested block
   * @example
   * provider.request({ method: 'starknet_getBlockWithTxHashes', params: ['0x...', '0x...', 'latest'] })
   * // => '0x...'
   */
  {
    Method: 'starknet_getBlockTransactionCount'
    Parameters: {
      block_id: BLOCK_ID
    }
    ReturnType: number
  },
  /**
   * @description Get the information about the state update of the requested block
   * @example
   * provider.request({ method: 'starknet_getBlockWithTxHashes', params: ['0x...', '0x...', 'latest'] })
   * // => '0x...'
   */
  {
    Method: 'starknet_getBlockWithTxs'
    Parameters: {
      block_id: BLOCK_ID
    }
    ReturnType: BLOCK_WITH_TXS | PENDING_BLOCK_WITH_TXS
  },
  /**
   * @description Get the information about the state update of the requested block
   * @example
   * provider.request({ method: 'starknet_getBlockWithTxHashes', params: ['0x...', '0x...', 'latest'] })
   * // => '0x...'
   */
  {
    Method: 'starknet_getBlockWithReceipts'
    Parameters: {
      block_id: BLOCK_ID
    }
    ReturnType: BLOCK_WITH_RECEIPTS | PENDING_BLOCK_WITH_RECEIPTS
  },
  /**
   * @description Get the contract class definition in the given block for the contract deployed at the given address
   * @example
   * provider.request({ method: 'starknet_getClass', params: ['0x...', 'latest'] })
   * // => { ... }
   */
  {
    Method: 'starknet_getClass'
    Parameters: {
      class_hash: FELT
      block_id: BLOCK_ID
    }
    ReturnType: DEPRECATED_CONTRACT_CLASS | CONTRACT_CLASS
  },
  /**
   * @description Get the information about the state update of the requested block
   * @example
   * provider.request({ method: 'starknet_getBlockWithTxHashes', params: ['0x...', '0x...', 'latest'] })
   * // => '0x...'
   */
  {
    Method: 'starknet_getClassAt'
    Parameters: {
      contract_address: ADDRESS
      block_id: BLOCK_ID
    }
    ReturnType: DEPRECATED_CONTRACT_CLASS | CONTRACT_CLASS
  },
  // Transaction Management

  // Querying Transactions
  /**
   * @description Get the information about the state update of the requested block
   * @example
   * provider.request({ method: 'starknet_addDeployAccountTransaction', params: ['0x...', '0x...', 'latest'] })
   * // => '0x...'
   */
  {
    Method: 'starknet_getTransactionByBlockIdAndIndex'
    Parameters: {
      index: number
      block_id: BLOCK_ID
    }
    ReturnType: TXN & TXN_HASH
  },
  /**
   * @description Get the information about the state update of the requested block
   * @example
   * provider.request({ method: 'starknet_addDeployAccountTransaction', params: ['0x...', '0x...', 'latest'] })
   * // => '0x...'
   */
  {
    Method: 'starknet_getTransactionStatus'
    Parameters: {
      transaction_hash: TXN_HASH
    }
    ReturnType: {
      finalization_status: TXN_STATUS
      execution_status: TXN_EXECUTION_STATUS
    }
  },
  /**
   * @description Get the information about the state update of the requested block
   * @example
   * provider.request({ method: 'starknet_addDeployAccountTransaction', params: ['0x...', '0x...', 'latest'] })
   * // => '0x...'
   */
  {
    Method: 'starknet_getTransactionReceipt'
    Parameters: {
      transaction_hash: TXN_HASH
    }
    ReturnType: TXN_RECEIPT_WITH_BLOCK_INFO
  },
  /**
   * @description Get the information about the state update of the requested block
   * @example
   * provider.request({ method: 'starknet_addDeployAccountTransaction', params: ['0x...', '0x...', 'latest'] })
   * // => '0x...'
   */
  {
    Method: 'starknet_getBlockTransactionCount'
    Parameters: {
      block_id: BLOCK_ID
    }
    ReturnType: number
  },
  /**
   * @description Get the information about the state update of the requested block
   * @example
   * provider.request({ method: 'starknet_addDeployAccountTransaction', params: ['0x...', '0x...', 'latest'] })
   * // => '0x...'
   */
  {
    Method: 'starknet_getTransactionByHash'
    Parameters: {
      transaction_hash: TXN_HASH
    }
    ReturnType: TXN & TXN_HASH
  },
  /**
   * @description Get the information about the state update of the requested block
   * @example
   * provider.request({ method: 'starknet_addDeployAccountTransaction', params: ['0x...', '0x...', 'latest'] })
   * // => '0x...'
   */
  {
    Method: 'starknet_pendingTransactions'
    Parameters: undefined
    ReturnType: any
  },
  // Account Information
  /**
   * @description Returns the block Number associated with the current network
   * @example
   * provider.request({ method: 'starknet_chainid' })
   * // => ''
   */
  {
    Method: 'starknet_getNonce'
    Parameters: {
      block_id: BLOCK_ID
      contract_address: ADDRESS
    }
    ReturnType: FELT
  },
  /**
   * @description Returns the block Number associated with the current network
   * @example
   * provider.request({ method: 'starknet_chainid' })
   * // => ''
   */
  {
    Method: 'starknet_call'
    Parameters?: {
      request: FUNCTION_CALL[] | FUNCTION_CALL
      block_id: BLOCK_ID
    }
    ReturnType: FELT[] | FELT
  },
  // Chain Information
  /**
   * @description Returns the block Number associated with the current network
   * @example
   * provider.request({ method: 'starknet_chainid' })
   * // => ''
   */
  {
    Method: 'starknet_blockHashAndNumber'
    Parameters: undefined
    ReturnType: {
      block_hash: BLOCK_HASH
      block_number: BLOCK_NUMBER
    }
  },
  /**
   * @description Returns the block Number associated with the current network
   * @example
   * provider.request({ method: 'starknet_chainid' })
   * // => ''
   */
  {
    Method: 'starknet_blockNumber'
    Parameters: undefined
    ReturnType: BLOCK_NUMBER
  },
  /**
   * @description Returns the chain ID associated with the current network
   * @example
   * provider.request({ method: 'starknet_chainid' })
   * // => ''
   */
  {
    Method: 'starknet_chainId'
    Parameters?: undefined
    ReturnType: CHAIN_ID
  },
  /**
   * @description Returns the chain ID associated with the current network
   * @example
   * provider.request({ method: 'starknet_chainid' })
   * // => ''
   */
  {
    Method: 'starknet_syncing'
    Parameters?: undefined
    ReturnType: boolean | SYNC_STATUS
  },
  // Event and State Data

  /**
   * @description Returns the chain ID associated with the current network
   * @example
   * provider.request({ method: 'starknet_chainid' })
   * // => ''
   */
  {
    Method: 'starknet_getEvents'
    Parameters?: {
      filter: EVENT_FILTER & RESULT_PAGE_REQUEST
    }
    ReturnType: EVENTS_CHUNK
  },
  // Fee Estimation
  /**
   * @description Returns the chain ID associated with the current network
   * @example
   * provider.request({ method: 'starknet_chainid' })
   * // => ''
   */
  {
    Method: 'starknet_estimateFee'
    Parameters: {
      request: BROADCASTED_TXN
      simulation_flags: SIMULATION_FLAG_FOR_ESTIMATE_FEE
      block_id: BLOCK_ID
    }
    ReturnType: FEE_ESTIMATE
  },
  /**
   * @description Returns the chain ID associated with the current network
   * @example
   * provider.request({ method: 'starknet_chainid' })
   * // => ''
   */
  {
    Method: 'starknet_estimateMessageFee'
    Parameters: {
      message: MSG_FROM_L1
      block_id: BLOCK_ID
    }
    ReturnType: FEE_ESTIMATE
  },
  {
    Method: 'starknet_getTransactionByHash'
    Parameters?: any
    ReturnType: any
  },
  {
    Method: 'starknet_traceTransaction'
    Parameters?: {
      transaction_hash: TXN_HASH
    }
    ReturnType: TRANSACTION_TRACE
  },
  {
    Method: 'starknet_traceBlockTransaction'
    Parameters?: {
      block_id: BLOCK_ID
    }
    ReturnType: {
      transaction_hash: FELT
      trace_root: TRANSACTION_TRACE
    }[]
  },
  {
    Method: 'starknet_simulateTransaction'
    Parameters?: {
      transaction: BROADCASTED_TXN
      block_id: BLOCK_ID
      simulation_flags: SIMULATION_FLAG_FOR_ESTIMATE_FEE
    }
    ReturnType: {
      transacation_trace: TRANSACTION_TRACE
      fee_estimation: FEE_ESTIMATE
    }[]
  },
  {
    Method: 'starknet_addInvokeTransaction'
    Parameters?: {
      invoke_transaction: BROADCASTED_INVOKE_TXN
    }
    ReturnType: {
      transaction_hash: TXN_HASH
    }[]
  },
  {
    Method: 'starknet_addDeclareTransaction'
    Parameters?: {
      declare_transaction: BROADCASTED_DECLARE_TXN
    }
    ReturnType: {
      transaction_hash: TXN_HASH
      class_hash: FELT
    }[]
  },
  {
    Method: 'starknet_addDeployAccountTransaction'
    Parameters?: {
      deploy_account_transaction: BROADCASTED_DEPLOY_ACCOUNT_TXN
    }
    ReturnType: {
      transaction_hash: TXN_HASH
      contract_address: ADDRESS
    }[]
  },
]

export type WalletRpcSchema = [
  /**
   * @description Returns a list of wallet api versions compatible with the wallet. Notice this might be different from Starknet JSON-RPC spec
   * @example
   * provider.request({ method: 'wallet_supportedWalletApi' })
   * // => '0x...'
   */
  {
    Method: 'wallet_supportedWalletApi'
    Parameters?: undefined
    ReturnType: API_VERSION[]
  },
  /**
   * @description Returns a list of supported specs by the wallet
   * @example
   * provider.request({ method: 'wallet_supportedSpecs' })
   * // => '0x...'
   */
  {
    Method: 'wallet_supportedSpecs'
    Parameters?: undefined
    ReturnType: SPEC_VERSION[]
  },
  /**
   * @description Get the existing permissions for the Dapp from the wallet
   * @example
   * provider.request({ method: 'wallet_getPermissions' })
   * // => '0x...'
   */
  {
    Method: 'wallet_getPermissions'
    Parameters?: {
      api_version?: API_VERSION
    }
    ReturnType: PERMISSION[] | []
  },
  {
    Method: 'wallet_requestAccounts'
    Parameters?: {
      silent_mode?: boolean
      api_version?: API_VERSION | undefined
    }
    ReturnType: ADDRESS[]
  },
  {
    Method: 'wallet_requestChainId'
    Parameters?: {
      api_version?: API_VERSION | undefined
    }
    ReturnType: CHAIN_ID
  },
  {
    Method: 'wallet_deploymentData'
    Parameters?: {
      api_version?: API_VERSION | undefined
    }
    ReturnType: ACCOUNT_DEPLOYMENT_DATA
  },
  {
    Method: 'wallet_switchStarknetChain'
    Parameters?: {
      chainId: CHAIN_ID
      // chain_id: CHAIN_ID
      api_version?: API_VERSION | undefined
    }
    ReturnType: boolean
  },
  {
    Method: 'wallet_watchAsset'
    Parameters?: {
      asset: ASSET
      api_version?: API_VERSION | undefined
    }
    ReturnType: boolean
  },
  {
    Method: 'wallet_addStarknetChain'
    Parameters?: {
      chain: STARKNET_CHAIN
      api_version?: API_VERSION | undefined
    }
    ReturnType: boolean
  },
  // {
  //   Method: 'wallet_addInvokeTransaction'
  //   Parameters?: {
  //     invoke_transaction: INVOKE_CALL
  //     api_version?: API_VERSION | undefined
  //   }
  //   ReturnType: {
  //     transaction_hash: PADDED_TXN_HASH
  //   }
  // },
  {
    Method: 'wallet_addInvokeTransaction'
    Parameters: AddInvokeTransactionParameters
    ReturnType: AddInvokeTransactionResult
  },
  {
    Method: 'wallet_addDeclareTransaction'
    Parameters?: {
      declare_transaction: DECLARE_TXN
      api_version?: API_VERSION | undefined
    }
    ReturnType: {
      transaction_hash: PADDED_TXN_HASH
      class_hash: PADDED_FELT
    }
  },
  {
    Method: 'wallet_signTypedData'
    Parameters?: {
      typed_data: TYPED_DATA
      api_version?: API_VERSION | undefined
    }
    ReturnType: {
      signature: SIGNATURE
    }
  },
  {
    Method: 'wallet_signTypedData'
    Parameters?: any
    ReturnType: {
      signature: SIGNATURE
    }
  },
]

// export type TestRpcSchema<TMode extends string> = [

// ]

///////////////////////////////////////////////////////////////////////////
// Utils

export type RpcSchema = readonly {
  Method: string
  Parameters?: unknown
  ReturnType: unknown
}[]

export type RpcSchemaOverride = Omit<RpcSchema[number], 'Method'>

export type SNIP1193Parameters<
  TRpcSchema extends RpcSchema | WalletRpcSchema | undefined = undefined,
> = TRpcSchema extends RpcSchema
  ? {
      [K in keyof TRpcSchema]: Prettify<
        {
          method?: TRpcSchema[K] extends TRpcSchema[number]
            ? TRpcSchema[K]['Method']
            : never
          type?: TRpcSchema[K] extends TRpcSchema[number]
            ? TRpcSchema[K]['Method']
            : never
        } & (TRpcSchema[K] extends TRpcSchema[number]
          ? TRpcSchema[K]['Parameters'] extends undefined
            ? { params?: never }
            : { params: TRpcSchema[K]['Parameters'] }
          : never)
      >
    }[number]
  : {
      method?: string | undefined
      type?: string | undefined
      params?: unknown
    }

export type SNIP1193RequestOptions = {
  // Deduplicate in-flight requests.
  dedupe?: boolean | undefined
  // The base delay (in ms) between retries.
  retryDelay?: number
  // The max number of times to retry.
  retryCount?: number
  /** Unique identifier for the request. */
  uid?: string | undefined
}

type DerivedRpcSchema<
  TRpcSchema extends RpcSchema | undefined,
  TRpcSchemaOverride extends RpcSchemaOverride | undefined,
> = TRpcSchemaOverride extends RpcSchemaOverride
  ? [TRpcSchemaOverride & { Method: string }]
  : TRpcSchema

export type SNIP1193RequestFn<
  TRpcSchema extends RpcSchema | undefined = undefined,
> = <
  TRpcSchemaOverride extends RpcSchemaOverride | undefined = undefined,
  TParameters extends SNIP1193Parameters<
    DerivedRpcSchema<TRpcSchema, TRpcSchemaOverride>
  > = SNIP1193Parameters<DerivedRpcSchema<TRpcSchema, TRpcSchemaOverride>>,
  _ReturnType = DerivedRpcSchema<
    TRpcSchema,
    TRpcSchemaOverride
  > extends RpcSchema
    ? Extract<
        DerivedRpcSchema<TRpcSchema, TRpcSchemaOverride>[number],
        { Method: TParameters['method'] }
      >['ReturnType']
    : unknown,
>(
  args: TParameters,
  options?: SNIP1193RequestOptions,
) => Promise<_ReturnType>
