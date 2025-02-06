import { BigNumber } from '@0x/utils';

import {
  type AbiParameter,
  type StarknetCoreType,
  type StarknetType,
} from './types.js';

export function encodeFromTypes(
  types: StarknetType[],
  values: any[]
): BigNumber[] {
  if (types.length !== values.length) {
    throw new Error('Number of types must match number of values');
  }

  return types.flatMap((type, i) => encodeCoreType(type, values[i]));
}

export function encodeFromParams(
  params: AbiParameter[],
  values: Record<string, any>
): BigNumber[] {
  return params.flatMap(param => 
    encodeCoreType(param.type, values[param.name])
  );
}

export function encodeCoreType(
  type: StarknetType,
  value: any
): BigNumber[] {
  if (isArrayType(type)) {
    if (!Array.isArray(value)) {
      throw new Error('Expected array value');
    }
    return [
      new BigNumber(value.length),
      ...value.flatMap(v => encodeCoreType(type.elementType, v))
    ];
  }
  if (typeof type === 'object' && type.type === 'struct') {
    if (!type.members || type.members.length === 0 || !type.members[0]?.type) {
      throw new Error('Invalid struct type - missing member type');
    }
    if (!Array.isArray(value)) {
      throw new Error('Expected array value for struct type');
    }
    return value.flatMap((v: any) => encodeCoreType(type.members[0]!.type, v));
  }

  switch (type) {
    case 'bool':
      return [new BigNumber(value ? 1 : 0)];
    case 'u256':
      return [
        new BigNumber(value).mod(new BigNumber(2).pow(128)),
        new BigNumber(value).div(new BigNumber(2).pow(128)).integerValue()
      ];
    case 'felt':
      return [new BigNumber(value)];
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
}

function isArrayType(type: StarknetType): type is { type: 'array', elementType: StarknetCoreType } {
  return typeof type === 'object' && 'type' in type && type.type === 'array';
} 