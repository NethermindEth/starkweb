// biome-ignore lint/performance/noBarrelFile: entrypoint module
export {
    type RequestErrorType,
    buildRequest,
} from '../utils/buildRequest.js'

export {
    type AssertCurrentChainErrorType,
    type AssertCurrentChainParameters,
    assertCurrentChain,
} from '../utils/chain/assertCurrentChain.js'
export { defineChain } from '../utils/chain/defineChain.js'
export {
    type ExtractChainErrorType,
    type ExtractChainParameters,
    type ExtractChainReturnType,
    extractChain,
} from '../utils/chain/extractChain.js'
export {
    type GetChainContractAddressErrorType,
    getChainContractAddress,
} from '../utils/chain/getChainContractAddress.js'

export { arrayRegex, bytesRegex, integerRegex } from '../utils/regex.js'

export {
    type WebSocketAsyncErrorType,
    type WebSocketAsyncOptions,
    type WebSocketAsyncReturnType,
    type WebSocketErrorType,
    type WebSocketOptions,
    type WebSocketReturnType,
    getSocket,
    rpc,
} from '../utils/rpc/compat.js'
export {
    type HttpRpcClient,
    type HttpRpcClientOptions,
    type HttpRequestErrorType,
    type HttpRequestParameters,
    type HttpRequestReturnType,
    getHttpRpcClient,
} from '../utils/rpc/http.js'
export {
    type GetSocketRpcClientErrorType,
    type GetSocketRpcClientParameters,
    type GetSocketParameters,
    type Socket,
    type SocketRpcClient,
    getSocketRpcClient,
    socketClientCache,
} from '../utils/rpc/socket.js'
export { getWebSocketRpcClient } from '../utils/rpc/webSocket.js'
export { type StringifyErrorType, stringify } from '../utils/stringify.js'
export {
    type DomainSeparatorErrorType,
    type SerializeTypedDataErrorType,
    type ValidateTypedDataErrorType,
    serializeTypedData,
    validateTypedData,
} from '../utils/typedData.js'
export {
    type DecodeAbiParametersErrorType,
    type DecodeAbiParametersReturnType,
    decodeAbiParameters,
} from '../utils/abi/decodeAbiParameters.js'
export {
    type DecodeErrorResultErrorType,
    type DecodeErrorResultParameters,
    type DecodeErrorResultReturnType,
    decodeErrorResult,
} from '../utils/abi/decodeErrorResult.js'
export {
    type DecodeEventLogErrorType,
    type DecodeEventLogParameters,
    type DecodeEventLogReturnType,
    decodeEventLog,
} from '../utils/abi/decodeEventLog.js'
export {
    type DecodeFunctionDataErrorType,
    type DecodeFunctionDataParameters,
    type DecodeFunctionDataReturnType,
    decodeFunctionData,
} from '../utils/abi/decodeFunctionData.js'
export {
    type DecodeFunctionResultErrorType,
    type DecodeFunctionResultParameters,
    type DecodeFunctionResultReturnType,
    decodeFunctionResult,
} from '../utils/abi/decodeFunctionResult.js'
export {
    type EncodeAbiParametersErrorType,
    type EncodeAbiParametersReturnType,
    encodeAbiParameters,
} from '../utils/abi/encodeAbiParameters.js'
export {
    type EncodeDeployDataErrorType,
    type EncodeDeployDataParameters,
    encodeDeployData,
} from '../utils/abi/encodeDeployData.js'
export {
    type EncodeErrorResultErrorType,
    type EncodeErrorResultParameters,
    encodeErrorResult,
} from '../utils/abi/encodeErrorResult.js'
export {
    type EncodeArgErrorType,
    type EncodeEventTopicsParameters,
    type EncodeEventTopicsReturnType,
    encodeEventTopics,
} from '../utils/abi/encodeEventTopics.js'
export {
    type EncodeFunctionDataErrorType,
    type EncodeFunctionDataParameters,
    encodeFunctionData,
} from '../utils/abi/encodeFunctionData.js'
export {
    type EncodeFunctionResultErrorType,
    type EncodeFunctionResultParameters,
    encodeFunctionResult,
} from '../utils/abi/encodeFunctionResult.js'
export {
    type ParseEventLogsErrorType,
    type ParseEventLogsParameters,
    type ParseEventLogsReturnType,
    parseEventLogs,
} from '../utils/abi/parseEventLogs.js'
export {
    type GetAbiItemErrorType,
    type GetAbiItemParameters,
    getAbiItem,
} from '../utils/abi/getAbiItem.js'
export { type EncodePackedErrorType, encodePacked } from '../utils/abi/encodePacked.js'
export {
    type FormatAbiItemWithArgsErrorType,
    formatAbiItemWithArgs,
} from '../utils/abi/formatAbiItemWithArgs.js'
export {
    type FormatAbiItemErrorType,
    type FormatAbiParamErrorType,
    type FormatAbiParamsErrorType,
    formatAbiItem,
    formatAbiParams,
} from '../utils/abi/formatAbiItem.js'
export {
    type ParseAccountErrorType,
    parseAccount,
} from '../accounts/utils/parseAccount.js'
export {
    type PublicKeyToAddressErrorType,
    publicKeyToAddress,
} from '../accounts/utils/publicKeyToAddress.js'
export {
    type GetContractAddressOptions,
    type GetCreate2AddressErrorType,
    type GetCreate2AddressOptions,
    type GetCreateAddressErrorType,
    type GetCreateAddressOptions,
    getContractAddress,
    getCreateAddress,
    getCreate2Address,
} from '../utils/address/getContractAddress.js'
export {
    type ChecksumAddressErrorType,
    getAddress,
} from '../utils/address/getAddress.js'
export { type IsAddressErrorType, isAddress } from '../utils/address/isAddress.js'
export {
    type IsAddressEqualErrorType,
    isAddressEqual,
} from '../utils/address/isAddressEqual.js'
export {
    type ConcatBytesErrorType,
    type ConcatErrorType,
    type ConcatHexErrorType,
    concat,
    concatBytes,
    concatHex,
} from '../utils/data/concat.js'
export { type IsBytesErrorType, isBytes } from '../utils/data/isBytes.js'
export { type IsHexErrorType, isHex } from '../utils/data/isHex.js'
export {
    type PadBytesErrorType,
    type PadErrorType,
    type PadHexErrorType,
    pad,
    padBytes,
    padHex,
} from '../utils/data/pad.js'
export { type SizeErrorType, size } from '../utils/data/size.js'
export {
    type AssertEndOffsetErrorType,
    type AssertStartOffsetErrorType,
    type SliceBytesErrorType,
    type SliceErrorType,
    type SliceHexErrorType,
    type SliceReturnType,
    slice,
    sliceBytes,
    sliceHex,
} from '../utils/data/slice.js'
export { type TrimErrorType, type TrimReturnType, trim } from '../utils/data/trim.js'
export {
    type DefineBlockErrorType,
    type FormattedBlock,
    type FormatBlockErrorType,
    defineBlock,
    formatBlock,
} from '../utils/formatters/block.js'
export {
    type DefineTransactionErrorType,
    type FormattedTransaction,
    type FormatTransactionErrorType,
    defineTransaction,
    formatTransaction,
    transactionType,
} from '../utils/formatters/transaction.js'
export { type FormatLogErrorType, formatLog } from '../utils/formatters/log.js'
export {
    type DefineTransactionReceiptErrorType,
    type FormatTransactionReceiptErrorType,
    type FormattedTransactionReceipt,
    defineTransactionReceipt,
} from '../utils/formatters/transactionReceipt.js'
export {
    type DefineTransactionRequestErrorType,
    type FormatTransactionRequestErrorType,
    type FormattedTransactionRequest,
    defineTransactionRequest,
    formatTransactionRequest,
} from '../utils/formatters/transactionRequest.js'
export { type ExtractErrorType, extract } from '../utils/formatters/extract.js'
export {
    type BytesToRlpErrorType,
    type HexToRlpErrorType,
    type ToRlpErrorType,
    type ToRlpReturnType,
    toRlp,
} from '../utils/encoding/toRlp.js'
export {
    type BoolToBytesErrorType,
    type BoolToBytesOpts,
    type HexToBytesErrorType,
    type HexToBytesOpts,
    type NumberToBytesErrorType,
    type StringToBytesErrorType,
    type StringToBytesOpts,
    type ToBytesErrorType,
    type ToBytesParameters,
    boolToBytes,
    toBytes,
    hexToBytes,
    numberToBytes,
    stringToBytes,
} from '../utils/encoding/toBytes.js'
export {
    type BoolToHexErrorType,
    type BoolToHexOpts,
    type BytesToHexErrorType,
    type BytesToHexOpts,
    type NumberToHexErrorType,
    type NumberToHexOpts,
    type StringToHexErrorType,
    type StringToHexOpts,
    type ToHexErrorType,
    type ToHexParameters,
    boolToHex,
    bytesToHex,
    toHex,
    numberToHex,
    stringToHex,
} from '../utils/encoding/toHex.js'
export {
    type BytesToBigIntErrorType,
    type BytesToBigIntOpts,
    type BytesToBoolErrorType,
    type BytesToBoolOpts,
    type BytesToNumberErrorType,
    type BytesToNumberOpts,
    type BytesToStringErrorType,
    type BytesToStringOpts,
    type FromBytesErrorType,
    type FromBytesParameters,
    type FromBytesReturnType,
    bytesToBigInt,
    bytesToBigInt as bytesToBigint,
    bytesToBool,
    bytesToNumber,
    bytesToString,
    fromBytes,
} from '../utils/encoding/fromBytes.js'
export {
    type AssertSizeErrorType,
    type FromHexErrorType,
    type FromHexParameters,
    type FromHexReturnType,
    type HexToBigIntErrorType,
    type HexToBigIntOpts,
    type HexToBoolErrorType,
    type HexToBoolOpts,
    type HexToNumberErrorType,
    type HexToNumberOpts,
    type HexToStringErrorType,
    type HexToStringOpts,
    fromHex,
    hexToBool,
    hexToBigInt,
    hexToNumber,
    hexToString,
} from '../utils/encoding/fromHex.js'
export {
    type FromRlpErrorType,
    fromRlp,
} from '../utils/encoding/fromRlp.js'

