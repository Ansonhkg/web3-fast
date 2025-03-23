import { MainLayout } from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";
import DatilChainManager from "../components/DatilChainManager";

export const HomePage = () => {
  const { isAuthenticated, address } = useAuth();

  return (
    <MainLayout>
      <div className="home-page">
        <h1>Welcome to Web3 Fast</h1>
        <p>A quick start template for Web3 applications</p>

        {/* ----- Authentication Example ----- */}
        <h3>Authentication Example</h3>

        {isAuthenticated ? (
          <div className="authenticated-section">✅ Authenticated</div>
        ) : (
          <div className="unauthenticated-section">❌ Unauthenticated</div>
        )}
        <br />
        <DatilChainManager />
      </div>
    </MainLayout>
  );
};

export default HomePage;
