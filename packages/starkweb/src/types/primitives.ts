// Core numeric type for StarkNet (252-bit field element)
export type Felt = string;

export function createFelt(value: string | number | bigint): Felt {
  try {
    // Handle empty/null/undefined
    if (!value) {
      throw new Error('Felt value cannot be empty');
    }

    // Convert to BigInt to validate numeric value
    const bigIntValue = BigInt(value);

    // Check if within valid Felt range (252 bits)
    const MAX_FELT = BigInt('0x800000000000000000000000000000000000000000000000000000000000000');
    if (bigIntValue < 0 || bigIntValue >= MAX_FELT) {
      throw new Error('Felt value out of valid range (0 to 2^252 - 1)');
    }

    return bigIntValue.toString();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Invalid Felt value: ${error.message}`);
    }
    throw new Error('Invalid Felt value: Unknown error');
  }
}

export function feltToString(felt: Felt): string {
  if (!felt) {
    throw new Error('Cannot convert empty Felt to string');
  }
  return felt;
}

// Address types
export type Address = Felt
export type ContractAddress = Address

// Hash types
export type PedersenHash = Felt
export type PoseidonHash = Felt
export type Hash = PedersenHash | PoseidonHash

// Merkle tree structures
export type MerkleNode = {
  left: Hash
  right: Hash
  parent?: Hash
}

export type MerkleTree = MerkleNode[]

// Block-related types
export type BlockNumber = Felt
export type BlockHash = Felt
export type Timestamp = number // Unix timestamp

// Storage types
export type StorageKey = Felt
export type StorageValue = Felt

// Contract ABI types
export type ContractClassHash = Felt
export type EntryPointSelector = Felt
export type EntryPointType = Felt

// Transaction types
export type TransactionHash = Felt
export type EventKey = Felt

// Network identifiers
export type ChainId = 
  | "SN_MAIN"   // Mainnet
  | "SN_GOERLI" // Testnet
  | string       // Custom networks
