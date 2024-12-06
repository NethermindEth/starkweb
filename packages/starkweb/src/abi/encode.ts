import { type StarknetType, StarknetCoreType, type AbiParameter } from './types.js';
import { BigNumber } from '@0x/utils';

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

  switch (type) {
    case StarknetCoreType.Bool:
      return [new BigNumber(value ? 1 : 0)];
    case StarknetCoreType.U256:
      return [
        new BigNumber(value).mod(new BigNumber(2).pow(128)),
        new BigNumber(value).div(new BigNumber(2).pow(128)).integerValue()
      ];
    case StarknetCoreType.Felt:
      return [new BigNumber(value)];
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
}

function isArrayType(type: StarknetType): type is { type: 'array', elementType: StarknetCoreType } {
  return typeof type === 'object' && 'type' in type && type.type === 'array';
} 