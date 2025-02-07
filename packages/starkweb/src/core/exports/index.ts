////////////////////////////////////////////////////////////////////////////////
// Actions
////////////////////////////////////////////////////////////////////////////////

// biome-ignore lint/performance/noBarrelFile: entrypoint module
export {
  type CallErrorType,
  type CallParameters,
  type CallReturnType,
  call,
} from "../actions/call.js";

export {
  type ConnectErrorType,
  type ConnectParameters,
  type ConnectReturnType,
  connect,
} from "../actions/connect.js";

export {
  type DisconnectErrorType,
  type DisconnectParameters,
  type DisconnectReturnType,
  disconnect,
} from "../actions/disconnect.js";

export {
  type GetAccountReturnType,
  getAccount,
} from "../actions/getAccount.js";

export {
  type GetBlockNumberErrorType,
  type GetBlockNumberParameters,
  type GetBlockNumberReturnType,
  getBlockNumber,
} from "../actions/getBlockNumber.js";

export {
  type GetChainIdReturnType,
  getChainId,
} from "../actions/getChainId.js";

export { type GetChainsReturnType, getChains } from "../actions/getChains.js";

export {
  type GetClientParameters,
  type GetClientReturnType,
  getClient,
} from "../actions/getClient.js";

export {
  type GetConnectionsReturnType,
  getConnections,
} from "../actions/getConnections.js";

export {
  type GetConnectorClientErrorType,
  type GetConnectorClientParameters,
  type GetConnectorClientReturnType,
  getConnectorClient,
} from "../actions/getConnectorClient.js";

export {
  type GetConnectorsReturnType,
  getConnectors,
} from "../actions/getConnectors.js";

export {
  type GetPublicClientParameters,
  type GetPublicClientReturnType,
  getPublicClient,
} from "../actions/getPublicClient.js";

export {
  type GetTransactionParameters,
  type GetTransactionReturnType,
  type GetTransactionErrorType,
  getTransaction,
} from "../actions/getTransactionByHash.js";

export {
  type GetTransactionReceiptErrorType,
  type GetTransactionReceiptParameters,
  type GetTransactionReceiptReturnType,
  getTransactionReceipt,
} from "../actions/getTransactionReceipt.js";

export {
  type GetTransactionStatusErrorType,
  type GetTransactionStatusParameters,
  type GetTransactionStatusReturnType,
  getTransactionStatus,
} from "../actions/getTransactionStatus.js";

export {
  type GetTraceTransactionErrorType,
  type GetTraceTransactionParameters,
  type GetTraceTransactionReturnType,
  getTraceTransaction,
} from "../actions/getTraceTransaction.js";

export {
  type ReconnectErrorType,
  type ReconnectParameters,
  type ReconnectReturnType,
  reconnect,
} from "../actions/reconnect.js";

export {
  type SwitchAccountErrorType,
  type SwitchAccountParameters,
  type SwitchAccountReturnType,
  switchAccount,
} from "../actions/switchAccount.js";

export {
  type SwitchChainErrorType,
  type SwitchChainParameters,
  type SwitchChainReturnType,
  switchChain,
  /** @deprecated use `switchChain` instead */
  switchChain as switchNetwork,
} from "../actions/switchChain.js";

export {
  watchBlockNumber,
  type WatchBlockNumberReturnType,
  type WatchBlockNumberParameters,
} from "../actions/watchBlockNumber.js";

export {
  type WatchChainIdReturnType,
  type WatchChainIdParameters,
  watchChainId,
} from "../actions/watchChainId.js";

export {
  type WatchClientParameters,
  type WatchClientReturnType,
  watchClient,
} from "../actions/watchClient.js";

export {
  watchAccount,
  type WatchAccountReturnType,
  type WatchAccountParameters,
} from "../actions/watchAccount.js";

export {
  watchChains,
  type WatchChainsParameters,
  type WatchChainsReturnType,
} from "../actions/watchChains.js";

export {
  watchConnectors,
  type WatchConnectorsParameters,
  type WatchConnectorsReturnType,
} from "../actions/watchConnectors.js";

export {
  watchConnections,
  type WatchConnectionsParameters,
  type WatchConnectionsReturnType,
} from "../actions/watchConnections.js";

export {
  addDeclareTransaction,
  type AddDeclareTransactionErrorType,
  type AddDeclareTransactionParameters,
  type AddDeclareTransactionReturnType,
} from "../actions/addDeclareTransaction.js";

export {
  addDeployAccountTransaction,
  type AddDeployAccountTransactionErrorType,
  type AddDeployAccountTransactionParameters,
  type AddDeployAccountTransactionReturnType,
} from "../actions/addDeployAccountTransaction.js";

export {
  addInvokeTransaction,
  type AddInvokeTransactionErrorType,
  type AddInvokeTransactionParameters,
  type AddInvokeTransactionReturnType,
} from "../actions/addInvokeTransaction.js";

export {
  getBlockTransactionsTraces,
  type GetBlockTransactionsTracesErrorType,
  type GetBlockTransactionsTracesParameters,
  type GetBlockTransactionsTracesReturnType,
} from "../actions/getBlockTransactionsTraces.js";

export {
  getTransactionByBlockIdAndIndex,
  type GetTransactionByBlockIdAndIndexErrorType,
  type GetTransactionByBlockIdAndIndexParameters,
  type GetTransactionByBlockIdAndIndexReturnType,
} from "../actions/getTransactionByBlockIdAndIndex.js";

// export {
//   simulateTransaction,
//   type SimulateTransactionErrorType,
//   type SimulateTransactionParameters,
//   type SimulateTransactionReturnType,
// } from "../actions/simulateTransaction.js";

export {
  syncing,
  type SyncingErrorType,
  type SyncingParameters,
  type SyncingReturnTypes,
} from "../actions/sync.js";

export {
  getBlockWithTxs,
  type GetBlockWithTxsErrorType,
  type GetBlockWithTxsParameters,
  type GetBlockWithTxsReturnType,
} from "../actions/getBlockWithTxs.js";

export {
  getEvents,
  type GetEventsErrorType,
  type GetEventsParameters,
  type GetEventsReturnType,
} from "../actions/getEvents.js";

export {
  getBlockHashAndNumber,
  type GetBlockHashAndNumberErrorType,
  type GetBlockHashAndNumberReturnType,
} from "../actions/getBlockHashAndNumber.js";

export {
  getStorageAt,
  type GetStorageAtErrorType,
  type GetStorageAtParameters,
  type GetStorageAtReturnType,
} from "../actions/getStorageAt.js";

export {
  getClass,
  type GetClassErrorType,
  type GetClassParameters,
  type GetClassReturnType,
} from "../actions/getClass.js";

export {
  getClassAt,
  type GetClassAtErrorType,
  type GetClassAtParameters,
  type GetClassAtReturnType,
} from "../actions/getClassAt.js";

export {
  getNonce,
  type GetNonceErrorType,
  type GetNonceParameters,
  type GetNonceReturnType,
} from "../actions/getNonce.js";


// Starknet ID Actions
export {
  getStarknetId,
  type GetStarknetIdErrorType,
  type GetStarknetIdParameters,
  type GetStarknetIdReturnType,
} from "../actions/getStarknetId.js";

export {
  getStarknetIdAddress,
  type GetStarknetIdAddressErrorType,
  type GetStarknetIdAddressParameters,
  type GetStarknetIdAddressReturnType,
} from "../actions/getStarknetIdAddress.js";

export {
  getStarknetIdExtendedUserData,
  type GetStarknetIdExtendedUserDataErrorType,
  type GetStarknetIdExtendedUserDataParameters,
  type GetStarknetIdExtendedUserDataReturnType,
} from "../actions/getStarknetIdExtendedUserData.js";

export {
  getStarknetIdExtendedVerifierData,
  type GetStarknetIdExtendedVerifierDataErrorType,
  type GetStarknetIdExtendedVerifierDataParameters,
  type GetStarknetIdExtendedVerifierDataReturnType,
} from "../actions/getStarknetIdExtendedVerifierData.js";

export {
  getStarknetIdStarkProfiles,
  type GetStarknetIdStarkProfilesErrorType,
  type GetStarknetIdStarkProfilesParameters,
  type GetStarknetIdStarkProfilesReturnType,
} from "../actions/getStarknetIdStarkProfiles.js";

export {
  getStarknetIdUnboundedUserData,
  type GetStarknetIdUnboundedUserDataErrorType,
  type GetStarknetIdUnboundedUserDataParameters,
  type GetStarknetIdUnboundedUserDataReturnType,
} from "../actions/getStarknetIdUnboundedUserData.js";

export {
  getStarknetIdProfileData,
  type GetStarknetIdProfileDataErrorType,
  type GetStarknetIdProfileDataParameters,
  type GetStarknetIdProfileDataReturnType,
} from "../actions/getStarknetIdProfileData.js";

export {
  getStarknetIdName,
  type GetStarknetIdNameErrorType,
  type GetStarknetIdNameParameters,
  type GetStarknetIdNameReturnType,
} from "../actions/getStarknetIdName.js";

export {
  getStarknetIdNames,
  type GetStarknetIdNamesErrorType,
  type GetStarknetIdNamesParameters,
  type GetStarknetIdNamesReturnType,
} from "../actions/getStarknetIdNames.js";

