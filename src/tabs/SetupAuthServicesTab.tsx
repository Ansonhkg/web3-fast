/**
 * SetupAuthServicesTab.tsx
 * 
 * Demonstrates how to set up and configure your own Lit Auth Services.
 * Shows configuration for auth server, login server, and worker setup.
 */

import React from "react";
import { useOutletContext } from "react-router-dom";
import { DisplayCode } from "../components/DisplayCode";

interface TabContext {
  areDependenciesLoaded: () => boolean;
  showError: (error: string) => void;
  setStatus: (status: string) => void;
}

const SetupAuthServicesTab: React.FC = () => {
  const { } = useOutletContext<TabContext>();

  const mainExportsCode = `// Main exports from @lit-protocol/auth-services
import { 
  createLitAuthServer,    // Auth service for PKP operations
  createLitLoginServer,   // Login server for OAuth flows
  startAuthServiceWorker  // Background worker for job processing
} from "@lit-protocol/auth-services";`;

  const envConfigCode = `# ---------- LIT AUTH SERVICE ----------
# Network configuration (supports naga-dev, naga-test, naga)
NETWORK=naga-dev
LOG_LEVEL=debug

# Lit transaction sender settings
LIT_TXSENDER_RPC_URL=https://yellowstone-rpc.litprotocol.com
LIT_TXSENDER_PRIVATE_KEY=your_private_key

# Redis settings for job queue and caching
REDIS_URL=redis://user:pass@redis-host.com:12345
PORT=6380

# Rate limiting configuration
ENABLE_API_KEY_GATE=true
MAX_REQUESTS_PER_WINDOW=10
WINDOW_MS=10000

# ---------- LIT LOGIN SERVER ----------
# OAuth provider credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret

# Stytch configuration (for OTP services)
STYTCH_PUBLIC_TOKEN=your_stytch_public_token
STYTCH_PROJECT_ID=your_stytch_project_id`;

  const authServerCode = `// Auth Server Setup
import { createLitAuthServer } from "@lit-protocol/auth-services";

const litAuthServer = createLitAuthServer({
  port: process.env.PORT || 6380,
  network: process.env.NETWORK || "naga-dev",
  litTxsenderRpcUrl: process.env.LIT_TXSENDER_RPC_URL,
  litTxsenderPrivateKey: process.env.LIT_TXSENDER_PRIVATE_KEY,
  enableApiKeyGate: process.env.ENABLE_API_KEY_GATE === "true",
});

// Start the auth server
await litAuthServer.start();`;

  const loginServerCode = `// Login Server Setup  
import { createLitLoginServer } from "@lit-protocol/auth-services";

const litLoginServer = createLitLoginServer({
  port: 3300,
  host: "0.0.0.0",
  stateExpirySeconds: 30,
  
  // OAuth provider configuration
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    },
  },
});

// Start the login server
await litLoginServer.start();`;

  const workerCode = `// Worker Setup
import { startAuthServiceWorker } from "@lit-protocol/auth-services";

// Start the background worker for processing auth jobs
await startAuthServiceWorker();

// The worker handles:
// - Background PKP minting operations
// - Job queue processing with BullMQ
// - Redis connection management
// - Error handling and retry logic`;

  const runAllServicesCode = `// Running all services together
import { 
  createLitAuthServer,
  createLitLoginServer,
  startAuthServiceWorker 
} from "@lit-protocol/auth-services";

async function startAllServices() {
  try {
    // Start auth server
    const authServer = createLitAuthServer({
      port: process.env.PORT || 6380,
      network: process.env.NETWORK || "naga-dev",
      litTxsenderRpcUrl: process.env.LIT_TXSENDER_RPC_URL,
      litTxsenderPrivateKey: process.env.LIT_TXSENDER_PRIVATE_KEY,
      enableApiKeyGate: process.env.ENABLE_API_KEY_GATE === "true",
    });

    // Start login server
    const loginServer = createLitLoginServer({
      port: 3300,
      host: "0.0.0.0",
      stateExpirySeconds: 30,
      socialProviders: {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
        discord: {
          clientId: process.env.DISCORD_CLIENT_ID!,
          clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        },
      },
    });

    // Start all services
    await Promise.all([
      authServer.start(),
      loginServer.start(),
      startAuthServiceWorker()
    ]);

    console.log("All Lit Auth Services started successfully!");
  } catch (error) {
    console.error("Failed to start services:", error);
    process.exit(1);
  }
}

startAllServices();`;

  return (
    <div style={{ maxWidth: "800px" }}>
      <div style={{ marginBottom: "30px" }}>
        <h1>Setup Auth Services</h1>
        <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.6" }}>
          Create your own authentication infrastructure using the Lit Protocol Auth Services package. 
          This provides three core services: Auth Server for PKP operations, Login Server for OAuth flows, 
          and a Worker for background job processing.
        </p>
      </div>

      {/* Main Exports */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Main Exports</h2>
        <DisplayCode
          code={mainExportsCode}
          language="typescript"
        />
      </div>

      {/* Environment Configuration */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Environment Configuration</h2>
        <DisplayCode
          code={envConfigCode}
          language="bash"
        />
      </div>

      {/* Service Setup */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Service Configuration</h2>
        
        {/* Auth Server */}
        <div style={{ marginBottom: "20px" }}>
          <h3>1. Auth Server</h3>
          <p style={{ color: "#666", marginBottom: "15px" }}>
            Handles PKP minting, signing operations, and auth validation.
          </p>
          <DisplayCode
            code={authServerCode}
            language="typescript"
          />
        </div>

        {/* Login Server */}
        <div style={{ marginBottom: "20px" }}>
          <h3>2. Login Server</h3>
          <p style={{ color: "#666", marginBottom: "15px" }}>
            Handles OAuth flows for Google, Discord, and other providers.
          </p>
          <DisplayCode
            code={loginServerCode}
            language="typescript"
          />
        </div>

        {/* Worker */}
        <div style={{ marginBottom: "20px" }}>
          <h3>3. Background Worker</h3>
          <p style={{ color: "#666", marginBottom: "15px" }}>
            Processes background jobs using BullMQ and Redis.
          </p>
          <DisplayCode
            code={workerCode}
            language="typescript"
          />
        </div>
      </div>

      {/* Combined Setup */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Running All Services Together</h2>
        <p style={{ color: "#666", marginBottom: "15px" }}>
          Example of how to start all three services in a single application.
        </p>
        <DisplayCode
          code={runAllServicesCode}
          language="typescript"
        />
      </div>

      {/* Key Concepts */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Key Concepts</h2>
        <div style={{
          backgroundColor: "#e7f3ff",
          border: "1px solid #b3d9ff",
          borderRadius: "6px",
          padding: "20px"
        }}>
          <h3 style={{ margin: "0 0 15px 0", color: "#0066cc" }}>Service Architecture</h3>
          <ul style={{ marginBottom: "20px", paddingLeft: "20px" }}>
            <li><strong>Auth Server:</strong> Main API for PKP operations, signing, and authentication</li>
            <li><strong>Login Server:</strong> OAuth integration for social logins (Google, Discord)</li>
            <li><strong>Worker:</strong> Background job processing for heavy operations</li>
            <li><strong>Redis:</strong> Job queue and caching layer for all services</li>
          </ul>
          
          <h3 style={{ margin: "20px 0 15px 0", color: "#0066cc" }}>Best Practices</h3>
          <ul style={{ paddingLeft: "20px" }}>
            <li>Use environment variables for all sensitive configuration</li>
            <li>Run services in containers for production deployments</li>
            <li>Monitor Redis connection and queue health</li>
            <li>Implement proper logging and error handling</li>
            <li>Use rate limiting to prevent abuse</li>
          </ul>
        </div>
      </div>

      {/* Deployment Notes */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Deployment Notes</h2>
        <div style={{
          backgroundColor: "#fff3cd",
          border: "1px solid #ffeaa7",
          borderRadius: "6px",
          padding: "20px"
        }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#856404" }}>Production Considerations</h3>
          <ul style={{ margin: "0", color: "#856404", paddingLeft: "20px" }}>
            <li>Use Redis cluster for high availability</li>
            <li>Configure SSL/TLS for all service endpoints</li>
            <li>Set up monitoring and alerting</li>
            <li>Implement proper backup strategies</li>
            <li>Use load balancers for scaling</li>
          </ul>
        </div>
      </div>

      {/* Next Steps */}
      <div style={{
        backgroundColor: "#d4edda",
        border: "1px solid #c3e6cb",
        borderRadius: "6px",
        padding: "20px"
      }}>
        <h3 style={{ margin: "0 0 10px 0", color: "#155724" }}>Next Steps</h3>
        <p style={{ margin: "0", color: "#155724" }}>
          Once your auth services are configured, proceed to explore the various authentication methods 
          like Google Auth, Discord Auth, WebAuthn, and custom authentication flows.
        </p>
      </div>
    </div>
  );
};

export default SetupAuthServicesTab; 