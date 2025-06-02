import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { t } = useTranslation();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const shippingFee = cartItems.length > 0 ? 5.99 : 0;
  const tax = cartItems.length > 0 ? getCartTotal() * 0.1 : 0;
  
  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'discount10') {
      setCouponApplied(true);
      setCouponDiscount(getCartTotal() * 0.1);
    }
  };
  
  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8 flex items-center">
          <ShoppingCart className="mr-3 text-primary-500" />
          {t('cart.title')}
        </h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4 flex justify-center">
                <ShoppingCart className="w-16 h-16 text-gray-300" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('cart.empty')}</h2>
              <p className="text-gray-600 mb-6">Add some products to your cart and come back here to checkout.</p>
              <Link
                to="/products/all"
                className="inline-block bg-primary-500 text-white font-medium px-6 py-3 rounded-md hover:bg-primary-600 transition-colors duration-300"
              >
                {t('cart.continueShopping')}
              </Link>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Your Items</h2>
                </div>
                
                <ul>
                  {cartItems.map((item) => (
                    <motion.li
                      key={item.id}
                      variants={itemVariants}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <div className="p-6 flex flex-col sm:flex-row items-center">
                        {/* Product Image */}
                        <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Product Info */}
                        <div className="flex-1 px-4">
                          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                          <p className="text-primary-500 font-medium">${formatPrice(item.price)}</p>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center mt-4 sm:mt-0">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 border rounded-l-md bg-white text-gray-700 hover:bg-gray-50"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-1 border-t border-b text-center w-10">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 border rounded-r-md bg-white text-gray-700 hover:bg-gray-50"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          
                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-4 text-gray-500 hover:text-error-500 transition-colors"
                            aria-label={t('cart.remove')}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="p-6 bg-gray-50">
                  <Link
                    to="/products/all"
                    className="text-primary-500 hover:text-primary-600 font-medium flex items-center"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {t('cart.continueShopping')}
                  </Link>
                </div>
              </motion.div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24"
              >
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Order Summary</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('cart.subtotal')}</span>
                    <span className="font-medium">${formatPrice(getCartTotal())}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('cart.shipping')}</span>
                    <span className="font-medium">${formatPrice(shippingFee)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('cart.tax')}</span>
                    <span className="font-medium">${formatPrice(tax)}</span>
                  </div>
                  
                  {couponApplied && (
                    <div className="flex justify-between text-success-500">
                      <span>Discount (10%)</span>
                      <span>-${formatPrice(couponDiscount)}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>{t('cart.total')}</span>
                      <span>${formatPrice(getCartTotal() + shippingFee + tax - couponDiscount)}</span>
                    </div>
                  </div>
                  
                  {/* Coupon Code */}
                  <div className="mt-6">
                    <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                      Apply Coupon Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        disabled={couponApplied}
                      />
                      <button
                        onClick={applyCoupon}
                        disabled={couponApplied || !couponCode}
                        className={`px-4 py-2 rounded-r-md font-medium ${
                          couponApplied || !couponCode
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-primary-500 text-white hover:bg-primary-600'
                        }`}
                      >
                        Apply
                      </button>
                    </div>
                    {couponApplied && (
                      <p className="text-sm text-success-500 mt-1">Coupon applied successfully!</p>
                    )}
                  </div>
                  
                  {/* Checkout Button */}
                  <button className="w-full bg-primary-500 text-white font-medium py-3 rounded-md hover:bg-primary-600 transition-colors duration-300 mt-6">
                    {t('cart.checkout')}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;