import {
    type ExecuteTransactionErrorType as strkjs_ExecuteTransactionErrorType,
    type ExecuteTransactionParameters as strkjs_ExecuteTransactionParameters,
    type ExecuteTransactionReturnType as strkjs_ExecuteTransactionReturnType,
    executeTransaction as strkjs_executeTransaction,
  } from "../../actions/paymaster/executeTransaction.js";
  import type { Hex } from "../../types/misc.js";
  
  import type { Config } from "../createConfig.js";
  import type { ChainIdParameter } from "../types/properties.js";
  import type { Evaluate } from "../types/utils.js";
  import { getAction } from "../utils/getAction.js";
  
  export type ExecuteTransactionParameters = Evaluate<
    strkjs_ExecuteTransactionParameters & ChainIdParameter
  >;
  
  export type ExecuteTransactionReturnType = Evaluate<
    strkjs_ExecuteTransactionReturnType & {
      chainId: Hex;
    }
  >;
  
  export type ExecuteTransactionErrorType =
    strkjs_ExecuteTransactionErrorType;
  
  export async function executeTransaction(
    config: Config,
    parameters: ExecuteTransactionParameters
  ): Promise<ExecuteTransactionReturnType> {
    const { chainId, ...rest } = parameters;
    const client = config.getClient({ chainId });
    const action = getAction(
      client,
      strkjs_executeTransaction,
      "executeTransaction"
    );
    return action(rest) as Promise<ExecuteTransactionReturnType>;
  }