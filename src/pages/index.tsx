import { createAuthManager, storagePlugins } from "@lit-protocol/auth";
import { createLitClient } from "@lit-protocol/lit-client";
import { nagaDev } from "@lit-protocol/networks";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";

// --- Singleton instances ---
type LitClient = Awaited<ReturnType<typeof createLitClient>>;
type AuthManager = Awaited<ReturnType<typeof createAuthManager>>;

let litClientInstance: LitClient | null = null;
let authManagerInstance: AuthManager | null = null;

const getLitClient = async (): Promise<LitClient> => {
  if (!litClientInstance) {
    console.log("Creating new LitClient instance (should happen only once)");
    litClientInstance = await createLitClient({ network: nagaDev });
  }
  return litClientInstance;
};

const getAuthManager = (): AuthManager => {
  if (!authManagerInstance) {
    console.log("Creating new AuthManager instance (should happen only once)");
    authManagerInstance = createAuthManager({
      storage: storagePlugins.localStorage({
        appName: "my-app",
        networkName: "naga-dev",
      }),
    });
  }
  return authManagerInstance;
};

// DependencyStatus component for displaying dependency status with proper alignment
type Dependency = {
  name: string;
  isLoaded: boolean;
  description?: string; // Optional description for each dependency
};

// Error Display Component
interface ErrorDisplayProps {
  error: string | null;
  isVisible: boolean;
  onClear: () => void;
}

const ErrorDisplay = ({ error, isVisible, onClear }: ErrorDisplayProps) => {
  if (!error || !isVisible) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        maxWidth: "450px",
        minWidth: "300px",
        padding: "20px",
        backgroundColor: "#fff5f5",
        border: "2px solid #feb2b2",
        borderLeft: "5px solid #e53e3e",
        borderRadius: "8px",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
        animation: "slideInFromRight 0.3s ease-out",
      }}
    >
      <style>
        {`
          @keyframes slideInFromRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes pulse {
            0%, 100% { 
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            }
            50% { 
              box-shadow: 0 8px 25px rgba(229, 62, 62, 0.3);
            }
          }
        `}
      </style>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <div
          style={{
            fontSize: "24px",
            color: "#e53e3e",
            lineHeight: "1",
            animation: "pulse 2s ease-in-out infinite",
          }}
        >
          ❌
        </div>
        <div style={{ flex: 1 }}>
          <h4
            style={{
              margin: "0 0 10px 0",
              color: "#c53030",
              fontSize: "16px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Error
          </h4>
          <div
            style={{
              color: "#742a2a",
              fontSize: "14px",
              lineHeight: "1.5",
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              backgroundColor: "#fed7d7",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #feb2b2",
            }}
          >
            {error}
          </div>
        </div>
        <button
          onClick={onClear}
          style={{
            background: "#e53e3e",
            border: "none",
            fontSize: "14px",
            color: "white",
            cursor: "pointer",
            padding: "6px 8px",
            borderRadius: "4px",
            fontWeight: "bold",
            transition: "background-color 0.2s",
          }}
          title="Close error"
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#c53030")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#e53e3e")
          }
        >
          ✕
        </button>
      </div>
    </div>
  );
};

interface DependencyStatusProps {
  dependencies: Dependency[];
  title?: string; // Optional custom title
}

