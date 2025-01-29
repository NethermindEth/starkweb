import { testAbi } from "../../packages/starkweb/src/abi/testabi";

function getFunctionOutputs(functionName: string): Record<string, string> | undefined {
  const func = testAbi.find(entry => 
    entry.type === "interface" &&
    entry.items?.some(item => item.type === "function" && item.name === functionName)
  )?.items?.find(item => 
    item.type === "function" && item.name === functionName
  );

  if (!func?.outputs) return undefined;

  return func.outputs.reduce((acc, output, index) => {
    const baseKey = output.name || "data";
    let key = baseKey;
    
    // Handle duplicate keys by appending index when needed
    let counter = 0;
    while (key in acc) {
      key = `${baseKey}_${counter}`;
      counter++;
    }
    
    acc[key] = abiTypeToPrimitiveValue(output.type, testAbi);
    return acc;
  }, {} as Record<string, string>);
}

// Example usage:
const ownerOutputs = getFunctionOutputs("get_owner");
console.log("ownerOutputs - ", ownerOutputs)
// Returns { data: "core::felt252" }

const executeOutputs = getFunctionOutputs("__execute__");
console.log("executeOutputs - ", executeOutputs)
// Returns { data: "core::array::Array::<core::array::Span::<core::felt252>>" }

const multiOutputs = getFunctionOutputs("some_function_with_unnamed_outputs");
console.log("multiOutputs - ", multiOutputs)
// Returns { data: "type1", data_0: "type2" } for multiple unnamed outputs
  
function abiTypeToPrimitiveValue<T extends string>(
    typeStr: T,
    abi: Abi,
    kind: AbiParameterKind = 'inputs'
  ): unknown {
    // Handle NonZero wrapper
    const nonZeroMatch = typeStr.match(/^core::zeroable::NonZero::<(.+)>$/);
    if (nonZeroMatch) return abiTypeToPrimitiveValue(nonZeroMatch[1], abi, kind);
  
    // Handle Array/Span types
    const arrayMatch = typeStr.match(/^core::array::(Array|Span)::<(.+)>$/);
    if (arrayMatch) {
      const innerType = abiTypeToPrimitiveValue(arrayMatch[2], abi, kind);
      return arrayMatch[1] === 'Array' ? [innerType] : [innerType];
    }
  
    // Primitive type lookup
    const primitiveMap: Record<string, any> = {
      'core::felt252': kind === 'inputs' ? 'felt252' : 'felt252',
      'core::integer::u8': 'u8',
      'core::integer::u16': 'u16',
      'core::integer::u32': 'u32',
      'core::integer::u64': 'u64',
      'core::integer::u128': 'u128',
      'core::integer::u256': 'u256',
      'core::array::Array<T>': [],
      'core::bool': true,
      'core::starknet::contract_address::ContractAddress': 'contract_address',
      'core::string::String': 'string',
      'core::starknet::class_hash::ClassHash': 'string'
    };
  
    if (primitiveMap[typeStr]) return primitiveMap[typeStr];
  
    // Handle structs
    const structDef = abi.find(
      (entry): entry is Extract<typeof entry, { type: 'struct' }> => 
        entry.type === 'struct' && entry.name === typeStr
    );
    if (structDef) {
      return structDef.members.reduce((acc, member) => ({
        ...acc,
        [member.name]: abiTypeToPrimitiveValue(member.type, abi, kind)
      }), {});
    }
  
    // Handle enums
    const enumDef = abi.find(
      (entry): entry is Extract<typeof entry, { type: 'enum' }> => 
        entry.type === 'enum' && entry.name === typeStr
    );
    if (enumDef) {
      return abiTypeToPrimitiveValue(enumDef.variants[0].type, abi, kind);
    }
  
    return null;
  }
  
  // Example usage:
  const feltValue = abiTypeToPrimitiveValue('core::felt252', testAbi);
  // Returns 'felt