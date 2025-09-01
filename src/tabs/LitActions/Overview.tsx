/**
 * Overview.tsx
 *
 * This component provides a comprehensive overview of Lit Actions,
 * explaining how they work and their key capabilities.
 */

import React from "react";
import GreyBoarderWhiteBgContainer from "../../components/layout/GreyboardWhiteBgContainer";
import { LinkExternal, NoteCallout } from "../../components/common";

interface ProcessStepProps {
  title: string;
  description: string;
  stepNumber: number;
}

const ProcessStep: React.FC<ProcessStepProps> = ({
  title,
  description,
  stepNumber,
}) => (
  <div
    style={{
      padding: "24px",
      backgroundColor: "#f8fafc",
      borderRadius: "12px",
      border: "2px solid #007bff20",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "#007bff",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "600",
          fontSize: "1.1rem",
        }}
      >
        {stepNumber}
      </div>
      <h4
        style={{
          margin: 0,
          color: "#007bff",
          fontSize: "1.3rem",
          fontWeight: "600",
        }}
      >
        {title}
      </h4>
    </div>
    <p
      style={{
        fontSize: "0.9rem",
        lineHeight: "1.6",
        color: "#4b5563",
        marginBottom: "0",
      }}
    >
      {description}
    </p>
  </div>
);

