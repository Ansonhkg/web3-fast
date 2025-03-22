import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Config, WagmiProvider } from "wagmi";
import { getChain } from "@lit-protocol/vincent-contracts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient();
const chronicleYellowstone = getChain("chronicle-yellowstone");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <React.StrictMode>
      <WagmiProvider config={chronicleYellowstone.wagmiConfig as Config}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </WagmiProvider>
    </React.StrictMode>
  </Router>
);
