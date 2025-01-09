import { testAbi } from './testabi.js'


export type ExtractFunctions<T> = T extends readonly (infer U)[]
  ? ExtractFunctions<U>
  : T extends { type: "function" }
    ?  T
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
        
type _testExtractFunctions2 = ExtractFunctions<typeof testAbi>;
        
        // export type ContractFunctions<TAbi extends readonly StarknetAbiEntry[]> = {
        //   [K in ExtractFunctions<TAbi[number]> as K["name"]]: K;
        // };
        
export type ContractFunctions<TAbi extends readonly {
    type: "impl" | "struct" | "enum" | "interface" | "constructor" | "event";
    name: string;
    interface_name?: string;
    members?: readonly any[];
    variants?: readonly any[];
    items?: readonly any[];
}[]> = {
[K in ExtractFunctions<TAbi[number]> as K["name"]]: K;
};


        type testContractFunctions = ContractFunctions<typeof testAbi>;
        
        