const DependencyStatus = ({
  dependencies,
  title = "Dependencies Status:",
}: DependencyStatusProps) => {
  return (
    <div
      style={{
        padding: "12px",
        marginBottom: "20px",
        backgroundColor: "#f0f9ff",
        borderRadius: "4px",
        fontSize: "14px",
        border: "1px solid #bee3f8",
      }}
    >
      <h3 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>{title}</h3>
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "0 4px",
        }}
      >
        <tbody>
          {dependencies.map((dep, index) => (
            <tr key={index}>
              <td
                style={{
                  textAlign: "left",
                  paddingRight: "10px",
                  fontWeight: "500",
                  minWidth: "120px",
                }}
              >
                {dep.name}:
              </td>
              <td
                style={{
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                {dep.isLoaded ? (
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    ✓ Loaded
                  </span>
                ) : (
                  <span style={{ color: "orange", fontWeight: "bold" }}>
                    ⟳ Loading...
                  </span>
                )}
              </td>
              {dep.description && (
                <td
                  style={{
                    textAlign: "left",
                    paddingLeft: "15px",
                    color: "#666",
                    fontSize: "13px",
                    fontStyle: "italic",
                  }}
                >
                  {dep.description}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Authentication methods configuration
const ACTIONS = [
  // Getting Started - Foundation Setup
  {
    id: "setup-lit-client",
    path: "/setup-lit-client",
    name: "Setup Lit Client",
    description: "Create and configure your Lit Protocol client instance",
    category: "Getting Started",
    type: "primary",
  },
  {
    id: "setup-auth-manager",
    path: "/setup-auth-manager",
    name: "Setup Auth Manager",
    description: "Create and configure authentication manager with storage",
    category: "Getting Started",
    type: "primary",
  },
  {
    id: "setup-auth-services",
    path: "/setup-auth-services",
    name: "Setup Auth Services",
    description: "Configure your own auth infrastructure (servers & worker)",
    category: "Getting Started",
    type: "primary",
  },
  {
    id: "network-configuration",
    path: "/network-configuration",
    name: "Network Configuration",
    description: "Configure Lit Protocol network settings (nagaDev)",
    category: "Getting Started",
    type: "primary",
  },
  {
    id: "storage-plugins",
    path: "/storage-plugins",
    name: "Storage Plugins",
    description: "Configure localStorage and other storage options",
    category: "Getting Started",
    type: "primary",
  },

  // EOA Authentication
  {
    id: "eoa-native",
    path: "/eoa-native",
    name: "EOA Native",
    description: "Direct EOA usage for PKP management",
    category: "EOA Auth",
    type: "primary",
  },
  {
    id: "eoa-auth",
    path: "/eoa-auth",
    name: "EOA",
    description: "Authenticate using your EOA account",
    category: "PKP Auth Methods",
    type: "primary",
  },

  {
    id: "google-auth",
    path: "/google-auth",
    name: "Google",
    description: "Authenticate using your Google account",
    category: "PKP Auth Methods",
    type: "primary",
  },
  {
    id: "discord-auth",
    path: "/discord-auth",
    name: "Discord",
    description: "Authenticate using your Discord account",
    category: "PKP Auth Methods",
    type: "primary",
  },
  {
    id: "webauthn-auth",
    path: "/webauthn-auth",
    name: "WebAuthn",
    description: "Authenticate using your WebAuthn device",
    category: "PKP Auth Methods",
    type: "primary",
  },
  {
    id: "stytch-email-otp-auth",
    path: "/stytch-email-otp-auth",
    name: "Stytch Email OTP",
    description: "Authenticate using Stytch Email OTP verification",
    category: "PKP Auth Methods",
    type: "primary",
  },
  {
    id: "stytch-sms-otp-auth",
    path: "/stytch-sms-otp-auth",
    name: "Stytch SMS OTP",
    description: "Authenticate using Stytch SMS OTP verification",
    category: "PKP Auth Methods",
    type: "primary",
  },
  {
    id: "stytch-whatsapp-otp-auth",
    path: "/stytch-whatsapp-otp-auth",
    name: "Stytch WhatsApp OTP",
    description: "Authenticate using Stytch WhatsApp OTP verification",
    category: "PKP Auth Methods",
    type: "primary",
  },
  {
    id: "stytch-totp-auth",
    path: "/stytch-totp-auth",
    name: "(2FA) Stytch TOTP",
    description: "Authenticate using Stytch TOTP (Authenticator App)",
    category: "PKP Auth Methods",
    type: "secondary",
  },
  {
    id: "custom-auth",
    path: "/custom-auth",
    name: "Custom Auth (Demo IdP)",
    description: "Build your own custom authentication with Lit Actions",
    category: "PKP Custom Auth",
    type: "primary",
  },

  // More authentication methods will be added here
];

export const HomePage = () => {
  // const { data: walletClient } = useWalletClient();
  const location = useLocation();

  const [status, setStatus] = useState<string>("");
  const [signature, setSignature] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pkpInfo, setPkpInfo] = useState<any>(null);
  const [litClient, setLitClient] = useState<LitClient | null>(null);
  const [authManager, setAuthManager] = useState<AuthManager | null>(null);
  const [authContext, setAuthContext] = useState<any>(null);
  const [activeMethod, setActiveMethod] = useState<string>("eoa");
  const [collapsedCategories, setCollapsedCategories] = useState<{
    [key: string]: boolean;
  }>({});
  const [siteAuthConfig, setSiteAuthConfig] = useState<any>({
    domain: window.location.host,
    statement: "🫵 YOU AGREED TO THE TERMS AND CONDITIONS",
    resources: [
      ["pkp-signing", "*"],
      ["lit-action-execution", "*"],
    ],
    capabilityAuthSigs: [],
    expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
  });

  // Error state management
  const [error, setError] = useState<string | null>(null);
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);

  // Function to show error with auto-hide
  const showError = (errorMessage: string, autoHide: boolean = true) => {
    setError(errorMessage);
    setIsErrorVisible(true);

    // Play error sound for better user experience
    try {
      // Create a simple beep sound
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.2
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      console.log("Could not play error sound:", e);
    }

    if (autoHide) {
      // Auto-hide after 5 seconds
      setTimeout(() => {
        setIsErrorVisible(false);
      }, 5000);
    }
  };

  // Function to clear error
  const clearError = () => {
    setError(null);
    setIsErrorVisible(false);
  };

  // Function to toggle category collapse state
  const toggleCategoryCollapse = (categoryKey: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryKey]: !prev[categoryKey],
    }));
  };

  // Effect to initialize LitClient and AuthManager state using singletons
  useEffect(() => {
    const initClients = async () => {
      if (!litClient) {
        // Only set if not already in state
        const client = await getLitClient();
        // Check again in case of rapid re-renders or if state was set by another means
        // This check is against the current closure's `litClient` value.
        // A more robust check for multiple calls to set state might involve a ref for this effect's completion.
        // However, for setting from a singleton, simply calling set once is usually fine.
        setLitClient(client);
      }
      if (!authManager) {
        // Only set if not already in state
        const manager = getAuthManager();
        setAuthManager(manager);
      }
    };
    initClients();
  }, []); // Empty dependency array ensures this runs once on mount

  // Effect to update loading and status messages based on client availability
  useEffect(() => {
    // if (walletClient && litClient && authManager) {
    if (litClient && authManager) {
      setLoading(false);
      setStatus("All dependencies loaded successfully!");
    } else {
      setLoading(true);
      const missingDeps = [];
      // if (!walletClient) missingDeps.push("Wallet Client");
      if (!litClient) missingDeps.push("Lit Client");
      if (!authManager) missingDeps.push("Auth Manager");
      setStatus(
        missingDeps.length > 0
          ? `Waiting for: ${missingDeps.join(", ")}...`
          : "Initializing..."
      );
    }
  }, [litClient, authManager]);

  // Update activeMethod based on the current path
  useEffect(() => {
    const path = location.pathname;
    const actionId =
      ACTIONS.find((action) => action.path === path)?.id || "eoa";
    setActiveMethod(actionId);
  }, [location.pathname]);

  function assertDependenciesLoaded() {
    // if (!walletClient || !authManager || !litClient) {
    if (!authManager || !litClient) {
      throw new Error(
        `Missing dependencies: ${authManager ? "" : "authManager"} ${
          litClient ? "" : "litClient"
        }`
      );
    }

    return {
      // walletClient,
      authManager,
      litClient,
    };
  }

  // Check if all dependencies are loaded
  const areDependenciesLoaded = () => {
    // return !!(walletClient && authManager && litClient);
    return !!(authManager && litClient);
  };

  // Get dependency status for display
  const getDependencyStatus = () => {
    return {
      // walletClient: !!walletClient,
      authManager: !!authManager,
      litClient: !!litClient,
    };
  };

  // Get dependencies for the DependencyStatus component
  const getDependencies = (): Dependency[] => {
    return [
      // {
      //   name: "Wallet Client",
      //   isLoaded: !!walletClient,
      // },
      {
        name: "Lit Client",
        isLoaded: !!litClient,
      },
      {
        name: "Auth Manager",
        isLoaded: !!authManager,
      },
      // Add new dependencies here by adding a new object with name, isLoaded, and optional description
    ];
  };

  // Check if we can mint PKP (requires auth context)
  const canMintPkp = () => {
    return areDependenciesLoaded() && !!authContext;
  };

  const contextValue = {
    getDependencyStatus,
    areDependenciesLoaded,
    authContext,
    activeMethod,
    setAuthContext,
    setActiveMethod,
    setStatus,
    assertDependenciesLoaded,
    siteAuthConfig,
    canMintPkp,
    loading,
    pkpInfo,
    signature,
    setPkpInfo,
    setSignature,
    setLoading,
    error,
    showError,
    clearError,
    isErrorVisible,
  };

  return (
    <MainLayout>
      {/* Fixed Error Toast - positioned outside of sidebar */}
      <ErrorDisplay
        error={error}
        isVisible={isErrorVisible}
        onClear={clearError}
      />

      <div
        className="doc-layout"
        style={{
          display: "flex",
          height: "100vh",
          margin: "0 auto",
        }}
      >
        {/* Sidebar with navigation */}
        <div
          className="sidebar"
          style={{
            width: "280px",
            borderRight: "1px solid #eaeaea",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Documentation</h2>

          <DependencyStatus dependencies={getDependencies()} />

          <div className="nav-tabs">
            {(() => {
              const groupedActions: { [key: string]: typeof ACTIONS } = {};
              ACTIONS.forEach((action) => {
                if (!groupedActions[action.category]) {
                  groupedActions[action.category] = [];
                }
                groupedActions[action.category].push(action);
              });

              return Object.entries(groupedActions).map(
                ([category, actionsInCategory], categoryIndex) => {
                  // Separate primary and secondary actions
                  const primaryActions = actionsInCategory.filter(
                    (action) => action.type === "primary"
                  );
                  const secondaryActions = actionsInCategory.filter(
                    (action) => action.type === "secondary"
                  );

                  const hasSecondaryActions = secondaryActions.length > 0;
                  const categoryKey = category;
                  const secondaryKey = `${category}-secondary`;
                  const isCategoryCollapsed = collapsedCategories[categoryKey];
                  const isSecondaryCollapsed =
                    collapsedCategories[secondaryKey];

                  return (
                    <div key={category}>
                      {categoryIndex > 0 && (
                        <hr
                          style={{ margin: "15px 0", borderColor: "#dddddd" }}
                        />
                      )}

                      {/* Collapsible Category Header */}
                      <button
                        onClick={() => toggleCategoryCollapse(categoryKey)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          padding: "12px 0",
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "1rem",
                          color: "#555",
                          fontWeight: "600",
                          textAlign: "left",
                        }}
                      >
                        <span style={{ marginRight: "8px" }}>
                          {isCategoryCollapsed ? "▶" : "▼"}
                        </span>
                        {category}
                        <span
                          style={{
                            marginLeft: "8px",
                            fontSize: "0.8rem",
                            color: "#888",
                          }}
                        >
                          ({actionsInCategory.length})
                        </span>
                      </button>

                      {/* Category Content */}
                      {!isCategoryCollapsed && (
                        <div style={{ marginLeft: "0px" }}>
                          {/* Primary Actions */}
                          {primaryActions.map((action) => (
                            <Link
                              key={action.id}
                              to={action.path}
                              style={{
                                display: "block",
                                padding: "10px 15px",
                                marginBottom: "4px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                backgroundColor:
                                  activeMethod === action.id
                                    ? "#3b82f6"
                                    : "#ffffff",
                                color:
                                  activeMethod === action.id
                                    ? "#ffffff"
                                    : "#333333",
                                border: `1px solid ${
                                  activeMethod === action.id
                                    ? "#3b82f6"
                                    : "#dddddd"
                                }`,
                                transition: "all 0.2s",
                                width: "100%",
                                textAlign: "left",
                                fontWeight: "500",
                                textDecoration: "none",
                              }}
                            >
                              {action.name}
                            </Link>
                          ))}

                          {/* Secondary Actions - Collapsible Tree */}
                          {hasSecondaryActions && (
                            <>
                              {/* Toggle Button for Secondary Actions */}
                              <button
                                onClick={() =>
                                  toggleCategoryCollapse(secondaryKey)
                                }
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  width: "100%",
                                  padding: "8px 15px",
                                  marginTop: "8px",
                                  marginBottom: "4px",
                                  backgroundColor: "transparent",
                                  border: "1px solid #e0e0e0",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                  fontSize: "0.85rem",
                                  color: "#666",
                                  fontWeight: "600",
                                }}
                              >
                                <span style={{ marginRight: "8px" }}>
                                  {isSecondaryCollapsed ? "▶" : "▼"}
                                </span>
                                Secondary Methods ({secondaryActions.length})
                              </button>

                              {/* Secondary Actions List */}
                              {!isSecondaryCollapsed &&
                                secondaryActions.map((action) => (
                                  <div
                                    key={action.id}
                                    style={{ marginBottom: "4px" }}
                                  >
                                    <Link
                                      to={action.path}
                                      style={{
                                        display: "block",
                                        padding: "8px 15px",
                                        paddingLeft: "35px", // Indent to show hierarchy
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        backgroundColor:
                                          activeMethod === action.id
                                            ? "#3b82f6"
                                            : "#f8f9fa",
                                        color:
                                          activeMethod === action.id
                                            ? "#ffffff"
                                            : "#333333",
                                        border: `1px solid ${
                                          activeMethod === action.id
                                            ? "#3b82f6"
                                            : "#e9ecef"
                                        }`,
                                        borderLeft: `3px solid #fbbf24`, // Visual indicator for dependency
                                        transition: "all 0.2s",
                                        width: "100%",
                                        textAlign: "left",
                                        fontWeight: "500",
                                        textDecoration: "none",
                                        fontSize: "0.9rem",
                                      }}
                                    >
                                      {action.name}
                                    </Link>
                                  </div>
                                ))}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }
              );
            })()}
          </div>
        </div>

        {/* Content area */}
        <div
          className="content"
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <Outlet context={contextValue} />
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
