import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Eye, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ProductQuickViewModal from './ProductQuickViewModal';
import { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });
  };

  const openQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <Link to={`/product/${product.id}`}>
        <motion.div 
          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Product Image */}
          <div className="relative h-64 overflow-hidden">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover object-center"
            />
            
            {/* Quick View Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/30">
              <button
                onClick={openQuickView}
                className="bg-white text-gray-800 p-2 rounded-full hover:bg-primary-500 hover:text-white transition-colors duration-300"
                aria-label={t('products.quickView')}
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
            
            {/* Sale Badge */}
            {product.discount > 0 && (
              <span className="absolute top-2 left-2 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{product.discount}%
              </span>
            )}
          </div>
          
          {/* Product Info */}
          <div className="p-4">
            <div className="flex items-center mb-1">
              {/* Star Rating */}
              <div className="flex text-yellow-400 mr-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-current' : ''
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.reviews})</span>
            </div>
            
            <h3 className="text-lg font-medium text-gray-800 mb-1">{product.name}</h3>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {product.discount > 0 ? (
                  <>
                    <span className="text-lg font-bold text-gray-900">
                      ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${product.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`p-2 rounded-full ${
                  product.inStock
                    ? 'bg-primary-500 text-white hover:bg-primary-600'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                } transition-colors duration-300`}
                aria-label={product.inStock ? t('products.addToCart') : t('products.outOfStock')}
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
            
            {/* Out of Stock Label */}
            {!product.inStock && (
              <p className="text-sm text-error-500 font-medium mt-2">
                {t('products.outOfStock')}
              </p>
            )}
          </div>
        </motion.div>
      </Link>
      
      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <ProductQuickViewModal 
          product={product} 
          isOpen={isQuickViewOpen} 
          onClose={() => setIsQuickViewOpen(false)} 
        />
      )}
    </>
  );
};

export default ProductCard;