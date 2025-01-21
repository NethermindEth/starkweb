import type { AbiStateMutability } from 'abitype'
import type { ResolvedRegister } from './register.js'
import type { Pretty, Range } from './types.js'

export type Address = ResolvedRegister['addressType']

////////////////////////////////////////////////////////////////////////////////////////////////////
// Cairo Types
// https://book.cairo-lang.org/ch02-02-data-types.html


// biome-ignore format: no formatting
export type MBits =
  | ''  | 8   | 16  | 32  | 64  | 128 | 256

// From https://docs.soliditylang.org/en/latest/abi-spec.html#types
export type CairoAddress = 'address'
export type CairoBool = 'bool'
export type CairoFunction = 'function'
export type CairoString = 'string'
export type CairoTuple = 'tuple'
export type CairoInt = `${'u' | ''}int${MBits}` // `(u)int<M>`: (un)signed integer type of `M` bits, `0 < M <= 256`, `M % 8 == 0`
// No need to support "fixed" until Solidity does
// https://github.com/ethereum/solidity/issues/409
// `(u)fixed<M>x<N>`: (un)signed fixed-point decimal number of `M` bits, `8 <= M <= 256`, `M % 8 == 0`,
// and `0 < N <= 80`, which denotes the value `v` as `v / (10 ** N)`
// export type SolidityFixed =
//   | `${'u' | ''}fixed`
//   | `${'u' | ''}fixed${MBits}x${Range<1, 20>[number]}`

export type CairoFixedArrayRange = Range<
  ResolvedRegister['fixedArrayMinLength'],
  ResolvedRegister['fixedArrayMaxLength']
>[number]
export type CairoFixedArraySizeLookup = {
  [Prop in CairoFixedArrayRange as `${Prop}`]: Prop
}

/**
 * Recursively build arrays up to maximum depth
 * or use a more broad type when maximum depth is switched "off"
 */
type _BuildArrayTypes<
  T extends string,
  Depth extends readonly number[] = [],
> = ResolvedRegister['arrayMaxDepth'] extends false
  ? `${T}[${string}]`
  : Depth['length'] extends ResolvedRegister['arrayMaxDepth']
    ? T
    : T extends `${any}[${CairoFixedArrayRange | ''}]`
      ? _BuildArrayTypes<
          T | `${T}[${CairoFixedArrayRange | ''}]`,
          [...Depth, 1]
        >
      : _BuildArrayTypes<`${T}[${CairoFixedArrayRange | ''}]`, [...Depth, 1]>

// Modeling fixed-length (`<type>[M]`) and dynamic (`<type>[]`) arrays
// Tuple and non-tuple versions are separated out for narrowing anywhere structs show up
export type CairoArrayWithoutTuple = _BuildArrayTypes<
  | CairoAddress
  | CairoBool
  | CairoFunction
  | CairoInt
  | CairoString
>
export type CairoArrayWithTuple = _BuildArrayTypes<CairoTuple>
export type CairoArray = CairoArrayWithoutTuple | CairoArrayWithTuple

////////////////////////////////////////////////////////////////////////////////////////////////////
// Abi Types

export type AbiType =
  | CairoArray
  | CairoAddress
  | CairoBool
  | CairoFunction
  | CairoInt
  | CairoString
  | CairoTuple
// type ResolvedAbiType = ResolvedRegister['strictAbiType'] extends true
//   ? AbiType
//   : string
type ResolvedAbiType =  AbiType


export type CairoAbiInternalType =
  | ResolvedAbiType
  | `address ${string}`
  | `contract ${string}`
  | `enum ${string}`
  | `struct ${string}`
  | `core::integer::${CairoInt}`
  | `core::felt252` 

export type AbiParameter = Pretty<
  {
    type: ResolvedAbiType
    name?: string | undefined
    /** Representation used by Solidity compiler */
    internalType?: CairoAbiInternalType | undefined
  } & (
    | { type: Exclude<ResolvedAbiType, CairoTuple | CairoArrayWithTuple> }
    | {
        type: CairoTuple | CairoArrayWithTuple
        components: readonly AbiParameter[]
      }
  )
>

export type CairoAbiEventParameter = AbiParameter & { indexed?: boolean | undefined }

/**
 * State mutability for {@link CairoAbiFunction}
 *
 * @see https://docs.soliditylang.org/en/latest/contracts.html#state-mutability
 */
export type CairoAbiStateMutability = 'external' | 'view'

