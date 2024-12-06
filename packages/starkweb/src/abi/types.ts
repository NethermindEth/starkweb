export enum StarknetCoreType {
  Bool = 'bool',
  Felt = 'felt',
  U8 = 'u8',
  U16 = 'u16',
  U32 = 'u32',
  U64 = 'u64',
  U128 = 'u128',
  U256 = 'u256',
  ContractAddress = 'contract_address',
}

export type StarknetArray = {
  type: 'array';
  elementType: StarknetCoreType;
};

export type StarknetType = StarknetCoreType | StarknetArray;

export interface AbiParameter {
  name: string;
  type: StarknetType;
}

export interface StarknetAbiFunction {
  name: string;
  inputs: AbiParameter[];
  outputs: AbiParameter[];
}

export interface StarknetAbiEvent {
  name: string;
  inputs: AbiParameter[];
}

export interface StarknetAbiInterface {
  name: string;
  functions: StarknetAbiFunction[];
  events: StarknetAbiEvent[];
}

export interface StarknetAbi {
  name: string;
  address: string;
  functions: StarknetAbiFunction[];
  events: StarknetAbiEvent[];
  implementedInterfaces: StarknetAbiInterface[];
}

// New type definitions for ABI parsing
export interface StarknetStruct {
  type: 'struct';
  name: string;
  members: {
    name: string;
    type: string;
  }[];
}

export interface StarknetEnum {
  type: 'enum';
  name: string;
  variants: {
    name: string;
    type: string;
  }[];
}

export interface StarknetFunction {
  type: 'function';
  name: string;
  inputs: {
    name?: string;
    type: string;
  }[];
  outputs: {
    type: string;
  }[];
  state_mutability?: 'view' | 'external';
}

export interface StarknetL1Handler {
  type: 'l1_handler';
  name: string;
  inputs: {
    name: string;
    type: string;
  }[];
  outputs: any[];
  state_mutability: 'external';
}

export interface StarknetEvent {
  type: 'event';
  name: string;
  kind: 'enum';
  variants: any[];
}

export type StarknetAbiEntry = 
  | StarknetStruct 
  | StarknetEnum 
  | StarknetFunction 
  | StarknetL1Handler 
  | StarknetEvent; 