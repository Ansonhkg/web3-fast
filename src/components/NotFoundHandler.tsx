import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { pageStyles } from "../styles/pageStyles";

const LEGACY_DOMAIN = import.meta.env.VITE_LEGACY_DOCS_DOMAIN;

interface CheckState {
  isChecking: boolean;
  routeExists: boolean;
}

export const NotFoundHandler = () => {
  const location = useLocation();
  const [state, setState] = useState<CheckState>({
    isChecking: true,
    routeExists: false,
  });

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const checkLegacyRoute = async () => {
      try {
        // Create a timeout signal
        const timeoutSignal = AbortSignal.timeout(5000);

        const response = await fetch(`${LEGACY_DOMAIN}${location.pathname}`, {
          method: "HEAD",
          mode: "cors",
          signal: timeoutSignal,
        });

        if (!cancelled) {
          if (response.ok) {
            // Redirect to legacy docs
            window.location.href = `${LEGACY_DOMAIN}${location.pathname}${location.search}${location.hash}`;
          } else {
            setState({ isChecking: false, routeExists: false });
          }
        }
      } catch (error) {
        if (!cancelled) {
          // Network error or timeout - show 404
          console.warn("Failed to check legacy route:", error);
          setState({ isChecking: false, routeExists: false });
        }
      }
    };

    checkLegacyRoute();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [location]);

  // Show loading while checking legacy route
  if (state.isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Checking documentation...</p>
        </div>
      </div>
    );
  }

  // Show 404 page using pageStyles
  const errorPageStyles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f9f9f9",
    },
    content: {
      ...pageStyles.container,
      textAlign: "center" as const,
      maxWidth: "600px",
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "40px",
      marginBottom: "32px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
    errorNumber: {
      ...pageStyles.h1,
      fontSize: "4rem",
      fontWeight: "800",
      margin: "0 0 16px",
      lineHeight: "1",
    },
    errorTitle: {
      ...pageStyles.h2,
      border: "none",
      paddingBottom: "0",
      margin: "0 0 16px",
    },
    errorText: {
      ...pageStyles.p,
      margin: "0",
    },
    actions: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "16px",
      alignItems: "center",
    },
    homeButton: {
      ...pageStyles.button(),
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      minWidth: "160px",
      transition: "all 0.2s",
    },
    linkContainer: {
      display: "flex",
      gap: "24px",
      flexWrap: "wrap" as const,
      justifyContent: "center",
    },
    secondaryLink: {
      ...pageStyles.link,
      fontSize: "0.9rem",
      fontWeight: "500",
      transition: "color 0.2s",
    },
    helpBox: {
      marginTop: "24px",
      padding: "20px",
      backgroundColor: "#fffbeb",
      border: "1px solid #fbbf24",
      borderRadius: "8px",
      textAlign: "left" as const,
    },
    helpTitle: {
      ...pageStyles.h4,
      color: "#92400e",
      margin: "0 0 12px",
      fontSize: "1rem",
    },
    helpList: {
      ...pageStyles.ul,
      color: "#92400e",
      margin: "0",
      fontSize: "0.9rem",
    },
  };

  return (
    <div style={errorPageStyles.page}>
      <div style={errorPageStyles.content}>
        {/* Main Error Card */}
        <div style={errorPageStyles.card}>
          <h1 style={errorPageStyles.errorNumber}>404</h1>
          <h2 style={errorPageStyles.errorTitle}>Page Not Found</h2>
          <p style={errorPageStyles.errorText}>
            This page doesn't exist. It may have been moved, deleted, or you
            entered the wrong URL.
          </p>
        </div>

        {/* Actions */}
        <div style={errorPageStyles.actions}>
          <div style={errorPageStyles.linkContainer}>
            <a
              href={LEGACY_DOMAIN}
              target="_blank"
              rel="noopener noreferrer"
              style={errorPageStyles.secondaryLink}
            >
              📚 Browse Legacy Docs
            </a>
            <a
              href="https://t.me/+aa73FAF9Vp82ZjJh"
              style={errorPageStyles.secondaryLink}
            >
              💬 Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
