/**
 * Custom hook for Rainbow Kit integration
 * Provides wallet connection and chain selection functionality
 */
import { useDisconnect } from 'wagmi';
import { useConnectModal, useChainModal } from '@rainbow-me/rainbowkit';

export const useRainbowKit = () => {
  const { disconnect } = useDisconnect();
  const { 
    openConnectModal,
    connectModalOpen 
  } = useConnectModal();
  
  const {
    openChainModal,
    chainModalOpen
  } = useChainModal();

  return {
    // Connection methods
    openConnectModal,
    disconnect,
    isConnecting: connectModalOpen,
    
    // Chain selection methods
    openChainModal,
    isChangingChain: chainModalOpen
  };
}; 