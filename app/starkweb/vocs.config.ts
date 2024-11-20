import { defineConfig } from "vocs";

export default defineConfig({
  title: "Starkweb",
  description: "Reactivity for Starknet applications",
  logoUrl: { light: "/logo-light-hug.svg", dark: "/logo-dark-hug.svg" },
  topNav: [
    { text: "React", link: "/react", match: "/react" },
    { text: "Connect", link: "/connect", match: "/connect" },
    { text: "Core", link: "/core", match: "/core" },
    { text: "CLI", link: "/cli", match: "/cli" },
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
          link: "/react",
        },
        {
          text: "Configuration",
          items: [
            {
              text: "createConfig",
              link: "/react/api/createConfig",
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
    {
      text: "Connect",
      items: [],
    },
    {
      text: "Core",
      items: [],
    },
    {
      text: "CLI",
      items: [],
    },
  ],
});
