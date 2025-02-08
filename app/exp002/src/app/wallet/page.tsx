"use client"
import { Address } from "starkweb/accounts"
import { useState } from "react"
import { custom, Hash } from "starkweb"
import { createWalletClient } from "starkweb"
import { sepolia } from "starkweb/chains"
import  "starkweb/window"

const walletClient = createWalletClient({
    chain: sepolia,
    transport: custom(window.starknet_argentX!),
  })
  
  function Example() {
    const [account, setAccount] = useState<Address>()
    const [signature, setSignature] = useState<Hash>()
  
    const connect = async () => {
      const [address] = await window.starknet_argentX!.enable()
      setAccount(address as any)
    }
  
    const signTypedData = async () => {
      if (!account) return
      const typedData = {
        types: {
          StarknetDomain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'felt' },
            { name: 'chainId', type: 'felt' },
          ],
          Message: [
            { name: 'address', type: 'felt' },
            { name: 'statement', type: 'string' },
            { name: 'uri', type: 'string' },
            { name: 'nonce', type: 'string' },
          ],
        },
        primaryType: 'Message',
        domain: {
          name: "Musa",
          version: "0.1",
          chainId: "822",
          revision: '1',
        },
        message: {
          address: account,
          statement: "Hello World",
          uri: "jladsj",
          nonce: "9df08",
        },
      }
      const signature = await walletClient.signTypedData({
        ...typedData,
      } as any)
      setSignature(signature as unknown as Hash)
    }
  
    if (account)
      return (
        <>
          <div>Connected: {account}</div>
          <button onClick={signTypedData}>Sign Typed Data</button>
          {signature && <div>Receipt: {signature}</div>}
        </>
      )
    return <button onClick={connect}>Connect Wallet</button>
  }
export default function Home() {
    return <Example />
}