import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const NewsletterForm: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setIsSubmitting(false);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <motion.div 
          animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('newsletter.placeholder')}
            className={`w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500 border ${
              status === 'error' ? 'border-error-500' : 'border-gray-700'
            } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
            disabled={isSubmitting || status === 'success'}
          />
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`w-full bg-primary-500 text-white py-2 rounded-md font-medium hover:bg-primary-600 transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          type="submit"
          disabled={isSubmitting || status === 'success'}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('newsletter.button')}
            </span>
          ) : (
            t('newsletter.button')
          )}
        </motion.button>
      </form>
      
      {status === 'success' && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-success-400 text-sm"
        >
          {t('newsletter.success')}
        </motion.p>
      )}
      
      {status === 'error' && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-error-400 text-sm"
        >
          {t('newsletter.error')}
        </motion.p>
      )}
    </div>
  );
};

export default NewsletterForm;