import { BaseError } from './base.js'

export type ClassHashNotFoundErrorType = ClassHashNotFoundError & {
  name: 'ClassHashNotFoundError'
}
export class ClassHashNotFoundError extends BaseError {
  override name = 'ClassHashNotFoundError'
  constructor({ classHash }: { classHash: string }) {
    super(`Class hash "${classHash}" not found.`)
  }
}

export type ClassAlreadyDeclaredErrorType = ClassAlreadyDeclaredError & {
  name: 'ClassAlreadyDeclaredError'
}
export class ClassAlreadyDeclaredError extends BaseError {
  override name = 'ClassAlreadyDeclaredError'
  constructor({ classHash }: { classHash: string }) {
    super(`Class with hash "${classHash}" already declared.`)
  }
}

export type InvalidTransactionNonceErrorType = InvalidTransactionNonceError & {
  name: 'InvalidTransactionNonceError'
}
export class InvalidTransactionNonceError extends BaseError {
  override name = 'InvalidTransactionNonceError'
  constructor({ nonce }: { nonce: string | number }) {
    super(`Invalid transaction nonce "${nonce}".`)
  }
}

export type InsufficientMaxFeeErrorType = InsufficientMaxFeeError & {
  name: 'InsufficientMaxFeeError'
}
export class InsufficientMaxFeeError extends BaseError {
  override name = 'InsufficientMaxFeeError'
  constructor({ maxFee }: { maxFee: string | number }) {
    super(`Max fee "${maxFee}" is smaller than the minimal transaction cost (validation plus fee transfer).`)
  }
}

export type InsufficientAccountBalanceErrorType = InsufficientAccountBalanceError & {
  name: 'InsufficientAccountBalanceError'
}
export class InsufficientAccountBalanceError extends BaseError {
  override name = 'InsufficientAccountBalanceError'
  constructor({ address, balance, maxFee }: { address: string; balance?: string | number; maxFee?: string | number }) {
    const message = balance !== undefined && maxFee !== undefined
      ? `Account "${address}" balance "${balance}" is smaller than the transaction's max_fee "${maxFee}".`
      : `Account "${address}" has insufficient balance for the transaction.`
    super(message)
  }
}

export type ValidationFailureErrorType = ValidationFailureError & {
  name: 'ValidationFailureError'
}
export class ValidationFailureError extends BaseError {
  override name = 'ValidationFailureError'
  data?: string
  constructor({ address, data }: { address: string; data?: string }) {
    super(`Account validation failed for address "${address}".`)
    this.data = data
  }
}

export type CompilationFailedErrorType = CompilationFailedError & {
  name: 'CompilationFailedError'
}
export class CompilationFailedError extends BaseError {
  override name = 'CompilationFailedError'
  constructor({ contractAddress }: { contractAddress?: string } = {}) {
    const message = contractAddress 
      ? `Compilation failed for contract at address "${contractAddress}".`
      : 'Compilation failed.'
    super(message)
  }
}

export type ContractClassSizeTooLargeErrorType = ContractClassSizeTooLargeError & {
  name: 'ContractClassSizeTooLargeError'
}
export class ContractClassSizeTooLargeError extends BaseError {
  override name = 'ContractClassSizeTooLargeError'
  constructor({ classHash }: { classHash?: string } = {}) {
    const message = classHash 
      ? `Contract class size for class hash "${classHash}" is too large.`
      : 'Contract class size is too large.'
    super(message)
  }
}

export type NonAccountErrorType = NonAccountError & {
  name: 'NonAccountError'
}
export class NonAccountError extends BaseError {
  override name = 'NonAccountError'
  constructor({ address }: { address: string }) {
    super(`Sender address "${address}" is not an account contract.`)
  }
}

export type DuplicateTxErrorType = DuplicateTxError & {
  name: 'DuplicateTxError'
}
export class DuplicateTxError extends BaseError {
  override name = 'DuplicateTxError'
  constructor({ txHash }: { txHash: string }) {
    super(`A transaction with hash "${txHash}" already exists in the mempool.`)
  }
}

export type CompiledClassHashMismatchErrorType = CompiledClassHashMismatchError & {
  name: 'CompiledClassHashMismatchError'
}
export class CompiledClassHashMismatchError extends BaseError {
  override name = 'CompiledClassHashMismatchError'
  constructor({ expected, actual }: { expected: string; actual: string }) {
    super(`The compiled class hash "${actual}" did not match the one supplied in the transaction "${expected}".`)
  }
}

export type UnsupportedTxVersionErrorType = UnsupportedTxVersionError & {
  name: 'UnsupportedTxVersionError'
}
export class UnsupportedTxVersionError extends BaseError {
  override name = 'UnsupportedTxVersionError'
  constructor({ version }: { version: string | number }) {
    super(`The transaction version "${version}" is not supported.`)
  }
}

export type UnsupportedContractClassVersionErrorType = UnsupportedContractClassVersionError & {
  name: 'UnsupportedContractClassVersionError'
}
export class UnsupportedContractClassVersionError extends BaseError {
  override name = 'UnsupportedContractClassVersionError'
  constructor({ version }: { version: string | number }) {
    super(`The contract class version "${version}" is not supported.`)
  }
}

export type UnexpectedErrorType = UnexpectedError & {
  name: 'UnexpectedError'
}
export class UnexpectedError extends BaseError {
  override name = 'UnexpectedError'
  data?: string
  constructor({ message, data }: { message?: string; data?: string } = {}) {
    super(message || 'An unexpected error occurred.')
    this.data = data
  }
}
