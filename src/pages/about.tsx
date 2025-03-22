import { MainLayout } from '../layouts/MainLayout';

export const AboutPage = () => {
  return (
    <MainLayout>
      <div className="about-page">
        <h1>About Web3 Fast</h1>
        <p>This is a starter template for building Web3 applications with React, TypeScript, and Rainbow Kit.</p>
        <p>Features:</p>
        <ul>
          <li>Next.js-like folder structure</li>
          <li>Rainbow Kit wallet integration</li>
          <li>TypeScript support</li>
          <li>React Router for page routing</li>
          <li>Vite for fast development</li>
        </ul>
      </div>
    </MainLayout>
  );
};

export default AboutPage; 