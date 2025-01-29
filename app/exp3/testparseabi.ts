import { parseAbi, parseAbiFromJson } from "../../packages/starkweb/src/abi/abi";
import { parseStarknetAbi, type ContractFunctionName } from "../../packages/starkweb/src/abi/starkabi";
import { testAbi } from "../../packages/starkweb/src/abi/testabi";
// import { argentAbi } from "../../packages/starkweb/src/abi/abi-examples/argent.json";
import { erc20Abi } from "../../packages/starkweb/src/constants/abis";
const abinew = parseStarknetAbi(erc20Abi as any)
type abiname = ContractFunctionName<typeof abinew>

console.log("abinew - ", abinew)
console.log("abiname - ", abiname)
