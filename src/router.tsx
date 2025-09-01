import { createAuthManager } from "@lit-protocol/auth";
import { createLitClient } from "@lit-protocol/lit-client";
import {
  createBrowserRouter,
  Outlet,
  useOutletContext,
} from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages";
import DiscordAuthTab from "./tabs/ProgrammableKeys/PKPs/AuthMethods/AuthMethodProviders/DiscordAuthTab";
import GoogleAuthTab from "./tabs/ProgrammableKeys/PKPs/AuthMethods/AuthMethodProviders/GoogleAuthTab";
import WebAuthnTab from "./tabs/ProgrammableKeys/PKPs/AuthMethods/AuthMethodProviders/WebAuthnTab";
import EoaAuthTab from "./tabs/ProgrammableKeys/PKPs/AuthMethods/AuthMethodProviders/EoaAuthTab";
import StytchEmailOtpAuthTab from "./tabs/ProgrammableKeys/PKPs/AuthMethods/AuthMethodProviders/StytchEmailOtpAuthTab";
import StytchSmsOtpAuthTab from "./tabs/ProgrammableKeys/PKPs/AuthMethods/AuthMethodProviders/StytchSmsOtpAuthTab";
import StytchWhatsAppOtpAuthTab from "./tabs/ProgrammableKeys/PKPs/AuthMethods/AuthMethodProviders/StytchWhatsAppOtpAuthTab";
import CustomAuthTab from "./tabs/ProgrammableKeys/PKPs/AuthMethods/CustomAuthTab";
import LitAuthProviderDemoTab from "./tabs/LearningLit/LitAuthProviderDemoTab";
import EncryptionQuickStart from "./tabs/EncryptionAccessControl/QuickStart";
import SetupAuthServicesTab from "./tabs/BuildingWithLit/SetupAuthServicesTab";
import EoaNativeTab from "./tabs/EoaNativeTab";
import StoragePluginsTab from "./tabs/GettingStarted/StoragePluginsTab";
import StytchTotpAuthTab from "./tabs/ProgrammableKeys/PKPs/AuthMethods/AuthMethodProviders/2fa/StytchTotpAuthTab";
import PaymentManagerQuickStart from "./tabs/PayingForLit/PaymentManager/QuickStart";
import HomePageTab from "./tabs/HomePageTab";
import WhatIsLitTab from "./tabs/LearningLit/WhatIsLitTab";
import HowItWorksTab from "./tabs/LearningLit/HowItWorksTab";
import ProgrammableKeysOverview from "./tabs/ProgrammableKeys/Overview";
import PkpGettingStarted from "./tabs/ProgrammableKeys/PKPs/GettingStarted";
import SecurityOverviewTab from "./tabs/LearningLit/Security/Overview";
import NodeArchitectureTab from "./tabs/LearningLit/Security/NodeArchitecture";
import KeyGenerationTab from "./tabs/LearningLit/Security/KeyGeneration";
import OnChainCoordinationTab from "./tabs/LearningLit/Security/OnChainCoordination";
import CommunicatingWithNodes from "./tabs/LearningLit/Security/CommunicatingWithNodes";
import CryptoeconomicSecurity from "./tabs/LearningLit/Security/CryptoeconomicSecurity";
import BackupAndRecovery from "./tabs/LearningLit/Security/BackupAndRecovery";
import PKPPermissions from "./tabs/ProgrammableKeys/PKPs/ViewPkpInfo/PKPPermissions";
import PKPsByAddress from "./tabs/ProgrammableKeys/PKPs/ViewPkpInfo/PKPsByAddress";
import PKPsByAuth from "./tabs/ProgrammableKeys/PKPs/ViewPkpInfo/PKPsByAuth";
import AddRemoveAuthMethods from "./tabs/ProgrammableKeys/PKPs/AuthMethods/AddRemoveAuthMethods";
import SigningRaw from "./tabs/ProgrammableKeys/PKPs/PKPSigning/SigningRaw";
import PkpSignEth from "./tabs/ProgrammableKeys/PKPs/PKPSigning/SigningEth";
import PkpSignBtc from "./tabs/ProgrammableKeys/PKPs/PKPSigning/SigningBtc";
import ConnectingToDApp from "./tabs/ProgrammableKeys/PKPs/ConnectingToDApp";
import EncryptionAccessControlOverview from "./tabs/EncryptionAccessControl/Overview";
import BooleanLogic from "./tabs/EncryptionAccessControl/AccessControlConditions/BooleanLogic";
import ETHBalance from "./tabs/EncryptionAccessControl/AccessControlConditions/EVM/ETHBalance";
import SupportedEVMChains from "./tabs/EncryptionAccessControl/AccessControlConditions/EVM/SupportedChains";
import ERC20Balance from "./tabs/EncryptionAccessControl/AccessControlConditions/EVM/ERC20Balance";
import ERC721Ownership from "./tabs/EncryptionAccessControl/AccessControlConditions/EVM/ERC721Ownership";
import WalletOwnership from "./tabs/EncryptionAccessControl/AccessControlConditions/EVM/WalletOwnership";
import TimeBased from "./tabs/EncryptionAccessControl/AccessControlConditions/EVM/TimeBased";
import DAOMembership from "./tabs/EncryptionAccessControl/AccessControlConditions/EVM/DAOMembership";
import POAPOwnership from "./tabs/EncryptionAccessControl/AccessControlConditions/EVM/POAPOwnership";
import CustomContractCalls from "./tabs/EncryptionAccessControl/AccessControlConditions/EVM/CustomContractCalls";
import SOLBalance from "./tabs/EncryptionAccessControl/AccessControlConditions/SOL/SOLBalance";
import NFTOwnership from "./tabs/EncryptionAccessControl/AccessControlConditions/SOL/NFTOwnership";
import ComparisonOperators from "./tabs/EncryptionAccessControl/AccessControlConditions/ComparisonOperators";
import SOLWalletOwnership from "./tabs/EncryptionAccessControl/AccessControlConditions/SOL/WalletOwnership";
import CosmosWalletOwnership from "./tabs/EncryptionAccessControl/AccessControlConditions/Cosmos/WalletOwnership";
import CosmosBalance from "./tabs/EncryptionAccessControl/AccessControlConditions/Cosmos/CosmosBalance";
import LitAction from "./tabs/EncryptionAccessControl/AccessControlConditions/LitAction";
import LitActionsOverview from "./tabs/LitActions/Overview";
import LitActionsDeploying from "./tabs/LitActions/Deploying";
import LitActionsFetch from "./tabs/LitActions/Fetch";
import LitActionsRunOnce from "./tabs/LitActions/RunOnce";
import LitActionsGetRpcUrl from "./tabs/LitActions/GetRpcUrl";
import LitActionsBroadcastAndCollect from "./tabs/LitActions/BroadcastAndCollect";
import LitActionsConditionalExecution from "./tabs/LitActions/ConditionalExecution";
import LitActionsPKPSigning from "./tabs/LitActions/PKPSigning";
import LitActionsPKPSigningEIP191 from "./tabs/LitActions/PKPSigningEIP191";
import LitActionsDecrypting from "./tabs/LitActions/Decrypting";
import LitActionsQuickStart from "./tabs/LitActions/QuickStart";
import PayingForLitOverview from "./tabs/PayingForLit/Overview";
import PaymentManagerDepositing from "./tabs/PayingForLit/PaymentManager/Depositing";
import SetupPaymentManager from "./tabs/PayingForLit/PaymentManager/SetupPaymentManager";
import PaymentManagerDelegating from "./tabs/PayingForLit/PaymentManager/Delegating";
import PaymentManagerWithdraw from "./tabs/PayingForLit/PaymentManager/Withdraw";
import MakingYourFirstRequestOverview from "./tabs/BuildingWithLit/MakingYourFirstRequest/Overview";
import SetupLitClient from "./tabs/BuildingWithLit/MakingYourFirstRequest/Prerequisites/SetupLitClient";
import SetupAuthManager from "./tabs/BuildingWithLit/MakingYourFirstRequest/Prerequisites/SetupAuthManager";
import CreatingAuthContext from "./tabs/BuildingWithLit/MakingYourFirstRequest/Prerequisites/CreatingAuthContext";
import EncryptionAndAccessControl from "./tabs/BuildingWithLit/MakingYourFirstRequest/EncryptionAndAccessControl";
import PKPSigning from "./tabs/BuildingWithLit/MakingYourFirstRequest/PKPSigning";
import LitActionExecution from "./tabs/BuildingWithLit/MakingYourFirstRequest/LitActionExecution";
import ChronicleYellowstone from "./tabs/ChronicleYellowstone";
import LitNetworks from "./tabs/LearningLit/LitNetworks";
import LitExplorer from "./tabs/LitExplorer";
import { NotFoundHandler } from "./components/NotFoundHandler";

