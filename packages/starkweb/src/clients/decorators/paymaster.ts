import type { Client } from '../createClient.js'
import type { GaslessStatus, GaslessCompatibility, GasTokenPrice, DeploymentData, InvokeResponse, PaymasterReward } from '../../types/paymaster.js'
import type { Signature } from '@starknet-io/types-js'
import type { ADDRESS } from '../../types/components.js'

import {
  getPaymasterStatus,
  checkAccountCompatibility,
  getGasTokenPrices,
  getAccountRewards,
  buildTypedData,
  executeTransaction,
  type BuildTypedDataParameters,
  type BuildTypedDataReturnType,
} from '../../actions/paymaster/index.js'


export type PaymasterActions = {
  /**
   * Gets the current status of the paymaster service.
   *
   * @returns The paymaster service status.
   */
  getPaymasterStatus: () => Promise<GaslessStatus>

  /**
   * Checks if an account is compatible with the paymaster service.
   *
   * @param args - The account address to check.
   * @returns The compatibility status of the account.
   */
  checkAccountCompatibility: (args: { accountAddress: ADDRESS }) => Promise<GaslessCompatibility>

  /**
   * Gets the current gas token prices supported by the paymaster.
   *
   * @returns An array of gas token prices.
   */
  getGasTokenPrices: () => Promise<GasTokenPrice[]>

  /**
   * Gets the rewards available for an account.
   *
   * @param args - The account address to check.
   * @returns The rewards available for the account.
   */
  getAccountRewards: (args: { accountAddress: ADDRESS }) => Promise<PaymasterReward[]>

  /**
   * Builds typed data for a transaction to be executed via the paymaster.
   *
   * @param args - The parameters for building typed data.
   * @returns The typed data for the transaction.
   */
  buildTypedData: (args: BuildTypedDataParameters) => Promise<BuildTypedDataReturnType>

  /**
   * Executes a transaction via the paymaster service.
   *
   * @param args - The transaction parameters including user address, typed data, and signature.
   * @returns The transaction response.
   */
  executeTransaction: (args: {
    userAddress: string
    typedData: string
    signature: Signature
    deploymentData?: DeploymentData
  }) => Promise<InvokeResponse>
}

export function paymasterActions(
  client: Client
): PaymasterActions {
  return {
    getPaymasterStatus: () => getPaymasterStatus(client, undefined),
    checkAccountCompatibility: (args) => checkAccountCompatibility(client, args),
    getGasTokenPrices: () => getGasTokenPrices(client, undefined),
    getAccountRewards: (args) => getAccountRewards(client, args),
    buildTypedData: (args) => buildTypedData(client, args),
    executeTransaction: (args) => executeTransaction(client, args),
  }
}
