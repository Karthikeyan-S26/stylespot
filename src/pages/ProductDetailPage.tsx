import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, ChevronRight, Star, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/products/ProductCard';
import { useProduct } from '../hooks/useProduct';
import { useRelatedProducts } from '../hooks/useRelatedProducts';

const ProductDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { product, isLoading } = useProduct(id || '');
  const { products: relatedProducts, isLoading: relatedLoading } = useRelatedProducts(id || '');
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]\" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/products/all" 
            className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium"
          >
            Browse All Products <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    );
  }
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price * (1 - product.discount / 100),
      image: product.images[0],
      quantity: quantity,
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex mb-6 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary-500">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/products/${product.category}`} className="hover:text-primary-500">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Images */}
            <div className="p-6">
              <div className="mb-4 aspect-square overflow-hidden rounded-lg">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnails */}
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded border-2 overflow-hidden ${
                      selectedImage === index ? 'border-primary-500' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-6 border-t md:border-t-0 md:border-l border-gray-200">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-current' : ''
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
              </div>
              
              {/* Price */}
              <div className="mb-6">
                {product.discount > 0 ? (
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-gray-900">
                      ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                    </span>
                    <span className="text-xl text-gray-500 line-through ml-3">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="ml-3 bg-accent-500 text-white text-sm font-bold px-2 py-1 rounded">
                      Save {product.discount}%
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              {/* Description */}
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              {/* Availability */}
              <div className="mb-6">
                <p className="flex items-center text-sm">
                  <span className="mr-2 font-medium">Availability:</span>
                  {product.inStock ? (
                    <span className="text-success-500">In Stock</span>
                  ) : (
                    <span className="text-error-500">Out of Stock</span>
                  )}
                </p>
              </div>
              
              {/* Color & Size Options */}
              <div className="space-y-4 mb-6">
                {/* Color Options */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Color</h3>
                  <div className="flex space-x-2">
                    {['black', 'white', 'blue', 'red'].map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border ${
                          color === 'white' ? 'border-gray-300' : ''
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select ${color} color`}
                      ></button>
                    ))}
                  </div>
                </div>
                
                {/* Size Options */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                      <button
                        key={size}
                        className="px-3 py-1 border border-gray-300 rounded hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Quantity Selector & Add to Cart */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('cart.quantity')}
                  </label>
                  <div className="flex">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className={`p-3 border rounded-l-md ${
                        quantity <= 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="p-2 w-16 text-center border-t border-b text-gray-700 focus:outline-none"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="p-3 border rounded-r-md bg-white text-gray-700 hover:bg-gray-50"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-md ${
                    product.inStock
                      ? 'bg-primary-500 text-white hover:bg-primary-600'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  } transition-colors duration-300`}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {t('products.addToCart')}
                </button>
              </div>
              
              {/* Features */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <ul className="space-y-3">
                  <li className="flex">
                    <Truck className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-600">Free shipping on orders over $50</span>
                  </li>
                  <li className="flex">
                    <ShieldCheck className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-600">2 year extended warranty</span>
                  </li>
                  <li className="flex">
                    <RotateCcw className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-600">30 days return policy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {!relatedLoading && relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;