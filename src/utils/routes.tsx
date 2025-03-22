import { RouteObject } from 'react-router-dom';
import HomePage from '../pages/index';
import AboutPage from '../pages/about';
import ProductsPage from '../pages/products/index';
import ProductDetailPage from '../pages/products/[id]';

// Define routes based on the pages directory structure
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/products',
    element: <ProductsPage />,
  },
  {
    path: '/products/:id',
    element: <ProductDetailPage />,
  },
]; 