const LitActionsOverview: React.FC = () => {
  const pageStyles = {
    container: {
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "20px",
    },
    h1: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "24px",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "16px",
      borderBottom: "1px solid #e5e7eb",
      paddingBottom: "8px",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#374151",
      marginTop: "24px",
      marginBottom: "12px",
    },
    p: {
      fontSize: "1rem",
      lineHeight: "1.6",
      color: "#4b5563",
      marginBottom: "16px",
    },
    ul: {
      listStyleType: "disc",
      paddingLeft: "20px",
      marginBottom: "16px",
    },
    li: {
      marginBottom: "8px",
      color: "#4b5563",
    },
  };

  return (
    <div className="tab-content">
      <h1 style={pageStyles.h1}>Lit Actions</h1>

      <GreyBoarderWhiteBgContainer>
        <h2 style={pageStyles.h2}>Introduction</h2>
        <p style={pageStyles.p}>
          Lit Actions are powerful JavaScript functions that can be used to
          program signing and encryption/decryption operations on the Lit
          network. Lit Actions are stateless, immutable, confidential, and are
          executed within the secure trusted execution environment (TEE) present
          within each Lit node.
        </p>
        <p style={pageStyles.p}>
          What sets Lit Actions apart is their ability to natively "talk" to
          both on and off-chain data sources, including smart contracts, price
          feeds, social networks, and other external APIs. Highly versatile, Lit
          Actions can be used to implement virtually any logic/workflow that can
          be written in JavaScript.
        </p>
      </GreyBoarderWhiteBgContainer>

      <GreyBoarderWhiteBgContainer style={{ marginTop: "32px" }}>
        <h2 style={pageStyles.h2}>Key Features</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginTop: "24px",
          }}
        >
          {[
            {
              title: "JavaScript-Based",
              description:
                "Lit Actions are written in JavaScript and support the importing of third-party libraries, making them familiar and accessible to developers.",
              icon: "🟨",
            },
            {
              title: "Immutable",
              description:
                "Lit Actions are typically stored on IPFS, making them immutable and ensuring that the logic cannot be changed after deployment.",
              icon: "🔒",
            },
            {
              title: "Platform and Chain Agnostic",
              description:
                "Unlike traditional smart contracts, Lit Actions can interact with any blockchain network or off-chain service by making HTTP requests.",
              icon: "🌐",
            },
            {
              title: "Confidential Execution",
              description:
                "All Lit Actions are executed within the trusted execution environment (TEE) present within each Lit node, meaning all operations remain fully confidential.",
              icon: "🛡️",
            },
            {
              title: "Threshold Consensus",
              description:
                "By default, Lit Actions inherit the same threshold consensus mechanism as the rest of the Lit network. More than two-thirds of the network must agree on a given operation before it can be executed.",
              icon: "🤝",
            },
            {
              title: "Fully Programmable",
              description:
                "Lit Actions can be used to automate signing and encryption/decryption operations without requiring a human in the loop.",
              icon: "⚙️",
            },
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                padding: "20px",
                backgroundColor: "#f8fafc",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>
                {feature.icon}
              </div>
              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  color: "#1f2937",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.9rem",
                  color: "#6b7280",
                  lineHeight: "1.5",
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </GreyBoarderWhiteBgContainer>

      <GreyBoarderWhiteBgContainer style={{ marginTop: "32px" }}>
        <h2 style={pageStyles.h2}>How It Works</h2>
        <p style={pageStyles.p}>
          Here's the complete lifecycle of a Lit Action, from creation to
          execution:
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "24px",
          }}
        >
          {[
            {
              title: "Write JavaScript Code",
              description:
                "Create your Lit Action using standard JavaScript with access to built-in functions for signing, encryption, and external API calls. Lit Actions run in a secure Deno environment and support importing third-party libraries like @solana/web3.js and have built-in support for Lit SDK and Ethers.js (v5.7.0). This lets you define custom logic that interacts with blockchains, APIs, and the Lit Network.",
              stepNumber: 1,
            },
            {
              title: "Deploy to IPFS",
              description:
                "After writing your Lit Action, you upload it to IPFS to make it immutable and accessible to the Lit network. This ensures the code cannot be modified after deployment, providing security guarantees and enabling the network to execute the logic.",
              stepNumber: 2,
            },
            {
              title: "Trusted Execution Environment (TEE) Processing",
              description:
                "When you want to run a Lit Action, you send a request to the Lit Network with any required input parameters. Each Lit node will load the JavaScript from IPFS and execute it within its secure TEE, ensuring confidential computation. The TEE isolates the execution environment, protecting sensitive data and operations from external access while maintaining verifiability - even from the node operator.",
              stepNumber: 3,
            },
            {
              title: "Network Consensus",
              description:
                "The Lit network reaches threshold consensus on the execution results. More than two-thirds of the nodes must agree on the computed output before proceeding with any cryptographic operations, such as decryption and signing.",
              stepNumber: 4,
            },
            {
              title: "Execute Cryptographic Operations",
              description:
                "Once consensus is reached, the network performs the requested operations such as signing transactions, decrypting data, or returning computed results.",
              stepNumber: 5,
            },
          ].map((step, index) => (
            <ProcessStep key={index} {...step} />
          ))}
        </div>

        <NoteCallout
          title="Key Characteristics"
          message={
            <>
              <ul
                style={{
                  paddingLeft: "20px",
                  color: "#4b5563",
                  lineHeight: "1.6",
                  marginBottom: "0",
                }}
              >
                <li style={{ marginBottom: "8px" }}>
                  <strong>Stateless Execution:</strong> Each Lit Action runs
                  independently without persistent state, but can interact with
                  on-chain and off-chain data sources
                </li>
                <li style={{ marginBottom: "8px" }}>
                  <strong>Immutable Logic:</strong> Once deployed to IPFS, the
                  Lit Action code cannot be changed, ensuring predictable
                  behavior
                </li>
                <li style={{ marginBottom: "8px" }}>
                  <strong>Confidential Computing:</strong> All operations occur
                  within TEEs, keeping sensitive data and computations private
                </li>
                <li style={{ marginBottom: "8px" }}>
                  <strong>Threshold Security:</strong> Cryptographic operations
                  require consensus from multiple nodes, eliminating single
                  points of failure
                </li>
              </ul>
            </>
          }
          variant="info"
          style={{ marginTop: "24px" }}
        />
      </GreyBoarderWhiteBgContainer>

      <GreyBoarderWhiteBgContainer style={{ marginTop: "32px" }}>
        <h2 style={pageStyles.h2}>Use Cases</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginTop: "24px",
          }}
        >
          {[
            {
              title: "Data Oracles",
              description:
                "Create decentralized oracles that fetch, verify, and process off-chain data before providing it to smart contracts. Combine multiple data sources for increased reliability and implement custom data validation logic.",
              icon: "📊",
            },
            {
              title: "Cross-Chain Orchestration",
              description:
                "Build applications that coordinate actions across multiple blockchain networks. Execute complex multi-chain workflows, manage cross-chain asset transfers, and implement unified interfaces for multi-chain operations.",
              icon: "🔗",
            },
            {
              title: "Transaction Automation",
              description:
                "Implement automated transaction execution based on predefined conditions. Create sophisticated trading bots, automated DeFi strategies, and event-driven transaction triggers that respond to real-world or on-chain events.",
              icon: "🤖",
            },
            {
              title: "Flexible Policy Engines",
              description:
                "Build dynamic access control systems and conditional signing mechanisms. Implement multi-factor authentication, time-based restrictions, and custom authorization logic for wallets and applications.",
              icon: "🛡️",
            },
            {
              title: "Private Compute Jobs",
              description:
                "Perform sensitive computations in a private, secure compute environment (TEE) while maintaining verifiability and confidentiality of the computation process.",
              icon: "🔐",
            },
          ].map((useCase, index) => (
            <div
              key={index}
              style={{
                padding: "20px",
                backgroundColor: "#f8fafc",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>
                {useCase.icon}
              </div>
              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  color: "#1f2937",
                }}
              >
                {useCase.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.9rem",
                  color: "#6b7280",
                  lineHeight: "1.5",
                }}
              >
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </GreyBoarderWhiteBgContainer>

      <GreyBoarderWhiteBgContainer style={{ marginTop: "32px" }}>
        <h2 style={pageStyles.h2}>Example Implementations</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginTop: "24px",
          }}
        >
          {[
            {
              title: "MPC Autopilot by Polaris (Osmosis)",
              description: (
                <>
                  {" "}
                  <LinkExternal href="https://polaris.app/">
                    Polaris
                  </LinkExternal>
                  {
                    " lets you trade any token on any chain in a single application. Swap across Cosmos, Solana, Ethereum, Bitcoin, and beyond without breaking a sweat."
                  }
                </>
              ),
              icon: "🗺️",
            },
            {
              title: "Genius Bridge Protocol (GBP)",
              description: (
                <>
                  {"Built by the "}
                  <LinkExternal href="https://www.tradegenius.com/">
                    Genius
                  </LinkExternal>
                  {
                    " team the Genius Bridge Protocol enables dApps to perform operations across both EVM and non-EVM chains while managing all of the steps required to fulfill the end user's intent."
                  }
                </>
              ),
              icon: "🌉",
            },
            {
              title: "Crowd Liquidity by Eco",
              description: (
                <>
                  {"An implementation built by the "}
                  <LinkExternal href="https://eco.com/">Eco</LinkExternal>
                  {
                    " team, the Crowd Liquidity protocol enables stablecoin holders to passively contribute liquidity to the Eco network and earn yield in return. It functions as a shared and permissionless liquidity pool that services stablecoin transactions across the entire Eco network."
                  }
                </>
              ),
              icon: "🌊",
            },
            {
              title: "Multi-Chain Vaults by Emblem Vault",
              description: (
                <>
                  {" "}
                  <LinkExternal href="https://emblem.vision/">
                    Emblem Vault
                  </LinkExternal>
                  {
                    " was designed to address the challenges of interoperability and flexibility in Web3. Functioning as a transferable multi-asset wallet, Emblem Vault enables users to manage a variety of digital assets (including crypto tokens and NFTs) across a broad spectrum of blockchains from a single interface."
                  }
                </>
              ),
              icon: "🪙",
            },
            {
              title: "Bitcoin Strategy Vaults by Vault Layer",
              description: (
                <>
                  {" "}
                  <LinkExternal href="https://vaultlayer.xyz/">
                    Vault Layer
                  </LinkExternal>
                  {
                    " has leveraged Lit to build cross-chain smart vaults that enable users to seamlessly control BTC and EVM assets from a single programmable account."
                  }
                </>
              ),
              icon: "🔐",
            },
            {
              title: "BestPath by Tria",
              description: (
                <>
                  {" "}
                  <LinkExternal href="https://www.tria.so/">Tria</LinkExternal>
                  {
                    " has built BestPath, an AI-driven intent resolution and marketplace that pre-computes the most optimal path for a user's intent. BestPath can interface with liquidity, dApps, and protocols across all VM types and blockchain ecosystems."
                  }
                </>
              ),
              icon: "🎯",
            },
          ].map((useCase, index) => (
            <div
              key={index}
              style={{
                padding: "20px",
                backgroundColor: "#f8fafc",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>
                {useCase.icon}
              </div>
              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  color: "#1f2937",
                }}
              >
                {useCase.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.9rem",
                  color: "#6b7280",
                  lineHeight: "1.5",
                }}
              >
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </GreyBoarderWhiteBgContainer>
    </div>
  );
};

export default LitActionsOverview;
