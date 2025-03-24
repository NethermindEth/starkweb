import {
  type BuildTypedDataErrorType as strkjs_BuildTypedDataErrorType,
  type BuildTypedDataParameters as strkjs_BuildTypedDataParameters,
  type BuildTypedDataReturnType as strkjs_BuildTypedDataReturnType,
  buildTypedData as strkjs_buildTypedData,
} from "../../actions/paymaster/buildTypedData.js";
import type { Hex } from "../../types/misc.js";

import type { Config } from "../createConfig.js";
import type { ChainIdParameter } from "../types/properties.js";
import type { Evaluate } from "../types/utils.js";
import { getAction } from "../utils/getAction.js";

export type BuildTypedDataParameters = Evaluate<
  strkjs_BuildTypedDataParameters & ChainIdParameter
>;

export type BuildTypedDataReturnType = Evaluate<
  strkjs_BuildTypedDataReturnType & {
    chainId: Hex;
  }
>;

export type BuildTypedDataErrorType = strkjs_BuildTypedDataErrorType;

export async function buildTypedData(
  config: Config,
  parameters: BuildTypedDataParameters
): Promise<BuildTypedDataReturnType> {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction(
    client,
    strkjs_buildTypedData,
    "buildTypedData"
  );
  return action(rest) as Promise<BuildTypedDataReturnType>;
}
