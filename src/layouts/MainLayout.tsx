import { ReactNode } from 'react';
import { Header } from '../components/layout/Header';
import { APP_INFO } from '../_config';

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="main-layout">
      <div className="layout-container">
        <Header />
        <main className="content">
          {children}
        </main>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} {APP_INFO.copyright}</p>
        </footer>
      </div>
    </div>
  );
}; 