import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  language: string;
  changeLanguage: (lang: string) => void;
  hasShownWelcome?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  language, 
  changeLanguage
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled
      setIsScrolled(window.scrollY > 10);
      
      // Determine which section is currently in view
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  const translations = {
    pt: {
      home: 'Início',
      about: 'Sobre',
      services: 'Serviços',
      projects: 'Projetos',
      skills: 'Habilidades',
      testimonials: 'Depoimentos',
      certifications: 'Certificações',
      gallery: 'Galeria',
      contact: 'Contato'
    },
    en: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      skills: 'Skills',
      testimonials: 'Testimonials',
      certifications: 'Certifications',
      gallery: 'Gallery',
      contact: 'Contact'
    }
  };

  const t = translations[language as keyof typeof translations];

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'about', label: t.about },
    { id: 'services', label: t.services },
    { id: 'projects', label: t.projects },
    { id: 'skills', label: t.skills },
    { id: 'contact', label: t.contact }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md' : 'bg-white dark:bg-gray-800'
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(item => (
            <a 
              key={item.id}
              href={`#${item.id}`} 
              className={`transition-colors relative ${
                activeSection === item.id 
                  ? 'text-[#fe2c55] dark:text-[#fe2c55] font-medium' 
                  : 'hover:text-[#fe2c55] dark:hover:text-[#fe2c55]'
              }`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#fe2c55] to-[#25f4ee] rounded-full"></span>
              )}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="flex space-x-2 items-center">
            <motion.button 
              onClick={() => changeLanguage('pt')} 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                language === 'pt' 
                  ? 'bg-gradient-to-r from-[#fe2c55] to-[#25f4ee] text-white shadow-md' 
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              whileHover={{ scale: language === 'pt' ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🇧🇷 PT
            </motion.button>
            <motion.button 
              onClick={() => changeLanguage('en')} 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                language === 'en' 
                  ? 'bg-gradient-to-r from-[#fe2c55] to-[#25f4ee] text-white shadow-md' 
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              whileHover={{ scale: language === 'en' ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🇬🇧 EN
            </motion.button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white dark:bg-gray-800 shadow-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map(item => (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  className={`transition-colors py-2 px-4 rounded-lg ${
                    activeSection === item.id 
                      ? 'bg-gradient-to-r from-[#fe2c55] to-[#25f4ee] text-white font-medium' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </a>
              ))}
              <a href="#testimonials" className="py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={() => handleNavClick('testimonials')}>{t.testimonials}</a>
              <a href="#certifications" className="py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={() => handleNavClick('certifications')}>{t.certifications}</a>
              <a href="#gallery" className="py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={() => handleNavClick('gallery')}>{t.gallery}</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;