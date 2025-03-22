import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/global.css";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiProvider, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./utils/routes";
import { AuthProvider } from "./context/AuthContext";
import { mainnet, sepolia, base, arbitrum } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig } from "wagmi";
import { getChain } from "@lit-protocol/vincent-contracts";
import { APP_INFO, NETWORKS, THEME, WALLET_CONNECT, WALLETS } from "./_config";

const queryClient = new QueryClient();

// Get Chronicle Yellowstone chain configuration
const chronicleYellowstone = getChain("chronicle-yellowstone");
const yellowstoneChainConfig = chronicleYellowstone.chainConfig();

// Create a proper Chain object for Chronicle Yellowstone - type cast to avoid type errors
const chronicleChain = {
  ...yellowstoneChainConfig,
  ...NETWORKS.chronicleYellowstone,
} as any; // Type cast to avoid chain type errors

// Map enabled chains
const getChains = () => {
  const enabledChains = [];
  
  if (NETWORKS.enabled.includes("chronicleYellowstone")) {
    enabledChains.push(chronicleChain);
  }
  if (NETWORKS.enabled.includes("mainnet")) {
    enabledChains.push(mainnet);
  }
  if (NETWORKS.enabled.includes("sepolia")) {
    enabledChains.push(sepolia);
  }
  if (NETWORKS.enabled.includes("base")) {
    enabledChains.push(base);
  }
  if (NETWORKS.enabled.includes("arbitrum")) {
    enabledChains.push(arbitrum);
  }
  
  // Ensure at least one chain is returned
  if (enabledChains.length === 0) {
    enabledChains.push(chronicleChain);
  }
  
  return enabledChains;
};

// Get configured chains
const chains = getChains();

// Map wallet configurations
const getWalletConfig = () => {
  const recommendedWallets = [];
  const otherWallets = [];
  
  // Map recommended wallets
  if (WALLETS.recommended.includes("rainbow")) {
    recommendedWallets.push(rainbowWallet);
  }
  if (WALLETS.recommended.includes("metamask")) {
    recommendedWallets.push(metaMaskWallet);
  }
  if (WALLETS.recommended.includes("coinbase")) {
    recommendedWallets.push(coinbaseWallet);
  }
  
  // Map other wallets
  if (WALLETS.others.includes("injected")) {
    otherWallets.push(injectedWallet);
  }
  if (WALLETS.others.includes("walletConnect")) {
    otherWallets.push(walletConnectWallet);
  }
  
  return {
    recommended: recommendedWallets,
    others: otherWallets
  };
};

// Get wallet configurations
const walletConfig = getWalletConfig();

// Configure the connectors
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: walletConfig.recommended,
    },
    {
      groupName: "Others",
      wallets: walletConfig.others,
    },
  ],
  {
    appName: APP_INFO.name,
    projectId: WALLET_CONNECT.projectId,
  }
);

// Create transports config for each chain
const createTransportsConfig = () => {
  const transports: Record<number, any> = {};
  
  // Add Chronicle Yellowstone
  if (NETWORKS.enabled.includes("chronicleYellowstone")) {
    transports[chronicleChain.id] = http(yellowstoneChainConfig.rpcUrls.default.http[0]);
  }
  
  // Add other networks if enabled
  if (NETWORKS.enabled.includes("mainnet")) {
    transports[mainnet.id] = http(mainnet.rpcUrls.default.http[0]);
  }
  if (NETWORKS.enabled.includes("sepolia")) {
    transports[sepolia.id] = http(sepolia.rpcUrls.default.http[0]);
  }
  if (NETWORKS.enabled.includes("base")) {
    transports[base.id] = http(base.rpcUrls.default.http[0]);
  }
  if (NETWORKS.enabled.includes("arbitrum")) {
    transports[arbitrum.id] = http(arbitrum.rpcUrls.default.http[0]);
  }
  
  return transports;
};

// Create wagmi config
const config = createConfig({
  chains: [chronicleChain, ...(chains.filter(c => c !== chronicleChain))] as const,
  transports: createTransportsConfig(),
  connectors,
});

// Create router from routes configuration
const router = createBrowserRouter(routes);

// Configure custom RainbowKit theme with Lit Protocol branding
const litTheme = darkTheme({
  accentColor: THEME.rainbowKit.accentColor,
  accentColorForeground: THEME.rainbowKit.accentColorForeground,
  borderRadius: THEME.rainbowKit.borderRadius as "medium",
  fontStack: THEME.rainbowKit.fontStack as "system",
  overlayBlur: THEME.rainbowKit.overlayBlur as "small",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={litTheme}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
