import { useState } from 'react';
import { createPaymasterClient } from '../../exports/starkweb.js';
import { http } from '../../exports/starkweb.js';
import { mainnet, sepolia } from '../../exports/chains.js';
import type { InvokeResponse } from '../../types/paymaster.js';
import type { ADDRESS, SIGNATURE } from '../../types/components.js';

export type UseExecuteTransactionProps = {
  network: 'mainnet' | 'sepolia';
  userAddress: ADDRESS;
  typedData: string;
  signature: SIGNATURE;
  clientUrl?: string;
};

export type UseExecuteTransactionReturn = {
  loading: boolean;
  error: string | null;
  executeTransaction: () => Promise<InvokeResponse | null>;
};

export const useExecuteTransaction = ({
  network,
  userAddress,
  typedData,
  signature,
  clientUrl,
}: UseExecuteTransactionProps): UseExecuteTransactionReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const executeTransaction = async (): Promise<InvokeResponse | null> => {
    setLoading(true);
    setError(null);
    const chain = network === 'mainnet' ? mainnet : sepolia;
    const paymasterClient = createPaymasterClient({
      chain,
      transport: http(clientUrl || `http://localhost:3003/paymaster/${network}`),
    });

    try {
      const response = await paymasterClient.executeTransaction({
        userAddress,
        typedData,
        signature,
      });
      return response;
    } catch (err) {
      setError('Failed to execute transaction');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, executeTransaction };
}; 