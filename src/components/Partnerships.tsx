import React from 'react';
import ScrollReveal from './ScrollReveal';
import { motion } from 'framer-motion';
import { ExternalLink, Users, Award, Star } from 'lucide-react';

interface PartnershipsProps {
  language: string;
}

const Partnerships: React.FC<PartnershipsProps> = ({ language }) => {
  const translations = {
    pt: {
      title: 'Clientes e Parcerias',
      subtitle: 'Empresas e pessoas com quem já trabalhei',
      viewMore: 'Ver Mais',
      partners: [
        {
          name: 'Nexus JR',
          description: 'Desenvolvimento de aplicações web e sistemas de gestão',
          logoText: 'NEXUS',
          logoSubtext: 'JR',
          color: '#fe2c55',
          icon: <Star className="w-6 h-6" />,
          projects: 12,
          years: 2,
          testimonial: 'Excelente trabalho no desenvolvimento de nossos sistemas internos.'
        },
        {
          name: 'INAGE, IP',
          description: 'Ensino de informática e suporte técnico',
          logoText: 'INAGE',
          logoSubtext: 'IP',
          color: '#25f4ee',
          icon: <Award className="w-6 h-6" />,
          projects: 8,
          years: 3,
          testimonial: 'Profissional dedicado e com excelente conhecimento técnico.'
        },
        {
          name: 'NCANGAZA MULTISERVICES',
          description: 'Gestão de equipe de vendas e estratégias comerciais',
          logoText: 'NCANGAZA',
          logoSubtext: 'MULTI',
          color: '#fe2c55',
          icon: <Users className="w-6 h-6" />,
          projects: 5,
          years: 2,
          testimonial: 'Contribuiu significativamente para o aumento das nossas vendas.'
        },
        {
          name: 'Clínica Saúde Total',
          description: 'Desenvolvimento de website e sistema de agendamento',
          logoText: 'SAÚDE',
          logoSubtext: 'TOTAL',
          color: '#25f4ee',
          icon: <Award className="w-6 h-6" />,
          projects: 3,
          years: 1,
          testimonial: 'Sistema de agendamento que revolucionou nosso atendimento.'
        }
      ]
    },
    en: {
      title: 'Clients and Partnerships',
      subtitle: 'Companies and people I have worked with',
      viewMore: 'View More',
      partners: [
        {
          name: 'Nexus JR',
          description: 'Development of web applications and management systems',
          logoText: 'NEXUS',
          logoSubtext: 'JR',
          color: '#fe2c55',
          icon: <Star className="w-6 h-6" />,
          projects: 12,
          years: 2,
          testimonial: 'Excellent work in developing our internal systems.'
        },
        {
          name: 'INAGE, IP',
          description: 'Teaching computer science and technical support',
          logoText: 'INAGE',
          logoSubtext: 'IP',
          color: '#25f4ee',
          icon: <Award className="w-6 h-6" />,
          projects: 8,
          years: 3,
          testimonial: 'Dedicated professional with excellent technical knowledge.'
        },
        {
          name: 'NCANGAZA MULTISERVICES',
          description: 'Management of sales team and commercial strategies',
          logoText: 'NCANGAZA',
          logoSubtext: 'MULTI',
          color: '#fe2c55',
          icon: <Users className="w-6 h-6" />,
          projects: 5,
          years: 2,
          testimonial: 'Significantly contributed to increasing our sales.'
        },
        {
          name: 'Total Health Clinic',
          description: 'Website development and scheduling system',
          logoText: 'HEALTH',
          logoSubtext: 'TOTAL',
          color: '#25f4ee',
          icon: <Award className="w-6 h-6" />,
          projects: 3,
          years: 1,
          testimonial: 'Scheduling system that revolutionized our service.'
        }
      ]
    }
  };

  const t = translations[language as keyof typeof translations];

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
    hidden: { opacity: 0, y: 30 },
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <section id="partnerships" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{ 
            backgroundImage: 'linear-gradient(#fe2c55 1px, transparent 1px), linear-gradient(to right, #fe2c55 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Animated shapes */}
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
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tiktok-gradient-text">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t.subtitle}</p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#fe2c55] to-[#25f4ee] mx-auto mt-4"></div>
        </ScrollReveal>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {t.partners.map((partner, index) => (
            <motion.div 
              key={index}
              className="relative"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full"
                variants={cardVariants}
                whileHover="hover"
              >
                {/* Top section with logo */}
                <div className="relative h-32 overflow-hidden">
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                      background: `linear-gradient(135deg, ${partner.color}, #25f4ee)`,
                    }}
                  ></div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-10 rounded-tr-full"></div>
                  
                  {/* Logo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-3xl font-bold tracking-wider">{partner.logoText}</div>
                      <div className="text-sm font-light tracking-widest">{partner.logoSubtext}</div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: partner.color }}>
                      {React.cloneElement(partner.icon, { className: "w-5 h-5 text-white" })}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{partner.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{partner.description}</p>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex justify-between mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{partner.projects}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {language === 'pt' ? 'Projetos' : 'Projects'}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{partner.years}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {language === 'pt' ? 'Anos' : 'Years'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Testimonial */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 italic relative">
                    <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: partner.color }}>
                      <span className="text-white text-xs">"</span>
                    </div>
                    {partner.testimonial}
                  </div>
                  
                  {/* View more link */}
                  <div className="mt-4 text-right">
                    <a 
                      href="#" 
                      className="inline-flex items-center text-sm font-medium" 
                      style={{ color: partner.color }}
                    >
                      {t.viewMore}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
              
              {/* Decorative corner */}
              <div 
                className="absolute top-0 right-0 w-16 h-16 transform translate-x-1/2 -translate-y-1/2 rotate-45"
                style={{ 
                  background: `linear-gradient(135deg, ${partner.color}, #25f4ee)`,
                  opacity: 0.7
                }}
              ></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partnerships;