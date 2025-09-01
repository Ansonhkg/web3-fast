import { createAuthManager, storagePlugins } from "@lit-protocol/auth";
import { createLitClient } from "@lit-protocol/lit-client";
import { nagaDev, nagaTest } from "@lit-protocol/networks";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";

export const DEFAULT_APP_NAME = "lit-auth-app";
export const DEFAULT_NETWORK_NAME = import.meta.env.VITE_LIT_NETWORK || "naga-dev";
export const DEFAULT_NETWORK = (import.meta.env.VITE_LIT_NETWORK || "naga-dev") === "naga-test" ? nagaTest : nagaDev;

// --- Singleton instances ---
type LitClient = Awaited<ReturnType<typeof createLitClient>>;
type AuthManager = Awaited<ReturnType<typeof createAuthManager>>;

let litClientInstance: LitClient | null = null;
let authManagerInstance: AuthManager | null = null;

const getLitClient = async (): Promise<LitClient> => {
  if (!litClientInstance) {
    console.log("Creating new LitClient instance (should happen only once)");
    litClientInstance = await createLitClient({ network: DEFAULT_NETWORK });
  }
  return litClientInstance;
};

const getAuthManager = (): AuthManager => {
  if (!authManagerInstance) {
    console.log("Creating new AuthManager instance (should happen only once)");
    authManagerInstance = createAuthManager({
      storage: storagePlugins.localStorage({
        appName: DEFAULT_APP_NAME,
        networkName: DEFAULT_NETWORK_NAME,
      }),
    });
  }
  return authManagerInstance;
};

// Type definitions for navigation items
interface NavigationItem {
  id: string;
  path?: string;
  name: string;
  description?: string;
  category?: string; // Optional for child items
  type?: "primary" | "secondary"; // Optional for child items
  secondarySection?: string;
  children?: NavigationItem[];
}

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

// Recursive Navigation Item Component
interface NavigationItemProps {
  item: NavigationItem;
  level: number;
  activeMethod: string;
  expandedCategories: { [key: string]: boolean };
  toggleCategoryCollapse: (categoryKey: string) => void;
  location: { pathname: string };
}

