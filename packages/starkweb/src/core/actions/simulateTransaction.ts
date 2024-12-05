// import {
//   type SimulateTransactionErrorType as strkjs_SimulateTransactionErrorType,
//   type SimulateTransactionParameters as strkjs_SimulateTransactionParameters,
//   type SimulateTransactionReturnType as strkjs_SimulateTransactionReturnType,
//   simulateTransaction as strkjs_simulateTransaction,
// } from "../actions/simulateTransaction.js";

// import type { ContractFunctionArgs, ContractFunctionName } from "src/types/contract.js";
// import type { Config } from "../createConfig.js";
// import type { BaseErrorType, ErrorType } from "../errors/base.js";
// import type {
//   ChainIdParameter,
//   ConnectorParameter,
// } from "../types/properties.js";
// import type {
//   Evaluate,
//   PartialBy,
//   UnionEvaluate,
//   UnionLooseOmit,
// } from "../types/utils.js";
// import { getAction } from "../utils/getAction.js";
// import {
//   type GetConnectorClientErrorType,
//   getConnectorClient,
// } from "./getConnectorClient.js";
// import type { Abi } from "abitype";
// import type { Chain } from "src/types/chain.js";
// import type { Account} from "src/types/account.js";
// export type SimulateTransactionParameters<
//   abi extends Abi | readonly unknown[] = Abi,
//   functionName extends ContractFunctionName<
//     abi,
//     "nonpayable" | "payable"
//   > = ContractFunctionName<abi, "nonpayable" | "payable">,
//   args extends ContractFunctionArgs<
//     abi,
//     "nonpayable" | "payable",
//     functionName
//   > = ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>,
//   config extends Config = Config,
//   chainId extends
//     | config["chains"][number]["chain_id"]
//     | undefined = config["chains"][number]["chain_id"]
// > = UnionEvaluate<
//   UnionLooseOmit<strkjs_SimulateTransactionParameters, "chain"> & {
//     abi: abi;
//     functionName: functionName;
//     args: args;
//   }
// > &
//   ChainIdParameter &
//   ConnectorParameter;

// export type SimulateTransactionReturnType = {
//   chainId: string;
//   result: strkjs_SimulateTransactionReturnType;
//   request: {
//     __mode: "prepared";
//     chainId: string;
//     chain: Chain;
//   };
// };

// export type SimulateTransactionErrorType = BaseErrorType | GetConnectorClientErrorType;

// /** https://starkweb.xyz/core/api/actions/simulateTransaction */
// export async function simulateTransaction<
//   config extends Config,
//   const abi extends Abi | readonly unknown[],
//   functionName extends ContractFunctionName<abi, "nonpayable" | "payable">,
//   args extends ContractFunctionArgs<
//     abi,
//     "nonpayable" | "payable",
//     functionName
//   >
// >(
//   config: config,
//   parameters: SimulateTransactionParameters
// ): Promise<SimulateTransactionReturnType> {
//   const { abi, chainId, connector, ...rest } = parameters;

//   let account: Address | Account;
//   if (parameters.account) account = parameters.account;
//   else {
//     const connectorClient = await getConnectorClient(config, {
//       chainId,
//       connector,
//     });
//     account = connectorClient.account;
//   }

//   const client = config.getClient({ chainId });
//   const action = getAction(
//     client,
//     strkjs_simulateTransaction,
//     "simulateTransaction"
//   );
//   const { result, request } = await action({ ...rest, abi, account });

//   return {
//     chainId: client.chain.id,
//     result,
//     request: { __mode: "prepared", ...request, chainId },
//   };
// }
