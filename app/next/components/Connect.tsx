'use client'

import { useState } from 'react';
import {
  useAccount,
  useChainId,
  useConnect,
  useSignMessage,
  useVerifyMessage,
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
  const { address } = useAccount()
  const chainId = useChainId()
  // const { verifyMessage } = useVerifyMessage()
  // const [message, setMessage] = useState('')
  const [signature, setSignature] = useState<string[]>([])
  const handleSignMessage = async () => { 
    const message = 'Hello, world!';
    // const address = '0x034abecf49cedc634d0c3145da7b1caea99d8d4f2da5b5d41e532ea05192d523';
    // const chainId = '0x534e5f4d41494e';
    const domain = 'localhost:3000';
    const uri = 'http://localhost:3000';
    const nonce = '24434';
    const version = '1';
    const sig = await signMessageAsync({ 
      statement: message,
      chainId: chainId,
      domain: 'localhost:3000',
      uri: 'http://localhost:3000',
      nonce: nonce,
      version: '1',
      address: address
    })
   console.log(sig)
  }
  return <div>
    {/* <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} /> */}
    <button onClick={handleSignMessage}>Sign Message</button>
    <div>{signature}</div>
    <table>
      <tr>
        <td>Message</td>
        {/* <td>{message}</td> */}
      </tr>
    </table>
    <div>{signature}</div>
    <table>
      <tr>
        <td>Message</td>
        {/* <td>{message}</td> */}
      </tr>
    </table>
  </div>

}