const NavigationItem = ({
  item,
  level,
  activeMethod,
  expandedCategories,
  toggleCategoryCollapse,
  location,
}: NavigationItemProps) => {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedCategories[item.id];
  const isActive = activeMethod === item.id;
  const isPathActive = item.path && location.pathname === item.path;

  const indentLevel = level * 15;
  const fontSize = Math.max(0.9 - level * 0.05, 0.75); // Decrease font size for deeper levels

  if (hasChildren) {
    return (
      <div style={{ marginBottom: "4px" }}>
        <div style={{ position: "relative" }}>
          <button
            type="button"
            style={{
              display: "block",
              width: "100%",
              padding: "10px 15px",
              paddingLeft: `${10 + indentLevel}px`,
              borderRadius: "4px",
              cursor: "pointer",
              backgroundColor: isActive ? "#3b82f6" : "#ffffff",
              color: isActive ? "#ffffff" : "#333333",
              border: `1px solid ${isActive ? "#3b82f6" : "#dddddd"}`,
              transition: "all 0.2s",
              textAlign: "left",
              fontWeight: "500",
              textDecoration: "none",
              position: "relative",
              fontSize: `${fontSize}rem`,
              marginBottom: "2px",
            }}
            onClick={(e) => {
              e.stopPropagation();
              toggleCategoryCollapse(item.id);
            }}
          >
            <span style={{ marginRight: 8 }}>{isExpanded ? "▼" : "▶"}</span>
            {item.name}
          </button>

          {/* Recursive children */}
          {isExpanded && (
            <div style={{ marginLeft: 0 }}>
              {item.children!.map((child) => (
                <NavigationItem
                  key={child.id}
                  item={child}
                  level={level + 1}
                  activeMethod={activeMethod}
                  expandedCategories={expandedCategories}
                  toggleCategoryCollapse={toggleCategoryCollapse}
                  location={location}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <Link
        to={item.path || ""}
        style={{
          display: "block",
          padding: "10px 15px",
          paddingLeft: `${10 + indentLevel}px`,
          borderRadius: "4px",
          cursor: "pointer",
          backgroundColor: isPathActive ? "#3b82f6" : "#ffffff",
          color: isPathActive ? "#ffffff" : "#333333",
          border: `1px solid ${isPathActive ? "#3b82f6" : "#e9ecef"}`,
          transition: "all 0.2s",
          width: "100%",
          textAlign: "left",
          fontWeight: "500",
          textDecoration: "none",
          fontSize: `${fontSize}rem`,
          marginBottom: 2,
        }}
      >
        {item.name}
      </Link>
    );
  }
};

// Authentication methods configuration
const ACTIONS: NavigationItem[] = [
  {
    id: "home",
    path: "/",
    name: "Home",
    description: "Welcome to Lit Protocol Interactive Documentation",
    category: "Home",
    type: "primary",
  },
  {
    id: "lit-explorer",
    path: "/lit-explorer",
    name: "Lit Explorer",
    description: "Lit Explorer",
    category: "Home",
    type: "primary",
  },

  // Learning Lit
  {
    id: "what-is-lit",
    path: "/learning-lit/what-is-lit",
    name: "What is Lit Protocol",
    description: "An overview of Lit Protocol.",
    category: "Learning Lit",
    type: "primary",
  },
  {
    id: "how-it-works",
    path: "/learning-lit/how-it-works",
    name: "How It Works",
    description: "An overview of how Lit Protocol works.",
    category: "Learning Lit",
    type: "primary",
  },
  {
    id: "chronicle-yellowstone",
    path: "/learning-lit/chronicle-yellowstone",
    name: "Chronicle Yellowstone",
    description: "Chronicle Yellowstone",
    category: "Learning Lit",
    type: "primary",
  },
  {
    id: "lit-networks",
    path: "/learning-lit/lit-networks",
    name: "Lit Networks",
    description: "Lit Networks",
    category: "Learning Lit",
    type: "primary",
  },
  {
    id: "security",
    name: "Security",
    description: "An overview of Lit Protocol security.",
    category: "Learning Lit",
    type: "primary",
    children: [
      {
        id: "security-overview",
        path: "/learning-lit/security",
        name: "Overview",
      },
      {
        id: "security-node-architecture",
        path: "/learning-lit/security/node-architecture",
        name: "Node Architecture",
      },
      {
        id: "security-key-generation",
        path: "/learning-lit/security/key-generation",
        name: "Key Generation",
      },
      {
        id: "security-on-chain-coordination",
        path: "/learning-lit/security/on-chain-coordination",
        name: "On-Chain Coordination",
      },
      {
        id: "security-communicating-with-nodes",
        path: "/learning-lit/security/communicating-with-nodes",
        name: "Communicating with Nodes",
      },
      {
        id: "security-cryptoeconomic-security",
        path: "/learning-lit/security/cryptoeconomic-security",
        name: "Cryptoeconomic Security",
      },
      {
        id: "security-backup-and-recovery",
        path: "/learning-lit/security/backup-and-recovery",
        name: "Backup and Recovery",
      },
    ],
  },
  {
    id: "demo",
    path: "/learning-lit/demo",
    name: "Demo",
    description:
      "Interactive demo showcasing Lit Protocol authentication and encryption features",
    category: "Learning Lit",
    type: "primary",
  },

  // Building With Lit
  {
    id: "building-with-lit-first-request",
    path: "/building-with-lit/first-request",
    name: "Making Your First Request",
    description: "Making your first request with Lit Protocol",
    category: "Building With Lit",
    type: "primary",
    children: [
      {
        id: "building-with-lit-first-request-overview",
        path: "/building-with-lit/first-request/overview",
        name: "Overview",
        description: "Overview of making your first request with Lit Protocol",
        category: "Building With Lit",
        type: "primary",
      },
      {
        id: "building-with-lit-first-request-prerequisites",
        path: "/building-with-lit/first-request/prerequisites",
        name: "Prerequisites",
        description:
          "Prerequisites for making your first request with Lit Protocol",
        category: "Building With Lit",
        type: "primary",
        children: [
          {
            id: "building-with-lit-first-request-prerequisites-setup-lit-client",
            path: "/building-with-lit/first-request/prerequisites/setup-lit-client",
            name: "1. Setup Lit Client",
            description: "Setup the Lit Client",
            category: "Building With Lit",
            type: "secondary",
          },
          {
            id: "building-with-lit-first-request-prerequisites-setup-auth-manager",
            path: "/building-with-lit/first-request/prerequisites/setup-auth-manager",
            name: "2. Setup Auth Manager",
            description: "Setup the Auth Manager",
            category: "Building With Lit",
            type: "secondary",
          },
          {
            id: "building-with-lit-first-request-prerequisites-creating-auth-context",
            path: "/building-with-lit/first-request/prerequisites/creating-auth-context",
            name: "3. Creating Auth Context",
            description: "Creating an Auth Context",
            category: "Building With Lit",
            type: "secondary",
          },
        ],
      },
      {
        id: "building-with-lit-first-request-encryption-and-access-control",
        path: "/building-with-lit/first-request/encryption-and-access-control",
        name: "Encryption and Access Control",
        description: "Encryption and Access Control",
        category: "Building With Lit",
        type: "secondary",
      },
      {
        id: "building-with-lit-first-request-pkp-signing",
        path: "/building-with-lit/first-request/pkp-signing",
        name: "PKP Signing",
        description: "PKP Signing",
        category: "Building With Lit",
        type: "secondary",
      },
      {
        id: "building-with-lit-first-request-lit-action-execution",
        path: "/building-with-lit/first-request/lit-action-execution",
        name: "Lit Action Execution",
        description: "Lit Action Execution",
        category: "Building With Lit",
        type: "secondary",
      },
    ],
  },
  // TODO Improve
  // {
  //   id: "storage-plugins",
  //   path: "/building-with-lit/storage-plugins",
  //   name: "Storage Plugins",
  //   description: "Configure localStorage and other storage options",
  //   category: "Building With Lit",
  //   type: "primary",
  // },
  {
    id: "setup-auth-services",
    path: "/building-with-lit/setup-auth-services",
    name: "Setup Auth Services",
    description: "Configure your own auth infrastructure (servers & worker)",
    category: "Building With Lit",
    type: "primary",
  },

  // Paying for Lit
  {
    id: "paying-for-lit-overview",
    path: "/paying-for-lit/overview",
    name: "Overview",
    description: "Overview of paying for Lit",
    category: "Paying for Lit",
    type: "primary",
  },
  {
    id: "paying-for-lit-payment-manager-quickstart",
    path: "/paying-for-lit/payment-manager/quickstart",
    name: "Quickstart",
    description: "Quickstart guide to using the Payment Manager",
    category: "Paying for Lit",
    type: "primary",
  },
  {
    id: "paying-for-lit-payment-manager-setup-payment-manager",
    path: "/paying-for-lit/payment-manager/setup-payment-manager",
    name: "Setup Payment Manager",
    description: "Setup the Payment Manager",
    category: "Paying for Lit",
    type: "primary",
  },
  {
    id: "paying-for-lit-payment-manager-depositing",
    path: "/paying-for-lit/payment-manager/depositing",
    name: "Depositing",
    description: "Depositing $LITKEY tokens to the Ledger Contract",
    category: "Paying for Lit",
    type: "primary",
  },
  {
    id: "paying-for-lit-payment-manager-delegating",
    path: "/paying-for-lit/payment-manager/delegating",
    name: "Delegating",
    description: "Delegating $LITKEY tokens to the Ledger Contract",
    category: "Paying for Lit",
    type: "primary",
  },
  {
    id: "paying-for-lit-payment-manager-withdrawing",
    path: "/paying-for-lit/payment-manager/withdrawing",
    name: "Withdrawing",
    description: "Withdrawing $LITKEY tokens from the Ledger Contract",
    category: "Paying for Lit",
    type: "primary",
  },

  // {
  //   id: "network-configuration",
  //   path: "/network-configuration",
  //   name: "Network Configuration",
  //   description: "Configure Lit Protocol network settings (nagaDev)",
  //   category: "Getting Started",
  //   type: "primary",
  // },
  // {
  //   id: "storage-plugins",
  //   path: "/storage-plugins",
  //   name: "Storage Plugins",
  //   description: "Configure localStorage and other storage options",
  //   category: "Getting Started",
  //   type: "primary",
  // },

  // Primary: Programmable Keys
  {
    id: "programmable-keys-overview",
    path: "/programmable-keys/overview",
    name: "Overview",
    description: "Overview of Programmable Keys",
    category: "Programmable Keys",
    type: "primary",
  },
  // Secondary: PKPs
  {
    id: "pkps",
    name: "PKPs",
    description: "Guide to minting and using PKPs",
    category: "Programmable Keys",
    type: "primary",
    children: [
      {
        id: "pkps-getting-started",
        path: "/programmable-keys/pkps/getting-started",
        name: "Getting Started",
      },
      {
        id: "pkps-auth-methods",
        path: "/programmable-keys/pkps/auth-methods",
        name: "Auth Methods",
        children: [
          {
            id: "pkps-auth-method-providers",
            path: "/programmable-keys/pkps/auth-method-providers",
            name: "Auth Method Providers",
            children: [
              {
                id: "pkps-auth-methods-eoa-native",
                path: "/programmable-keys/pkps/auth-methods/eoa-native",
                name: "Ethereum Wallet (Native)",
                description: "Direct EOA usage for PKP management",
              },
              {
                id: "pkps-auth-methods-eoa",
                path: "/programmable-keys/pkps/auth-methods/eoa",
                name: "Ethereum Wallet (SIWE)",
                description:
                  "Authenticate using your Ethereum wallet and a SIWE message",
              },
              {
                id: "pkps-auth-methods-google",
                path: "/programmable-keys/pkps/auth-methods/google",
                name: "Google oAuth",
                description: "Authenticate using your Google account",
              },
              {
                id: "pkps-auth-methods-discord",
                path: "/programmable-keys/pkps/auth-methods/discord",
                name: "Discord oAuth",
                description: "Authenticate using your Discord account",
              },
              {
                id: "pkps-auth-methods-webauthn",
                path: "/programmable-keys/pkps/auth-methods/webauthn",
                name: "WebAuthn",
                description: "Authenticate using your WebAuthn device",
              },
              {
                id: "pkps-auth-methods-stytch-email-otp",
                path: "/programmable-keys/pkps/auth-methods/stytch-email-otp",
                name: "Stytch Email OTP",
                description: "Authenticate using Stytch Email OTP verification",
              },
              {
                id: "pkps-auth-methods-stytch-sms-otp",
                path: "/programmable-keys/pkps/auth-methods/stytch-sms-otp",
                name: "Stytch SMS OTP",
                description: "Authenticate using Stytch SMS OTP verification",
              },
              {
                id: "pkps-auth-methods-stytch-whatsapp-otp",
                path: "/programmable-keys/pkps/auth-methods/stytch-whatsapp-otp",
                name: "Stytch WhatsApp OTP",
                description:
                  "Authenticate using Stytch WhatsApp OTP verification",
              },
              {
                id: "pkps-auth-methods-stytch-totp",
                path: "/programmable-keys/pkps/auth-methods/stytch-totp",
                name: "Stytch 2FA TOTP",
                description:
                  "Authenticate using Stytch TOTP (Authenticator App)",
              },
            ],
          },
          {
            id: "pkps-auth-methods-custom-auth",
            path: "/programmable-keys/pkps/auth-methods/custom-auth",
            name: "Custom Auth Method",
            description:
              "Build your own custom authentication with Lit Actions",
          },
          {
            id: "pkps-auth-methods-add-remove",
            path: "/programmable-keys/pkps/auth-methods/add-remove",
            name: "Add & Remove Auth Methods",
            description: "Add or remove auth methods from a PKP",
          },
        ],
      },
      {
        id: "pkps-view-methods",
        path: "/programmable-keys/pkps/view-methods",
        name: "View PKP Info",
        children: [
          {
            id: "pkps-view-methods-pkp-permissions",
            path: "/programmable-keys/pkps/view/pkp-permissions",
            name: "PKP Permissions",
            description: "View PKP permissions",
          },
          {
            id: "pkps-view-methods-pkps-by-address",
            path: "/programmable-keys/pkps/view/pkps-by-address",
            name: "PKPs by Address",
            description: "View PKPs by address",
          },
          {
            id: "pkps-view-methods-pkps-by-auth",
            path: "/programmable-keys/pkps/view/pkps-by-auth",
            name: "PKPs by Auth",
            description: "View PKPs by auth",
          },
        ],
      },
      {
        id: "pkps-signing",
        path: "/programmable-keys/pkps/signing",
        name: "PKP Signing",
        children: [
          {
            id: "pkps-signing-raw",
            path: "/programmable-keys/pkps/signing/raw",
            name: "Raw Signing",
            description: "Sign data using your PKP",
          },
          {
            id: "pkps-signing-eth",
            path: "/programmable-keys/pkps/signing/eth",
            name: "Ethereum Signing",
            description: "Sign data using your PKP",
          },
          {
            id: "pkps-btc-signing",
            path: "/programmable-keys/pkps/signing/btc",
            name: "Bitcoin Signing",
            description: "Sign data using your PKP",
          },
        ],
      },
      {
        id: "pkps-connecting-to-dapps",
        path: "/programmable-keys/pkps/connecting-to-dapps",
        name: "Connecting to dApps",
        description: "Connect your PKP to a dApp",
      },
    ],
  },

  // Encryption & Access Control
  {
    id: "encryption-overview",
    path: "/encryption/overview",
    name: "Overview",
    description: "Encrypt and decrypt data using access control conditions",
    category: "Encryption & Access Control",
    type: "primary",
  },
  {
    id: "encryption-quickstart",
    path: "/encryption/quickstart",
    name: "Quickstart",
    description: "Quickstart guide to encrypting and decrypting data",
    category: "Encryption & Access Control",
    type: "primary",
  },
  {
    id: "encryption-access-control-conditions",
    path: "/encryption/accs",
    name: "Access Control Conditions",
    description: "Access Control Conditions for encrypting data",
    category: "Encryption & Access Control",
    type: "primary",
    children: [
      {
        id: "encryption-access-control-conditions-boolean-logic",
        path: "/encryption/access-control/boolean-logic",
        name: "Boolean Logic",
      },
      {
        id: "encryption-access-control-conditions-comparison-operators",
        path: "/encryption/access-control/comparison-operators",
        name: "Comparison Operators",
      },
      {
        id: "encryption-access-control-conditions-lit-action",
        path: "/encryption/access-control/lit-action",
        name: "Lit Action",
      },
      {
        id: "encryption-access-control-conditions-evm",
        path: "/encryption/access-control/evm",
        name: "EVM Based Conditions",
        description: "Access Control Conditions for EVM",
        category: "Encryption & Access Control",
        type: "secondary",
        children: [
          {
            id: "encryption-access-control-conditions-evm-supported-chains",
            path: "/encryption/access-control/evm/supported-chains",
            name: "Supported EVM Chains",
            description: "Access Control Conditions for Supported EVM Chains",
            category: "Encryption & Access Control",
            type: "secondary",
          },
          {
            id: "encryption-access-control-conditions-evm-custom-contract-calls",
            path: "/encryption/access-control/evm/custom-contract-calls",
            name: "Custom Contract Calls",
            description: "Access Control Conditions for Custom Contract Calls",
          },
          {
            id: "encryption-access-control-conditions-evm-wallet-ownership",
            path: "/encryption/access-control/evm/wallet-ownership",
            name: "Wallet Ownership",
            description: "Access Control Conditions for Wallet Ownership",
            category: "Encryption & Access Control",
            type: "secondary",
          },
          {
            id: "encryption-access-control-conditions-evm-eth-balance",
            path: "/encryption/access-control/evm/eth-balance",
            name: "ETH Balance",
            description: "Access Control Conditions for ETH Balance",
            category: "Encryption & Access Control",
            type: "secondary",
          },
          {
            id: "encryption-access-control-conditions-evm-erc20-balance",
            path: "/encryption/access-control/evm/erc20-balance",
            name: "ERC-20 Balance",
            description: "Access Control Conditions for ERC20 Balance",
            category: "Encryption & Access Control",
            type: "secondary",
          },
          {
            id: "encryption-access-control-conditions-evm-erc721-ownership",
            path: "/encryption/access-control/evm/erc721-ownership",
            name: "ERC-721 NFT Ownership",
            description: "Access Control Conditions for ERC721 Ownership",
            category: "Encryption & Access Control",
            type: "secondary",
          },
          {
            id: "encryption-access-control-conditions-evm-time-based",
            path: "/encryption/access-control/evm/time-based",
            name: "Time Based",
            description: "Access Control Conditions for Time Based",
          },
          {
            id: "encryption-access-control-conditions-evm-dao-membership",
            path: "/encryption/access-control/evm/dao-membership",
            name: "DAO Membership",
            description: "Access Control Conditions for DAO Membership",
          },
          {
            id: "encryption-access-control-conditions-evm-poap-ownership",
            path: "/encryption/access-control/evm/poap-ownership",
            name: "POAP Ownership",
            description: "Access Control Conditions for POAP Ownership",
          },
        ],
      },
      {
        id: "encryption-access-control-conditions-sol",
        path: "/encryption/access-control/sol",
        name: "SOL Based Conditions",
        description: "Access Control Conditions for SOL",
        category: "Encryption & Access Control",
        type: "secondary",
        children: [
          {
            id: "encryption-access-control-conditions-sol-wallet-ownership",
            path: "/encryption/access-control/sol/wallet-ownership",
            name: "Wallet Ownership",
            description: "Access Control Conditions for Wallet Ownership",
            category: "Encryption & Access Control",
            type: "secondary",
          },
          {
            id: "encryption-access-control-conditions-sol-sol-balance",
            path: "/encryption/access-control/sol/sol-balance",
            name: "SOL Balance",
            description: "Access Control Conditions for SOL Balance",
            category: "Encryption & Access Control",
            type: "secondary",
          },
          {
            id: "encryption-access-control-conditions-sol-nft-ownership",
            path: "/encryption/access-control/sol/nft-ownership",
            name: "NFT Ownership",
            description: "Access Control Conditions for NFT Ownership",
            category: "Encryption & Access Control",
            type: "secondary",
          },
        ],
      },
      {
        id: "encryption-access-control-conditions-cosmos",
        path: "/encryption/access-control/cosmos",
        name: "Cosmos Based Conditions",
        description: "Access Control Conditions for Cosmos",
        category: "Encryption & Access Control",
        type: "secondary",
        children: [
          {
            id: "encryption-access-control-conditions-cosmos-wallet-ownership",
            path: "/encryption/access-control/cosmos/wallet-ownership",
            name: "Wallet Ownership",
            description: "Access Control Conditions for Wallet Ownership",
            category: "Encryption & Access Control",
            type: "secondary",
          },
          {
            id: "encryption-access-control-conditions-cosmos-cosmos-balance",
            path: "/encryption/access-control/cosmos/cosmos-balance",
            name: "Cosmos Balance",
            description: "Access Control Conditions for Cosmos Balance",
            category: "Encryption & Access Control",
            type: "secondary",
          },
        ],
      },
    ],
  },

  // Lit Actions
  {
    id: "lit-actions-overview",
    path: "/lit-actions/overview",
    name: "Overview",
    description: "Overview of Lit Actions",
    category: "Autonomous Signing - Lit Actions",
    type: "primary",
  },
  {
    id: "lit-actions-quick-start",
    path: "/lit-actions/quick-start",
    name: "Quick Start",
    description: "Quick start guide to Lit Actions",
    category: "Autonomous Signing - Lit Actions",
    type: "primary",
  },
  {
    id: "lit-actions-deploying",
    path: "/lit-actions/deploying",
    name: "Deploying",
    description: "Deploying Lit Actions",
    category: "Autonomous Signing - Lit Actions",
    type: "primary",
  },
  {
    id: "lit-actions-fetch",
    path: "/lit-actions/fetch",
    name: "Fetching Data",
    description: "Fetching data from the web",
    category: "Autonomous Signing - Lit Actions",
    type: "primary",
  },
  {
    id: "lit-actions-run-once",
    path: "/lit-actions/run-once",
    name: "Run Once",
    description: "Run logic within a Lit Action only once",
    category: "Autonomous Signing - Lit Actions",
    type: "primary",
  },
  {
    id: "lit-actions-decrypting",
    path: "/lit-actions/decrypting",
    name: "Decrypting Data",
    description: "Decrypting data within a Lit Action",
    category: "Autonomous Signing - Lit Actions",
    type: "primary",
  },
  {
    id: "lit-actions-get-rpc-url",
    path: "/lit-actions/get-rpc-url",
    name: "Get RPC URLs",
    description: "Get the RPC URL for a given chain",
    category: "Autonomous Signing - Lit Actions",
    type: "primary",
  },
  {
    id: "lit-actions-conditional-execution",
    path: "/lit-actions/conditional-execution",
    name: "Conditional Execution",
    description: "Conditional execution of Lit Actions",
    category: "Autonomous Signing - Lit Actions",
    type: "primary",
  },
  {
    id: "lit-actions-pkp-signing",
    path: "/lit-actions/pkp-signing",
    name: "PKP Signing",
    description: "Signing with a PKP",
    category: "Autonomous Signing - Lit Actions",
    type: "primary",
  },
  {
    id: "lit-actions-pkp-signing-eip191",
    path: "/lit-actions/pkp-signing-eip191",
    name: "PKP Signing with EIP-191",
    description: "Signing with a PKP using EIP-191",
    category: "Autonomous Signing - Lit Actions",
    type: "primary",
  },
  {
    id: "lit-actions-broadcast-and-collect",
    path: "/lit-actions/broadcast-and-collect",
    name: "Aggregate Node Responses",
    description: "Aggregate responses from all nodes in the network",
    category: "Autonomous Signing - Lit Actions",
    type: "primary",
  },
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
  // Helper function to find all parent categories for a given path
  const findCategoriesForPath = (path: string): string[] => {
    const categories: string[] = [];

    const findInActions = (
      actions: NavigationItem[],
      parentHierarchy: string[] = []
    ): boolean => {
      for (const action of actions) {
        if (action.path === path) {
          // Add the main category if it exists
          if (action.category) categories.push(action.category);
          // Add all parent IDs in the hierarchy
          parentHierarchy.forEach((parent) => categories.push(parent));
          return true;
        }

        if (action.children) {
          const newHierarchy = action.category
            ? [...parentHierarchy, action.id]
            : [...parentHierarchy, action.id];
          if (findInActions(action.children, newHierarchy)) {
            // If found in children, also add this action's category
            if (action.category) categories.push(action.category);
            return true;
          }
        }
      }
      return false;
    };

    findInActions(ACTIONS);
    return [...new Set(categories)]; // Remove duplicates
  };

  // Get expanded categories and navigation items based on current path
  const getExpandedCategoriesForPath = (
    path: string
  ): { [key: string]: boolean } => {
    const defaultExpanded: { [key: string]: boolean } = {
      "Learning Lit": true,
      "Building With Lit": true,
      "Making Your First Request": true,
      // Expand nested navigation items by default
      "building-with-lit-first-request": true, // "Making Your First Request" parent
    };

    // Function to find and expand all parent navigation items for a given path
    const findAndExpandParents = (
      actions: NavigationItem[],
      targetPath: string,
      parentIds: string[] = []
    ): boolean => {
      for (const action of actions) {
        const currentPath = [...parentIds, action.id];

        if (action.path === targetPath) {
          // Found the target - expand all parents
          parentIds.forEach((parentId) => {
            defaultExpanded[parentId] = true;
          });
          // Also expand categories
          if (action.category) {
            defaultExpanded[action.category] = true;
          }
          return true;
        }

        if (action.children) {
          if (findAndExpandParents(action.children, targetPath, currentPath)) {
            // If found in children, expand this parent
            defaultExpanded[action.id] = true;
            if (action.category) {
              defaultExpanded[action.category] = true;
            }
            return true;
          }
        }
      }
      return false;
    };

    // Always expand categories and navigation items for the current path
    const currentPathCategories = findCategoriesForPath(path);
    console.log(
      "Current path:",
      path,
      "Found categories:",
      currentPathCategories
    );

    // Expand categories
    currentPathCategories.forEach((category) => {
      defaultExpanded[category] = true;
    });

    // Expand parent navigation items
    findAndExpandParents(ACTIONS, path);

    console.log("Final expanded categories:", defaultExpanded);
    return defaultExpanded;
  };

  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>(getExpandedCategoriesForPath(location.pathname));
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
        (window as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext)();
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
    setExpandedCategories((prev) => ({
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

  // Update activeMethod and ensure current path categories are expanded
  useEffect(() => {
    const path = location.pathname;
    const actionId =
      ACTIONS.find((action) => action.path === path)?.id || "eoa";
    setActiveMethod(actionId);

    // Ensure current path categories are expanded (but preserve existing expansions)
    const currentPathCategories = findCategoriesForPath(path);
    if (currentPathCategories.length > 0) {
      setExpandedCategories((prev) => {
        const updated = { ...prev };
        currentPathCategories.forEach((category) => {
          updated[category] = true;
        });
        return updated;
      });
    }
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
                // Only group actions that have a category
                if (action.category) {
                  if (!groupedActions[action.category]) {
                    groupedActions[action.category] = [];
                  }
                  groupedActions[action.category].push(action);
                }
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
                  const isCategoryExpanded = expandedCategories[categoryKey];
                  const isSecondaryExpanded = expandedCategories[secondaryKey];

                  return (
                    <div key={category}>
                      {categoryIndex > 0 && (
                        <hr
                          style={{ margin: "15px 0", borderColor: "#dddddd" }}
                        />
                      )}

                      {category === "Home" ? (
                        primaryActions.map((action) => (
                          <Link
                            key={action.id}
                            to={action.path || ""}
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
                        ))
                      ) : (
                        <>
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
                              {isCategoryExpanded ? "▼" : "▶"}
                            </span>
                            {category}
                          </button>

                          {/* Category Content */}
                          {isCategoryExpanded && (
                            <div style={{ marginLeft: "0px" }}>
                              {/* Primary Actions */}
                              {primaryActions.map((action) =>
                                action.children ? (
                                  <NavigationItem
                                    key={action.id}
                                    item={action}
                                    level={0}
                                    activeMethod={activeMethod}
                                    expandedCategories={expandedCategories}
                                    toggleCategoryCollapse={
                                      toggleCategoryCollapse
                                    }
                                    location={location}
                                  />
                                ) : (
                                  <Link
                                    key={action.id}
                                    to={action.path || ""}
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
                                )
                              )}

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
                                      {isSecondaryExpanded ? "▼" : "▶"}
                                    </span>
                                    Secondary Methods ({secondaryActions.length}
                                    )
                                  </button>

                                  {/* Secondary Actions List */}
                                  {isSecondaryExpanded &&
                                    secondaryActions.map((action) => (
                                      <div
                                        key={action.id}
                                        style={{ marginBottom: "4px" }}
                                      >
                                        <Link
                                          to={action.path || ""}
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
                        </>
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
