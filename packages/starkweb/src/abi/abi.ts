import { 
  type StarknetAbi, 
  type StarknetType, 
  StarknetCoreType, 
  type AbiParameter,
  type StarknetAbiFunction,
  type StarknetAbiEvent,
  type StarknetAbiInterface
} from './types.js';

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
    implementedInterfaces
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
    name: fn.name,
    inputs: fn.inputs.map(parseAbiParameter),
    outputs: fn.outputs.map(parseAbiParameter)
  };
}

function parseEventDefinition(evt: any): StarknetAbiEvent {
  return {
    name: evt.name,
    inputs: evt.inputs.map(parseAbiParameter)
  };
}

function parseInterfaceDefinition(iface: any): StarknetAbiInterface {
  return {
    name: iface.name,
    functions: iface.functions?.map(parseFunctionDefinition) || [],
    events: iface.events?.map(parseEventDefinition) || []
  };
}

function parseAbiParameter(param: any): AbiParameter {
  return {
    name: param.name,
    type: parseType(param.type)
  };
}

function parseType(typeStr: string): StarknetType {
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
  if (Object.values(StarknetCoreType).includes(typeStr as StarknetCoreType)) {
    return typeStr as StarknetCoreType;
  }
  throw new Error(`Unsupported type: ${typeStr}`);
} 