// Create a type for the context
type ContextType = {
  getDependencyStatus: () => {
    litClient: boolean;
    authManager: boolean;
    // walletClient?: boolean;
  };
  areDependenciesLoaded: () => boolean;
  authContext: any;
  activeMethod: string;
  setAuthContext: (authContext: any) => void;
  setActiveMethod: (method: string) => void;
  setStatus: (status: string) => void;
  assertDependenciesLoaded: () => {
    authManager: Awaited<ReturnType<typeof createAuthManager>>;
    litClient: Awaited<ReturnType<typeof createLitClient>>;
    // walletClient?: any;
  };
  siteAuthConfig: any;
  canMintPkp?: () => boolean;
  loading?: boolean;
  pkpInfo?: any;
  signature?: any;
  setPkpInfo?: (pkpInfo: any) => void;
  setSignature?: (signature: any) => void;
  setLoading?: (loading: boolean) => void;
  error?: string | null;
  showError?: (errorMessage: string, autoHide?: boolean) => void;
  clearError?: () => void;
  isErrorVisible?: boolean;
};

// Create a layout component that provides context to the routes
export const AppLayout = () => {
  return (
    <MainLayout>
      <div
        className="doc-layout"
        style={{
          display: "flex",
          height: "100vh",
          margin: "0 auto",
        }}
      >
        {/* Sidebar will be rendered in the index page */}
        <Outlet />
      </div>
    </MainLayout>
  );
};

