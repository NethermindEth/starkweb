export const schema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    domain: {
      type: 'object',
      properties: {
        chainId: {
          type: 'string',
          enum: ['SN_SEPOLIA', 'SN_MAIN'],
          errorMessage:
            "ChainId must be one of 'SN_GOERLI', 'SN_SEPOLIA', 'SN_MAIN'",
        },
        name: {
          type: 'string',
          errorMessage: 'Name must be a string',
        },
        version: {
          type: 'string',
          maxLength: 31,
          pattern: '^\\d+\\.\\d+\\.\\d+$',
          errorMessage: 'Version must be a string in the format x.y.z',
        },
        revision: {
          type: 'string',
          enum: ['0', '1'],
          errorMessage:
            "Revision must be a string and must be either '0' or '1'",
        },
      },
      required: ['chainId', 'name', 'version', 'revision'],
      additionalProperties: false,
      errorMessage: 'Domain must include chainId, name, version, revision',
    },
    message: {
      type: 'object',
      properties: {
        version: {
          type: 'string',
          maxLength: 31,
          pattern: '^\\d+\\.\\d+\\.\\d+$',
          errorMessage: 'Version must be a string in the format x.y.z',
        },
        address: {
          type: 'string',
          pattern: '^0x[a-fA-F0-9]{63,64}$',
          errorMessage:
            "Address must be a hexadecimal string with 66 characters, including the '0x' prefix",
        },
        issuedAt: {
          type: 'string',
          format: 'date-time',
          errorMessage: 'IssuedAt must be a valid date-time string',
        },
        nonce: {
          type: 'string',
          minLength: 8,
          maxLength: 31,
          pattern: '^[a-zA-Z0-9]*$',
          errorMessage:
            'Nonce must be an alphanumeric string between 8 and 31 characters',
        },
        statement: {
          type: 'string',
          errorMessage: 'Statement must be a string',
        },
        uri: {
          type: 'string',
          format: 'uri',
          errorMessage: 'Uri must be a valid URI string',
        },
        expirationTime: {
          type: 'string',
          format: 'date-time',
          errorMessage:
            'ExpirationTime, if present, must be a valid date-time string',
        },
        notBefore: {
          type: 'string',
          format: 'date-time',
          errorMessage:
            'NotBefore, if present, must be a valid date-time string',
        },
      },
      required: ['address', 'issuedAt', 'nonce', 'statement', 'uri', 'version'],
      additionalProperties: false,
      errorMessage:
        'Message must include address, issuedAt, nonce, statement, uri, version',
    },
    primaryType: {
      type: 'string',
      const: 'Message',
      errorMessage: "PrimaryType must be 'Message'",
    },
    types: {
      type: 'object',
      properties: {
        Message: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                enum: [
                  'address',
                  'statement',
                  'uri',
                  'nonce',
                  'issuedAt',
                  'expirationTime',
                  'notBefore',
                ],
                errorMessage:
                  "Name must be one of 'address', 'statement', 'uri', 'nonce', 'issuedAt', 'expirationTime', 'notBefore'",
              },
              type: {
                type: 'string',
                enum: ['string', 'felt'],
                errorMessage: "Type must be either 'string' or 'felt'",
              },
            },
            required: ['name', 'type'],
            additionalProperties: false,
            errorMessage: 'Items must include name and type',
          },
          minItems: 6,
          maxItems: 8,
          uniqueItems: true,
          errorMessage: 'Message must contain min 6-8 unique items ',
        },
        StarknetDomain: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                enum: ['name', 'chainId', 'version', 'revision'],
                errorMessage:
                  "Name must be one of 'name', 'chainId', 'version', 'revision'",
              },
              type: {
                type: 'string',
                enum: ['felt', 'string'],
                errorMessage: "Type must be 'felt' or 'string'",
              },
            },
            required: ['name', 'type'],
            additionalProperties: false,
            errorMessage: 'Items must include name and type',
          },
          minItems: 4,
          maxItems: 4,
          uniqueItems: true,
          errorMessage: 'StarknetDomain must contain exactly 3 unique items',
        },
      },
      required: ['Message', 'StarknetDomain'],
      additionalProperties: false,
      errorMessage: 'Types must include Message and StarknetDomain',
    },
  },
  required: ['domain', 'message', 'primaryType', 'types'],
  additionalProperties: false,
  errorMessage: 'Data must include domain, message, primaryType, types',
}
