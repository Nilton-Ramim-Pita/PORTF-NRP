import React from 'react';
import { Heart, Mail, Phone, MapPin, Github, Linkedin, Instagram, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';

interface FooterProps {
  language: string;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const translations = {
    pt: {
      rights: 'Todos os direitos reservados',
      madeWith: 'Feito com',
      by: 'por',
      quickLinks: 'Links Rápidos',
      contact: 'Contato',
      followMe: 'Siga-me',
      home: 'Início',
      about: 'Sobre',
      services: 'Serviços',
      projects: 'Projetos',
      skills: 'Habilidades',
      testimonials: 'Depoimentos',
      location: 'Moçambique',
      email: 'ramimpita65@gmail.com',
      phone1: '+258 87 645 0559',
      phone2: '+258 84 406 0984',
      newsletter: 'Newsletter',
      newsletterText: 'Inscreva-se para receber atualizações',
      subscribe: 'Inscrever'
    },
    en: {
      rights: 'All rights reserved',
      madeWith: 'Made with',
      by: 'by',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      followMe: 'Follow Me',
      home: 'Home',
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      skills: 'Skills',
      testimonials: 'Testimonials',
      location: 'Mozambique',
      email: 'ramimpita65@gmail.com',
      phone1: '+258 87 645 0559',
      phone2: '+258 84 406 0984',
      newsletter: 'Newsletter',
      newsletterText: 'Subscribe to receive updates',
      subscribe: 'Subscribe'
    }
  };

  const t = translations[language as keyof typeof translations];
  const currentYear = new Date().getFullYear();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const socialVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: custom * 0.1
      }
    }),
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#fe2c55] to-[#25f4ee]"></div>
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#fe2c55] rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-[#25f4ee] rounded-full filter blur-3xl opacity-10"></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Logo and About */}
          <motion.div variants={itemVariants}>
            <Logo />
            <p className="mt-4 text-gray-400 mb-4">
              &copy; {currentYear} Nilton Ramim Pita. {t.rights}.
            </p>
            <p className="flex items-center text-gray-400">
              {t.madeWith} <Heart className="w-4 h-4 text-[#fe2c55] mx-1" fill="#fe2c55" /> {t.by} Nilton Ramim Pita
            </p>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              {t.quickLinks}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#fe2c55] to-[#25f4ee]"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors hover:pl-2 inline-block">
                  {t.home}
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors hover:pl-2 inline-block">
                  {t.about}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors hover:pl-2 inline-block">
                  {t.services}
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors hover:pl-2 inline-block">
                  {t.projects}
                </a>
              </li>
              <li>
                <a href="#skills" className="text-gray-400 hover:text-white transition-colors hover:pl-2 inline-block">
                  {t.skills}
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors hover:pl-2 inline-block">
                  {t.testimonials}
                </a>
              </li>
            </ul>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              {t.contact}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#fe2c55] to-[#25f4ee]"></span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-[#fe2c55] mr-3 mt-0.5" />
                <span className="text-gray-400">{t.location}</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-[#25f4ee] mr-3 mt-0.5" />
                <a href={`mailto:${t.email}`} className="text-gray-400 hover:text-white transition-colors">
                  {t.email}
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-[#fe2c55] mr-3 mt-0.5" />
                <a href={`tel:${t.phone1}`} className="text-gray-400 hover:text-white transition-colors">
                  {t.phone1}
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-[#25f4ee] mr-3 mt-0.5" />
                <a href={`tel:${t.phone2}`} className="text-gray-400 hover:text-white transition-colors">
                  {t.phone2}
                </a>
              </li>
            </ul>
          </motion.div>
          
          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              {t.newsletter}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#fe2c55] to-[#25f4ee]"></span>
            </h3>
            <p className="text-gray-400 mb-4">{t.newsletterText}</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#fe2c55] w-full"
              />
              <button 
                type="submit" 
                className="bg-gradient-to-r from-[#fe2c55] to-[#25f4ee] text-white px-4 py-2 rounded-r-lg hover:opacity-90 transition-opacity"
              >
                {t.subscribe}
              </button>
            </form>
            
            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 text-gray-300">
                {t.followMe}
              </h4>
              <div className="flex space-x-3">
                <motion.a 
                  href="https://linkedin.com/in/nilton-ramim-a29bb0272" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#0077b5] transition-colors"
                  variants={socialVariants}
                  custom={0}
                  whileHover="hover"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="https://github.com/Niltonpro12" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#333] transition-colors"
                  variants={socialVariants}
                  custom={1}
                  whileHover="hover"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#1877f2] transition-colors"
                  variants={socialVariants}
                  custom={2}
                  whileHover="hover"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] transition-colors"
                  variants={socialVariants}
                  custom={3}
                  whileHover="hover"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Nilton Ramim Pita. {t.rights}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;