export {
  getStarknetIdPfpVerifierData,
  type GetStarknetIdPfpVerifierDataErrorType,
  type GetStarknetIdPfpVerifierDataParameters,
  type GetStarknetIdPfpVerifierDataReturnType,
} from "../actions/getStarknetIdPfpVerifierData.js";

export {
  getStarknetIdUnboundedVerifierData,
  type GetStarknetIdUnboundedVerifierDataErrorType,
  type GetStarknetIdUnboundedVerifierDataParameters,
  type GetStarknetIdUnboundedVerifierDataReturnType,
} from "../actions/getStarknetIdUnboundedVerifierData.js";

export {
  getStarknetIdUserData,
  type GetStarknetIdUserDataErrorType,
  type GetStarknetIdUserDataParameters,
  type GetStarknetIdUserDataReturnType,
} from "../actions/getStarknetIdUserData.js";

export {
  getStarknetIdVerifierData,
  type GetStarknetIdVerifierDataErrorType,
  type GetStarknetIdVerifierDataParameters,
  type GetStarknetIdVerifierDataReturnType,
} from "../actions/getStarknetIdVerifierData.js";

export {
  writeContract,
  type WriteContractParameters,
  type WriteContractReturnType,
  type WriteContractErrorType,
} from "../actions/writeContract.js";


////////////////////////////////////////////////////////////////////////////////
// Connectors
////////////////////////////////////////////////////////////////////////////////

export {
  type ConnectorEventMap,
  type CreateConnectorFn,
  createConnector,
} from "../connectors/createConnector.js";

export { type InjectedParameters, injected } from "../connectors/injected.js";

export { metamask } from '../../connectors/metamask.js'
export { braavos } from '../../connectors/braavos.js'
export { argentX as argent } from '../../connectors/argent.js'
export { keplr } from '../../connectors/keplr.js'

////////////////////////////////////////////////////////////////////////////////
// createConfig
////////////////////////////////////////////////////////////////////////////////

export {
  type Connection,
  type Connector,
  type Config,
  type CreateConfigParameters,
  type State,
  type Transport,
  createConfig,
} from "../createConfig.js";

////////////////////////////////////////////////////////////////////////////////
// createStorage
////////////////////////////////////////////////////////////////////////////////

export {
  type CreateStorageParameters,
  type Storage,
  type StorageItemMap,
  createStorage,
  noopStorage,
} from "../createStorage.js";

////////////////////////////////////////////////////////////////////////////////
// Hydrate
////////////////////////////////////////////////////////////////////////////////

export { hydrate } from "../hydrate.js";

////////////////////////////////////////////////////////////////////////////////
// Errors
////////////////////////////////////////////////////////////////////////////////

export { BaseError } from "../errors/base.js";

export {
  type ChainNotConfiguredErrorType,
  ChainNotConfiguredError,
  type ConnectorNotConnectedErrorType,
  ConnectorNotConnectedError,
  type ConnectorAlreadyConnectedErrorType,
  ConnectorAlreadyConnectedError,
  type ConnectorNotFoundErrorType,
  ConnectorNotFoundError,
  type ConnectorAccountNotFoundErrorType,
  ConnectorAccountNotFoundError,
  type ConnectorChainMismatchErrorType,
  ConnectorChainMismatchError,
} from "../errors/config.js";

export {
  type ProviderNotFoundErrorType,
  ProviderNotFoundError,
  type SwitchChainNotSupportedErrorType,
  SwitchChainNotSupportedError,
} from "../errors/connector.js";

////////////////////////////////////////////////////////////////////////////////
// Transports
////////////////////////////////////////////////////////////////////////////////

// export { custom, http, webSocket } from "../../clients/transports/createTransport.js";

export {
  type ConnectorTransportConfig,
  type ConnectorTransport,
  unstable_connector,
} from "../transports/connector.js";

export { fallback } from "../transports/fallback.js";

////////////////////////////////////////////////////////////////////////////////
// Types
////////////////////////////////////////////////////////////////////////////////

export { type SelectChains } from "../types/chain.js";

export { type Register, type ResolvedRegister } from "../types/register.js";

////////////////////////////////////////////////////////////////////////////////
// Utilities
////////////////////////////////////////////////////////////////////////////////

export {
  cookieStorage,
  cookieToInitialState,
  parseCookie,
} from "../utils/cookie.js";

export { deepEqual } from "../utils/deepEqual.js";

export { deserialize } from "../utils/deserialize.js";

export { normalizeChainId } from "../utils/normalizeChainId.js";

export { serialize } from "../utils/serialize.js";

////////////////////////////////////////////////////////////////////////////////
// Version
////////////////////////////////////////////////////////////////////////////////

export { version } from "../../version.js";
