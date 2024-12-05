import type { Address } from '../../types/misc.js'
import {
  type Client,
  createClient,
} from '../../clients/createClient.js'

import type { Config, Connection, Transport } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from "../errors/base.js";
import {
  ConnectorAccountNotFoundError,
  type ConnectorAccountNotFoundErrorType,
  ConnectorChainMismatchError,
  type ConnectorChainMismatchErrorType,
  ConnectorNotConnectedError,
  type ConnectorNotConnectedErrorType,
} from "../errors/config.js";
import type {
  ChainIdParameter,
  ConnectorParameter,
} from "../types/properties.js";
import type { Evaluate } from "../types/utils.js";
import type { Account } from '../../types/account.js';
import { custom } from '../../clients/transports/custom.js';
import { parseAccount } from '../../accounts/index.js';
import type { Chain } from '../../types/chain.js';

export type GetConnectorClientParameters = Evaluate<
  ChainIdParameter &
    ConnectorParameter & {
      account?: Address | Account | undefined;
    }
>;

export type GetConnectorClientReturnType = Client<
  Transport,
  Chain,
  Account
>;

export type GetConnectorClientErrorType =
  | ConnectorAccountNotFoundErrorType
  | ConnectorChainMismatchErrorType
  | ConnectorNotConnectedErrorType
  // base
  | BaseErrorType
  | ErrorType;

/** https://starkweb.xyz/core/api/actions/getConnectorClient */
export async function getConnectorClient(
  config: Config,
  parameters: GetConnectorClientParameters = {}
): Promise<GetConnectorClientReturnType> {
  // Get connection
  let connection: Connection | undefined;
  if (parameters.connector) {
    const { connector } = parameters;
    const [accounts, chainId] = await Promise.all([
      connector.getAccounts(),
      connector.getChainId(),
    ]);
    connection = {
      accounts: accounts as readonly [Address, ...Address[]],
      chainId,
      connector,
    };
  } else connection = config.state.connections.get(config.state.current!);
  if (!connection) throw new ConnectorNotConnectedError();

  const chainId = parameters.chainId ?? connection.chainId;

  // Check connector using same chainId as connection
  const connectorChainId = await connection.connector.getChainId();
  if (connectorChainId !== connection.chainId)
    throw new ConnectorChainMismatchError({
      connectionChainId: connection.chainId,
      connectorChainId,
    });

  // If connector has custom `getClient` implementation
  type Return = GetConnectorClientReturnType;
  const connector = connection.connector;
  if (connector.getClient)
    return connector.getClient({ chainId }) as unknown as Return;

  // Default using `custom` transport
  const account = parseAccount(parameters.account ?? connection.accounts[0]!);
  // account.address = getAddress(account.address); // TODO: Checksum address as part of `parseAccount`?

  const chain = config.chains.find(
    (chain) => chain.chain_id === chainId
  );
  const provider = (await connection.connector.getProvider({ chainId })) as {
    request(...args: any): Promise<any>;
  };

  // If account was provided, check that it exists on the connector
  if (
    parameters.account &&
    !connection.accounts.some(
      (x) => x.toLowerCase() === account.address.toLowerCase()
    )
  )
    throw new ConnectorAccountNotFoundError({
      address: account.address,
      connector,
    });

  return createClient({
    account,
    chain,
    name: "Connector Client",
    transport: (opts) => custom(provider)({ ...opts, retryCount: 0 }),
  }) as Return;
}
