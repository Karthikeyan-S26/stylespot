import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'be', label: 'BE' },
  ];

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  const getCurrentLanguageLabel = () => {
    const currentLang = languages.find((lang) => lang.code === i18n.language);
    return currentLang ? currentLang.label : 'EN';
  };

  return (
    <div className="relative">
      <button
        className="flex items-center text-gray-800 hover:text-primary-500 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-5 h-5 mr-1" />
        <span className="text-sm font-medium">{getCurrentLanguageLabel()}</span>
        <ChevronDown className="w-4 h-4 ml-1" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg z-50"
          >
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    i18n.language === language.code
                      ? 'text-primary-500 font-medium bg-gray-50'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {language.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;