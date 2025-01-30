import { BigNumber } from "@0x/utils";
import { decodeFunctionCall } from "../../packages/starkweb/src/abi/output.js";


import { STRKAbi } from "./ether.js";

const result = decodeFunctionCall(
    [new BigNumber("0x01")],
    "get_upgrade_delay",
    STRKAbi as any
);

console.log(result);