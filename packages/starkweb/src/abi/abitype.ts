import type { Abi } from '../strk-types/abi.js';
import type { Uint512 } from '../strk-types/lib.js';
import type { Uint256 } from '../strk-types/lib.js';
import type {
  AbiType,
  Address,
} from './starkweb-abi.js';
// import type { testAbi } from './testabi.js';

 export type CairoInt = 'u8' | 'u16' | 'u32' | 'u64' | 'u128' | 'u256' | 'u512'



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
    'core::felt252': { inputs: 'felt252'; outputs: 'felt252' };
    'core::integer::u8': { inputs: number; outputs: number };
    'core::integer::u16': { inputs: number; outputs: number };
    'core::integer::u32': { inputs: number; outputs: number };
    'core::integer::u64': { inputs: number; outputs: number };
    'core::integer::u128': { inputs: number; outputs: number };
    'core::integer::u256': { inputs: Uint256; outputs: Uint256 };
    'core::integer::u512': { inputs: Uint512; outputs: Uint512 };
    'core::array::Array<T>': { inputs: 'T[]'; outputs: 'T[]' };
    'core::bool': { inputs: boolean; outputs: boolean };
    'core::starknet::contract_address::ContractAddress': { inputs: Address; outputs: Address };
    'core::string::String': { inputs: string; outputs: string };
    'core::starknet::class_hash::ClassHash': { inputs: string; outputs: string };
    tuple: Record<string, unknown>;
}


export type AbiTypeToPrimitiveType<
    abiType extends string,
    abiParameterKind extends AbiParameterKind = AbiParameterKind,
    abi extends Abi = Abi,
> = 
abiType extends `core::zeroable::NonZero::<${infer T}>`
    ? AbiTypeToPrimitiveType<T, abiParameterKind, abi>
    : abiType extends `core::array::Array::<${infer T}>` | `core::array::Span::<${infer T}>`
    ? AbiTypeToPrimitiveType<T, abiParameterKind, abi>[]
    : abiType extends keyof PrimitiveTypeLookup
    ? PrimitiveTypeLookup[abiType] extends { [K in abiParameterKind]: any }
    ? PrimitiveTypeLookup[abiType][abiParameterKind]
    : PrimitiveTypeLookup[abiType]
    : HasStructImplementation<abiType, abi> extends true
    ?  { [K in Extract<abi[number], { type: 'struct'; name: abiType }>['members'][number] as K['name']]: 
        AbiTypeToPrimitiveType<K['type'], abiParameterKind, abi> }
    : HasEnumImplementation<abiType, abi> extends true
    ? AbiTypeToPrimitiveType<Extract<abi[number], { type: 'enum'; name: abiType }>['variants'][number]['type'], abiParameterKind, abi>
    : any;

// type testAbiTypeToPrimitiveType3 = AbiTypeToPrimitiveType<'argent::signer::signer_signature::Signer', 'inputs', typeof testAbi>;

type HasStructImplementation<
    InterfaceName extends string,
    abi extends Abi = Abi
> = abi extends readonly unknown[]
    ? Extract<abi[number], { type: 'struct'; name: InterfaceName }> extends never
        ? false
        : true
    : false;

// This should be true because testAbi has an implementation of IAccount
// The HasImplementation type is incorrectly checking the condition - it's returning false because:
// 1. The outer condition `abi extends readonly unknown[]` works correctly
// 2. But `abi[number] extends { type: 'impl'...}` is checking if EVERY element has type:'impl',
//    when we only need to check if ANY element matches
// 3. We need to use Extract to find matching elements instead
// type TestHasImplementation = HasImplementation<'argent::account::interface::IAccount', typeof testAbi>; // false

// type test = HasImplementation<'core::starknet::account::Call', typeof testAbi>;


type HasEnumImplementation<
    InterfaceName extends string,
    abi extends Abi = Abi
> = abi extends readonly unknown[]
    ? Extract<abi[number], { type: 'enum'; name: InterfaceName }> extends never
        ? false
        : true
    : false;

// type test2 = HasEnumImplementation<'argent::signer::signer_signature::Signer', typeof testAbi>;