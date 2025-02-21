'use client'

import { watchAccount } from '../../core/actions/watchAccount.js'
import { useEffect } from 'react'
import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'
import type { Evaluate } from '../../core/types/utils.js'
import type { GetAccountReturnType } from '../../core/actions/getAccount.js'

export type UseAccountEffectParameters = Evaluate<
  {
    onConnect?(
      data: Evaluate<
        Pick<
          Extract<GetAccountReturnType, { status: 'connected' }>,
          'address' | 'addresses' | 'chain' | 'chainId' | 'connector'
        > & {
          isReconnected: boolean
        }
      >,
    ): void
    onDisconnect?(): void
  } & ConfigParameter
>

/** https://starkweb.xyz/react/api/hooks/useAccountEffect */
export function useAccountEffect(parameters: UseAccountEffectParameters = {}) {
  const { onConnect, onDisconnect } = parameters

  const config = useConfig(parameters)

  useEffect(() => {
    return watchAccount(config, {
      onChange(data, prevData) {
        if (
          (prevData.status === 'reconnecting' ||
            (prevData.status === 'connecting' &&
              prevData.address === undefined)) &&
          data.status === 'connected'
        ) {
          const { address, addresses, chain, chainId, connector } = data
          const isReconnected =
            prevData.status === 'reconnecting' ||
            // if `previousAccount.status` is `undefined`, the connector connected immediately.
            prevData.status === undefined
          onConnect?.({
            address,
            addresses,
            chain,
            chainId,
            connector,
            isReconnected,
          })
        } else if (
          prevData.status === 'connected' &&
          data.status === 'disconnected'
        )
          onDisconnect?.()
      },
    })
  }, [config, onConnect, onDisconnect])
}
