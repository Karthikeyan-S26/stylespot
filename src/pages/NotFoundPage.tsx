import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ShoppingBag } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-primary-500 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Page Not Found</h2>
          <p className="text-gray-600 mb-10 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="bg-primary-500 text-white font-medium px-6 py-3 rounded-md hover:bg-primary-600 transition-colors flex items-center"
            >
              <Home className="mr-2 w-5 h-5" />
              Go to Homepage
            </Link>
            <Link
              to="/products/all"
              className="bg-white border border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-md hover:bg-gray-50 transition-colors flex items-center"
            >
              <ShoppingBag className="mr-2 w-5 h-5" />
              Browse Products
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;