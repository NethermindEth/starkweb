////////////////////////////////////////////////////////////////////////////////
// Tanstack Query
////////////////////////////////////////////////////////////////////////////////

// biome-ignore lint/performance/noBarrelFile: entrypoint module
export {
  type CallData,
  type CallOptions,
  type CallQueryFnData,
  type CallQueryKey,
  callQueryKey,
  callQueryOptions,
} from "../query/call.js";

export {
  type ConnectData,
  type ConnectVariables,
  type ConnectMutate,
  type ConnectMutateAsync,
  connectMutationOptions,
} from "../query/connect.js";

export {
  type SwitchAccountData,
  type SwitchAccountVariables,
  type SwitchAccountMutate,
  type SwitchAccountMutateAsync,
  switchAccountMutationOptions,
} from "../query/switchAccount.js";

export {
  type SwitchChainData,
  type SwitchChainVariables,
  type SwitchChainMutate,
  type SwitchChainMutateAsync,
  switchChainMutationOptions,
} from "../query/switchChain.js";

export {
  type DisconnectData,
  type DisconnectVariables,
  type DisconnectMutate,
  type DisconnectMutateAsync,
  disconnectMutationOptions,
} from "../query/disconnect.js";

export {
  type GetConnectorClientData,
  type GetConnectorClientOptions,
  type GetConnectorClientQueryFnData,
  type GetConnectorClientQueryKey,
  getConnectorClientQueryKey,
  getConnectorClientQueryOptions,
} from "../query/getConnectorClient.js";

export {
  type GetBlockNumberData,
  type GetBlockNumberQueryFnData,
  type GetBlockNumberQueryKey,
  getBlockNumberQueryKey,
  getBlockNumberQueryOptions,
} from "../query/getBlockNumber.js";

export {
  type GetStorageAtData,
  type GetStorageAtQueryFnData,
  type GetStorageAtQueryKey,
  getStorageAtQueryKey,
  getStorageAtQueryOptions,
} from "../query/getStorageAt.js";

export {
  type GetTransactionReceiptData,
  type GetTransactionReceiptQueryFnData,
  type GetTransactionReceiptQueryKey,
  getTransactionReceiptQueryKey,
  getTransactionReceiptQueryOptions,
} from "../query/getTransactionReceipt.js";

export {
  type EstimateFeeData,
  type EstimateFeeQueryFnData,
  type EstimateFeeQueryKey,
  estimateFeeQueryKey,
  estimateFeeQueryOptions,
} from "../query/estimateFee.js";

export {
  type EstimateMessageFeeData,
  type EstimateMessageFeeQueryFnData,
  type EstimateMessageFeeQueryKey,
  estimateMessageFeeQueryKey,
  estimateMessageFeeQueryOptions,
} from "../query/estimateMessageFee.js";

// export {
//   type SimulateContractData,
//   type SimulateContractQueryFnData,
//   type SimulateContractQueryKey,
//   simulateContractQueryKey,
//   simulateContractQueryOptions,
// } from "../query/simulateTransaction.js";

export {
  type ReadContractsData,
  type ReadContractsQueryFnData,
  type ReadContractsQueryKey,
  readContractsQueryKey,
  readContractsQueryOptions,
} from "../query/readContracts.js";

export {
  type GetBalanceData,
  type GetBalanceQueryFnData,
  type GetBalanceQueryKey,
  type GetBalanceErrorType,
  type GetBalanceOptions,
  getBalanceQueryKey,
  getBalanceQueryOptions,
} from "../query/getBalance.js";

export {
  type ReconnectData,
  type ReconnectVariables,
  type ReconnectMutate,
  type ReconnectMutateAsync,
  reconnectMutationOptions,
} from "../query/reconnect.js";

export {
  type GetWalletClientData,
  type GetWalletClientOptions,
  type GetWalletClientQueryFnData,
  type GetWalletClientQueryKey,
  type GetWalletClientErrorType,
  getWalletClientQueryKey,
  getWalletClientQueryOptions,
} from "../query/getWalletClient.js";

