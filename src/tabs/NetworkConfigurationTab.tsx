/**
 * NetworkConfigurationTab.tsx
 *
 * Demonstrates network configuration options for Lit Protocol.
 * Shows nagaDev, mainnet, and testnet configurations with interactive selection.
 */

import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { nagaDev } from '@lit-protocol/networks';
import { DisplayCode } from '../components/DisplayCode';

interface TabContext {
  areDependenciesLoaded: () => boolean;
  showError: (error: string) => void;
  setStatus: (status: string) => void;
}

interface NetworkConfig {
  name: string;
  config: any;
  description: string;
  recommended: boolean;
  available: boolean;
}

const NetworkConfigurationTab: React.FC = () => {
  const { areDependenciesLoaded, showError, setStatus } =
    useOutletContext<TabContext>();
  const [selectedNetwork, setSelectedNetwork] = useState<string>('nagaDev');
  const [configResult, setConfigResult] = useState<any>(null);

  const networks: Record<string, NetworkConfig> = {
    nagaDev: {
      name: 'Naga Dev',
      config: nagaDev,
      description: 'Development network for testing and experimentation',
      recommended: true,
      available: true,
    },
    nagaTestnet: {
      name: 'Naga Testnet',
      config: null, // Will be available in future releases
      description: 'Test network for pre-production testing',
      recommended: false,
      available: false,
    },
    nagaMainnet: {
      name: 'Naga Mainnet',
      config: null, // Will be available in future releases
      description: 'Production network for live applications',
      recommended: false,
      available: false,
    },
  };

  const handleNetworkSelect = (networkKey: string) => {
    setSelectedNetwork(networkKey);
    const network = networks[networkKey];

    if (!network.available) {
      setConfigResult({
        success: false,
        error: `${network.name} is not yet available in this SDK version`,
        network: network.name,
        description: network.description,
        timestamp: new Date().toISOString(),
      });
      setStatus(`${network.name} network is not yet available`);
      showError(
        `${network.name} network is not yet available in this SDK version`
      );
      return;
    }

    setConfigResult({
      success: true,
      network: network.name,
      description: network.description,
      config: network.config,
      timestamp: new Date().toISOString(),
    });
    setStatus(`Selected ${network.name} network configuration`);
  };

  const networkImportCode = `import { nagaDev } from "@lit-protocol/networks";
import { createLitClient } from "@lit-protocol/lit-client";

// Currently Available: Development Network
const devClient = await createLitClient({ network: nagaDev });

// Future Networks (Coming Soon):
// const prodClient = await createLitClient({ network: mainnet });
// const testClient = await createLitClient({ network: testnet });`;

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1>Network Configuration</h1>
        <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6' }}>
          Configure your Lit Protocol client to connect to different networks.
          Choose the appropriate network based on your development stage and
          requirements.
        </p>
      </div>

      {/* Network Selection */}
      <div style={{ marginBottom: '30px' }}>
        <h2>Interactive Network Selection</h2>
        <DisplayCode
          code={networkImportCode}
          language="typescript"
          useSideBySide={true}
          renderComponent={
            <div>
              <h4 style={{ marginTop: '0', color: '#2c5282' }}>
                Select a Network
              </h4>
              <p
                style={{
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '15px',
                }}
              >
                Choose a network configuration to see its details and usage.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {Object.entries(networks).map(([key, network]) => (
                  <button
                    key={key}
                    onClick={() => handleNetworkSelect(key)}
                    style={{
                      padding: '12px 16px',
                      backgroundColor:
                        selectedNetwork === key ? '#007bff' : '#f8f9fa',
                      color: selectedNetwork === key ? 'white' : '#333',
                      border: `2px solid ${
                        selectedNetwork === key ? '#007bff' : '#dee2e6'
                      }`,
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <strong>{network.name}</strong>
                        {network.recommended && (
                          <span
                            style={{
                              marginLeft: '8px',
                              padding: '2px 6px',
                              backgroundColor: '#28a745',
                              color: 'white',
                              fontSize: '11px',
                              borderRadius: '3px',
                            }}
                          >
                            RECOMMENDED
                          </span>
                        )}
                        <div
                          style={{
                            fontSize: '12px',
                            color: selectedNetwork === key ? '#e6f3ff' : '#666',
                            marginTop: '4px',
                          }}
                        >
                          {network.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          }
          resultData={configResult}
          resultLabel="Network Configuration"
          isSuccess={!!configResult}
        />
      </div>

      {/* Network Comparison */}
      <div style={{ marginBottom: '30px' }}>
        <h2>Network Comparison</h2>
        <div
          style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#e9ecef' }}>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '1px solid #dee2e6',
                  }}
                >
                  Network
                </th>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '1px solid #dee2e6',
                  }}
                >
                  Purpose
                </th>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '1px solid #dee2e6',
                  }}
                >
                  Use Case
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    padding: '12px',
                    borderBottom: '1px solid #dee2e6',
                    fontWeight: 'bold',
                  }}
                >
                  nagaDev
                  <span
                    style={{
                      marginLeft: '8px',
                      padding: '2px 6px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      fontSize: '10px',
                      borderRadius: '3px',
                    }}
                  >
                    RECOMMENDED
                  </span>
                </td>
                <td
                  style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}
                >
                  Development & Testing
                </td>
                <td
                  style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}
                >
                  Getting started, prototyping, local development
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '12px',
                    borderBottom: '1px solid #dee2e6',
                    fontWeight: 'bold',
                  }}
                >
                  testnet
                </td>
                <td
                  style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}
                >
                  Pre-production Testing
                </td>
                <td
                  style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}
                >
                  Integration testing, staging environments
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>mainnet</td>
                <td style={{ padding: '12px' }}>Production</td>
                <td style={{ padding: '12px' }}>
                  Live applications, production deployments
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Concepts */}
      <div style={{ marginBottom: '30px' }}>
        <h2>Key Concepts</h2>
        <div
          style={{
            backgroundColor: '#e7f3ff',
            border: '1px solid #b3d9ff',
            borderRadius: '6px',
            padding: '20px',
          }}
        >
          <h3 style={{ margin: '0 0 15px 0', color: '#0066cc' }}>
            Network Selection Guidelines
          </h3>
          <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
            <li>
              <strong>Start with nagaDev:</strong> Ideal for learning and
              development
            </li>
            <li>
              <strong>Use testnet for staging:</strong> Test with
              production-like conditions
            </li>
            <li>
              <strong>Deploy to mainnet:</strong> Only when ready for production
            </li>
          </ul>

          <h3 style={{ margin: '20px 0 15px 0', color: '#0066cc' }}>
            Best Practices
          </h3>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Use environment variables for network configuration</li>
            <li>Test thoroughly on testnet before mainnet deployment</li>
            <li>Never hardcode network configuration in production code</li>
            <li>Document your network requirements clearly</li>
          </ul>
        </div>
      </div>

      {/* Next Steps */}
      <div
        style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '6px',
          padding: '20px',
        }}
      >
        <h3 style={{ margin: '0 0 10px 0', color: '#856404' }}>Next Steps</h3>
        <p style={{ margin: '0', color: '#856404' }}>
          With your network configured, explore storage plugins to complete your
          foundation setup and then proceed to authentication methods.
        </p>
      </div>
    </div>
  );
};

export default NetworkConfigurationTab;
