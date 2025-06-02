import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { getRelatedProducts } from '../services/api';

export const useRelatedProducts = (productId: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getRelatedProducts(productId);
        setProducts(data);
      } catch (err) {
        setError('Failed to load related products');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchRelatedProducts();
    }
  }, [productId]);

  return { products, isLoading, error };
};