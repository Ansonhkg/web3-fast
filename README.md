# Web3 Fast

A rapid development template for Web3 applications with React, TypeScript, Vite, and Rainbow Kit.

## Features

- **Next.js-like Structure**: Folder-based routing with a clean, organized project structure
- **Web3 Authentication**: Integrated Rainbow Kit for seamless wallet connections
- **TypeScript Support**: Strong typing throughout the application
- **Fast Development**: Powered by Vite for lightning-fast builds and HMR
- **React Router**: Configured with a clean routing system
- **Component Architecture**: Well-organized component hierarchy
- **Styling**: Clean, modern CSS with a structured approach

## Project Structure

```
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # Reusable UI components
│   ├── common/      # Common components (Button, Input, etc.)
│   └── layout/      # Layout components (Header, Footer, etc.)
├── context/         # React context providers
├── hooks/           # Custom React hooks
├── layouts/         # Page layout templates
├── pages/           # Route-based page components
│   ├── index.tsx    # Home page (/)
│   ├── about.tsx    # About page (/about)
│   └── products/    # Nested routes
│       ├── index.tsx          # Products list page (/products)
│       └── [id].tsx           # Dynamic product page (/products/:id)
├── services/        # API and external service integrations
├── styles/          # Global styles and theme definitions
├── types/           # TypeScript type definitions
└── utils/           # Utility functions and helpers
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/web3-fast.git
   cd web3-fast
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage

### Adding New Pages

1. Create a new file in the `src/pages` directory
   - For static routes: `src/pages/your-page.tsx`
   - For dynamic routes: `src/pages/[param].tsx` or `src/pages/your-section/[param].tsx`

2. Add the route to `src/utils/routes.tsx`

### Web3 Authentication

Rainbow Kit is pre-configured for easy wallet integration:

```tsx
import { useAuth } from '../context/AuthContext';

function YourComponent() {
  const { isAuthenticated, address } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Connected: {address}</p>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </div>
  );
}
```

## License

MIT

# Stack

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
