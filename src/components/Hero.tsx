import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Cpu, Database } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeroProps {
  language: string;
  darkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ language, darkMode }) => {
  const { darkMode: contextDarkMode } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Mark as loaded after a short delay to prioritize core content
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const translations = {
    pt: {
      greeting: 'Olá, eu sou',
      name: 'Nilton Ramim Pita',
      title: ' Profissional de TI & Desenvolvedor',
      description: 'Especialista em programação, design, inteligência artificial e marketing digital.',
      contactButton: 'Entre em Contato',
      resumeButton: 'Ver Currículo',
      skills: ['Desenvolvimento Web', 'Sistemas de Gestão', 'Design UI/UX', 'Marketing Digital']
    },
    en: {
      greeting: 'Hello, I am',
      name: 'Nilton Ramim Pita',
      title: 'IT Professional & Developer',
      description: 'Specialist in programming, design, artificial intelligence and digital marketing.',
      contactButton: 'Contact Me',
      resumeButton: 'View Resume',
      skills: ['Web Development', 'Management Systems', 'UI/UX Design', 'Digital Marketing']
    }
  };

  const t = translations[language as keyof typeof translations];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: 0.6
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(254, 44, 85, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: 0.8 + (custom * 0.1)
      }
    })
  };

  const floatingIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 1 + (custom * 0.2)
      }
    }),
    float: (custom: number) => ({
      y: [0, -15, 0],
      x: [0, custom * 10, 0],
      rotate: [0, custom * 5, 0],
      transition: {
        duration: 4 + custom,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    })
  };

  return (
    <section id="home" className="py-20 md:py-32 relative overflow-hidden">
      {/* Modern animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"></div>
        
        {/* Animated shapes */}
        {isLoaded && (
          <>
            <motion.div 
              className="absolute top-20 left-10 w-72 h-72 bg-[#fe2c55] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <motion.div 
              className="absolute bottom-20 right-10 w-96 h-96 bg-[#25f4ee] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2
              }}
            />
          </>
        )}
        
        {/* TikTok-style grid pattern */}
        {isLoaded && (
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{ 
              backgroundImage: 'linear-gradient(#fe2c55 1px, transparent 1px), linear-gradient(to right, #fe2c55 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
        )}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p 
              className="text-[#fe2c55] dark:text-[#fe2c55] font-medium mb-2"
              variants={itemVariants}
            >
              {t.greeting}
            </motion.p>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4 tiktok-gradient-text"
              variants={itemVariants}
            >
              {t.name}
            </motion.h1>
            
            <motion.h2 
              className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-6"
              variants={itemVariants}
            >
              {t.title}
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg"
              variants={itemVariants}
            >
              {t.description}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 mb-8"
              variants={itemVariants}
            >
              <motion.a 
                href="#contact" 
                className="px-6 py-3 bg-gradient-to-r from-[#fe2c55] to-[#25f4ee] text-white rounded-lg shadow-lg flex items-center justify-center"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {t.contactButton}
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.a>
              
              <motion.a 
                href="#resume" 
                className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg transition-all"
                variants={buttonVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.resumeButton}
              </motion.a>
            </motion.div>
            
            {/* Skills list */}
            <div className="flex flex-wrap gap-3">
              {t.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm border border-gray-200 dark:border-gray-700 shadow-sm flex items-center"
                  variants={skillVariants}
                  custom={index}
                >
                  <span className="w-2 h-2 rounded-full bg-[#fe2c55] mr-2"></span>
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <div className="md:w-1/2 flex justify-center relative">
            {isLoaded ? (
              <div className="relative w-80 h-80">
                {/* Main image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative z-10"
                >
                  <img 
                    src="/nilton-hero.jpg" 
                    alt="Nilton Ramim Pita" 
                    className="w-full h-full object-cover rounded-full shadow-xl border-4 border-white dark:border-gray-800"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "https://i.ibb.co/Dfv8VZRL/nilton-hero.jpg";
                    }}
                  />
                </motion.div>
                
                {/* Floating icons */}
                <motion.div 
                  className="absolute top-0 right-0 w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center"
                  variants={floatingIconVariants}
                  initial="hidden"
                  animate={["visible", "float"]}
                  custom={1}
                >
                  <Code className="w-8 h-8 text-[#fe2c55]" />
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-10 left-0 w-14 h-14 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center"
                  variants={floatingIconVariants}
                  initial="hidden"
                  animate={["visible", "float"]}
                  custom={-1}
                >
                  <Database className="w-7 h-7 text-[#25f4ee]" />
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/2 left-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center"
                  variants={floatingIconVariants}
                  initial="hidden"
                  animate={["visible", "float"]}
                  custom={0.5}
                >
                  <Cpu className="w-6 h-6 text-[#fe2c55]" />
                </motion.div>
                
                {/* Decorative elements */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#fe2c55]/20 to-[#25f4ee]/20 blur-3xl -z-10"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </div>
            ) : (
              <div className="w-80 h-80 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;