// Starknet ID Queries

export {
  type GetStarknetIdData,
  type GetStarknetIdOptions,
  type GetStarknetIdQueryFnData,
  type GetStarknetIdQueryKey,
  getStarknetIdQueryKey,
  getStarknetIdQueryOptions,
} from "../query/getStarknetId.js";

export {
  type GetStarknetIdAddressData,
  type GetStarknetIdAddressOptions,
  type GetStarknetIdAddressQueryFnData,
  type GetStarknetIdAddressQueryKey,
  getStarknetIdAddressQueryKey,
  getStarknetIdAddressQueryOptions,
} from "../query/getStarknetIdAddress.js";

export {
  type GetStarknetIdExtendedUserDataData,
  type GetStarknetIdExtendedUserDataOptions,
  type GetStarknetIdExtendedUserDataQueryFnData,
  type GetStarknetIdExtendedUserDataQueryKey,
  getStarknetIdExtendedUserDataQueryKey,
  getStarknetIdExtendedUserDataQueryOptions,
} from "../query/getStarknetIdExtendedUserData.js";

export {
  type GetStarknetIdExtendedVerifierDataData,
  type GetStarknetIdExtendedVerifierDataOptions,
  type GetStarknetIdExtendedVerifierDataQueryFnData,
  type GetStarknetIdExtendedVerifierDataQueryKey,
  getStarknetIdExtendedVerifierDataQueryKey,
  getStarknetIdExtendedVerifierDataQueryOptions,
} from "../query/getStarknetIdExtendedVerifierData.js";

export {
  type GetStarknetIdStarkProfilesData,
  type GetStarknetIdStarkProfilesOptions,
  type GetStarknetIdStarkProfilesQueryFnData,
  type GetStarknetIdStarkProfilesQueryKey,
  getStarknetIdStarkProfilesQueryKey,
  getStarknetIdStarkProfilesQueryOptions,
} from "../query/getStarknetIdStarkProfiles.js";

export {
  type GetStarknetIdUnboundedUserDataData,
  type GetStarknetIdUnboundedUserDataOptions,
  type GetStarknetIdUnboundedUserDataQueryFnData,
  type GetStarknetIdUnboundedUserDataQueryKey,
  getStarknetIdUnboundedUserDataQueryKey,
  getStarknetIdUnboundedUserDataQueryOptions,
} from "../query/getStarknetIdUnboundedUserData.js";

export {
  type GetStarknetIdProfileDataData,
  type GetStarknetIdProfileDataOptions,
  type GetStarknetIdProfileDataQueryFnData,
  type GetStarknetIdProfileDataQueryKey,
  getStarknetIdProfileDataQueryKey,
  getStarknetIdProfileDataQueryOptions,
} from "../query/getStarknetIdProfileData.js";

export {
  type GetStarknetIdNameData,
  type GetStarknetIdNameOptions,
  type GetStarknetIdNameQueryFnData,
  type GetStarknetIdNameQueryKey,
  getStarknetIdNameQueryKey,
  getStarknetIdNameQueryOptions,
} from "../query/getStarknetIdName.js";

export {
  type GetStarknetIdNamesData,
  type GetStarknetIdNamesOptions,
  type GetStarknetIdNamesQueryFnData,
  type GetStarknetIdNamesQueryKey,
  getStarknetIdNamesQueryKey,
  getStarknetIdNamesQueryOptions,
} from "../query/getStarknetIdNames.js";

export {
  type GetStarknetIdPfpVerifierDataData,
  type GetStarknetIdPfpVerifierDataOptions,
  type GetStarknetIdPfpVerifierDataQueryFnData,
  type GetStarknetIdPfpVerifierDataQueryKey,
  getStarknetIdPfpVerifierDataQueryKey,
  getStarknetIdPfpVerifierDataQueryOptions,
} from "../query/getStarknetIdPfpVerifierData.js";

