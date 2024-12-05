'use client';

import { useAccount, useConnect, useDisconnect, useBlockNumber, useReadContract } from 'starkweb/react';
import { ConnectKitButton } from 'starkwebkit';
import { testAbi } from './utils/testAbi';

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const blockNumber = useBlockNumber();
  const { data: name } = useReadContract({
    address: '0x005c475b6089156c0CD4Fc9d64De149992431c442AF882d6332e7c736c99DE91',
    abi: testAbi,
    functionName: 'name',
    args: []
  })
  return (
    <>
      <div suppressHydrationWarning>
        <div>name: {JSON.stringify(name)}</div>
        <h2>Account</h2>
        <ConnectKitButton />

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
        <div>
          blockNumber: {blockNumber.data}
        </div>
      </div>
      <div suppressHydrationWarning>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
            suppressHydrationWarning
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  );
}

export default App;
