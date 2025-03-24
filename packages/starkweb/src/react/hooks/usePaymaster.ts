"use client";
import { useState, useEffect, useCallback } from "react";
import {
  fetchAccountRewards,
  checkAccountCompatibility,
  fetchPaymasterStatus,
  getGasTokenPrices,
  buildTypedData,
  executeTransaction,
} from "../../core/exports/actions.js";
import type {
  GaslessStatus,
  GaslessCompatibility,
  PaymasterReward,
} from "../../types/paymaster.js";
import type { ADDRESS } from "../../types/components.js";
import { createPaymasterClient } from "../../clients/createPaymasterClient.js";
import { http } from "../../clients/transports/http.js";
import { mainnet } from "../../chains/definitions/mainnet.js";
import { sepolia } from "../../chains/definitions/sepolia.js";
import { type BuildTypedDataParameters } from "../../actions/paymaster/buildTypedData.js";
import { type ExecuteTransactionParameters } from "../../actions/paymaster/executeTransaction.js";

export type UsePaymasterProps = {
  network: "mainnet" | "sepolia";
  accountAddress?: ADDRESS;
  clientUrl?: string;
};


export type UsePaymasterReturn = {
  status: GaslessStatus | null;
  compatibility: GaslessCompatibility | null;
  rewards: PaymasterReward[];
  loading: boolean;
  error: string | null;
  refetch: {
    fetchPaymasterStatus: () => Promise<void>;
    checkAccountCompatibility: () => Promise<void>;
    fetchAccountRewards: () => Promise<void>;
    getGasTokenPrices: () => Promise<void>;
    buildTypedData: (params: BuildTypedDataParameters) => Promise<void>;
    executeTransaction: (params: ExecuteTransactionParameters) => Promise<void>;
  };
};

export const usePaymaster = ({ network, accountAddress, clientUrl }: UsePaymasterProps): UsePaymasterReturn => {
  const [status, setStatus] = useState<GaslessStatus | null>(null);
  const [compatibility, setCompatibility] = useState<GaslessCompatibility | null>(null);
  const [rewards, setRewards] = useState<PaymasterReward[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const paymasterClient = createPaymasterClient({
    chain: network === "mainnet" ? mainnet : sepolia,
    transport: http(clientUrl || `http://localhost:3003/paymaster/${network}`),
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { status, error: statusError } = await fetchPaymasterStatus(network);
      setStatus(status);
      setError(statusError);
      

      if (accountAddress) {
        const { compatibility, error: compatibilityError } = await checkAccountCompatibility(network, accountAddress);
        setCompatibility(compatibility);
        setError(compatibilityError);

        const { rewards, error: rewardsError } = await fetchAccountRewards(network, accountAddress);
        setRewards(rewards);
        setError(rewardsError);
        
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  }, [network, accountAddress]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAsyncRequest = async (asyncFunc: () => Promise<any>, setState: (data: any) => void) => {
    setLoading(true);
    setError(null);
    try {
      const response = await asyncFunc();
      setState(response);
    } catch (err: any) {
      setError(err.message || "An error occurred during request");
    } finally {
      setLoading(false);
    }
  };

  return {
    status,
    compatibility,
    rewards,
    loading,
    error,
    refetch: {
      fetchPaymasterStatus: () => handleAsyncRequest(() => fetchPaymasterStatus(network), setStatus),
      checkAccountCompatibility: () => handleAsyncRequest(() => checkAccountCompatibility(network, accountAddress!), setCompatibility),
      fetchAccountRewards: () => handleAsyncRequest(() => fetchAccountRewards(network, accountAddress!), setRewards),
      getGasTokenPrices: () => handleAsyncRequest(() => getGasTokenPrices(paymasterClient, undefined), () => {}),
      buildTypedData: (params) => handleAsyncRequest(() => buildTypedData(paymasterClient, params), () => {}),
      executeTransaction: (params) => handleAsyncRequest(() => executeTransaction(paymasterClient, params), () => {}),
    },
  };
};