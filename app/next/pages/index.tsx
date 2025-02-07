'use client'

import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useAccount, useBalance, useBlockNumber, useChainId, useConfig, useConnect, useConnectorClient, useDisconnect, useSwitchAccount, useSwitchChain } from 'starkweb/react';
const Connect = dynamic(
  () => import('../components/Connect').then(mod => mod.Connect), 
  { ssr: false, loading: () => <div>Loading...</div> }
);

const Home: NextPage = () => {
  return (
    <main suppressHydrationWarning>
      <Account />
      <Connect />
      <SwitchAccount />
      <SwitchChain />
      <Balance />
      <BlockNumber />
      <ConnectorClient />
    </main>
  );
};

export default Home;


function Account() {
  const account = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div>
      <h2>Account</h2>

      <div>
        account: {account.address}
        <br />
        chainId: {account.chainId}
        <br />
        status: {account.status}
      </div>

      {account.status === 'connected' && (
        <button type="button" onClick={() => disconnect()}>
          Disconnect
        </button>
      )}
    </div>
  )
}


// function Connect() {
//   const chainId = useChainId()
//   const { connectors, connect, status, error } = useConnect()

//   return (
//     <div>
//       <h2>Connect</h2>
//       {connectors.map((connector, index) => (
//         <button
//           key={index}
//           onClick={() => connect({ connector, chainId })}
//           type="button"
//         >
//           {connector.name}
//         </button>
//       ))}
//       <div>{status}</div>
//       <div>{error?.message}</div>
//     </div>
//   )
// }


function SwitchAccount() {
  const account = useAccount()
  const { connectors, switchAccount } = useSwitchAccount()

  return (
    <div>
      <h2>Switch Account</h2>

      {connectors.map((connector) => (
        <button
          disabled={account.connector?.uid === connector.uid}
          key={connector.uid}
          onClick={() => switchAccount({ connector })}
          type="button"
        >
          {connector.name}
        </button>
      ))}
    </div>
  )
}

function SwitchChain() {
  const chainId = useChainId()
  const { chains, switchChain, error } = useSwitchChain()

  return (
    <div>
      <h2>Switch Chain</h2>

      {chains.map((chain) => (
        <button
          disabled={chainId === chain.chain_id}
          key={chain.chain_id}
          onClick={() => switchChain({ chainId: chain.chain_id })}
          type="button"
        >
          {chain.name}
        </button>
      ))}

      {error?.message}
    </div>
  )
}


function Balance() {
  const { address } = useAccount()
  const { data: default_ } = useBalance({ address })

  return (
    <div>
      <h2>Balance</h2>

      <div>
        Balance :{' '}
        {!!default_?.balance && default_.formatted}
      </div> 
    </div>
  )
}

function BlockNumber() {
  const { data: default_ } = useBlockNumber({ watch: true })

  return (
    <div>
      <h2>Block Number</h2>

      <div>Block Number (Default Chain): {default_?.toString()}</div>
    </div>
  )
}

function ConnectorClient() {
  const { data, error } = useConnectorClient()
  return (
    <div>
      <h2>Connector Client</h2>
      client {data?.account?.address} {data?.chain?.id}
      {error?.message}
    </div>
  )
}
