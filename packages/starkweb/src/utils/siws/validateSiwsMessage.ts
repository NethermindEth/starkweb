import type { Address } from 'abitype'

import type { ExactPartial } from '../../types/utils.js'
import { isAddressEqual } from '../address/isAddressEqual.js'
import type { SiwsMessage } from './types.js'

export type ValidateSiwsMessageParameters = {
  /**
   * Ethereum address to check against.
   */
  address?: Address | undefined
  /**
   * [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) authority to check against.
   */
  domain?: string | undefined
  /**
   * EIP-4361 message fields.
   */
  message: ExactPartial<SiwsMessage>
  /**
   * Random string to check against.
   */
  nonce?: string | undefined
  /**
   * [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986#section-3.1) URI scheme to check against.
   */
  scheme?: string | undefined
  /**
   * Current time to check optional `expirationTime` and `notBefore` fields.
   *
   * @default new Date()
   */
  time?: Date | undefined
}

export type ValidateSiwsMessageReturnType = boolean

/**
 * @description Validates EIP-4361 message.
 *
 * @see https://eips.ethereum.org/EIPS/eip-4361
 */
export function validateSiwsMessage(
  parameters: ValidateSiwsMessageParameters,
): ValidateSiwsMessageReturnType {
  const {
    address,
    domain,
    message,
    nonce,
    scheme,
    time = new Date(),
  } = parameters

  if (domain && message.domain !== domain) return false
  if (nonce && message.nonce !== nonce) return false
  if (scheme && message.scheme !== scheme) return false

  if (message.expirationTime && time >= new Date(message.expirationTime))
    return false
  if (message.notBefore && time < new Date(message.notBefore)) return false

  try {
    if (!message.address) return false
    if (address && !isAddressEqual(message.address as Address, address))
      return false
  } catch {
    return false
  }

  return true
}
