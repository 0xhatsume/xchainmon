import ReactDOM from "react-dom/client";
import { App } from "./App";
import { setup } from "./mud/setup";
import { MUDProvider } from "./MUDContext";
import mudConfig from "contracts/mud.config";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import {  } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { FlowWalletConnectors } from "@dynamic-labs/flow";
import { BitcoinWalletConnectors } from "@dynamic-labs/bitcoin";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { morphHolesky, sepolia, rootstockTestnet, flowTestnet } from "viem/chains";

import "./index.css";

const rootElement = document.getElementById("react-root");
if (!rootElement) throw new Error("React root not found");
const root = ReactDOM.createRoot(rootElement);

const config = createConfig({
  chains: [sepolia, morphHolesky, rootstockTestnet, flowTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [sepolia.id]: http(),
    [morphHolesky.id]: http(),
    [rootstockTestnet.id]: http(),
    [flowTestnet.id]: http()
  },
});

const queryClient = new QueryClient();

// TODO: figure out if we actually want this to be async or if we should render something else in the meantime
setup().then(async (result) => {
  root.render(
    <DynamicContextProvider
    theme="auto"
    settings={{
      environmentId: "76a88332-e0af-4709-b7a2-fafe4e02df20",
      walletConnectors: [EthereumWalletConnectors, FlowWalletConnectors, BitcoinWalletConnectors],
    }}
  >
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <DynamicWagmiConnector>
    <MUDProvider value={result}>
      <App />
    </MUDProvider>
      </DynamicWagmiConnector>
      </QueryClientProvider>
      </WagmiProvider>
      </DynamicContextProvider>
    ,
  );

  // https://vitejs.dev/guide/env-and-mode.html
  if (import.meta.env.DEV) {
    const { mount: mountDevTools } = await import("@latticexyz/dev-tools");
    mountDevTools({
      config: mudConfig,
      publicClient: result.network.publicClient,
      walletClient: result.network.walletClient,
      latestBlock$: result.network.latestBlock$,
      storedBlockLogs$: result.network.storedBlockLogs$,
      worldAddress: result.network.worldContract.address,
      worldAbi: result.network.worldContract.abi,
      write$: result.network.write$,
      useStore: result.network.useStore,
    });
  }
});
