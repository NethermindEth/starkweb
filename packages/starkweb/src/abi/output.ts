import { parseStarknetAbi } from "./starkabi.js";
import { decodeFromParams } from "./decode.js";
import type { BigNumber } from "@0x/utils";
export function decodeFunctionCall(result: string[], functionName: string, abi: any[]) {
    const newAbi = parseStarknetAbi(abi);
    const functionCall = newAbi.functions.find((f) => f.name === functionName);
    if (!functionCall) {
        throw new Error(`Function ${functionName} not found in ABI`);
    }
    console.log(functionCall);
    const outputParams = functionCall.outputs;
    console.log(outputParams);
    return decodeFromParams(outputParams, result as unknown as BigNumber[]);
}