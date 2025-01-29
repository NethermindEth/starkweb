import type { StarknetAbi, StarknetAbiFunction, StarknetAbiEvent, StarknetAbiInterface, StarknetType, StarknetStruct, StarknetEnum, AbiParameter, StarknetCoreType } from "./types.js";

export function parseStarknetAbi<const T extends readonly any[]>(abi: T): {
  functions: ReadonlyArray<StarknetAbiFunction<T[number]['name']>>,
  events: ReadonlyArray<StarknetAbiEvent>,
  implementedInterfaces: ReadonlyArray<StarknetAbiInterface>,
  structs: ReadonlyArray<StarknetStruct>,
  enums: ReadonlyArray<StarknetEnum>
} {
  const functions: StarknetAbiFunction<T[number]['name']>[] = [];
  const events: StarknetAbiEvent[] = [];
  const interfaces: StarknetAbiInterface[] = [];
  const structs: StarknetStruct[] = [];
  const enums: StarknetEnum[] = [];

  for (const item of abi) {
    switch (item.type) {
      case 'function':
        functions.push({
          type: 'function',
          name: item.name,
          inputs: item.inputs?.map(parseAbiParameter) || [],
          outputs: item.outputs?.map(parseAbiParameter) || []
        });
        break;
      case 'event':
        events.push({
          type: 'event', 
          name: item.name,
          inputs: item.inputs?.map(parseAbiParameter) || [],
          kind: 'enum',
          variants: []
        });
        break;
      case 'interface':
        functions.push(...item.items.filter((item: { type: string; }): item is StarknetAbiFunction<T[number]['name']> => item.type === 'function'));
        events.push(...item.items.filter((item: { type: string; }): item is StarknetAbiEvent => item.type === 'event'));
        interfaces.push({
          name: item.name,
          items: item.items?.map(parseAbiParameter) || []
        });
        break;
      case 'struct':
        structs.push({
          type: 'struct',
          name: item.name,
          members: item.members?.map(parseAbiParameter) || []
        });
        break;
      case 'enum':
        enums.push({
          type: 'enum',
          name: item.name,
          variants: item.variants?.map(parseAbiParameter) || []
        });
        break;
    }
  }
  return {
    functions: functions as ReadonlyArray<StarknetAbiFunction<T[number]['name']>>,
    events: events as ReadonlyArray<StarknetAbiEvent>,
    implementedInterfaces: interfaces as ReadonlyArray<StarknetAbiInterface>,
    structs: structs as ReadonlyArray<StarknetStruct>,
    enums: enums as ReadonlyArray<StarknetEnum>
  };
}

function parseAbiParameter(param: any): AbiParameter {
  return {
    name: param.name,
    type: parseType(param.type)
  };
}


function parseType(typeStr: string): StarknetType {
    // Handle core::array::Array::<T> syntax
    if (typeStr.startsWith('core::array::Array::<')) {
      const elementType = typeStr
        .replace('core::array::Array::<', '')
        .replace('>', '');
      return {
        type: 'array',
        elementType: parseType(elementType) as StarknetCoreType
      };
    }
    
    // Handle struct references
    if (typeStr.includes('::')) {
      return { type: 'struct', name: typeStr, members: [] };
    }
    
    
    // Existing array handling
    if (typeStr.endsWith('*')) {
      const baseType = typeStr.slice(0, -1);
      return {
        type: 'array',
        elementType: parseBaseType(baseType)
      };
    }
    
    return parseBaseType(typeStr);
  }

function parseBaseType(typeStr: string): StarknetCoreType {
  return typeStr as StarknetCoreType;
}


export type ContractFunctionName<T> = T extends { 
  functions: ReadonlyArray<StarknetAbiFunction<infer N>> 
} ? N : never;
import { testAbi } from "./testabi.js";
const abinew2 = parseStarknetAbi(testAbi);
type exp2 = ContractFunctionName<typeof abinew2>;
