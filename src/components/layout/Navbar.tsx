import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.men'), path: '/products/men' },
    { name: t('nav.women'), path: '/products/women' },
    { name: t('nav.kids'), path: '/products/kids' },
    { name: t('nav.sale'), path: '/products/sale' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl md:text-2xl font-heading font-bold flex items-center">
            <ShoppingBag className="mr-2 text-primary-500" />
            <span className={`${isScrolled ? 'text-primary-800' : 'text-primary-800'}`}>
              StyleSpot
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium hover:text-primary-500 transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary-500'
                    : isScrolled
                    ? 'text-gray-800'
                    : 'text-gray-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Items */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />

            {/* Cart Icon with Badge */}
            <Link to="/cart" className="relative">
              <ShoppingBag className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Auth Links */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1">
                  <User className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`} />
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="p-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <div className="p-2">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                      {t('nav.account')}
                    </Link>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                      {t('nav.logout')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className={`font-medium hover:text-primary-500 transition-colors ${
                    isScrolled ? 'text-gray-800' : 'text-gray-800'
                  }`}
                >
                  {t('nav.login')}
                </Link>
                <Link 
                  to="/register" 
                  className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-800" />
              ) : (
                <Menu className="w-6 h-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-medium py-2 hover:text-primary-500 transition-colors ${
                      location.pathname === link.path
                        ? 'text-primary-500'
                        : 'text-gray-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <>
                    <Link
                      to="/login"
                      className="font-medium py-2 text-gray-800 hover:text-primary-500 transition-colors"
                    >
                      {t('nav.login')}
                    </Link>
                    <Link
                      to="/register"
                      className="bg-primary-500 text-white px-4 py-2 text-center rounded-md hover:bg-primary-600 transition-colors"
                    >
                      {t('nav.register')}
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;