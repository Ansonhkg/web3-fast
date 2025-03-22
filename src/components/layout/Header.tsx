import { Link } from "react-router-dom";
import { WalletButton } from "../common/WalletButton";
import { APP_INFO, FEATURES, NAVIGATION } from "../../_config";

export const Header = () => {
  return (
    <header className="header">
      <nav>
        <Link to="/" className="logo">
          {FEATURES.enableFlameAnimation && <span className="flame-icon">🔥</span>} {APP_INFO.name}
        </Link>
        <div className="nav-links">
          {NAVIGATION.main.map((link) => (
            <Link key={link.path} to={link.path}>
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
      <div className="header-controls">
        <WalletButton />
      </div>
    </header>
  );
};
