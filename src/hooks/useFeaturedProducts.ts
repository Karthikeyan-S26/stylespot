import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { getProducts } from '../services/api';

export const useFeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        // In a real app, we would fetch from API with a featured=true param
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load featured products');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return { products, isLoading, error };
};