/**
 * WalletButton Component
 * 
 * A wrapper around Rainbow Kit's ConnectButton component.
 */
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FEATURES } from '../../_config';

interface WalletButtonProps {
  className?: string;
}

export const WalletButton = ({ 
  className = ''
}: WalletButtonProps) => {
  // Use Rainbow Kit's ConnectButton with configurable balance display
  return (
    <div className={`wallet-button ${className}`}>
      <ConnectButton showBalance={FEATURES.showWalletBalance} />
    </div>
  );
}; 