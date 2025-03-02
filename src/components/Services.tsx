import React from 'react';
import { Code, Palette, Megaphone, Wrench } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { motion } from 'framer-motion';

interface ServicesProps {
  language: string;
}

const Services: React.FC<ServicesProps> = ({ language }) => {
  const translations = {
    pt: {
      title: 'Serviços',
      subtitle: 'O que eu ofereço',
      contactButton: 'Adira nossos serviços',
      programming: {
        title: 'Programação',
        description: 'Desenvolvimento de aplicações web, sistemas de gestão e soluções personalizadas para o seu negócio.'
      },
      design: {
        title: 'Design',
        description: 'Criação de identidade visual, logos, banners e materiais gráficos para sua marca ou empresa.'
      },
      marketing: {
        title: 'Marketing Digital',
        description: 'Estratégias de marketing digital, gestão de redes sociais e campanhas publicitárias online.'
      },
      repair: {
        title: 'Montagem e Reparação',
        description: 'Montagem e reparação de computadores, celulares e outros dispositivos eletrônicos.'
      }
    },
    en: {
      title: 'Services',
      subtitle: 'What I offer',
      contactButton: 'Get our services',
      programming: {
        title: 'Programming',
        description: 'Development of web applications, management systems, and customized solutions for your business.'
      },
      design: {
        title: 'Design',
        description: 'Creation of visual identity, logos, banners, and graphic materials for your brand or company.'
      },
      marketing: {
        title: 'Digital Marketing',
        description: 'Digital marketing strategies, social media management, and online advertising campaigns.'
      },
      repair: {
        title: 'Assembly and Repair',
        description: 'Assembly and repair of computers, cell phones, and other electronic devices.'
      }
    }
  };

  const t = translations[language as keyof typeof translations];

  const services = [
    {
      icon: <Code className="w-12 h-12 text-blue-600" />,
      title: t.programming.title,
      description: t.programming.description,
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: <Palette className="w-12 h-12 text-purple-600" />,
      title: t.design.title,
      description: t.design.description,
      color: 'from-purple-500 to-purple-700'
    },
    {
      icon: <Megaphone className="w-12 h-12 text-pink-600" />,
      title: t.marketing.title,
      description: t.marketing.description,
      color: 'from-pink-500 to-pink-700'
    },
    {
      icon: <Wrench className="w-12 h-12 text-green-600" />,
      title: t.repair.title,
      description: t.repair.description,
      color: 'from-green-500 to-green-700'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t.subtitle}</p>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => (
            <ScrollReveal 
              key={index} 
              className="h-full"
              delay={index * 0.1}
            >
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 h-full flex flex-col relative overflow-hidden group"
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Gradient overlay that appears on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon with animated background */}
                <div className="mb-6 relative">
                  <motion.div 
                    className="absolute -inset-4 rounded-full bg-gray-100 dark:bg-gray-700 -z-10"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <div className="relative z-10">{service.icon}</div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 flex-grow">{service.description}</p>
                
                {/* Animated line that expands on hover */}
                <div className="w-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mt-4 group-hover:w-full transition-all duration-300"></div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
        
        <div className="flex justify-center">
          <motion.a 
            href="#contact" 
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-lg text-lg font-medium flex items-center justify-center"
            whileHover={{ scale: 1.05, boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {t.contactButton}
            <motion.span 
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Services;