'use client'

import { useState } from 'react';

import {
  createPublicClient,
  http,
  verifyMessage,
} from 'starkweb';
import { sepolia } from 'starkweb/chains';
import {
  useChainId,
  useConnect,
  useSignMessage,
} from 'starkweb/react';

export function Connect() {
  const chainId = useChainId()
  const { connectors, connect, status, error } = useConnect()

  return (
    <div>
      <h2>Connect</h2>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector, chainId })}
          type="button"
        >
          {connector.name}
        </button>
      ))}
      <div>{status}</div>
      <div>{error?.message}</div>
      <SignMessage />
    </div>
  )
} 

export function SignMessage() {
  const { signMessageAsync } = useSignMessage()
  const [message, setMessage] = useState('')
  const [signature, setSignature] = useState<string[]>([])
  const handleSignMessage = async () => { 
    const sig = await signMessageAsync({ 
      statement: message,
      chainId: '0x534e5f4d41494e',
      domain: 'localhost:3000',
      uri: 'http://localhost:3000',
      nonce: Math.random().toString(36).slice(2),
      version: '1',
      address: '0x0' // This should be replaced with actual connected wallet address
    })
    setSignature(sig.toString())
  }
  return <div>
    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
    <button onClick={handleSignMessage}>Sign Message</button>
    <div>{signature}</div>
    <table>
      <tr>
        <td>Message</td>
        <td>{message}</td>
      </tr>
    </table>
    <div>{signature}</div>
    <table>
      <tr>
        <td>Message</td>
        <td>{message}</td>
      </tr>
    </table>
    <VerifyMessage message={message} signature={signature} />
  </div>

}

export function VerifyMessage({message, signature }: { message: string, signature: string[] }) {
  const [isValid, setIsValid] = useState(false)
  const handleVerifyMessage = async () => {
    const isValid = await verifyMessage(
      createPublicClient({
      chain: sepolia,
      transport: http()
    }), {
      statement: message 
    })
    setIsValid(isValid)
  }
  return <div>
    <button onClick={handleVerifyMessage}>Verify Message</button>
    <div>{isValid}</div>
  </div>
}
