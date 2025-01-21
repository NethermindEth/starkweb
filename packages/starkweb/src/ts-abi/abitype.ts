import type { AbiType, CairoAbiInternalType, CairoAddress } from "./starkweb-abi.js";



export type CairoInt = 'u8' | 'u16' | 'u32' | 'u64' | 'u128' | 'u256'





export type AbiParameterKind = 'inputs' | 'outputs';

/**
 * Converts {@link AbiType} to corresponding TypeScript primitive type.
 *
 * Does not include full array or tuple conversion. Use {@link AbiParameterToPrimitiveType} to fully convert arrays and tuples.
 *
 * @param abiType - {@link AbiType} to convert to TypeScript representation
 * @param abiParameterKind - Optional {@link AbiParameterKind} to narrow by parameter type
 * @returns TypeScript primitive type
 */
interface PrimitiveTypeLookup {
  u8: { inputs: number; outputs: number };
  u16: { inputs: number; outputs: number };
  u32: { inputs: number; outputs: number };
  u64: { inputs: number; outputs: number };
  u128: { inputs: bigint; outputs: bigint };
  u256: { inputs: bigint; outputs: bigint };
  'core::felt252': { inputs: bigint; outputs: bigint };
  'core::integer::u8': { inputs: number; outputs: number };
  'core::integer::u16': { inputs: number; outputs: number };
  'core::integer::u32': { inputs: number; outputs: number };
  'core::integer::u64': { inputs: number; outputs: number };
  'core::integer::u128': { inputs: bigint; outputs: bigint };
  'core::integer::u256': { inputs: bigint; outputs: bigint };
  bool: boolean;
  function: `${string}${string}`;
  string: string;
  address: CairoAddress;
  tuple: Record<string, unknown>;
}

export type AbiTypeToPrimitiveType<
  abiType extends CairoAbiInternalType,
  abiParameterKind extends AbiParameterKind = AbiParameterKind,
> = abiType extends keyof PrimitiveTypeLookup 
  ? PrimitiveTypeLookup[abiType] extends { [K in abiParameterKind]: any }
    ? PrimitiveTypeLookup[abiType][abiParameterKind]
    : PrimitiveTypeLookup[abiType]
  : never;

  // Add Example Usage
//   type Example = AbiTypeToPrimitiveType<'core::felt252', 'inputs'> ;