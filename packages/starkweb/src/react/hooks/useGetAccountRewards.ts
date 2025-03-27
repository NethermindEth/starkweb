import {
    type GetAccountRewardsData,
    type GetAccountRewardsErrorType,
    type GetAccountRewardsOptions,
    type GetAccountRewardsQueryKey,
    getAccountRewardsQueryOptions,
} from "../../core/query/getAccountRewards.js";
import { type UseQueryReturnType, useQuery } from "../utils/query.js";
import type { Hex } from "../../types/misc.js";
import { useConfig } from "./useConfig.js";
import type { Config } from "src/core/createConfig.js";
import type { Evaluate } from "../../types/utils.js";
import type { ConfigParameter, QueryParameter } from "../types/properties.js";

export type UseFetchAccountRewardsParameters<
    config extends Config = Config,
    selectData = GetAccountRewardsData
> = Evaluate<
GetAccountRewardsOptions &
    ConfigParameter<config> & {
        accountAddress: string;
        chainId?: Hex;
    } & QueryParameter<
    GetAccountRewardsData,
        GetAccountRewardsErrorType,
        selectData,
        GetAccountRewardsQueryKey
    >
>;

export type UseGetAccountRewardsReturnType = UseQueryReturnType<GetAccountRewardsData, GetAccountRewardsErrorType>
export function useFetchAccountRewards(
    parameters: UseFetchAccountRewardsParameters
): UseGetAccountRewardsReturnType{
    const { query = {} } = parameters;

    const config = useConfig(parameters);

    const options = getAccountRewardsQueryOptions(config, {
     ...parameters
    });


    return useQuery({...(query as any), ...options, queryKey: options.queryKey}) as UseGetAccountRewardsReturnType;

}