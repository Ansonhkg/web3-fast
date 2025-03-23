/**
 * Web3 Fast Application
 *
 * This is the main application component that showcase some business logic.
 * The actual routing is handled in main.tsx.
 */

import { createDatilChainManager } from "@lit-protocol/vincent-contracts";
import { getWalletClient } from "@wagmi/core";
import { useConfig } from "wagmi";
import { NETWORKS } from "../_config";
import "../App.css";
import { WalletButton } from "./common/WalletButton";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { JSONStringify } from "json-with-bigint";

// declare empty object to get types
const { vincentApi: vincentApiType } = createDatilChainManager({
  account: {} as any,
  network: "datil-mainnet",
});

const { appManagerDashboard: appManagerDashboardType } = vincentApiType;

function DatilChainManager() {
  const config = useConfig();
  const { isAuthenticated, address, chainId } = useAuth();
  const [appsByManager, setAppsByManager] = useState<
    Awaited<ReturnType<typeof appManagerDashboardType.getAppsByManager>>
  >([]);

  const testChainManager = async () => {
    if (!isAuthenticated || !address) return;

    try {
      const walletClient = await getWalletClient(config);

      if (!walletClient) {
        console.error("No wallet client available");
        return;
      }

      // Connect to Chronicle Yellowstone through the datil-mainnet network option
      const chainManager = createDatilChainManager({
        account: walletClient,
        network: "datil-mainnet",
      });

      console.log("Chain Manager:", chainManager);

      const { appManagerDashboard } = chainManager.vincentApi;

      console.log(appManagerDashboard.getAppsByManager);

      const _apps = await appManagerDashboard.getAppsByManager({
        manager: address as `0x${string}`,
      });

      setAppsByManager(_apps);
    } catch (err) {
      console.error("Error testing chain manager:", err);
    }
  };

  // Get chain name based on chainId
  const getChainName = (id: number | undefined) => {
    if (!id) return "Unknown";

    // Look up networks in config
    if (id === NETWORKS.chronicleYellowstone.id) {
      return NETWORKS.chronicleYellowstone.name;
    }

    // Fallback to chain ID if not found
    return `Chain #${id}`;
  };

  return (
    <div>
      {/* ----- Account Status Example ----- */}
      <h3>Account Status Example</h3>
      <div className="account-section">
        <h2>Account</h2>

        {isAuthenticated ? (
          <div>
            <p>Status: Connected</p>
            <p>Address: {address}</p>
            <p>Network: {getChainName(chainId)}</p>
          </div>
        ) : (
          <p>Not connected</p>
        )}

        <div className="wallet-connection">
          <WalletButton />
        </div>
      </div>
      <br />

      {/* ----- Test Chain Manager Example ----- */}
      <h3>
        vincentApi: see console for more information, look for "Chain Manager"
        when you click the button below, and expand the object to see the
        methods
      </h3>
      <div className="test-section">
        <button onClick={testChainManager}>
          vincentApi.appManagerDashboard.getAppsByManager
        </button>
      </div>

      {/* Render results */}
      <div className="test-section">
        <h3>Results</h3>
        <pre>{JSONStringify(appsByManager, 2)}</pre>
      </div>
    </div>
  );
}

export default DatilChainManager;
