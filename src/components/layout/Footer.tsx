import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ShoppingBag, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube 
} from 'lucide-react';
import NewsletterForm from '../ui/NewsletterForm';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.men'), path: '/products/men' },
    { name: t('nav.women'), path: '/products/women' },
    { name: t('nav.kids'), path: '/products/kids' },
    { name: t('nav.sale'), path: '/products/sale' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, url: '#', name: 'Facebook' },
    { icon: <Instagram className="w-5 h-5" />, url: '#', name: 'Instagram' },
    { icon: <Twitter className="w-5 h-5" />, url: '#', name: 'Twitter' },
    { icon: <Youtube className="w-5 h-5" />, url: '#', name: 'Youtube' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <ShoppingBag className="mr-2 text-primary-400" />
              <h3 className="text-xl font-heading font-bold">StyleSpot</h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              {t('footer.aboutDesc')}
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  aria-label={social.name}
                  className="bg-gray-800 p-2 rounded-full hover:bg-primary-500 transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-400">{t('footer.address')}</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-400">{t('footer.phone')}</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-400">{t('footer.email')}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('newsletter.title')}</h3>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;