import type { Signature } from "@starknet-io/types-js"
import type { DeploymentData, InvokeResponse } from "../../types/paymaster.js"
import type { Transport } from "../../clients/transports/createTransport.js"
import type { Client } from "../../clients/createClient.js"
import type { Chain } from "../../types/chain.js"

export type ExecuteTransactionParameters = {
  userAddress: string
  typedData: string
  signature: Signature
  deploymentData?: DeploymentData
}

export type ExecuteTransactionReturnType = InvokeResponse

export type ExecuteTransactionErrorType = Error

export async function executeTransaction<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  parameters: ExecuteTransactionParameters
): Promise<ExecuteTransactionReturnType> {
  const response = await client.request({
    method: 'pm_executeTransaction',
    params: parameters
  })
  return response as ExecuteTransactionReturnType
} 