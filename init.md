# SPA Startup Template Guide

This document outlines the structure and setup for a React/TypeScript SPA using Vite that mimics Next.js-like features for rapid development.

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
config.ts            # Configuirable setting for the app
```

## Routing Configuration

1. Create a Next.js-inspired routing structure with a `./src/pages` directory
   - Regular files map to static routes (e.g., `about.tsx` → `/about`)
   - Files with brackets like `[id].tsx` create dynamic routes with parameters
   - `index.tsx` maps to the parent path

2. Set up React Router DOM with route generation:
   - Implement a utility to scan the pages directory
   - Generate routes based on file structure
   - Support for nested routes and dynamic segments

## State Management

1. Set up React Context for global state management:
   - Create a central AppContext for app-wide state
   - Implement specialized contexts for specific features (auth, theme, etc.)
   - Use reducers for complex state logic

2. Implement custom hooks for reusable state logic

## API Integration

1. Create a centralized API service:
   - Base API client with error handling
   - Type-safe request/response handling
   - Environment-based configuration

## Styling Approach

1. Configure CSS solution (choose one):
   - CSS Modules for component-scoped styles
   - Emotion/styled-components for CSS-in-JS
   - Tailwind CSS for utility-first styling

## Performance Optimization

1. Implement code-splitting:
   - Lazy loading for pages
   
