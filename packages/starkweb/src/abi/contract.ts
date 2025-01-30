
export type DecodedResult = {
    [key: string]: string | bigint | DecodedResult[];
};

export function decodeCallResult(result: string[], outputs: ReadonlyArray<{name?: string, type: string}>): DecodedResult {
    let index = 0;
    const decoded: DecodedResult = {};

    // Helper functions
    const decodeFelt = (felt: string) => BigInt(felt).toString(10);
    const decodeUint256 = (uint256: string) => BigInt(uint256);
    const decodeShortString = (shortString: string) => {
        const hex = BigInt(shortString).toString(16);
        return Buffer.from(hex, 'hex').toString('utf8');
    };

    for (const output of outputs) {
        const name = output.name || `output${index}`;
        
        switch(output.type) {
            case 'felt':
                decoded[name] = decodeFelt(result[index] as string);
                index++;
                break;
                
            case 'Uint256':
                decoded[name] = decodeUint256(result[index] as string);
                index++;
                break;
                
            case 'felt*': {
                const length = parseInt(result[index] as string);
                index++;
                const arr: string[] = [];
                for(let i = 0; i < length; i++) {
                    arr.push(decodeFelt(result[index] as string));
                    index++;
                }
                decoded[name] = arr as unknown as DecodedResult[];
                break;
            }
                
            case 'shortString':
                decoded[name] = decodeShortString(result[index] as string);
                index++;
                break;
                
            default:
                throw new Error(`Unsupported type: ${output.type}`);
        }
    }
    
    return decoded;
}



// Example usage:
const exampleAbi = [
  {
    "type": "function",
    "name": "get_balance",
    "inputs": [],
    "outputs": [
      {
        "name": "balance",
        "type": "Uint256"
      }
    ],
    "state_mutability": "view"
  }
] as const;

const result = ['1234567890'];
const decoded = decodeCallResult(result, exampleAbi[0].outputs);
// decoded = { balance: 1234567890n }

// Example with multiple outputs and different types
const complexAbi = [
  {
    "type": "function", 
    "name": "get_user_info",
    "inputs": [],
    "outputs": [
      {
        "name": "name", 
        "type": "shortString"
      },
      {
        "name": "balance",
        "type": "Uint256"  
      },
      {
        "name": "token_ids",
        "type": "felt*"
      }
    ],
    "state_mutability": "view"
  }
] as const;

const complexResult = [
  '0x416c696365', // "Alice" in hex
  '1000000000',
  '2',            // Array length
  '1',            // First token ID
  '2'             // Second token ID
];
const decodedComplex = decodeCallResult( complexResult, complexAbi[0].outputs);
// decodedComplex = {
//   name: "Alice",
//   balance: 1000000000n,
//   token_ids: ["1", "2"]
// }
