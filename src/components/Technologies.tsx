import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface TechnologiesProps {
  language: string;
}

const Technologies: React.FC<TechnologiesProps> = ({ language }) => {
  const translations = {
    pt: {
      title: 'Tecnologias e Ferramentas',
      subtitle: 'Ferramentas que uso no meu dia a dia'
    },
    en: {
      title: 'Technologies and Tools',
      subtitle: 'Tools I use in my daily work'
    }
  };

  const t = translations[language as keyof typeof translations];

  const technologies = [
    { 
      name: 'Python', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      color: 'from-blue-500 to-yellow-500'
    },
    { 
      name: 'VB.NET', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg',
      color: 'from-purple-500 to-blue-500'
    },
    { 
      name: 'Flutter', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
      color: 'from-blue-400 to-cyan-500'
    },
    { 
      name: 'HTML5', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      color: 'from-orange-500 to-red-500'
    },
    { 
      name: 'CSS3', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      color: 'from-blue-500 to-blue-700'
    },
    { 
      name: 'JavaScript', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      color: 'from-yellow-400 to-yellow-600'
    },
    { 
      name: 'SQL', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      color: 'from-blue-600 to-orange-500'
    },
    { 
      name: 'Git', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      color: 'from-red-500 to-orange-500'
    },
    { 
      name: 'VS Code', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
      color: 'from-blue-500 to-blue-700'
    },
    { 
      name: 'Photoshop', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
      color: 'from-blue-800 to-blue-900'
    }
  ];

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Animation variants for each item
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <section id="technologies" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t.subtitle}</p>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
        </ScrollReveal>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {technologies.map((tech, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform"
            >
              <div className="relative mb-4 w-20 h-20 flex items-center justify-center">
                {/* Animated gradient background */}
                <motion.div 
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${tech.color} opacity-10`}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.2
                  }}
                />
                
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-16 h-16 relative z-10 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              
              <p className="font-medium text-lg relative">
                {tech.name}
                <motion.span 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;