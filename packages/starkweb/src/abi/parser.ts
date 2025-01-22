import type { AbiStateMutability } from '../strk-types/abi.js';
// import { testAbi } from './testabi.js'
import type { Abi } from '../strk-types/abi.js';
import type { AbiTypeToPrimitiveType } from './abitype.js';
import type { Address } from './starkweb-abi.js';
import type { testAbi } from './testabi.js';


type Extract<T, U> = T extends U ? T : never;

export type ExtractFunctions<T> = T extends readonly (infer U)[]
    ? ExtractFunctions<U>
    : T extends { type: "function" }
    ? T
    : T extends { type: "interface"; items: infer Items }
    ? ExtractFunctions<Items>
    : never;


export function parseAbiFunctions<T>(abi: T): ExtractFunctions<T>[] {
    const functions: any[] = [];

    const extract = (item: any) => {
        if (Array.isArray(item)) {
            item.forEach(extract);
        } else if (item.type === "function") {
            functions.push(item);
        } else if (item.type === "interface" && item.items) {
            extract(item.items);
        }
    };

    extract(abi);
    return functions;
}

// type _testExtractFunctions2 = ExtractFunctions<typeof testAbi>;





export type ExtractAbiFunctionNames<
    abi extends Abi,
    abiStateMutability extends AbiStateMutability = AbiStateMutability
> = Extract<ExtractFunctions<abi>, { state_mutability: abiStateMutability }>["name"];

// type testExtractAbiFunctionNames = ExtractAbiFunctionNames<typeof testAbi, "external">;



export type ContractFunctions<TAbi extends Abi> = {
    [K in ExtractFunctions<TAbi[number]> as K["name"]]: K;
};
// type testContractFunctions = ContractFunctions<typeof testAbi>;

export type ContractFunctionName<abi extends Abi,
    abiStateMutability extends AbiStateMutability = AbiStateMutability
> = ExtractAbiFunctionNames<abi, abiStateMutability>;

// type testContractFunctionName = ContractFunctionName<typeof testAbi, 'external'>;
// type testContractFunctionName2 = ContractFunctionName<typeof testAbi, 'view'>;

// export type ContractFunctionParameters<abi extends Abi,
//     abiStateMutability extends AbiStateMutability = AbiStateMutability,
//     functionName extends ContractFunctionName<abi, abiStateMutability> = ContractFunctionName<abi, abiStateMutability>,
// > = ExtractFunctions<abi>[functionName]["inputs"];


// type testContractFunctionParameters = ContractFunctionParameters<typeof testAbi, 'external', 'testFunction'>;

export type ContractFunctionArgs1<
    abi extends Abi,
    abiStateMutability extends AbiStateMutability = AbiStateMutability,
    functionName extends ContractFunctionName<abi, abiStateMutability> = 
        ContractFunctionName<abi, abiStateMutability>,
> = Extract<ExtractFunctions<abi>, {name: functionName}>["inputs"];

// type testContractFunctionArgs = ContractFunctionArgs<typeof testAbi, 'external', '__execute__'>;

// type testContractFunctionArgs2 = ContractFunctionArgs<typeof testAbi, 'external', '__validate__'>;


// say we want to call the function "is_valid_signature"
// args:  {hash: felt252, signature: felt252[]} = [hash, signature]
// type testContractFunctionArgs3 = ContractFunctionArgs<typeof testAbi, 'external', '__validate__'>;

export type ContractFunctionArgs2<
    abi extends Abi,
    abiStateMutability extends AbiStateMutability = AbiStateMutability,
    functionName extends ContractFunctionName<abi, abiStateMutability> = 
        ContractFunctionName<abi, abiStateMutability>,
> = {
    [K in Extract<ExtractFunctions<abi>, {name: functionName}>["inputs"][number] as K["name"]]: AbiTypeToPrimitiveType<K["type"], 'inputs', abi>
};

export type ContractFunctionArgs<
  TAbi extends Abi | readonly unknown[],
  TMode extends 'view' | 'external',
  TFunctionName extends ContractFunctionName<TAbi, TMode>
> = TAbi extends Abi
  ? Extract<ExtractFunctions<TAbi>, { name: TFunctionName }>['inputs'] extends infer Inputs
    ? Inputs extends readonly { name: string; type: string }[]
      ? {
          [K in Inputs[number] as K['name']]: AbiTypeToPrimitiveType<K['type'], 'inputs', TAbi>
        }
      : never
    : never
  : never;

// // Helper type to extract function parameters
// type ExtractFunctionParams<
// TAbi extends Abi, 
// > =
// TAbi extends { inputs: { name: infer Names }[] }
//   ? Names extends string
//     ? Names
//     : never
//   : never;

// Helper type to get the proper type for each input
// type InputType<
// TAbi extends Abi,
// TFunctionName extends string,
// TParam extends string
// > = TAbi extends { inputs: { name: infer Names }[] }
//   ? Names extends string
//     ? Names
//     : never
//   : never;
// Example usage:
// type TestIsValidSignature = ContractFunctionArgs<typeof testAbi, 'view', 'is_valid_signature'>;
// Should result in: { hash: felt252, signature: felt252[] }


export type ContractFunctionParameters<
  abi extends Abi | readonly unknown[] = Abi,
  mutability extends AbiStateMutability = AbiStateMutability,
  functionName extends ContractFunctionName<
    abi,
    mutability
  > = ContractFunctionName<abi, mutability>,
  ///
  allFunctionNames = ContractFunctionName<abi, mutability>,
  allArgs = ContractFunctionArgs<abi, mutability, functionName>,
  // when `args` is inferred to `readonly []` ("inputs": []) or `never` (`abi` declared as `Abi` or not inferrable), allow `args` to be optional.
  // important that both branches return same structural type
> = {
  abi: abi
  functionName:
    | allFunctionNames // show all options
    | (functionName extends allFunctionNames ? functionName : never) // infer value
  args:  allArgs
  address: Address
} 
// test
// type TestIsValidSignatureParams = ContractFunctionParameters<typeof testAbi, 'view', 'is_valid_signature'>['args'];