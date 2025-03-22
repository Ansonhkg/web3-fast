import { ReactNode, createContext, useContext } from 'react';
import { useAccount } from 'wagmi';

type AuthContextType = {
  isAuthenticated: boolean;
  address: string | undefined;
  chainId: number | undefined;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  address: undefined,
  chainId: undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isConnected, address, chainId } = useAccount();

  const value = {
    isAuthenticated: isConnected,
    address,
    chainId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext); 