/** Kind of {@link AbiParameter} */
export type CairoAbiParameterKind = 'inputs' | 'outputs'

/** ABI ["function"](https://docs.soliditylang.org/en/latest/abi-spec.html#json) type */
export type CairoAbiFunction = {
  type: 'function'
  /**
   * @deprecated use `pure` or `view` from {@link AbiStateMutability} instead
   * @see https://github.com/ethereum/solidity/issues/992
   */
  constant?: boolean | undefined
  /**
   * @deprecated Vyper used to provide gas estimates
   * @see https://github.com/vyperlang/vyper/issues/2151
   */
  gas?: number | undefined
  inputs: readonly AbiParameter[]
  name: string
  outputs: readonly AbiParameter[]
  /**
   * @deprecated use `payable` or `nonpayable` from {@link AbiStateMutability} instead
   * @see https://github.com/ethereum/solidity/issues/992
   */
  payable?: boolean | undefined
  stateMutability: CairoAbiStateMutability
}

/** ABI ["constructor"](https://docs.soliditylang.org/en/latest/abi-spec.html#json) type */
export type CairoAbiConstructor = {
  type: 'constructor'
  inputs: readonly AbiParameter[]
  /**
   * @deprecated use `payable` or `nonpayable` from {@link AbiStateMutability} instead
   * @see https://github.com/ethereum/solidity/issues/992
   */
  payable?: boolean | undefined
  stateMutability: Extract<CairoAbiStateMutability, 'payable' | 'nonpayable'>
}

/** Cairo ["fallback"](https://docs.soliditylang.org/en/latest/abi-spec.html#json) type */
export type CairoAbiFallback = {
  type: 'fallback'
  /**
   * @deprecated use `payable` or `nonpayable` from {@link AbiStateMutability} instead
   * @see https://github.com/ethereum/solidity/issues/992
   */
  payable?: boolean | undefined
  stateMutability: Extract<CairoAbiStateMutability, 'payable' | 'nonpayable'>
}

/** Cairo ["receive"](https://docs.soliditylang.org/en/latest/contracts.html#receive-ether-function) type */
export type CairoAbiReceive = {
  type: 'receive'
  stateMutability: Extract<CairoAbiStateMutability, 'payable'>
}

/** Cairo ["event"](https://docs.soliditylang.org/en/latest/abi-spec.html#events) type */
export type CairoAbiEvent = {
  type: 'event'
  anonymous?: boolean | undefined
  inputs: readonly CairoAbiEventParameter[]
  name: string
}

/** Cairo ["error"](https://docs.soliditylang.org/en/latest/abi-spec.html#errors) type */
export type CairoAbiError = {
  type: 'error'
  inputs: readonly AbiParameter[]
  name: string
}

/** `"type"` name for {@link Abi} items. */
export type AbiItemType =
  | 'constructor'
  | 'error'
  | 'event'
  | 'fallback'
  | 'function'
  | 'receive'

/**
 * Contract [ABI Specification](https://docs.soliditylang.org/en/latest/abi-spec.html#json)
 */
export type Abi = readonly (
  | CairoAbiConstructor
  | CairoAbiError
  | CairoAbiEvent
  | CairoAbiFallback
  | CairoAbiFunction
  | CairoAbiReceive
)[]

////////////////////////////////////////////////////////////////////////////////////////////////////
// Typed Data Types

export type TypedDataDomain = {
  chainId?: number | bigint | undefined
  name?: string | undefined
  salt?: ResolvedRegister['bytesType']['outputs'] | undefined
  verifyingContract?: Address | undefined
  version?: string | undefined
}

// Subset of `AbiType` that excludes `tuple`, `function`, and dynamic aliases `int` and `uint`
export type TypedDataType = Exclude<
  AbiType,
  CairoFunction | CairoTuple | CairoArrayWithTuple | 'int' | 'uint'
>

export type TypedDataParameter = {
  name: string
  type: TypedDataType | keyof TypedData | `${keyof TypedData}[${string | ''}]`
}

/**
 * [EIP-712](https://eips.ethereum.org/EIPS/eip-712#definition-of-typed-structured-data-%F0%9D%95%8A) Typed Data Specification
 */
export type TypedData = Pretty<
  Record<string, readonly TypedDataParameter[]> & {
    // Disallow `TypedDataType` as key names (e.g. `address`)
    [_ in TypedDataType]?: never
  }
>