export interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  images: string[];
  description: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  features?: string[];
  colors?: string[];
  sizes?: string[];
}