// Define the routes - HomePage will handle the layout and context
export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        index: true,
        element: <HomePageTab />,
      },
      {
        path: "lit-explorer",
        element: <LitExplorer />,
      },

      // Learning Lit
      {
        path: "learning-lit/what-is-lit",
        element: <WhatIsLitTab />,
      },
      {
        path: "learning-lit/how-it-works",
        element: <HowItWorksTab />,
      },
      {
        path: "learning-lit/chronicle-yellowstone",
        element: <ChronicleYellowstone />,
      },
      {
        path: "learning-lit/lit-networks",
        element: <LitNetworks />,
      },
      {
        path: "learning-lit/security",
        element: <SecurityOverviewTab />,
      },
      {
        path: "learning-lit/security/node-architecture",
        element: <NodeArchitectureTab />,
      },
      {
        path: "learning-lit/security/key-generation",
        element: <KeyGenerationTab />,
      },
      {
        path: "learning-lit/security/on-chain-coordination",
        element: <OnChainCoordinationTab />,
      },
      {
        path: "learning-lit/security/communicating-with-nodes",
        element: <CommunicatingWithNodes />,
      },
      {
        path: "learning-lit/security/cryptoeconomic-security",
        element: <CryptoeconomicSecurity />,
      },
      {
        path: "learning-lit/security/backup-and-recovery",
        element: <BackupAndRecovery />,
      },
      {
        path: "learning-lit/demo",
        element: <LitAuthProviderDemoTab />,
      },

      // Building With Lit
      {
        path: "building-with-lit/first-request/overview",
        element: <MakingYourFirstRequestOverview />,
      },
      {
        path: "building-with-lit/first-request/prerequisites/setup-lit-client",
        element: <SetupLitClient />,
      },
      {
        path: "building-with-lit/first-request/prerequisites/setup-auth-manager",
        element: <SetupAuthManager />,
      },
      {
        path: "building-with-lit/first-request/prerequisites/creating-auth-context",
        element: <CreatingAuthContext />,
      },
      {
        path: "building-with-lit/first-request/encryption-and-access-control",
        element: <EncryptionAndAccessControl />,
      },
      {
        path: "building-with-lit/first-request/pkp-signing",
        element: <PKPSigning />,
      },
      {
        path: "building-with-lit/first-request/lit-action-execution",
        element: <LitActionExecution />,
      },
      {
        path: "building-with-lit/setup-auth-services",
        element: <SetupAuthServicesTab />,
      },
      {
        path: "building-with-lit/storage-plugins",
        element: <StoragePluginsTab />,
      },

      // Paying for Lit
      {
        path: "paying-for-lit/overview",
        element: <PayingForLitOverview />,
      },
      {
        path: "paying-for-lit/payment-manager/quickstart",
        element: <PaymentManagerQuickStart />,
      },
      {
        path: "paying-for-lit/payment-manager/setup-payment-manager",
        element: <SetupPaymentManager />,
      },
      {
        path: "paying-for-lit/payment-manager/depositing",
        element: <PaymentManagerDepositing />,
      },
      {
        path: "paying-for-lit/payment-manager/delegating",
        element: <PaymentManagerDelegating />,
      },
      {
        path: "paying-for-lit/payment-manager/withdrawing",
        element: <PaymentManagerWithdraw />,
      },

      // Programmable Keys
      {
        path: "programmable-keys/overview",
        element: <ProgrammableKeysOverview />,
      },
      {
        path: "programmable-keys/pkps/getting-started",
        element: <PkpGettingStarted />,
      },
      // PKP Auth Methods
      {
        path: "programmable-keys/pkps/auth-methods/eoa-native",
        element: <EoaNativeTab />,
      },
      {
        path: "programmable-keys/pkps/auth-methods/google",
        element: <GoogleAuthTab />,
      },
      {
        path: "programmable-keys/pkps/auth-methods/discord",
        element: <DiscordAuthTab />,
      },
      {
        path: "programmable-keys/pkps/auth-methods/webauthn",
        element: <WebAuthnTab />,
      },
      {
        path: "programmable-keys/pkps/auth-methods/eoa",
        element: <EoaAuthTab />,
      },
      {
        path: "programmable-keys/pkps/auth-methods/stytch-email-otp",
        element: <StytchEmailOtpAuthTab />,
      },
      {
        path: "programmable-keys/pkps/auth-methods/stytch-sms-otp",
        element: <StytchSmsOtpAuthTab />,
      },
      {
        path: "programmable-keys/pkps/auth-methods/stytch-whatsapp-otp",
        element: <StytchWhatsAppOtpAuthTab />,
      },
      {
        path: "programmable-keys/pkps/auth-methods/stytch-totp",
        element: <StytchTotpAuthTab />,
      },
      {
        path: "programmable-keys/pkps/auth-methods/custom-auth",
        element: <CustomAuthTab />,
      },
      // PKP View Methods
      {
        path: "programmable-keys/pkps/view/pkp-permissions",
        element: <PKPPermissions />,
      },
      {
        path: "programmable-keys/pkps/view/pkps-by-address",
        element: <PKPsByAddress />,
      },
      {
        path: "programmable-keys/pkps/view/pkps-by-auth",
        element: <PKPsByAuth />,
      },
      // Add/Remove Auth Methods
      {
        path: "programmable-keys/pkps/auth-methods/add-remove",
        element: <AddRemoveAuthMethods />,
      },
      // PKP Signing
      {
        path: "programmable-keys/pkps/signing/raw",
        element: <SigningRaw />,
      },
      {
        path: "programmable-keys/pkps/signing/eth",
        element: <PkpSignEth />,
      },
      {
        path: "programmable-keys/pkps/signing/btc",
        element: <PkpSignBtc />,
      },
      // Connecting PKPs to dApps
      {
        path: "programmable-keys/pkps/connecting-to-dapps",
        element: <ConnectingToDApp />,
      },

      // Encryption and Access Control
      {
        path: "encryption/overview",
        element: <EncryptionAccessControlOverview />,
      },
      {
        path: "encryption/quickstart",
        element: <EncryptionQuickStart />,
      },
      {
        path: "encryption/access-control/boolean-logic",
        element: <BooleanLogic />,
      },
      {
        path: "encryption/access-control/comparison-operators",
        element: <ComparisonOperators />,
      },
      {
        path: "encryption/access-control/lit-action",
        element: <LitAction />,
      },
      // Access Control Conditions: EVM
      {
        path: "encryption/access-control/evm/supported-chains",
        element: <SupportedEVMChains />,
      },
      {
        path: "encryption/access-control/evm/eth-balance",
        element: <ETHBalance />,
      },
      {
        path: "encryption/access-control/evm/erc20-balance",
        element: <ERC20Balance />,
      },
      {
        path: "encryption/access-control/evm/erc721-ownership",
        element: <ERC721Ownership />,
      },
      {
        path: "encryption/access-control/evm/wallet-ownership",
        element: <WalletOwnership />,
      },
      {
        path: "encryption/access-control/evm/time-based",
        element: <TimeBased />,
      },
      {
        path: "encryption/access-control/evm/dao-membership",
        element: <DAOMembership />,
      },
      {
        path: "encryption/access-control/evm/poap-ownership",
        element: <POAPOwnership />,
      },
      {
        path: "encryption/access-control/evm/custom-contract-calls",
        element: <CustomContractCalls />,
      },
      // Access Control Conditions: SOL
      {
        path: "encryption/access-control/sol/sol-balance",
        element: <SOLBalance />,
      },
      {
        path: "encryption/access-control/sol/nft-ownership",
        element: <NFTOwnership />,
      },
      {
        path: "encryption/access-control/sol/wallet-ownership",
        element: <SOLWalletOwnership />,
      },
      // Access Control Conditions: Cosmos
      {
        path: "encryption/access-control/cosmos/wallet-ownership",
        element: <CosmosWalletOwnership />,
      },
      {
        path: "encryption/access-control/cosmos/cosmos-balance",
        element: <CosmosBalance />,
      },
      // Lit Actions
      {
        path: "lit-actions/overview",
        element: <LitActionsOverview />,
      },
      {
        path: "lit-actions/quick-start",
        element: <LitActionsQuickStart />,
      },
      {
        path: "lit-actions/deploying",
        element: <LitActionsDeploying />,
      },
      {
        path: "lit-actions/fetch",
        element: <LitActionsFetch />,
      },
      {
        path: "lit-actions/run-once",
        element: <LitActionsRunOnce />,
      },
      {
        path: "lit-actions/get-rpc-url",
        element: <LitActionsGetRpcUrl />,
      },
      {
        path: "lit-actions/broadcast-and-collect",
        element: <LitActionsBroadcastAndCollect />,
      },
      {
        path: "lit-actions/conditional-execution",
        element: <LitActionsConditionalExecution />,
      },
      {
        path: "lit-actions/pkp-signing",
        element: <LitActionsPKPSigning />,
      },
      {
        path: "lit-actions/pkp-signing-eip191",
        element: <LitActionsPKPSigningEIP191 />,
      },
      {
        path: "lit-actions/decrypting",
        element: <LitActionsDecrypting />,
      },
      // Catch-all route for unknown paths
      {
        path: "*",
        element: <NotFoundHandler />,
      },
    ],
  },
]);

// Export the context hook
export function useAppContext() {
  return useOutletContext<ContextType>();
}
