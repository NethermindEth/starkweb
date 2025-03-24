"use client"

import { useState, useEffect } from 'react';
import { createPaymasterClient, createWalletClient, custom, http, Signature, WalletClient, withRetry } from 'starkweb';
import { mainnet, sepolia } from 'starkweb/chains';
import 'starkweb/window'


interface TransactionCall {
  entrypoint: string;
  contractAddress: string;
  calldata: string[];
}

interface BuildTransactionResult {
  types: any; // Update this type based on actual response structure
  primaryType: any; // Update this type based on actual response structure
  domain: any; // Update this type based on actual response structure
  message: any; // Update this type based on actual response structure
}

export default function PaymasterPage() {
   

  

  // Group all useState hooks at the top
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [network, setNetwork] = useState<'mainnet' | 'sepolia'>('sepolia');
  const [accountAddress, setAccountAddress] = useState<string>('');
  const [accountRewards, setAccountRewards] = useState<any>(null);
  const [rewardsLoading, setRewardsLoading] = useState(false);
  const [rewardsError, setRewardsError] = useState<string | null>(null);
  const [transactionResult, setTransactionResult] = useState<BuildTransactionResult | null>(null);
  const [buildingTransaction, setBuildingTransaction] = useState(false);
  const [transactionError, setTransactionError] = useState<string | null>(null);
  const [signingTransaction, setSigningTransaction] = useState(false);
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);
  const [ signature, setSignature] = useState<Signature | null>(null);
  
  useEffect(() => {
      // Only run on client-side
      if (typeof window === 'undefined') return;
      const walletClient = createWalletClient({
        chain: network === 'mainnet' ? mainnet : sepolia,
        transport: custom(window.starknet_argentX!),
      });
      setWalletClient(walletClient);
      
    async function fetchPaymasterStatus() {
      try {
        setLoading(true);
        const chain = network === 'mainnet' ? mainnet : sepolia;
        const paymasterClient = createPaymasterClient({
          chain,
          transport: http(`http://localhost:3003/paymaster/${network}`),
        });

        const paymasterStatus = await paymasterClient.getPaymasterStatus();
        console.log(paymasterStatus);
        setStatus(paymasterStatus);
        setError(null);
      } catch (err) {
        console.error('Error fetching paymaster status:', err);
        setError('Failed to fetch paymaster status');
      } finally {
        setLoading(false);
      }
    }

    fetchPaymasterStatus();
  }, [network]);

  const fetchAccountRewards = async () => {
    if (!accountAddress) {
      setRewardsError('Please enter an account address');
      return;
    }

    try {
      setRewardsLoading(true);
      const chain = network === 'mainnet' ? mainnet : sepolia;
      const paymasterClient = createPaymasterClient({
        chain,
        transport: http(`http://localhost:3003/paymaster/${network}`),
      });

      const rewards = await paymasterClient.getAccountRewards({
        accountAddress,
      });
      
      console.log('Account rewards:', rewards);
      setAccountRewards(rewards);
      setRewardsError(null);
    } catch (err) {
      console.error('Error fetching account rewards:', err);
      setRewardsError('Failed to fetch account rewards');
      setAccountRewards(null);
    } finally {
      setRewardsLoading(false);
    }
  };

  const buildTransaction = async () => {
    // Check if we're on client-side
    if (typeof window === 'undefined') return;

    try {
      setBuildingTransaction(true);
      const chain = network === 'mainnet' ? mainnet : sepolia;
      const paymasterClient = createPaymasterClient({
        chain,
        transport: http(`http://localhost:3003/paymaster/${network}`),
      });

      const transaction = await paymasterClient.buildTypedData({
        userAddress: "0x005c475b6089156c0CD4Fc9d64De149992431c442AF882d6332e7c736c99DE91",
        calls: [
          {
            entrypoint: "approve",
            contractAddress: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
            calldata: ['0x005c475b6089156c0CD4Fc9d64De149992431c442AF882d6332e7c736c99DE91', '0xf', '0x0'],
          },
        ],
      });

      console.log('Built transaction:', transaction);
      setTransactionResult(transaction as unknown as BuildTransactionResult);
      setTransactionError(null);
    } catch (err) {
      console.error('Error building transaction:', err);
      setTransactionError('Failed to build transaction');
      setTransactionResult(null);
    } finally {
      setBuildingTransaction(false);
    }
  };

  const signTransaction = async () => {
    if (!transactionResult) {
      setTransactionError('No transaction to sign');
      return;
    }

    try {
      setSigningTransaction(true);
    //   const signature = await useSignTypedData(transactionResult.typedData);
    const permissions = await walletClient?.getPermissions({});
    console.log('Permissions:', permissions);
    const signature = await walletClient?.signTypedData({
        typed_data: transactionResult,
    } );
    // const signature = await walletClient?.signTypedData({
    //     typed_data: {
    //         types: transactionResult.types,
    //         primaryType: transactionResult.primaryType,
    //         domain: transactionResult.domain,
    //         message: transactionResult.message
    //     }
    // } );
      console.log('Signed transaction:', signature);
      setSignature(signature);
    } catch (err) {
      console.error('Error signing transaction:', err);
      setTransactionError('Failed to sign transaction');
      setTransactionResult(null);
    } finally {
      setSigningTransaction(false);
    }
  };

  const executeTransaction = async () => {
    if (!walletClient || !signature || !transactionResult) {
      setTransactionError('Missing required data for execution');
      return;
    }

    try {
      const chain = network === 'mainnet' ? mainnet : sepolia;
      const paymasterClient = createPaymasterClient({
        chain,
        transport: http(`http://localhost:3003/paymaster/${network}`),
      });

      const executionResult = await paymasterClient.executeTransaction({
        userAddress: "0x005c475b6089156c0CD4Fc9d64De149992431c442AF882d6332e7c736c99DE91",
        typedData: JSON.stringify(transactionResult),
        signature: signature,

      });

      console.log('Transaction executed:', executionResult);
      return executionResult;
    } catch (err) {
      console.error('Error executing transaction:', err);
      setTransactionError('Failed to execute transaction');
      throw err;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Starknet Paymaster</h1>
      
      <div className="mb-6">
        <label className="block mb-2 font-medium">Network:</label>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded ${network === 'mainnet' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setNetwork('mainnet')}
          >
            Mainnet
          </button>
          <button
            className={`px-4 py-2 rounded ${network === 'sepolia' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setNetwork('sepolia')}
          >
            Sepolia
          </button>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Paymaster Status</h2>
        
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : error ? (
          <div className="text-red-500 py-4">{error}</div>
        ) : (
          <pre className="bg-gray-200 dark:bg-gray-700 p-4 rounded overflow-auto">
            {JSON.stringify(status, null, 2)}
          </pre>
        )}
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mt-6">
        <h2 className="text-xl font-semibold mb-4">Account Rewards</h2>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">Account Address:</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={accountAddress}
              onChange={(e) => setAccountAddress(e.target.value)}
              className="flex-1 px-4 py-2 border rounded dark:bg-gray-700"
              placeholder="Enter account address"
            />
            <button
              onClick={fetchAccountRewards}
              disabled={rewardsLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-400"
            >
              {rewardsLoading ? 'Loading...' : 'Fetch Rewards'}
            </button>
          </div>
        </div>

        {rewardsError && (
          <div className="text-red-500 py-2">{rewardsError}</div>
        )}
        
        {accountRewards && (
          <pre className="bg-gray-200 dark:bg-gray-700 p-4 rounded overflow-auto">
            {JSON.stringify(accountRewards, null, 2)}
          </pre>
        )}
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mt-6">
        <h2 className="text-xl font-semibold mb-4">Build Transaction</h2>
        
        <button
          onClick={buildTransaction}
          disabled={buildingTransaction}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-400 mb-4"
        >
          {buildingTransaction ? 'Building...' : 'Build Transaction'}
        </button>

        {transactionError && (
          <div className="text-red-500 py-2">{transactionError}</div>
        )}
        
        {transactionResult && (
          <>
          <div className="relative">
            <pre className="bg-gray-200 dark:bg-gray-700 p-4 rounded overflow-auto">
              {JSON.stringify(transactionResult, null, 2)}
            </pre>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(transactionResult, null, 2));
              }}
              className="absolute top-2 right-2 p-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
              title="Copy to clipboard"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
          </div>
          <button
            onClick={signTransaction}
            disabled={signingTransaction}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-400"
          >
            {signingTransaction ? 'Signing...' : 'Sign Transaction'}    
          </button>
          {signature && (
            <pre className="bg-gray-200 dark:bg-gray-700 p-4 rounded overflow-auto">
              {JSON.stringify(signature, null, 2)}
            </pre>
          )}
          </>
        )}
      </div>

      {signature && (
        <button
          onClick={executeTransaction}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-400 mt-4"
        >
          Execute Transaction
        </button>
      )}
    </div>
  );
}
