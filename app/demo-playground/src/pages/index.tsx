import { useAccount, useBalance, useBlockNumber, useConnect, useChainId, useConnectorClient, useDisconnect, useSwitchAccount, useSwitchChain } from 'starkweb/react';
import { ConnectKitButton, useSIWE } from 'starkwebkit';
import { useEffect, useState } from 'react';

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export default function Home({ address }: { address?: string }) {
  const { data, isSignedIn, signOut, signIn } = useSIWE();
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    // We'll handle this on the client side only
    return 'light';
  });

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      // Check localStorage first
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      } else if (savedTheme === 'light') {
        setTheme('light');
        document.documentElement.classList.remove('dark');
      } else {
        // Check system preference
        const isDark = window.matchMedia(COLOR_SCHEME_QUERY).matches;
        setTheme(isDark ? 'dark' : 'light');
        if (isDark) {
          document.documentElement.classList.add('dark');
        }
      }
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200" suppressHydrationWarning>
      <nav className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div>
            <img 
              src="/starkweb_horizontal_dark.svg"
              alt="StarkWeb" 
              className="h-8 block dark:hidden" 
            />
            <img 
              src="/starkweb_horizontal_light.svg"
              alt="StarkWeb" 
              className="h-8 hidden dark:block" 
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-200 transition-colors"
            aria-label="Toggle theme"
          >
            <span className="block dark:hidden">🌙</span>
            <span className="hidden dark:block">🌞</span>
          </button>
          <ConnectKitButton />
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8" suppressHydrationWarning>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Account />
          <Connect />
          <SwitchAccount />
          <SwitchChain />
          <Balance />
          <BlockNumber />
          <ConnectorClient />
        </div>
      </main>
    </div>
  );
}

function Account() {
  const account = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Account</h2>
      <div className="space-y-2 text-gray-700 dark:text-gray-300">
        <p className="flex items-center gap-2">
          <span className="font-medium">Address:</span>
          <span className="truncate">{account.address}</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium">Chain ID:</span>
          <span>{account.chainId}</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium">Status:</span>
          <span className={`px-2 py-1 rounded-full text-sm ${
            account.status === 'connected' 
              ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}>
            {account.status}
          </span>
        </p>
      </div>
      {account.status === 'connected' && (
        <button
          type="button"
          onClick={() => disconnect()}
          className="mt-4 w-full px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition-colors"
        >
          Disconnect
        </button>
      )}
    </div>
  )
}

function Connect() {
  const chainId = useChainId()
  const { connectors, connect, status, error } = useConnect()
  return (
    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Connect</h2>
      <div className="space-y-2">
        {connectors.map((connector, index) => (
          <button
            key={index}
            onClick={() => connect({ connector, chainId })}
            className="w-full flex items-center justify-center px-4 py-2 bg-teal-500 dark:bg-teal-600 text-white rounded-lg hover:bg-teal-600 dark:hover:bg-teal-700 transition-colors"
          >
            <img
              src={connector.icon}
              alt={connector.name}
              className="w-4 h-4 mr-2"
            />
            <span className="font-medium">
              {connector.name}
            </span>
          </button>
        ))}
        <div className="text-gray-700 dark:text-gray-300">{status}</div>
        <div className="text-red-500 dark:text-red-400">{error?.message}</div>
      </div>
    </div>
  )
}

function SwitchAccount() {
  const { connectors, switchAccount } = useSwitchAccount()

  return (
    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Switch Account</h2>
      <div className="space-y-2">
        {connectors.map((connector, index) => (
          <button
            key={index}
            onClick={() => switchAccount({ connector })}
            className="w-full flex items-center justify-center px-4 py-2 bg-emerald-500 dark:bg-emerald-600 text-white rounded-lg hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors"
          >
            <img 
              src={connector.icon} 
              alt={connector.name} 
              className="w-4 h-4 mr-2"
            />
            <span>{connector.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function SwitchChain() {
  const { chains, switchChain } = useSwitchChain()

  return (
    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Switch Chain</h2>
      <div className="space-y-2">
        {chains.map((chain, index) => (
          <button
            key={index}
            onClick={() => switchChain({ chainId: chain.chain_id })}
            className="w-full px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            {chain.name}
          </button>
        ))}
      </div>
    </div>
  )
}

function Balance() {
  const { address } = useAccount()
  const { data: default_ } = useBalance({ address })

  return (
    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Balance</h2>
      <div className="text-3xl font-bold text-gray-800 dark:text-gray-300">
        {default_?.balance || '0'}
      </div>
    </div>
  )
}

function BlockNumber() {
  const { data: default_ } = useBlockNumber({ watch: true })

  return (
    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Block Number</h2>
      <div className="text-3xl font-bold text-gray-800 dark:text-gray-300">
        {default_?.toString() || '0'}
      </div>
    </div>
  )
}

function ConnectorClient() {
  const { data, error } = useConnectorClient()

  return (
    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Connector Client</h2>
      <div className="space-y-2 text-gray-700 dark:text-gray-300">
        {data?.account?.address && (
          <p className="flex items-center gap-2">
            <span className="font-medium">Address:</span>
            <span className="truncate">{data.account.address}</span>
          </p>
        )}
        {data?.chain?.id && (
          <p className="flex items-center gap-2">
            <span className="font-medium">Chain ID:</span>
            <span>{data.chain.id}</span>
          </p>
        )}
        {error?.message && (
          <p className="text-red-500 dark:text-red-400">{error.message}</p>
        )}
      </div>
    </div>
  )
}