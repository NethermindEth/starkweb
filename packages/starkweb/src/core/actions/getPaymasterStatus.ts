import { useState } from 'react';
import { createPaymasterClient } from '../../exports/starkweb.js';
import { http } from '../../exports/starkweb.js';
import { mainnet, sepolia } from '../../exports/chains.js';
import type { GaslessStatus } from '../../types/paymaster.js';

/**
 * Fetches the current status of the Paymaster.
 *
 * @param {('mainnet' | 'sepolia')} network - The network to connect to, either 'mainnet' or 'sepolia'.
 * @param {string} [url='http://localhost:3003/paymaster'] - Optional URL for the Paymaster service. Defaults to 'http://localhost:3003/paymaster.
 * @returns {Object} An object containing the status, loading state, and error message.
 */
export const fetchPaymasterStatus = async (network: 'mainnet' | 'sepolia', url: string = 'http://localhost:3003/paymaster') => {
  const [status, setStatus] = useState<GaslessStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const chain = network === 'mainnet' ? mainnet : sepolia;
  const paymasterClient = createPaymasterClient({
    chain,
    transport: http(`${url}/paymaster/${network}`),
  });

  setLoading(true);
  try {
    const paymasterStatus = await paymasterClient.getPaymasterStatus();
    setStatus(paymasterStatus);
  } catch (err) {
    setError('Failed to fetch paymaster status');
  } finally {
    setLoading(false);
  }

  return { status, loading, error };
};