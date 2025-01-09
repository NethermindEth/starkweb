import type { Abi, AbiStateMutability, FunctionAbi } from "./abi.js";
import { testAbi } from "../abi/testabi.js";

type ExtractFunctions<T> = T extends { type: "function" }
  ? T
  : T extends { type: "interface"; items: infer Items }
  ? Items extends FunctionAbi[]
    ? Items[number]
    : never
  : never;

  type testExtractFunctions = ExtractFunctions<typeof testAbi>

export type ContractFunctions<TAbi extends Abi> = {
  [K in ExtractFunctions<TAbi[number]> as K["name"]]: K;
};

type Extract<T, U> = T extends U
  ? T
  : T extends { type: "interface"; items: infer Items }
  ? Items
  : never;

export type ExtractAbiFunction<
  abi extends Abi,
  functionName extends ExtractAbiFunctionNames<abi>,
  abiStateMutability extends AbiStateMutability = AbiStateMutability
> = Extract<
  ExtractAbiFunctions<abi, abiStateMutability>,
  { name: functionName }
>;

export type ExtractAbiFunctions<
  abi extends Abi,
  abiStateMutability extends AbiStateMutability = AbiStateMutability
> = Extract<
  abi[number],
  { type: "function"; state_mutability: abiStateMutability }
>;

type ExtractFunctionByMutability<
  abi extends Abi,
  abiStateMutability extends AbiStateMutability = AbiStateMutability
> = Extract<
  ExtractAbiFunctions<abi, abiStateMutability>[number],
  { state_mutability: abiStateMutability }
>;

export type ExtractAbiFunctionNames<
  abi extends Abi,
  abiStateMutability extends AbiStateMutability = AbiStateMutability
> = ExtractFunctionByMutability<abi, abiStateMutability>["name"];
