/**
 * StarkWeb Client - A client for interacting with Starknet
 */

// Import from the starkweb workspace package
import {
  createPublicClient,
  createWalletClient,
  custom,
  erc20Abi,
  http,
} from 'starkweb';
import { sepolia } from 'starkweb/chains';

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http('https://starknet-sepolia.infura.io/v3/db72641028ee47f5b18bcbb791a3f829'),
});

const result = await publicClient.readContracts({
  contracts: [
    {
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: 
        {
          account: '0x005c475b6089156c0CD4Fc9d64De149992431c442AF882d6332e7c736c99DE91',
      },
      address:
        '0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D',
    },
    {
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: 
        {
          account: '0x034abecf49cedc634d0c3145da7b1caea99d8d4f2da5b5d41e532ea05192d523',
      },
      address:
        '0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D',
    },
  ],
})

console.log(result);
