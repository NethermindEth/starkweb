'use client'

import type { NextPage } from 'next';
import { useAccount, useBalance, useWriteContract } from 'starkweb/react';

import { useState, useCallback } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { createWalletClient, custom, WalletClient } from 'starkweb';
import { erc20Abi } from '../utils/abi/strk';
import 'starkweb/window'
const Wallet: NextPage = () => {
  const { theme, setTheme } = useTheme();
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <span className="text-2xl font-bold text-emerald-500">L-CHARGE</span>
              <div className="flex space-x-4">
                <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400">
                  Home
                </Link>
                <Link href="/wallet" className="text-emerald-500 dark:text-emerald-400 font-medium">
                  Wallet
                </Link>
              </div>
            </div>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Wallet</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WalletBalanceCard />
          <WalletInfoCard />
          <SendTransactionCard 
            recipient={recipient} 
            setRecipient={setRecipient}
            amount={amount}
            setAmount={setAmount}
          />
          <TransactionHistoryCard />
        </div>
      </div>
    </main>
  );
};

export default Wallet;

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h2>
      {children}
    </div>
  );
}

function WalletBalanceCard() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  return (
    <Card title="Wallet Balance">
      <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        {balance?.formatted || '0.00'}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {balance?.symbol || 'ETH'}
      </div>
    </Card>
  );
}

function WalletInfoCard() {
  const account = useAccount();
  const network = {
    name: 'Sepolia',
    id: '0x534e5000',
  }

  return (
    <Card title="Wallet Details">
      <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
        <div>
          <span className="font-medium">Address:</span>
          <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-md overflow-x-auto">
            <code className="text-xs">{account.address || 'Not connected'}</code>
          </div>
        </div>
        <div>
          <span className="font-medium">Network:</span> {network?.name || 'Unknown'}
        </div>
        <div>
          <span className="font-medium">Status:</span> 
          <span className={`ml-1 ${account.status === 'connected' ? 'text-green-500' : 'text-red-500'}`}>
            {account.status || 'disconnected'}
          </span>
        </div>
      </div>
    </Card>
  );
}

function SendTransactionCard({ 
  recipient, 
  setRecipient, 
  amount, 
  setAmount 
}: { 
  recipient: string;
  setRecipient: (value: string) => void; 
  amount: string; 
  setAmount: (value: string) => void; 
}) {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { writeContractAsync } = useWriteContract();
  
  const sendTransaction = useCallback(async (tx: { to: string; value: number }) => {
    setIsPending(true);
    setIsError(false);
    setError(null);
    
    try {
      await writeContractAsync({
        address: '0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D',
        abi: erc20Abi,
        functionName: 'transfer',
        args: {
          recipient: recipient as 'contract_address',
          amount: {
            high: parseFloat(amount),
            low: 0,
          } as unknown as 'u256',
        }
      });
      
      console.log('Sending transaction:', tx);
      // await new Promise(r => setTimeout(r, 1000)); // Simulate network delay
      
      return { hash: '0x' + Math.random().toString(16).substring(2) };
    } catch (e) {
      const err = e instanceof Error ? e : new Error('Transaction failed');
      setIsError(true);
      setError(err);
      throw err;
    } finally {
      setIsPending(false);
    }
  }, [recipient, amount, writeContractAsync]);

  const handleSend = async () => {
    if (!recipient || !amount) return;
    
    try {
      await sendTransaction({
        to: recipient,
        value: parseFloat(amount),
      });
      
      // Reset form on success
      setRecipient('');
      setAmount('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card title="Send Tokens">
      <div className="space-y-4">
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Recipient Address
          </label>
          <input
            id="recipient"
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="0x..."
          />
        </div>
        
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount
          </label>
          <input
            id="amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="0.0"
          />
        </div>
        
        <button
          onClick={handleSend}
          disabled={isPending || !recipient || !amount}
          className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? 'Sending...' : 'Send'}
        </button>
        
        {isError && (
          <div className="mt-2 text-red-500 text-sm">
            {error?.message || 'Error sending transaction'}
          </div>
        )}
      </div>
    </Card>
  );
}

function TransactionHistoryCard() {
  // Note: This would normally fetch transaction history from an API or blockchain
  // For now, using mock data
  const transactions = [
    { id: '1', type: 'Send', amount: '0.05 ETH', to: '0x1234...5678', date: '2023-06-15' },
    { id: '2', type: 'Receive', amount: '0.2 ETH', from: '0x8765...4321', date: '2023-06-10' },
    { id: '3', type: 'Send', amount: '0.01 ETH', to: '0x5678...9012', date: '2023-06-05' },
  ];

  return (
    <Card title="Recent Transactions">
      {transactions.length > 0 ? (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.map((tx) => (
            <div key={tx.id} className="py-3 first:pt-0 last:pb-0">
              <div className="flex justify-between">
                <span className={`font-medium ${tx.type === 'Receive' ? 'text-green-500' : 'text-red-500'}`}>
                  {tx.type}
                </span>
                <span className="text-gray-600 dark:text-gray-300">{tx.amount}</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {tx.type === 'Send' ? `To: ${tx.to}` : `From: ${tx.from}`} • {tx.date}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400 py-4">
          No transactions found
        </div>
      )}
    </Card>
  );
} 