export { getAction } from '../utils/getAction.js'
export {
    type DefineFormatterErrorType,
    defineFormatter,
} from '../utils/formatters/formatter.js'
export {
    type ToEventSelectorErrorType,
    toEventSelector,
    /** @deprecated use `ToEventSelectorErrorType`. */
    type ToEventSelectorErrorType as GetEventSelectorErrorType,
    /** @deprecated use `toEventSelector`. */
    toEventSelector as getEventSelector,
} from '../utils/hash/toEventSelector.js'
export {
    type ToFunctionSelectorErrorType,
    toFunctionSelector,
    /** @deprecated use `ToFunctionSelectorErrorType`. */
    type ToFunctionSelectorErrorType as GetFunctionSelectorErrorType,
    /** @deprecated use `toFunctionSelector`. */
    toFunctionSelector as getFunctionSelector,
} from '../utils/hash/toFunctionSelector.js'
export {
    type ToEventSignatureErrorType,
    toEventSignature,
    /** @deprecated use `ToEventSignatureErrorType`. */
    type ToEventSignatureErrorType as GetEventSignatureErrorType,
    /** @deprecated use `toEventSignature`. */
    toEventSignature as getEventSignature,
} from '../utils/hash/toEventSignature.js'
export {
    type ToFunctionSignatureErrorType,
    toFunctionSignature,
    /** @deprecated use `ToFunctionSignatureErrorType`. */
    type ToFunctionSignatureErrorType as GetFunctionSignatureErrorType,
    /** @deprecated use `toFunctionSignature`. */
    toFunctionSignature as getFunctionSignature,
} from '../utils/hash/toFunctionSignature.js'
export {
    type ToEventHashErrorType,
    toEventHash,
} from '../utils/hash/toEventHash.js'
export {
    type ToFunctionHashErrorType,
    toFunctionHash,
} from '../utils/hash/toFunctionHash.js'
export { type IsHashErrorType, isHash } from '../utils/hash/isHash.js'
export { type Keccak256ErrorType, keccak256 } from '../utils/hash/keccak256.js'
export { type Sha256ErrorType, sha256 } from '../utils/hash/sha256.js'
export { type Ripemd160ErrorType, ripemd160 } from '../utils/hash/ripemd160.js'
export {
    type HashDomainErrorType,
    type HashTypedDataParameters,
    type HashTypedDataReturnType,
    hashTypedData,
} from '../utils/signature/hashTypedData.js'
export {
    type RecoverAddressErrorType,
    type RecoverAddressParameters,
    type RecoverAddressReturnType,
    recoverAddress,
} from '../utils/signature/recoverAddress.js'
export {
    type RecoverMessageAddressErrorType,
    type RecoverMessageAddressParameters,
    type RecoverMessageAddressReturnType,
    recoverMessageAddress,
} from '../utils/signature/recoverMessageAddress.js'
export {
    type RecoverPublicKeyErrorType,
    type RecoverPublicKeyParameters,
    type RecoverPublicKeyReturnType,
    recoverPublicKey,
} from '../utils/signature/recoverPublicKey.js'
export {
    type RecoverTypedDataAddressErrorType,
    type RecoverTypedDataAddressParameters,
    type RecoverTypedDataAddressReturnType,
    recoverTypedDataAddress,
} from '../utils/signature/recoverTypedDataAddress.js'
export {
    type VerifyMessageErrorType,
    type VerifyMessageParameters,
    type VerifyMessageReturnType,
    verifyMessage,
} from '../utils/signature/verifyMessage.js'
export {
    type VerifyTypedDataErrorType,
    type VerifyTypedDataParameters,
    type VerifyTypedDataReturnType,
    verifyTypedData,
} from '../utils/signature/verifyTypedData.js'
export {
    type HashMessage,
    type HashMessageErrorType,
    hashMessage,
} from '../utils/signature/hashMessage.js'
export {
    type ParseErc6492SignatureErrorType,
    type ParseErc6492SignatureParameters,
    type ParseErc6492SignatureReturnType,
    parseErc6492Signature,
} from '../utils/signature/parseErc6492Signature.js'
export {
    type IsErc6492SignatureErrorType,
    type IsErc6492SignatureParameters,
    type IsErc6492SignatureReturnType,
    isErc6492Signature,
} from '../utils/signature/isErc6492Signature.js'
export {
    type SerializeErc6492SignatureErrorType,
    type SerializeErc6492SignatureParameters,
    type SerializeErc6492SignatureReturnType,
    serializeErc6492Signature,
} from '../utils/signature/serializeErc6492Signature.js'
export {
    type GetSerializedTransactionTypeErrorType,
    type GetSerializedTransactionType,
    getSerializedTransactionType,
} from '../utils/transaction/getSerializedTransactionType.js'
export {
    type GetTransactionTypeErrorType,
    type GetTransactionType,
    getTransactionType,
} from '../utils/transaction/getTransactionType.js'

