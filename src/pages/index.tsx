import DatilChainManager from "../components/DatilChainManager";
import { useAuth } from "../context/AuthContext";
import { MainLayout } from "../layouts/MainLayout";

export const HomePage = () => {
  const { isAuthenticated } = useAuth();

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
