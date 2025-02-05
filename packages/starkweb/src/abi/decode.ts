import { type StarknetType, type AbiParameter, type StarknetStruct, type StarknetCoreType } from './types.js';
import { BigNumber } from '@0x/utils';

export function decodeFromTypes(
  types: StarknetType[],
  values: BigNumber[]
): any[] {
  let offset = 0;
  const results: any[] = [];

  for (const type of types) {
    const [value, newOffset] = decodeCoreType(type, values, offset);
    results.push(value);
    offset = newOffset;
  }

  return results;
}

export function decodeFromParams(
  params: AbiParameter[],
  values: BigNumber[]
): Record<string, any> {
  let offset = 0;
  const result: Record<string, any> = {};

  for (const param of params) {
    const [value, newOffset] = decodeCoreType(param.type, values, offset);
    result[param.name ?? 'data'] = value;
    offset = newOffset;
  }

  return result;
}

export function decodeCoreType(
  type: StarknetType,
  values: BigNumber[],
  offset: number,
  structs: Map<string, StarknetStruct> = new Map()
): [any, number] {
  if (typeof type === 'object' && type.type === 'struct') {
    const structDef = structs.get(type.name);
    if (!structDef) throw new Error(`Undefined struct: ${type.name}`);
    
    const result: Record<string, any> = {};
    for (const member of structDef.members) {
      const [value, newOffset] = decodeCoreType(
        member.type as StarknetType,
        values,
        offset,
        structs
      );
      result[member.name] = value;
      offset = newOffset;
    }
    return [result, offset];
  }

  if (isArrayType(type)) {
    const length = Number(values[offset]) || 0;
    const array: any[] = [];
    let currentOffset = offset + 1;

    for (let i = 0; i < length; i++) {
      const [value, newOffset] = decodeCoreType(type.elementType, values, currentOffset);
      array.push(value);
      currentOffset = newOffset;
    }

    return [array, currentOffset];
  }

  switch (type) {
    case 'bool':
    case 'core::bool':
      if (!values[offset]) {
        throw new Error('Invalid Bool value');
      }
      return [values[offset]?.toNumber() !== 0, offset + 1];
    case 'u256':
    case 'core::integer::u256':
    case 'uint256':
      if (!values[offset] || !values[offset + 1]) {
        throw new Error('Invalid U256 value');
      }
      return [
        BigInt(values[offset]?.toString() || '0') + (BigInt(values[offset + 1]?.toString() || '0') << 128n),
        offset + 2
      ];
    case 'felt':
    case 'core::felt252':
      if (!values[offset]) {
        throw new Error('Invalid Felt value');
      }
      return [BigInt(values[offset]?.toString() || '0').toString(16), offset + 1];
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
}

function isArrayType(type: StarknetType): type is { type: 'array', elementType: StarknetCoreType } {
  return typeof type === 'object' && 'type' in type && type.type === 'array';
} 

// function decodeFunctionResult<T>(type: T, values: BigNumber[]): T {
//   const [value, newOffset] = decodeCoreType(type, values, 0);
//   return value;
// }

// export function decodeFunctionResult(
//   values: string[],
//   outputs: { type: string }[]
// ) {
//   const types = outputs.map(output => TypeMap[output.type as keyof typeof TypeMap]);
//   return decodeFromTypes(types, values.map(v => new BigNumber(v)));
// }