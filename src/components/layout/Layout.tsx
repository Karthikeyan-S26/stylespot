import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { LanguageProvider } from '../../context/LanguageContext';
import { CartProvider } from '../../context/CartContext';
import { AuthProvider } from '../../context/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default Layout;