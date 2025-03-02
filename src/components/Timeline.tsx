import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Award, Lightbulb } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface TimelineProps {
  language: string;
}

const Timeline: React.FC<TimelineProps> = ({ language }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const translations = {
    pt: {
      title: 'Minha Jornada',
      subtitle: 'Linha do tempo profissional',
      timeline: [
        {
          year: '2023',
          title: 'Programador na Nexus JR',
          description: 'Desenvolvimento de aplicações web e sistemas de gestão para empresas.',
          icon: <Briefcase />,
          color: 'blue',
          details: 'Liderei o desenvolvimento de sistemas de gestão empresarial utilizando VB.NET e SQL Server. Implementei soluções personalizadas para diversos setores, incluindo saúde, varejo e educação. Trabalhei com metodologias ágeis e práticas de desenvolvimento colaborativo.'
        },
        {
          year: '2022',
          title: 'Revendedor de Perfumes VILLA',
          description: 'Início de atividade como revendedor de perfumes, desenvolvendo habilidades de vendas e marketing.',
          icon: <Briefcase />,
          color: 'purple',
          details: 'Estabeleci uma rede de clientes e desenvolvi estratégias de marketing digital para aumentar as vendas. Implementei um sistema de gestão de estoque e relacionamento com clientes que resultou em um aumento de 40% nas vendas mensais.'
        },
        {
          year: '2021',
          title: 'Gerente de Vendas na NCANGAZA MULTISERVICES LDA',
          description: 'Gestão de equipe de vendas e desenvolvimento de estratégias comerciais.',
          icon: <Briefcase />,
          color: 'indigo',
          details: 'Coordenei uma equipe de 10 vendedores, estabelecendo metas e estratégias de vendas. Implementei um novo sistema de comissões que aumentou a produtividade da equipe em 35%. Desenvolvi relatórios analíticos para acompanhamento de desempenho e tomada de decisões estratégicas.'
        },
        {
          year: '2020',
          title: 'Primeiro projeto como programador',
          description: 'Desenvolvimento do primeiro sistema de gestão para uma loja local.',
          icon: <Lightbulb />,
          color: 'green',
          details: 'Desenvolvi um sistema completo de gestão de estoque e vendas para uma loja de eletrônicos. O sistema incluía controle de estoque, gestão de clientes, processamento de vendas e relatórios gerenciais. Esta experiência foi fundamental para consolidar meus conhecimentos em programação e banco de dados.'
        },
        {
          year: '2019',
          title: 'Professor e Técnico de Informática no INAGE, IP',
          description: 'Ensino de informática e suporte técnico no Instituto Nacional de Governo Eletrônico.',
          icon: <Award />,
          color: 'pink',
          details: 'Ministrei aulas de informática básica e avançada para servidores públicos. Realizei manutenção preventiva e corretiva em equipamentos de informática. Desenvolvi materiais didáticos personalizados para diferentes níveis de conhecimento técnico.'
        },
        {
          year: '2018',
          title: 'Início no mundo da informática',
          description: 'Primeiros passos na área de TI, com foco em montagem e reparação de computadores.',
          icon: <Calendar />,
          color: 'orange',
          details: 'Comecei minha jornada na área de TI realizando montagem e manutenção de computadores. Aprendi sobre hardware, sistemas operacionais e redes. Esta experiência inicial me proporcionou uma base sólida para compreender os fundamentos da tecnologia da informação.'
        }
      ]
    },
    en: {
      title: 'My Journey',
      subtitle: 'Professional timeline',
      timeline: [
        {
          year: '2023',
          title: 'Programmer at Nexus JR',
          description: 'Development of web applications and management systems for companies.',
          icon: <Briefcase />,
          color: 'blue',
          details: 'Led the development of business management systems using VB.NET and SQL Server. Implemented customized solutions for various sectors, including healthcare, retail, and education. Worked with agile methodologies and collaborative development practices.'
        },
        {
          year: '2022',
          title: 'VILLA Perfumes Reseller',
          description: 'Started activity as a perfume reseller, developing sales and marketing skills.',
          icon: <Briefcase />,
          color: 'purple',
          details: 'Established a customer network and developed digital marketing strategies to increase sales. Implemented an inventory and customer relationship management system that resulted in a 40% increase in monthly sales.'
        },
        {
          year: '2021',
          title: 'Sales Manager at NCANGAZA MULTISERVICES LDA',
          description: 'Management of sales team and development of commercial strategies.',
          icon: <Briefcase />,
          color: 'indigo',
          details: 'Coordinated a team of 10 salespeople, establishing sales goals and strategies. Implemented a new commission system that increased team productivity by 35%. Developed analytical reports for performance monitoring and strategic decision making.'
        },
        {
          year: '2020',
          title: 'First project as a programmer',
          description: 'Development of the first management system for a local store.',
          icon: <Lightbulb />,
          color: 'green',
          details: 'Developed a complete inventory and sales management system for an electronics store. The system included inventory control, customer management, sales processing, and management reports. This experience was fundamental to consolidate my knowledge in programming and databases.'
        },
        {
          year: '2019',
          title: 'Teacher and IT Technician at INAGE, IP',
          description: 'Teaching computer science and technical support at the National Institute of Electronic Government.',
          icon: <Award />,
          color: 'pink',
          details: 'Taught basic and advanced computer classes to public servants. Performed preventive and corrective maintenance on computer equipment. Developed customized teaching materials for different levels of technical knowledge.'
        },
        {
          year: '2018',
          title: 'Beginning in the IT world',
          description: 'First steps in the IT area, focusing on computer assembly and repair.',
          icon: <Calendar />,
          color: 'orange',
          details: 'Started my journey in IT by assembling and maintaining computers. Learned about hardware, operating systems, and networks. This initial experience provided me with a solid foundation for understanding the fundamentals of information technology.'
        }
      ]
    }
  };

  const t = translations[language as keyof typeof translations];

  // Get color classes based on color name
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string, bgLight: string, text: string, border: string, shadow: string }> = {
      blue: {
        bg: 'bg-blue-600',
        bgLight: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-600',
        shadow: 'shadow-blue-500/20'
      },
      purple: {
        bg: 'bg-purple-600',
        bgLight: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-600',
        shadow: 'shadow-purple-500/20'
      },
      indigo: {
        bg: 'bg-indigo-600',
        bgLight: 'bg-indigo-100 dark:bg-indigo-900/30',
        text: 'text-indigo-600 dark:text-indigo-400',
        border: 'border-indigo-600',
        shadow: 'shadow-indigo-500/20'
      },
      green: {
        bg: 'bg-green-600',
        bgLight: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-600 dark:text-green-400',
        border: 'border-green-600',
        shadow: 'shadow-green-500/20'
      },
      pink: {
        bg: 'bg-pink-600',
        bgLight: 'bg-pink-100 dark:bg-pink-900/30',
        text: 'text-pink-600 dark:text-pink-400',
        border: 'border-pink-600',
        shadow: 'shadow-pink-500/20'
      },
      orange: {
        bg: 'bg-orange-600',
        bgLight: 'bg-orange-100 dark:bg-orange-900/30',
        text: 'text-orange-600 dark:text-orange-400',
        border: 'border-orange-600',
        shadow: 'shadow-orange-500/20'
      }
    };

    return colorMap[color] || colorMap.blue;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: 10, transition: { duration: 0.3 } }
  };

  const lineVariants = {
    hidden: { height: 0 },
    visible: { height: "100%", transition: { duration: 1.5, ease: "easeInOut" } }
  };

  const detailsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.5 } }
  };

  const toggleDetails = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="timeline" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t.subtitle}</p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4"></div>
        </ScrollReveal>
        
        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Animated vertical line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 via-purple-600 to-blue-600 hidden md:block"
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
          
          <div className="space-y-16">
            {t.timeline.map((item, index) => {
              const colorClasses = getColorClasses(item.color);
              const isEven = index % 2 === 0;
              const isExpanded = expandedIndex === index;
              
              return (
                <motion.div 
                  key={index}
                  className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className={`md:w-1/2 mb-8 md:mb-0 flex justify-center ${isEven ? 'md:justify-start md:pl-12' : 'md:justify-end md:pr-12'}`}>
                    <motion.div 
                      className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md border-l-4 ${colorClasses.border} transform transition-all duration-300 ${colorClasses.shadow} hover:shadow-xl`}
                      whileHover={{ 
                        y: -10,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      }}
                      onClick={() => toggleDetails(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      <motion.h3 
                        className={`text-xl font-bold mb-2 ${colorClasses.text}`}
                        initial={{ x: 0 }}
                        animate={hoveredIndex === index ? { x: [0, -5, 5, -5, 5, 0] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {item.title}
                      </motion.h3>
                      <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                      
                      {/* Expanded details */}
                      <motion.div
                        variants={detailsVariants}
                        initial="hidden"
                        animate={isExpanded ? "visible" : "hidden"}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-gray-600 dark:text-gray-400">{item.details}</p>
                        </div>
                      </motion.div>
                      
                      {/* Show more/less indicator */}
                      <div className="mt-3 text-center">
                        <motion.div 
                          className={`w-6 h-1 mx-auto rounded-full ${colorClasses.bg}`}
                          animate={{ 
                            rotate: isExpanded ? 180 : 0,
                            y: isExpanded ? 2 : -2
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute top-2 right-2 opacity-10">
                        <motion.div
                          animate={{ 
                            rotate: [0, 5, 0, -5, 0],
                            scale: [1, 1.05, 1, 0.95, 1]
                          }}
                          transition={{ 
                            duration: 5, 
                            repeat: Infinity,
                            repeatType: "loop" 
                          }}
                          className="text-4xl"
                        >
                          {item.year}
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="z-10 relative">
                    <motion.div 
                      className={`flex items-center justify-center w-16 h-16 ${colorClasses.bg} rounded-full shadow-lg`}
                      whileHover="hover"
                      initial="initial"
                    >
                      <motion.div 
                        className="text-white"
                        variants={iconVariants}
                      >
                        {item.icon}
                      </motion.div>
                      
                      {/* Animated rings */}
                      <motion.div 
                        className="absolute inset-0 rounded-full border-2 border-white dark:border-gray-700 opacity-30"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0.1, 0.3]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          repeatType: "loop" 
                        }}
                      />
                    </motion.div>
                    
                    {/* Year badge */}
                    <motion.div 
                      className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 ${colorClasses.bgLight} px-3 py-1 rounded-full text-sm font-bold ${colorClasses.text} shadow-md`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {item.year}
                    </motion.div>
                  </div>
                  
                  <div className="md:w-1/2"></div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Final element at the bottom of timeline */}
          <motion.div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hidden md:block"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div 
              className="absolute inset-0 rounded-full border-4 border-blue-600 opacity-30"
              animate={{ 
                scale: [1, 2, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "loop" 
              }}
            />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
    </section>
  );
};

export default Timeline;