import "./App.css";
import { createDatilChainManager } from "@lit-protocol/vincent-contracts";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { getWalletClient } from "@wagmi/core";
import { useConfig } from "wagmi";

declare global {
  interface Window {
    ENABLE_VINCENT_LOG: boolean;
  }
}

window.ENABLE_VINCENT_LOG = true;

function App() {
  const config = useConfig();
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  const test = async () => {
    console.log(config);
    const walletClient = await getWalletClient(config);

    console.log(walletClient);
    const chainManager = createDatilChainManager({
      account: walletClient,
      network: "datil-mainnet",
    });

    console.log(chainManager);

    const { appManagerDashboard } = chainManager.vincentApi;

    const res = await appManagerDashboard.getAppsByManager({
      manager: account.address as `0x${string}`,
    });

    // await appManagerDashboard.removeDelegatee({
    //   delegatee: "0x1234567890abcdef1234567890abcdef12345678",
    //   appId: 1n,
    // });

    // const res = await appManagerDashboard.registerApp({
    //   appName: "My New App",
    //   appDescription: "A description of my application",
    //   authorizedRedirectUris: ["https://myapp.com/callback"],
    //   delegatees: ["0x1234567890abcdef1234567890abcdef12345678"],
    //   toolIpfsCids: ["QmUT4Ke8cPtJYRZiWrkoG9RZc77hmRETNQjvDYfLtrMUEY"],
    //   toolPolicies: [["QmcLbQPohPURMuNdhYYa6wyDp9pm6eHPdHv9TRgFkPVebE"]],
    //   toolPolicyParameterNames: [[["param1"]]],
    //   toolPolicyParameterTypes: [[["INT256"]]],
    // });

    // console.log(res);
  };

  return (
    <>
      <div>
        <button onClick={test}>Test</button>

        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  );
}

export default App;
