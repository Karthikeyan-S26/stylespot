import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image, link }) => {
  return (
    <Link to={link}>
      <motion.div 
        className="relative h-80 rounded-lg overflow-hidden shadow-md cursor-pointer"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
          <div className="flex items-center text-white text-sm font-medium group">
            <span>Shop Now</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;