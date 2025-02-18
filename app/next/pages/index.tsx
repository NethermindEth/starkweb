'use client'

import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useAccount, useBalance, useBlockNumber, useChainId, useConfig, useConnect, useConnectorClient, useDisconnect, useSwitchAccount, useSwitchChain } from 'starkweb/react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const Connect = dynamic(
  () => import('../components/Connect').then(mod => mod.Connect), 
  { ssr: false, loading: () => <div>Loading...</div> }
);

const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-emerald-500">L-CHARGE</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AccountCard />
          <ConnectCard />
          <SwitchAccountCard />
          <SwitchChainCard />
          <BalanceCard />
          <BlockNumberCard />
          <ConnectorClientCard />
        </div>
      </div>
    </main>
  );
};

export default Home;

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h2>
      {children}
    </div>
  );
}

function AccountCard() {
  const account = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <Card title="Account">
      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <div>
          <span className="font-medium">Account:</span> {account.address}
        </div>
        <div>
          <span className="font-medium">Chain ID:</span> {account.chainId}
        </div>
        <div>
          <span className="font-medium">Status:</span> {account.status}
        </div>
      </div>

      {account.status === 'connected' && (
        <button
          type="button"
          onClick={() => disconnect()}
          className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Disconnect
        </button>
      )}
    </Card>
  );
}

function ConnectCard() {
  return (
    <Card title="Connect">
      <Connect />
    </Card>
  );
}

function SwitchAccountCard() {
  const account = useAccount()
  const { connectors, switchAccount } = useSwitchAccount()

  return (
    <Card title="Switch Account">
      <div className="space-y-2">
        {connectors.map((connector) => (
          <button
            disabled={account.connector?.uid === connector.uid}
            key={connector.uid}
            onClick={() => switchAccount({ connector })}
            className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {connector.name}
          </button>
        ))}
      </div>
    </Card>
  );
}

function SwitchChainCard() {
  const chainId = useChainId()
  const { chains, switchChain, error } = useSwitchChain()

  return (
    <Card title="Switch Chain">
      <div className="space-y-2">
        {chains.map((chain) => (
          <button
            disabled={chainId === chain.chain_id}
            key={chain.chain_id}
            onClick={() => switchChain({ chainId: chain.chain_id })}
            className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {chain.name}
          </button>
        ))}
        {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
      </div>
    </Card>
  );
}

function BalanceCard() {
  const { address } = useAccount()
  const { data: default_ } = useBalance({ address })

  return (
    <Card title="Balance">
      <div className="text-3xl font-bold text-gray-900 dark:text-white">
        {!!default_?.balance && default_.formatted}
      </div>
    </Card>
  );
}

function BlockNumberCard() {
  const { data: default_ } = useBlockNumber({ watch: true })

  return (
    <Card title="Block Number">
      <div className="text-3xl font-bold text-gray-900 dark:text-white">
        {default_?.toString()}
      </div>
    </Card>
  );
}

function ConnectorClientCard() {
  const { data, error } = useConnectorClient()
  
  return (
    <Card title="Connector Client">
      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        {data && (
          <>
            <div><span className="font-medium">Client Address:</span> {data.account?.address}</div>
            <div><span className="font-medium">Chain ID:</span> {data.chain?.id}</div>
          </>
        )}
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
    </Card>
  );
}