export {
  type GetStarknetIdUnboundedVerifierDataData,
  type GetStarknetIdUnboundedVerifierDataOptions,
  type GetStarknetIdUnboundedVerifierDataQueryFnData,
  type GetStarknetIdUnboundedVerifierDataQueryKey,
  getStarknetIdUnboundedVerifierDataQueryKey,
  getStarknetIdUnboundedVerifierDataQueryOptions,
} from "../query/getStarknetIdUnboundedVerifierData.js";

export {
  type GetStarknetIdUserDataData,
  type GetStarknetIdUserDataOptions,
  type GetStarknetIdUserDataQueryFnData,
  type GetStarknetIdUserDataQueryKey,
  getStarknetIdUserDataQueryKey,
  getStarknetIdUserDataQueryOptions,
} from "../query/getStarknetIdUserData.js";

export {
  type GetStarknetIdVerifierDataData,
  type GetStarknetIdVerifierDataOptions,
  type GetStarknetIdVerifierDataQueryFnData,
  type GetStarknetIdVerifierDataQueryKey,
  getStarknetIdVerifierDataQueryKey,
  getStarknetIdVerifierDataQueryOptions,
} from "../query/getStarknetIdVerifierData.js";

export {
  type ReadContractData,
  type ReadContractOptions,
  type ReadContractQueryFnData,
  type ReadContractQueryKey,
  type ReadContractErrorType,
  readContractQueryOptions,
} from "../query/readContract.js";

export {
  type WriteContractData,
  type WriteContractVariables,
  type WriteContractMutate,
  type WriteContractMutateAsync,
  writeContractMutationOptions,
} from "../query/writeContract.js";

export {
  type SignMessageData,
  type SignMessageVariables,
  type SignMessageMutate,
  type SignMessageMutateAsync,
  signMessageMutationOptions,
} from "../query/signMessage.js";

export {
  type SignTypedDataData,
  type SignTypedDataQueryFnData,
  type SignTypedDataQueryKey,
  type SignTypedDataOptions,
  signTypedDataQueryKey,
  signTypedDataQueryOptions,
} from "../query/signTypedData.js";

export {
  type VerifyMessageData,
  type VerifyMessageQueryFnData,
  type VerifyMessageQueryKey,
  type VerifyMessageOptions,
  verifyMessageQueryKey,
  verifyMessageQueryOptions,
} from "../query/verifyMessage.js";

export {
  type VerifyTypedDataData,
  type VerifyTypedDataQueryFnData,
  type VerifyTypedDataQueryKey,
  type VerifyTypedDataOptions,
  verifyTypedDataQueryKey,
  verifyTypedDataQueryOptions,
} from "../query/verifyTypedData.js";

export { hashFn, structuralSharing } from "../query/utils.js";




// PAYMASTER QUERIES //

export {
  type GetPaymasterStatusQueryKey,
  type GetPaymasterStatusReturnType,
  type GetPaymasterStatusErrorType,
  getPaymasterStatusQueryKey,
  getPaymasterStatusQueryOptions,
} from "../query/getPaymasterStatus.js";

export {
  type CheckAccountCompatibilityQueryKey,
  type CheckAccountCompatibilityReturnType,
  type CheckAccountCompatibilityErrorType,
  checkAccountCompatibilityQueryKey,
  checkAccountCompatibilityQueryOptions,
} from "../query/checkAccountCompatibility.js";

export {
  type GetAccountRewardsQueryKey,
  type GetAccountRewardsReturnType,
  type GetAccountRewardsErrorType,
  getAccountRewardsQueryKey,
  getAccountRewardsQueryOptions,
} from "../query/getAccountRewards.js";

export {
  type GetGasTokenPricesQueryKey,
  type GetGasTokenPricesReturnType,
  type GetGasTokenPricesErrorType,
  getGasTokenPricesQueryKey,
  getGasTokenPricesQueryOptions,
} from "../query/getGasTokenPrices.js";

export {
  type ExecuteTransactionQueryKey,
  type ExecuteTransactionReturnType,
  type ExecuteTransactionErrorType,
  executeTransactionQueryKey,
  executeTransactionQueryOptions,
} from "../query/executeTransaction.js";
