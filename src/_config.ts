/**
 * Application Configuration
 * 
 * This file centralizes all configurable settings for the application.
 * Modify these values to customize the application behavior.
 */

// WalletConnect Configuration
export const WALLET_CONNECT = {
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID", // Replace with your actual WalletConnect Project ID
};

// Application Information
export const APP_INFO = {
  name: "Web3 Fast",
  shortName: "Lit",
  description: "Explore the Lit Protocol ecosystem",
  copyright: "Lit Protocol",
  version: "1.0.0",
};

// Theme Configuration
export const THEME = {
  // Color system (HSL format)
  colors: {
    background: "255 28% 18%",
    foreground: "255 28% 95%",
    card: "0 0% 100%",
    cardForeground: "255 28% 18%",
    popover: "0 0% 100%",
    popoverForeground: "255 28% 18%",
    primary: "264 54% 44%",
    primaryForeground: "0 0% 100%",
    secondary: "270 53% 47%",
    secondaryForeground: "0 0% 100%",
    muted: "210 40% 96.1%",
    mutedForeground: "215 16% 47%",
    accent: "264 54% 44%",
    accentForeground: "0 0% 100%",
    destructive: "0 84% 60%",
    destructiveForeground: "210 40% 98%",
    border: "214 32% 91%",
    input: "214 32% 91%",
    ring: "264 54% 44%",
  },
  
  // Direct color values for backward compatibility
  brandColors: {
    darkPurple: "#27233B",
    purple: "#5732AE",
    brightPurple: "#5f35b8",
    green: "#22C55E",
    white: "#FFFFFF",
    lightGray: "#f5f5f5",
    borderColor: "#e0e0e0",
  },
  
  // Gradients
  gradients: {
    primary: "linear-gradient(to right, hsl(264 54% 44%), hsl(259 53% 36%))",
    active: "linear-gradient(-200deg, hsl(254 45% 35%), hsl(270 53% 47%))",
  },
  
  // RainbowKit theme configuration
  rainbowKit: {
    accentColor: "#5732AE",
    accentColorForeground: "white",
    borderRadius: "medium",
    fontStack: "system",
    overlayBlur: "small",
  },
  
  // Border radius
  radius: "0.5rem",
  
  // Font configuration
  fonts: {
    primary: "Space Grotesk",
    fallback: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },
};

// Blockchain Network Configuration
export const NETWORKS = {
  chronicleYellowstone: {
    id: 175177,
    name: "Chronicle Yellowstone",
    network: "chronicle-yellowstone",
    iconUrl: "/logo.svg", // Add icon path here
    iconBackground: "#27233B",
  },
  enabled: [
    "Chronicle Yellowstone", // This must match the name above
    // "mainnet",
    // "sepolia",
    // "base",
    "arbitrum",
  ],
};

// Navigation Links
export const NAVIGATION = {
  main: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
  ],
  // Add more navigation sections as needed (e.g., footer, mobile, etc.)
};

// Wallet Configuration
export const WALLETS = {
  recommended: ["rainbow", "metamask", "coinbase"],
  others: ["injected", "walletConnect"],
};

// Layout Configuration
export const LAYOUT = {
  maxWidth: "48rem", // max-w-3xl
  contentPadding: "24px",
};

// Application Features Toggle
export const FEATURES = {
  showWalletBalance: true,
  enableFlameAnimation: true,
};
