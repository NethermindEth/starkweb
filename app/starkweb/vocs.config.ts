import { defineConfig } from "vocs";

export default defineConfig({
  title: "Starkweb",
  description: "all-in-one Starknet Toolkit",
  banner: {
    content: "Join the Starkweb Telegram Channel [here](https://t.me/strkweb)",
    dismissable: true,
  },
  logoUrl: { light: "/starkweb_horizontal_dark.svg", dark: "/starkweb_horizontal_light.svg" },
  topNav: [
    { text: "Core", link: "/core", match: "/core" },
    { text: "React", link: "/react", match: "/react" },
    // { text: "Connect", link: "/connect", match: "/connect" },
    // {
    //   text: "Scaffold Starkweb",
    //   link: "/create-starkweb-app",
    //   match: "/create-starkweb-app",
    // },
  ],
  sidebar: [
    {
      text: "Introduction",
      items: [
        {
          text: "Overview",
          link: "/",
        },
        {
          text: "Why We Built Starkweb",
          link: "/why-starkweb",
        },
        {
          text: "TypeScript",
          link: "/typescript",
        },
      ],
    },
    {
      text: "React",
      items: [
        {
          text: "Getting Started",
          link: "/react/",
        },
        {
          text: "Configuration",
          items: [
            {
              text: "createConfig",
              link: "/react/api/createConfig",
            },
            {
              text: "createStorage",
              link: "/react/api/createStorage",
            },
            {
              text: "Chains",
              link: "/react/api/Chains",
            },
            {
              text: "StarkwebProvider",
              link: "/react/api/StarkwebProvider",
            },
          ],
        },
        {
          text: "Hooks",
          link: "/react/hooks",
          collapsed: true,
          items: [
            { text: "useAccount", link: "/react/hooks/useAccount" },
            { text: "useAccountEffect", link: "/react/hooks/useAccountEffect" },
            { text: "useBalance", link: "/react/hooks/useBalance" },
            { text: "useBlockNumber", link: "/react/hooks/useBlockNumber" },
            { text: "useChainId", link: "/react/hooks/useChainId" },
            { text: "useClient", link: "/react/hooks/useClient" },
            { text: "useConfig", link: "/react/hooks/useConfig" },
            { text: "useConnect", link: "/react/hooks/useConnect" },
            { text: "useConnections", link: "/react/hooks/useConnections" },
            {
              text: "useConnectorClient",
              link: "/react/hooks/useConnectorClient",
            },
            { text: "useConnectors", link: "/react/hooks/useConnectors" },
            { text: "useContractRead", link: "/react/hooks/useContractRead" },
            { text: "useContractReads", link: "/react/hooks/useContractReads" },
            { text: "useContractWrite", link: "/react/hooks/useContractWrite" },
            { text: "useDisconnect", link: "/react/hooks/useDisconnect" },
            { text: "useReconnect", link: "/react/hooks/useReconnect" },
            { text: "useSignMessage", link: "/react/hooks/useSignMessage" },
            { text: "useSignTypedData", link: "/react/hooks/useSignTypedData" },
            { text: "useSwitchAccount", link: "/react/hooks/useSwitchAccount" },
            { text: "useSwitchChain", link: "/react/hooks/useSwitchChain" },
            { text: "useVerifyMessage", link: "/react/hooks/useVerifyMessage" },
            { text: "useWalletClient", link: "/react/hooks/useWalletClient" },
          ],
        },
      ],
    },
    // {
    //   text: "Connect",
    //   items: [],
    // },
    {
      text: "Core",
      items: [
        {
          text: "Getting Started",
          link: "/core/",
        },
        // {
        //   text: "Configuration",
        //   items: [
        //     {
        //       text: "createConfig",
        //       link: "/core/configuration/createConfig",
        //     },
        //     {
        //       text: "chains",
        //       link: "/core/configuration/chains",
        //     },
        //     {
        //       text: "transports",
        //       link: "/core/configuration/transports",
        //     },
        //   ],
        // },
        {
          text: "Actions",
          link: "/core/actions",
          collapsed: true,
          items: [
            {
              text: "Account & Connection",
              collapsed: true,
              items: [
                { text: "getAccount", link: "/core/actions/getAccount" },
                { text: "connect", link: "/core/actions/connect" },
                { text: "disconnect", link: "/core/actions/disconnect" },
                { text: "reconnect", link: "/core/actions/reconnect" },
                { text: "switchAccount", link: "/core/actions/switchAccount" },
                {
                  text: "getConnections",
                  link: "/core/actions/getConnections",
                },
                { text: "getConnectors", link: "/core/actions/getConnectors" },
                {
                  text: "getConnectorClient",
                  link: "/core/actions/getConnectorClient",
                },
              ],
            },
            {
              text: "Network & Chain",
              collapsed: true,
              items: [
                { text: "getChainId", link: "/core/actions/getChainId" },
                { text: "getChains", link: "/core/actions/getChains" },
                { text: "switchChain", link: "/core/actions/switchChain" },
                {
                  text: "getBlockNumber",
                  link: "/core/actions/getBlockNumber",
                },
                {
                  text: "getBlockHashAndNumber",
                  link: "/core/actions/getBlockHashAndNumber",
                },
                {
                  text: "getBlockWithTxs",
                  link: "/core/actions/getBlockWithTxs",
                },
                { text: "syncing", link: "/core/actions/syncing" },
              ],
            },
            {
              text: "Contract Interactions",
              collapsed: true,
              items: [
                { text: "readContract", link: "/core/actions/readContract" },
                { text: "readContracts", link: "/core/actions/readContracts" },
                { text: "writeContract", link: "/core/actions/writeContract" },
                { text: "call", link: "/core/actions/call" },
                { text: "getClass", link: "/core/actions/getClass" },
                { text: "getClassAt", link: "/core/actions/getClassAt" },
                { text: "getStorageAt", link: "/core/actions/getStorageAt" },
                { text: "getEvents", link: "/core/actions/getEvents" },
                { text: "getNonce", link: "/core/actions/getNonce" },
                { text: "getBalance", link: "/core/actions/getBalance" },
              ],
            },
            {
              text: "Transactions",
              collapsed: true,
              items: [
                {
                  text: "getTransactionReceipt",
                  link: "/core/actions/getTransactionReceipt",
                },
                {
                  text: "getTransactionStatus",
                  link: "/core/actions/getTransactionStatus",
                },
                {
                  text: "getTransactionByBlockIdAndIndex",
                  link: "/core/actions/getTransactionByBlockIdAndIndex",
                },
                {
                  text: "getBlockTransactionsTraces",
                  link: "/core/actions/getBlockTransactionsTraces",
                },
                {
                  text: "getTraceTransaction",
                  link: "/core/actions/getTraceTransaction",
                },
              ],
            },
            {
              text: "Transaction Submission",
              collapsed: true,
              items: [
                {
                  text: "addInvokeTransaction",
                  link: "/core/actions/addInvokeTransaction",
                },
                {
                  text: "addDeclareTransaction",
                  link: "/core/actions/addDeclareTransaction",
                },
                {
                  text: "addDeployAccountTransaction",
                  link: "/core/actions/addDeployAccountTransaction",
                },
              ],
            },
            {
              text: "Signing",
              collapsed: true,
              items: [
                { text: "signMessage", link: "/core/actions/signMessage" },
                { text: "signTypedData", link: "/core/actions/signTypedData" },
                { text: "verifyMessage", link: "/core/actions/verifyMessage" },
                {
                  text: "verifyTypedData",
                  link: "/core/actions/verifyTypedData",
                },
              ],
            },
            {
              text: "Starknet ID",
              collapsed: true,
              items: [
                { text: "getStarknetId", link: "/core/actions/getStarknetId" },
                {
                  text: "getStarknetIdAddress",
                  link: "/core/actions/getStarknetIdAddress",
                },
                {
                  text: "getStarknetIdName",
                  link: "/core/actions/getStarknetIdName",
                },
                {
                  text: "getStarknetIdNames",
                  link: "/core/actions/getStarknetIdNames",
                },
                {
                  text: "getStarknetIdUserData",
                  link: "/core/actions/getStarknetIdUserData",
                },
                {
                  text: "getStarknetIdVerifierData",
                  link: "/core/actions/getStarknetIdVerifierData",
                },
                {
                  text: "getStarknetIdProfileData",
                  link: "/core/actions/getStarknetIdProfileData",
                },
                {
                  text: "getStarknetIdStarkProfiles",
                  link: "/core/actions/getStarknetIdStarkProfiles",
                },
                {
                  text: "getStarknetIdExtendedUserData",
                  link: "/core/actions/getStarknetIdExtendedUserData",
                },
                {
                  text: "getStarknetIdExtendedVerifierData",
                  link: "/core/actions/getStarknetIdExtendedVerifierData",
                },
                {
                  text: "getStarknetIdUnboundedUserData",
                  link: "/core/actions/getStarknetIdUnboundedUserData",
                },
                {
                  text: "getStarknetIdUnboundedVerifierData",
                  link: "/core/actions/getStarknetIdUnboundedVerifierData",
                },
                {
                  text: "getStarknetIdPfpVerifierData",
                  link: "/core/actions/getStarknetIdPfpVerifierData",
                },
              ],
            },
            {
              text: "Watchers",
              collapsed: true,
              items: [
                { text: "watchAccount", link: "/core/actions/watchAccount" },
                {
                  text: "watchBlockNumber",
                  link: "/core/actions/watchBlockNumber",
                },
                { text: "watchChainId", link: "/core/actions/watchChainId" },
                { text: "watchChains", link: "/core/actions/watchChains" },
                { text: "watchClient", link: "/core/actions/watchClient" },
                {
                  text: "watchConnectors",
                  link: "/core/actions/watchConnectors",
                },
                {
                  text: "watchConnections",
                  link: "/core/actions/watchConnections",
                },
              ],
            },
            {
              text: "Client Management",
              collapsed: true,
              items: [
                { text: "getClient", link: "/core/actions/getClient" },
                {
                  text: "getPublicClient",
                  link: "/core/actions/getPublicClient",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
