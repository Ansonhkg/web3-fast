import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '../../layouts/MainLayout';
import { useAuth } from '../../context/AuthContext';

// Mock product data
const PRODUCTS = [
  { id: 1, name: 'Product 1', description: 'Description for product 1' },
  { id: 2, name: 'Product 2', description: 'Description for product 2' },
  { id: 3, name: 'Product 3', description: 'Description for product 3' },
];

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  
  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <MainLayout>
        <div className="product-not-found">
          <h1>Product Not Found</h1>
          <p>Sorry, the product you are looking for does not exist.</p>
          <Link to="/products">Back to Products</Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="product-detail">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        
        {isAuthenticated ? (
          <button className="buy-button">Buy Now</button>
        ) : (
          <p className="auth-required-message">Please connect your wallet to purchase this product.</p>
        )}
        
        <Link to="/products">Back to Products</Link>
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage; 