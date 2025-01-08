'use client'

import { useAccount, useConnect, useDisconnect, useReadContract, useWriteContract } from 'starkweb/react'

import { getConfig } from '@/wagmi'
import { createWalletClient, custom, SNIP1193EventMap, SNIP1193RequestFn } from 'starkweb'
import { sepolia } from 'starkweb/chains'
import { testAbi } from '@/utils/testAbi'

declare global {
  interface Window {
    starknet?: {
      on: <TEvent extends keyof SNIP1193EventMap>(event: TEvent, listener: SNIP1193EventMap[TEvent]) => void;
      removeListener: <TEvent extends keyof SNIP1193EventMap>(event: TEvent, listener: SNIP1193EventMap[TEvent]) => void;
      request: SNIP1193RequestFn;
    }
  }
}



const config = getConfig()

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <>
      <div>
        <h2>Account</h2>

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
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector: any) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
      {/* <Example /> */}
    </>
  )
}

const wagmiAbi = [
  {
    inputs: [],
    name: 'mint',
    outputs: [],
    state_mutability: 'view',
    type: 'function',
  },
  {
    type: 'function',
    name: 'upgrade',
    inputs: [
      {
        name: 'new_class_hash',
        type: 'core::starknet::class_hash::ClassHash',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
] as const


async function Example() {
  const walletClient =  createWalletClient({
    chain: sepolia,
    transport: custom((window as any).starknet),
  })
  const _tx = await walletClient.writeContract({
    address:
      '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    abi: testAbi,
    functionName: 'approve',
    args: [
      '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
      '1000000000000000000',
    ],
  })
  const { writeContract } = useWriteContract();
  const { data } = useReadContract({
    abi: testAbi,
    functionName: 'domains',
    address:
      '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    args: []
  });
  const tx = writeContract({
    address:
      '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    abi: testAbi,
    functionName: 'approve',
    args: [
      '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
      '1000000000000000000',
    ],
  })

  return (
    <div>
    <h1>Example {JSON.stringify(data)}</h1>
  </div>
 )
}

export default App
