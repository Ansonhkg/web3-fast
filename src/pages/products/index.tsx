import { Link } from 'react-router-dom';
import { MainLayout } from '../../layouts/MainLayout';

// Mock product data
const PRODUCTS = [
  { id: 1, name: 'Product 1', description: 'Description for product 1' },
  { id: 2, name: 'Product 2', description: 'Description for product 2' },
  { id: 3, name: 'Product 3', description: 'Description for product 3' },
];

export const ProductsPage = () => {
  return (
    <MainLayout>
      <div className="products-page">
        <h1>Products</h1>
        <div className="products-list">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="product-card">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <Link to={`/products/${product.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsPage; 