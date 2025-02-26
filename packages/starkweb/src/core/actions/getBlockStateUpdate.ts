import type { Hex } from '../../types/misc.js'
import {
  type GetBlockStateUpdateErrorType as strkjs_GetBlockStateUpdateErrorType,
  type GetBlockStateUpdateParameters as strkjs_GetBlockStateUpdateParameters,
  type GetBlockStateUpdateReturnType as strkjs_GetBlockStateUpdateReturnType,
  getBlockStateUpdate as strkjs_getBlockStateUpdate,
} from '../../actions/public/getBlockStateUpdate.js'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js';
import type { Evaluate } from '../types/utils.js';
import { getAction } from '../utils/getAction.js';

export type GetBlockStateUpdateParameters = Evaluate<
  strkjs_GetBlockStateUpdateParameters & ChainIdParameter
>;

export type GetBlockStateUpdateReturnType<T extends GetBlockStateUpdateParameters> = Evaluate<
  strkjs_GetBlockStateUpdateReturnType<T> & {
    chainId: Hex;
  }
>;

export type GetBlockStateUpdateErrorType = strkjs_GetBlockStateUpdateErrorType;

export async function getBlockStateUpdate<TParams extends GetBlockStateUpdateParameters>(
  config: Config,
  parameters: TParams = {} as TParams,
): Promise<GetBlockStateUpdateReturnType<TParams>> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(
    client,
    strkjs_getBlockStateUpdate,
    'getBlockStateUpdate'
  );
  return action(rest as strkjs_GetBlockStateUpdateParameters) as unknown as Promise<GetBlockStateUpdateReturnType<TParams>>;
}