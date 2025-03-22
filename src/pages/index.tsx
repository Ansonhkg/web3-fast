import { MainLayout } from '../layouts/MainLayout';
import { useAuth } from '../context/AuthContext';

export const HomePage = () => {
  const { isAuthenticated, address } = useAuth();

  return (
    <MainLayout>
      <div className="home-page">
        <h1>Welcome to Web3 Fast</h1>
        <p>A quick start template for Web3 applications</p>
        
        {isAuthenticated ? (
          <div className="authenticated-section">
            <h2>Welcome, {address?.slice(0, 6)}...{address?.slice(-4)}</h2>
            <p>You are now connected with your wallet.</p>
          </div>
        ) : (
          <div className="unauthenticated-section">
            <h2>Connect Your Wallet</h2>
            <p>Please connect your wallet to access Web3 features.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default HomePage; 