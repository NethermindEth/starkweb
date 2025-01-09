import { testAbi } from './testabi.js'

const mockAbi = [
  { type: "function", name: "transfer" },
  { type: "interface", items: [{ type: "function", name: "deposit" }] }
] as const 

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

type testExtractFunctions = ExtractFunctions<typeof mockAbi>;

type testExtractFunctions2 = ExtractFunctions<typeof testAbi>;