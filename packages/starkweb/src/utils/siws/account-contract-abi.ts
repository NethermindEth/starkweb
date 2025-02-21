export const accountABI = [
  {
    members: [
      {
        name: 'to',
        offset: 0,
        type: 'felt',
      },
      {
        name: 'selector',
        offset: 1,
        type: 'felt',
      },
      {
        name: 'data_offset',
        offset: 2,
        type: 'felt',
      },
      {
        name: 'data_len',
        offset: 3,
        type: 'felt',
      },
    ],
    name: 'CallArray',
    size: 4,
    type: 'struct',
  },
  {
    data: [
      {
        name: 'new_signer',
        type: 'felt',
      },
    ],
    keys: [],
    name: 'signer_changed',
    type: 'event',
  },
  {
    data: [
      {
        name: 'new_guardian',
        type: 'felt',
      },
    ],
    keys: [],
    name: 'guardian_changed',
    type: 'event',
  },
  {
    data: [
      {
        name: 'new_guardian',
        type: 'felt',
      },
    ],
    keys: [],
    name: 'guardian_backup_changed',
    type: 'event',
  },
  {
    data: [
      {
        name: 'active_at',
        type: 'felt',
      },
    ],
    keys: [],
    name: 'escape_guardian_triggered',
    type: 'event',
  },
  {
    data: [
      {
        name: 'active_at',
        type: 'felt',
      },
    ],
    keys: [],
    name: 'escape_signer_triggered',
    type: 'event',
  },
  {
    data: [],
    keys: [],
    name: 'escape_canceled',
    type: 'event',
  },
  {
    data: [
      {
        name: 'new_guardian',
        type: 'felt',
      },
    ],
    keys: [],
    name: 'guardian_escaped',
    type: 'event',
  },
  {
    data: [
      {
        name: 'new_signer',
        type: 'felt',
      },
    ],
    keys: [],
    name: 'signer_escaped',
    type: 'event',
  },
  {
    data: [
      {
        name: 'new_implementation',
        type: 'felt',
      },
    ],
    keys: [],
    name: 'account_upgraded',
    type: 'event',
  },
  {
    data: [
      {
        name: 'account',
        type: 'felt',
      },
      {
        name: 'key',
        type: 'felt',
      },
      {
        name: 'guardian',
        type: 'felt',
      },
    ],
    keys: [],
    name: 'account_created',
    type: 'event',
  },
  {
    data: [
      {
        name: 'hash',
        type: 'felt',
      },
      {
        name: 'response_len',
        type: 'felt',
      },
      {
        name: 'response',
        type: 'felt*',
      },
    ],
    keys: [],
    name: 'transaction_executed',
    type: 'event',
  },
  {
    inputs: [
      {
        name: 'call_array_len',
        type: 'felt',
      },
      {
        name: 'call_array',
        type: 'CallArray*',
      },
      {
        name: 'calldata_len',
        type: 'felt',
      },
      {
        name: 'calldata',
        type: 'felt*',
      },
    ],
    name: '__validate__',
    outputs: [],
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'call_array_len',
        type: 'felt',
      },
      {
        name: 'call_array',
        type: 'CallArray*',
      },
      {
        name: 'calldata_len',
        type: 'felt',
      },
      {
        name: 'calldata',
        type: 'felt*',
      },
    ],
    name: '__execute__',
    outputs: [
      {
        name: 'retdata_size',
        type: 'felt',
      },
      {
        name: 'retdata',
        type: 'felt*',
      },
    ],
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'class_hash',
        type: 'felt',
      },
    ],
    name: '__validate_declare__',
    outputs: [],
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'selector',
        type: 'felt',
      },
      {
        name: 'calldata_size',
        type: 'felt',
      },
      {
        name: 'calldata',
        type: 'felt*',
      },
    ],
    name: '__validate_deploy__',
    outputs: [],
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'hash',
        type: 'felt',
      },
      {
        name: 'sig_len',
        type: 'felt',
      },
      {
        name: 'sig',
        type: 'felt*',
      },
    ],
    name: 'isValidSignature',
    outputs: [
      {
        name: 'isValid',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'interfaceId',
        type: 'felt',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        name: 'success',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'signer',
        type: 'felt',
      },
      {
        name: 'guardian',
        type: 'felt',
      },
    ],
    name: 'initialize',
    outputs: [],
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'implementation',
        type: 'felt',
      },
      {
        name: 'calldata_len',
        type: 'felt',
      },
      {
        name: 'calldata',
        type: 'felt*',
      },
    ],
    name: 'upgrade',
    outputs: [
      {
        name: 'retdata_len',
        type: 'felt',
      },
      {
        name: 'retdata',
        type: 'felt*',
      },
    ],
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'call_array_len',
        type: 'felt',
      },
      {
        name: 'call_array',
        type: 'CallArray*',
      },
      {
        name: 'calldata_len',
        type: 'felt',
      },
      {
        name: 'calldata',
        type: 'felt*',
      },
    ],
    name: 'execute_after_upgrade',
    outputs: [
      {
        name: 'retdata_len',
        type: 'felt',
      },
      {
        name: 'retdata',
        type: 'felt*',
      },
    ],
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'newSigner',
        type: 'felt',
      },
    ],
    name: 'changeSigner',
    outputs: [],
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'newGuardian',
        type: 'felt',
      },
    ],
    name: 'changeGuardian',
    outputs: [],
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'newGuardian',
        type: 'felt',
      },
    ],
    name: 'changeGuardianBackup',
    outputs: [],
    type: 'function',
  },
  {
    inputs: [],
    name: 'triggerEscapeGuardian',
    outputs: [],
    type: 'function',
  },
  {
    inputs: [],
    name: 'triggerEscapeSigner',
    outputs: [],
    type: 'function',
  },
  {
    inputs: [],
    name: 'cancelEscape',
    outputs: [],
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'newGuardian',
        type: 'felt',
      },
    ],
    name: 'escapeGuardian',
    outputs: [],
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'newSigner',
        type: 'felt',
      },
    ],
    name: 'escapeSigner',
    outputs: [],
    type: 'function',
  },
  {
    inputs: [],
    name: 'getSigner',
    outputs: [
      {
        name: 'signer',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getGuardian',
    outputs: [
      {
        name: 'guardian',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getGuardianBackup',
    outputs: [
      {
        name: 'guardianBackup',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getEscape',
    outputs: [
      {
        name: 'activeAt',
        type: 'felt',
      },
      {
        name: 'type',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getVersion',
    outputs: [
      {
        name: 'version',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getName',
    outputs: [
      {
        name: 'name',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'hash',
        type: 'felt',
      },
      {
        name: 'sig_len',
        type: 'felt',
      },
      {
        name: 'sig',
        type: 'felt*',
      },
    ],
    name: 'is_valid_signature',
    outputs: [
      {
        name: 'is_valid',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
