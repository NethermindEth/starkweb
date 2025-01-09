import type { AbiStateMutability } from '../strk-types/abi.js';
import { testAbi } from './testabi.js'
import type { Abi } from '../strk-types/abi.js';


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

export type ContractFunctionParameters<abi extends Abi,
    abiStateMutability extends AbiStateMutability = AbiStateMutability,
    functionName extends ContractFunctionName<abi, abiStateMutability> = ContractFunctionName<abi, abiStateMutability>,
> = ExtractFunctions<abi>[functionName]["inputs"];


// type testContractFunctionParameters = ContractFunctionParameters<typeof testAbi, 'external', 'testFunction'>;

export type ContractFunctionArgs<
    abi extends Abi,
    abiStateMutability extends AbiStateMutability = AbiStateMutability,
    functionName extends ContractFunctionName<abi, abiStateMutability> = 
        ContractFunctionName<abi, abiStateMutability>,
> = Extract<ExtractFunctions<abi>, {name: functionName}>["inputs"];

type testContractFunctionArgs = ContractFunctionArgs<typeof testAbi, 'external', '__execute__'>;

type testContractFunctionArgs2 = ContractFunctionArgs<typeof testAbi, 'external', '__validate__'>;