export {
    type AssertTransactionEIP1559ErrorType,
    type AssertTransactionEIP2930ErrorType,
    type AssertTransactionLegacyErrorType,
    assertTransactionEIP1559,
    assertTransactionEIP2930,
    assertTransactionLegacy,
} from '../utils/transaction/assertTransaction.js'

export {
    serializeTransaction,
    type SerializeTransactionErrorType,
    type SerializeTransactionFn,
} from '../utils/transaction/serializeTransaction.js'
export {
    type SerializeAccessListErrorType,
    serializeAccessList,
} from '../utils/transaction/serializeAccessList.js'
export { type FormatEtherErrorType, formatEther } from '../utils/unit/formatEther.js'
export { type FormatGweiErrorType, formatGwei } from '../utils/unit/formatGwei.js'
export { type FormatUnitsErrorType, formatUnits } from '../utils/unit/formatUnits.js'
export { type ParseUnitsErrorType, parseUnits } from '../utils/unit/parseUnits.js'
export { type ParseEtherErrorType, parseEther } from '../utils/unit/parseEther.js'
export { type ParseGweiErrorType, parseGwei } from '../utils/unit/parseGwei.js'


// strk-utils
export {
    addAddressPadding,
    getChecksumAddress,
    validateAndParseAddress,
    validateChecksumAddress
} from '../strk-utils/address.js'
export { assert } from '../strk-utils/assert.js'
export {
    arrayBufferToString,
    IS_BROWSER,
    utf8ToArray,
    stringToArrayBuffer,
    atobUniversal,
    btoaUniversal,
    buf2hex,
    removeHexPrefix,
    addHexPrefix,
    padString,
    padLeft,
    calcByteLength,
    sanitizeBytes,
    sanitizeHex,
    STRING_ZERO,
    pascalToSnake,
    keccakBn
} from '../strk-utils/encode.js'
export { assertInRange, toBigInt } from '../strk-utils/num.js'
export { generateNonce } from '../strk-utils/nonce.js'
export { isASCII, isShortString, isDecimalString, isText, isShortText, isLongText, splitLongString, encodeShortString, decodeShortString } from '../strk-utils/shortString.js'
export { isBoolean, isNumber, isObject, isString, isUndefined } from '../strk-utils/typed.js'

export { validateTypedData as snValidateTypedData, encodeData, encodeType, encodeValue } from '../strk-utils/typedData.js'

export { CairoFelt } from '../strk-utils/cairoDataTypes/felt.js'
export { createUint256 } from '../strk-utils/cairoDataTypes/uint256.js'
export { toUint512 } from '../strk-utils/cairoDataTypes/uint512.js'
export { byteArrayFromString } from '../strk-utils/calldata/byteArray.js'
export { felt, uint256, uint512 } from '../strk-utils/calldata/cairo.js'
export { compile, calldataToHex } from '../strk-utils/calldata/compile.js'
export { CairoCustomEnum } from '../strk-utils/calldata/enum/CairoCustomEnum.js'
export { CairoOption, CairoOptionVariant } from '../strk-utils/calldata/enum/CairoOption.js'
export { CairoResult } from '../strk-utils/calldata/enum/CairoResult.js'
