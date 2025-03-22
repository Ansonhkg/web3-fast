/**
 * Web3 Fast Application
 * 
 * This is the main application component that serves as an entry point.
 * The actual routing is handled in main.tsx.
 */

import "./App.css";
import { useAuth } from "./context/AuthContext";
import { createDatilChainManager, getChain } from "@lit-protocol/vincent-contracts";
import { getWalletClient } from "@wagmi/core";
import { useConfig } from "wagmi";
import { WalletButton } from "./components/common/WalletButton";
import { APP_INFO, NETWORKS } from "./_config";

// Define the window interface for TypeScript
declare global {
  interface Window {
    ENABLE_VINCENT_LOG: boolean;
  }
}

// Enable logging for development
window.ENABLE_VINCENT_LOG = true;

function App() {
  const config = useConfig();
  const { isAuthenticated, address, chainId } = useAuth();

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
        network: "datil-mainnet", // This connects to Chronicle Yellowstone network
      });
      
      console.log("Chain Manager:", chainManager);
      
      const { appManagerDashboard } = chainManager.vincentApi;
      
      const apps = await appManagerDashboard.getAppsByManager({
        manager: address as `0x${string}`,
      });
      
      console.log("User Apps:", apps);
    } catch (err) {
      console.error("Error testing chain manager:", err);
    }
  };

  // Get chain name based on chainId
  const getChainName = (id: number | undefined) => {
    if (!id) return 'Unknown';
    
    // Look up networks in config
    if (id === NETWORKS.chronicleYellowstone.id) {
      return NETWORKS.chronicleYellowstone.name;
    }
    
    // Fallback to chain ID if not found
    return `Chain #${id}`;
  };

  return (
    <div className="app-container">
      <div className="test-section">
        <button onClick={testChainManager}>Test Chain Manager</button>
      </div>

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
    </div>
  );
}

export default App;
