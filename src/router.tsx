import { createAuthManager } from "@lit-protocol/auth";
import { createLitClient } from "@lit-protocol/lit-client";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useOutletContext,
} from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages";
import DiscordAuthTab from "./tabs/DiscordAuthTab";
import GoogleAuthTab from "./tabs/GoogleAuthTab";
import WebAuthnTab from "./tabs/WebAuthnTab";
import EoaAuthTab from "./tabs/EoaAuthTab";
import EoaNativeTab from "./tabs/EoaNativeTab";
import StytchEmailOtpAuthTab from "./tabs/StytchEmailOtpAuthTab";
import StytchSmsOtpAuthTab from "./tabs/StytchSmsOtpAuthTab";
import StytchWhatsAppOtpAuthTab from "./tabs/StytchWhatsAppOtpAuthTab";
import StytchTotpAuthTab from "./tabs/StytchTotpAuthTab";
import CustomAuthTab from "./tabs/CustomAuthTab";
import SetupLitClientTab from "./tabs/SetupLitClientTab";
import SetupAuthManagerTab from "./tabs/SetupAuthManagerTab";
import SetupAuthServicesTab from "./tabs/SetupAuthServicesTab";
import NetworkConfigurationTab from "./tabs/NetworkConfigurationTab";
import StoragePluginsTab from "./tabs/StoragePluginsTab";

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
export const AppLayout = ({ children }: { children?: React.ReactNode }) => {
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
        element: <Navigate to="/setup-lit-client" replace />,
      },
      // Getting Started Routes
      {
        path: "setup-lit-client",
        element: <SetupLitClientTab />,
      },
      {
        path: "setup-auth-manager", 
        element: <SetupAuthManagerTab />,
      },
      {
        path: "setup-auth-services",
        element: <SetupAuthServicesTab />,
      },
      {
        path: "network-configuration",
        element: <NetworkConfigurationTab />,
      },
      {
        path: "storage-plugins",
        element: <StoragePluginsTab />,
      },
      // EOA and Auth Routes
      {
        path: "eoa-native",
        element: <EoaNativeTab />,
      },
      {
        path: "google-auth",
        element: <GoogleAuthTab />,
      },
      {
        path: "discord-auth",
        element: <DiscordAuthTab />,
      },
      {
        path: "webauthn-auth",
        element: <WebAuthnTab />,
      },
      {
        path: "eoa-auth",
        element: <EoaAuthTab />,
      },
      {
        path: "stytch-email-otp-auth",
        element: <StytchEmailOtpAuthTab />,
      },
      {
        path: "stytch-sms-otp-auth",
        element: <StytchSmsOtpAuthTab />,
      },
      {
        path: "stytch-whatsapp-otp-auth",
        element: <StytchWhatsAppOtpAuthTab />,
      },
      {
        path: "stytch-totp-auth",
        element: <StytchTotpAuthTab />,
      },
      {
        path: "custom-auth",
        element: <CustomAuthTab />,
      },
    ],
  },
]);

// Export the context hook
export function useAppContext() {
  return useOutletContext<ContextType>();
}
