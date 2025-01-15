'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { StarkwebProvider } from 'starkweb/react'

import { getConfig } from '@/wagmi'

export function Providers(props: {
  children: ReactNode
}) {
  const [config] = useState(() => getConfig())
  const [queryClient] = useState(() => new QueryClient())

  return (
    <StarkwebProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </StarkwebProvider>
  )
}
