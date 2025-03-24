export interface GaslessStatus {
    //The gasless status
    status: boolean;
  }
  
  export interface GaslessCompatibility {
    //Indicates if the account is compatible with the gasless service
    isCompatible: boolean;
    //The validation's gas consumed overhead
    gasConsumedOverhead: bigint;
    //The validation's data gas consumed overhead
    dataGasConsumedOverhead: bigint;
  }
  
  export interface GasTokenPrice {
    // The gas token's address
    tokenAddress: string;
    // The price of 1 token in ETH
    priceInETH: bigint;
    // The price of 1 token in USD
    priceInUSD: number;
    // The token's number of decimals
    decimals: number;
  }
  
  export interface PaymasterReward {
    // Reward's creation date
    date: Date;
    // The user's address
    address: string;
    // The company that will pay the gas fees
    sponsor: string;
    // The name of the company's campaign
    campaign: string;
    // The protocol where the reward can be used
    protocol: string | undefined;
    // The number of free transaction
    freeTx: number;
    // The number of remaining transactions
    remainingTx: number;
    // Reward's expiration date
    expirationDate: Date | undefined;
    // The list of whitelisted calls
    whitelistedCalls: WhitelistedCall[];
  }
  
  export interface WhitelistedCall {
    // The value can be '*' if all contracts are whitelisted or can be the contract address (hex format)
    contractAddress: string;
    // The value can be '*' if all entrypoint are whitelisted or can be the entrypoint name (string format)
    entrypoint: string;
  }
  
  export interface AccountsRewardsOptions {
    sponsor?: string;
    campaign?: string;
    protocol?: string;
  }
  
  export interface DeploymentData {
    class_hash: string;
    salt: string;
    unique: string;
    calldata: string[];
    sigdata?: string[];
  }
  
  export interface ExecuteCallsOptions {
    gasTokenAddress?: string;
    maxGasTokenAmount?: bigint;
    deploymentData?: DeploymentData;
  }
  
  export interface GaslessOptions {
    baseUrl?: string;
    // The api key allows you to sponsor the gas fees for your users
    apiKey?: string;
    abortSignal?: AbortSignal;
    apiPublicKey?: string;
  }
  
  export interface RequestError {
    messages: string[];
    revertError: string | undefined;
  }
  
  export interface InvokeResponse {
    transactionHash: string;
  }
  
  export class ContractError {
    constructor(
      public message: string,
      public revertError: string,
    ) {}
  }