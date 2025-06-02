import { Product } from '../types/product';
import { mockProducts } from './mockData';

// Simulate API calls with mock data
// In a real app, these would be actual API calls using fetch or axios

export const getProducts = async (category: string = 'all'): Promise<Product[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (category === 'all') {
    return mockProducts;
  }
  
  return mockProducts.filter(product => product.category === category);
};

export const getProductById = async (id: string): Promise<Product | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const product = mockProducts.find(p => p.id === id);
  return product || null;
};

export const getRelatedProducts = async (productId: string): Promise<Product[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const currentProduct = mockProducts.find(p => p.id === productId);
  
  if (!currentProduct) {
    return [];
  }
  
  // Return products from the same category
  return mockProducts
    .filter(p => p.category === currentProduct.category && p.id !== productId)
    .slice(0, 4);
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return first 6 products as "featured"
  return mockProducts.slice(0, 6);
};