import { 
  type StarknetAbi, 
  type StarknetType, 
  type StarknetCoreType, 
  type AbiParameter,
  type StarknetAbiFunction,
  type StarknetAbiEvent,
  type StarknetAbiInterface
} from './types.js';

const ValidStarknetCoreTypes = new Set([
  'bool', 'felt', 'u8', 'u16', 'u32', 'u64', 'u128', 'u256',
  'contract_address', 'felt252', 'core::felt252', 'core::starknet::contract_address::ContractAddress'
]);

export function createAbi(
  name: string,
  address: string,
  functions: StarknetAbiFunction[],
  events: StarknetAbiEvent[],
  implementedInterfaces: StarknetAbiInterface[]
): StarknetAbi {
  return {
    name,
    address,
    functions,
    events,
    implementedInterfaces,
    structs: [],
    enums: []
  };
}

export function parseAbiFromJson(
  rawAbi: any,
  name: string,
  address: string
): StarknetAbi {
  const functions = rawAbi.functions?.map(parseFunctionDefinition) || [];
  const events = rawAbi.events?.map(parseEventDefinition) || [];
  const interfaces = rawAbi.interfaces?.map(parseInterfaceDefinition) || [];

  return createAbi(name, address, functions, events, interfaces);
}

function parseFunctionDefinition(fn: any): StarknetAbiFunction {
  return {
    type: 'function',
    name: fn.name,
    inputs: (fn.inputs || []).map(parseAbiParameter),
    outputs: (fn.outputs || []).map(parseAbiParameter)
  };
}

function parseEventDefinition(evt: any): StarknetAbiEvent {
  return {
    type: 'event',
    name: evt.name,
    inputs: (evt.inputs || []).map(parseAbiParameter),
    kind: 'enum',
    variants: []
  };
}

function parseInterfaceDefinition(iface: any): StarknetAbiInterface {
  return {
    name: iface.name,
    items: iface.items || [],
  };
}

function parseAbiParameter(param: any): AbiParameter {
  return {
    name: param.name,
    type: parseType(param.type)
  };
}

function parseType(typeStr: string): StarknetType {
  // Handle struct references
  if (typeStr.includes('::')) {
    return { type: 'struct', name: typeStr, members: [] };
  }
  
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
  if (ValidStarknetCoreTypes.has(typeStr)) {
    return typeStr as StarknetCoreType;
  }
  throw new Error(`Unsupported type: ${typeStr}`);
}

// ... existing imports and functions ...

export function parseAbi(abiJson: any[], name: string, address: string): StarknetAbi {
  const functions: StarknetAbiFunction[] = [];
  const events: StarknetAbiEvent[] = [];
  const interfacesMap = new Map<string, StarknetAbiInterface>();
  const implementedInterfaces: StarknetAbiInterface[] = [];

  // First pass: collect all interfaces and implementation declarations
  for (const entry of abiJson) {
    switch (entry.type) {
      case 'interface':
        const iface = parseInterfaceDefinition(entry);
        interfacesMap.set(iface.name, iface);
        break;
    }
  }

  // Second pass: process implementations and collect functions/events
  for (const entry of abiJson) {
    switch (entry.type) {
      case 'impl':
        const iface = interfacesMap.get(entry.interface_name);
        if (iface) {
          implementedInterfaces.push(iface);
          // Add interface functions and events to main lists
          functions.push(...iface.items.filter((item): item is StarknetAbiFunction => item.type === 'function'));
          events.push(...iface.items.filter((item): item is StarknetAbiEvent => item.type === 'event'));
        }
        break;
      case 'function':
        functions.push(parseFunctionDefinition(entry));
        break;
      case 'event':
        events.push(parseEventDefinition(entry));
        break;
    }
  }

  return createAbi(
    name,
    address,
    // Deduplicate functions and events
    [...new Map(functions.map(f => [f.name, f])).values()],
    [...new Map(events.map(e => [e.name, e])).values()],
    implementedInterfaces
  );
}

// ... rest of existing code ...