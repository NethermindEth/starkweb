import { type StarknetType, StarknetCoreType, type AbiParameter } from './types.js';
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
    result[param.name] = value;
    offset = newOffset;
  }

  return result;
}

export function decodeCoreType(
  type: StarknetType,
  values: BigNumber[],
  offset: number
): [any, number] {
  if (isArrayType(type)) {
    const length = values[offset]?.toNumber() ?? 0;
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
    case StarknetCoreType.Bool:
      return [!values[offset]?.isZero(), offset + 1];
    case StarknetCoreType.U256:
      if (!values[offset] || !values[offset + 1]) {
        throw new Error('Invalid U256 value');
      }
      return [
        values[offset]!.plus(values[offset + 1]!.times(new BigNumber(2).pow(128))),
        offset + 2
      ];
    case StarknetCoreType.Felt:
      if (!values[offset]) {
        throw new Error('Invalid Felt value'); 
      }
      return [values[offset].toString(16), offset + 1];
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
}

function isArrayType(type: StarknetType): type is { type: 'array', elementType: StarknetCoreType } {
  return typeof type === 'object' && 'type' in type && type.type === 'array';
} 