import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus, ChevronRight, ChevronLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/product';

interface ProductQuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({ 
  product, 
  isOpen, 
  onClose 
}) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  if (!isOpen) return null;

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
      price: product.price,
      image: product.images[0],
      quantity: quantity,
    });
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const nextImage = () => {
    setCurrentImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Image */}
            <div className="relative h-64 md:h-full">
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-1 rounded-full hover:bg-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-1 rounded-full hover:bg-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              
              {/* Image Thumbnails */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImage ? 'bg-primary-500' : 'bg-white/70 hover:bg-white'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    ></button>
                  ))}
                </div>
              )}
              
              {/* Sale Badge */}
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6 overflow-y-auto max-h-[60vh] md:max-h-[90vh]">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h2>
              
              <div className="flex items-center mb-4">
                {product.discount > 0 ? (
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900">
                      ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500 line-through ml-2">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              {/* Product Availability */}
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
              
              {/* Quantity Selector */}
              {product.inStock && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('cart.quantity')}
                  </label>
                  <div className="flex items-center">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className={`p-2 border rounded-l-md ${
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
                      className="p-2 w-12 text-center border-t border-b text-gray-700 focus:outline-none"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="p-2 border rounded-r-md bg-white text-gray-700 hover:bg-gray-50"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex items-center justify-center py-3 px-4 rounded-md ${
                    product.inStock
                      ? 'bg-primary-500 text-white hover:bg-primary-600'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  } transition-colors duration-300`}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {t('products.addToCart')}
                </button>
                
                <Link
                  to={`/product/${product.id}`}
                  className="text-center py-3 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                  onClick={onClose}
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductQuickViewModal;