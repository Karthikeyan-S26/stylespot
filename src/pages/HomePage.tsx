import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight, Truck, CreditCard, HeadphonesIcon, RefreshCw } from 'lucide-react';
import HeroCarousel from '../components/home/HeroCarousel';
import CategoryCard from '../components/home/CategoryCard';
import ProductCard from '../components/products/ProductCard';
import { useFeaturedProducts } from '../hooks/useFeaturedProducts';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { products, isLoading } = useFeaturedProducts();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
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

  const categories = [
    {
      id: 'men',
      title: t('categories.men'),
      image: 'https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/products/men',
    },
    {
      id: 'women',
      title: t('categories.women'),
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/products/women',
    },
    {
      id: 'kids',
      title: t('categories.kids'),
      image: 'https://images.pexels.com/photos/35188/child-childrens-baby-children-s.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/products/kids',
    },
  ];

  const features = [
    {
      icon: <Truck className="w-8 h-8 text-primary-500" />,
      title: t('features.delivery'),
      description: t('features.deliveryDesc'),
    },
    {
      icon: <CreditCard className="w-8 h-8 text-primary-500" />,
      title: t('features.payment'),
      description: t('features.paymentDesc'),
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8 text-primary-500" />,
      title: t('features.support'),
      description: t('features.supportDesc'),
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-primary-500" />,
      title: t('features.returns'),
      description: t('features.returnsDesc'),
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroCarousel />

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {categories.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <CategoryCard
                  title={category.title}
                  image={category.image}
                  link={category.link}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
              {t('products.trending')}
            </h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto"></div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {products.slice(0, 6).map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/products/all"
              className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium"
            >
              View All Products
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
              {t('features.title')}
            </h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto"></div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-100 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;