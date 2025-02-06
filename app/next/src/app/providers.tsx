'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { getConfig } from '../starkweb'
import { StarkwebProvider } from 'starkweb/react'

// Create client outside component to avoid re-creations
const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  const [config] = useState(() => getConfig())

  return (
    <QueryClientProvider client={queryClient}>
      <StarkwebProvider config={config}>
        {children}
      </StarkwebProvider>
    </QueryClientProvider>
  )
} 