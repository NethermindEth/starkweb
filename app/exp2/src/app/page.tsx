'use client'

import { testAbi } from '@/utils/testabi'
import { useAccount, useConnect, useDisconnect, useReadContract } from 'starkweb/react'

import { readContract } from 'starkweb/actions'
import { getConfig } from '@/wagmi'
import { createPublicClient } from 'starkweb'
import { http } from 'starkweb'
import { mainnet } from 'starkweb/chains'

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
        {connectors.map((connector) => (
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
      
      <ReadContract />
    </>
  )
}

function ReadContract() {
  const client = createPublicClient({
    chain: mainnet,
    transport: http(),
  })
  const data = readContract(client, {
    address: '0x0000000000000000000000000000000000000000',
    abi: testAbi,
    functionName: '',
  })

  console.log(data)

  const { data, isLoading, isError } = useReadContract({
    address: '0x0000000000000000000000000000000000000000',
    abi: testAbi,
    functionName: '',
  })

  return <div>ReadContract</div>
} 
export default App
