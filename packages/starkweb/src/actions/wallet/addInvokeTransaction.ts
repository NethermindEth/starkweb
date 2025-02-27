import type { Address, PADDED_TXN_HASH } from '@starknet-io/types-js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'
import type { FELT } from '../../types/components.js'

export type Call = {
  contract_address: Address
  entry_point: string
  calldata?: FELT[]
}

export interface AddInvokeTransactionParameters {
  /**
   * Calls to invoke by the account
   */
  calls: Call[]
}

export interface AddInvokeTransactionResult {
  /**
   * The hash of the invoke transaction
   */
  transaction_hash: PADDED_TXN_HASH
}

export type AddInvokeTransactionReturnType = {
  transaction_hash: PADDED_TXN_HASH
}

export type AddInvokeTransactionErrorType = {
  code: number
  message: string
}

export async function addInvokeTransaction<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  params: AddInvokeTransactionParameters,
): Promise<AddInvokeTransactionReturnType | AddInvokeTransactionErrorType> {
  return await client.request(
    {
      method: 'wallet_addInvokeTransaction',
      params,
    },
    {
      retryCount: 0,
    },
  )
}
