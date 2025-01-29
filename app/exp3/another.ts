// import { STRKAbi } from "./ether";

import { BigNumber } from "@0x/utils";
import { decodeFromTypes } from "../../packages/starkweb/src/abi/decode.js";
import { type StarknetCoreType, type StarknetType } from "../../packages/starkweb/src/abi/types.js";
import type { CairoInt } from "../../packages/starkweb/src/abi/abitype.js";

// import { readContract } from '../../packages/starkweb/src/actions/public/readContract';
// import { client } from './index.js';
// import { decodeFromParams, decodeFromTypes } from "../../packages/starkweb/src/abi/decode.js";
// import { StarknetCoreType, type AbiParameter } from "../../packages/starkweb/src/abi/types.js";
// import type { BigNumber } from "@0x/utils";

// // const result1  = await readContract(client, {
// //     abi: STRKAbi,
// //     address: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
// //     functionName: 'balance_of',
// //     args: {
// //       account: '0x005c475b6089156c0CD4Fc9d64De149992431c442AF882d6332e7c736c99DE91' as 'contract_address',
// //     },
// //   })
// //   console.log(result1)
// //   const decoded = decodeFromParams([{ name: 'balance', type: StarknetCoreType.U16 }], result1 as unknown as BigNumber[])
// //   console.log(decoded)
//   const values = [ "0x89dbdd99eab336a4", "0x0" ]
//   const decoded2 = decodeFromTypes([ StarknetCoreType.U256 ], values as unknown as BigNumber[])
//   console.log(decoded2)


// import type { BigNumber } from "@0x/utils";
// import { decodeFromTypes } from "../../packages/starkweb/src/abi/decode.js";
// import { StarknetCoreType } from "../../packages/starkweb/src/abi/types.js";
// // Example 1: Decoding a simple u256 value
// const example1Values = ["0x89dbdd99eab336a4", "0x0"];
// const example1Result = decodeFromTypes([StarknetCoreType.U256], example1Values as unknown as BigNumber[]);
// console.log("Example 1 - U256:", example1Result);

// // Example 2: Decoding multiple felts
// const example2Values = ["0x1234", "0x5678", "0x9abc"];
// const example2Result = decodeFromTypes([StarknetCoreType.Felt, StarknetCoreType.Felt, StarknetCoreType.Felt], example2Values as unknown as BigNumber[]);
// console.log("Example 2 - Multiple felts:", example2Result);

// // Example 3: Decoding an array of felts
// const example3Values = ["0x3", "0x11", "0x22", "0x33"]; // First value is array length
// const example3Result = decodeFromTypes([{ type: "array", elementType: StarknetCoreType.Felt }], example3Values as unknown as BigNumber[]);
// console.log("Example 3 - Felt array:", example3Result);

// // Example 4: Mixed types
// const example4Values = ["0x42", "0x1234567890abcdef", "0x0"];
// const example4Result = decodeFromTypes([StarknetCoreType.Felt, StarknetCoreType.U256], example4Values as unknown as BigNumber[]);
// console.log("Example 4 - Mixed types:", example4Result);

type hello = {
    'datakldajf': 'u256'
}
const values = [ "0x89dbdd99eab336a4", "0x0" ]
const result = decodeFunctionResult<hello>(values, {
    'datakldajf': 'u256'
})
console.log(result)
export function decodeFunctionResult<T extends Record<string,CairoInt | 'felt' | 'contract_address'>>(
  values: string[],
  types: T
): T {
  console.log("values - ", values)
  const bigNumberValues = values.map(v => new BigNumber(v));
  console.log("bigNumberValues - ", bigNumberValues)

  // Infer types from generic parameter
  type TypeStructure = { [K in keyof T]: StarknetCoreType };
  const typeStructure: TypeStructure = {} as TypeStructure;
  
  // Get keys from type T
  const keys = Object.keys(types) as Array<keyof T>;
  
  // Build type structure by checking the type of each key
  for (const key of keys) {
    const typeValue = types[key].toLowerCase();
    console.log("key:", key, "typeValue:", typeValue)
    
    switch (typeValue) {
      case 'u256':
        console.log("Setting U256 for key:", key);
        typeStructure[key] = 'u256';
        break;
      case 'felt':
        console.log("Setting Felt for key:", key); 
        typeStructure[key] = 'felt';
        break;
      default:
        console.error("Invalid type:", typeValue);
        throw new Error(`Unsupported type: ${typeValue}`);
    }
  }

  console.log("Final typeStructure:", typeStructure)
  const decodedValues = decodeFromTypes(Object.values(typeStructure), bigNumberValues);
  console.log("Decoded values:", decodedValues)
  
  return Object.fromEntries(
    Object.keys(typeStructure).map((key, index) => [key, decodedValues[index].toString()])
  ) as T;
}

const resultii = decodeFunctionResult<{
  'balance': 'u256'
}>(['0x89dbdd99eab336a4', '0x0'], {
  'balance': 'u256'
})

console.log(resultii)