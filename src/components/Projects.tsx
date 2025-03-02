import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Code, Database, Server, X } from 'lucide-react';

interface ProjectsProps {
  language: string;
}

const Projects: React.FC<ProjectsProps> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const translations = {
    pt: {
      title: 'Projetos',
      subtitle: 'Trabalhos recentes',
      all: 'Todos',
      web: 'Web',
      systems: 'Sistemas',
      viewProject: 'Ver Projeto',
      viewCode: 'Ver Código',
      technologies: 'Tecnologias',
      role: 'Meu Papel',
      features: 'Funcionalidades',
      challenges: 'Desafios e Soluções',
      close: 'Fechar',
      projects: [
        {
          title: 'Sistema de Gestão de Clínica',
          category: 'systems',
          description: 'Sistema completo para gestão de clínicas médicas, incluindo agendamento, prontuário eletrônico e faturamento.',
          image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          technologies: ['VB.NET', 'SQL Server', 'Crystal Reports'],
          role: 'Desenvolvedor Full Stack',
          features: [
            'Agendamento inteligente com detecção de conflitos',
            'Prontuário eletrônico com histórico completo',
            'Módulo de faturamento integrado com convênios'
          ],
          challenges: 'O maior desafio foi integrar o sistema com diferentes convênios médicos, cada um com seu próprio formato de dados. Desenvolvi um módulo de adaptadores que converte automaticamente os dados para cada formato específico.',
          demoLink: 'https://clinica-demo.example.com',
          codeLink: 'https://github.com/niltonpita/clinica-sistema',
          feedback: 'O sistema reduziu em 40% o tempo gasto em tarefas administrativas e eliminou quase completamente os erros de agendamento.'
        },
        {
          title: 'E-commerce de Eletrônicos',
          category: 'web',
          description: 'Plataforma completa de e-commerce para venda de produtos eletrônicos, com sistema de pagamento integrado e gestão de estoque.',
          image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=901&q=80',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
          role: 'Desenvolvedor Frontend e Integração de Pagamentos',
          features: [
            'Catálogo dinâmico com filtros avançados',
            'Carrinho de compras com persistência',
            'Checkout seguro com múltiplas formas de pagamento'
          ],
          challenges: 'Implementar um sistema de pagamento seguro foi desafiador. Utilizei a API do Stripe com tokenização de dados sensíveis e implementei verificações adicionais de segurança para prevenir fraudes.',
          demoLink: 'https://tech-store.example.com',
          codeLink: 'https://github.com/niltonpita/tech-store',
          feedback: 'As vendas aumentaram 25% após o lançamento da nova plataforma, com uma redução significativa nas taxas de abandono de carrinho.'
        },
        {
          title: 'Sistema de Controle de Estoque',
          category: 'systems',
          description: 'Sistema para controle de estoque com relatórios e alertas de baixo estoque, integrado com fornecedores.',
          image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          technologies: ['Python', 'Django', 'PostgreSQL', 'Docker'],
          role: 'Desenvolvedor Backend e DevOps',
          features: [
            'Rastreamento em tempo real de níveis de estoque',
            'Previsão de demanda baseada em histórico',
            'Integração automática com fornecedores'
          ],
          challenges: 'O maior desafio foi implementar um algoritmo de previsão de demanda preciso. Utilizei técnicas de machine learning para analisar padrões históricos de vendas e prever necessidades futuras de estoque.',
          demoLink: 'https://inventory-system.example.com',
          codeLink: 'https://github.com/niltonpita/inventory-system',
          feedback: 'O sistema reduziu em 30% os custos de armazenamento e praticamente eliminou situações de falta de estoque.'
        },
        {
          title: 'Aplicativo de Gestão Financeira',
          category: 'systems',
          description: 'Aplicativo mobile para controle financeiro pessoal com categorização automática de despesas e visualização de relatórios.',
          image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1011&q=80',
          technologies: ['Flutter', 'Firebase', 'TensorFlow Lite'],
          role: 'Desenvolvedor Mobile e IA',
          features: [
            'Categorização automática de despesas usando IA',
            'Sincronização com contas bancárias',
            'Relatórios personalizados e metas financeiras'
          ],
          challenges: 'Implementar a categorização automática de despesas foi complexo. Treinei um modelo de machine learning com milhares de transações categorizadas e o otimizei para funcionar eficientemente em dispositivos móveis.',
          demoLink: 'https://finance-app.example.com',
          codeLink: 'https://github.com/niltonpita/finance-app',
          feedback: 'Os usuários relatam economia média de 15% em seus gastos mensais após começarem a usar o aplicativo regularmente.'
        },
        {
          title: 'Portal de Reservas para Hotel',
          category: 'web',
          description: 'Sistema completo de reservas online para hotel, com visualização de disponibilidade em tempo real e pagamento integrado.',
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          technologies: ['Vue.js', 'Laravel', 'MySQL', 'PayPal API'],
          role: 'Desenvolvedor Full Stack',
          features: [
            'Calendário interativo de disponibilidade',
            'Sistema de avaliações e comentários',
            'Painel administrativo completo para gestão'
          ],
          challenges: 'O maior desafio foi implementar um sistema de reservas que evitasse conflitos em tempo real. Utilizei WebSockets para sincronizar a disponibilidade entre todos os usuários ativos no site.',
          demoLink: 'https://hotel-booking.example.com',
          codeLink: 'https://github.com/niltonpita/hotel-booking',
          feedback: 'As reservas online aumentaram em 60% após a implementação do novo sistema, reduzindo significativamente os custos com comissões para plataformas de terceiros.'
        },
        {
          title: 'Sistema de Gestão Escolar',
          category: 'systems',
          description: 'Plataforma completa para gestão escolar, incluindo matrículas, notas, frequência e comunicação com pais e alunos.',
          image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1022&q=80',
          technologies: ['PHP', 'Laravel', 'MySQL', 'WebSockets'],
          role: 'Arquiteto de Software e Desenvolvedor Backend',
          features: [
            'Portal para pais com acompanhamento em tempo real',
            'Sistema de geração de boletins e históricos',
            'Módulo de comunicação interna e notificações'
          ],
          challenges: 'Desenvolver um sistema que atendesse às necessidades específicas de diferentes tipos de escolas foi desafiador. Criei uma arquitetura modular que permite ativar ou desativar funcionalidades conforme as necessidades de cada instituição.',
          demoLink: 'https://school-management.example.com',
          codeLink: 'https://github.com/niltonpita/school-management',
          feedback: 'A comunicação entre escola e pais melhorou significativamente, com 90% dos pais acessando regularmente o portal para acompanhar o desempenho dos filhos.'
        }
      ]
    },
    en: {
      title: 'Projects',
      subtitle: 'Recent work',
      all: 'All',
      web: 'Web',
      systems: 'Systems',
      viewProject: 'View Project',
      viewCode: 'View Code',
      technologies: 'Technologies',
      role: 'My Role',
      features: 'Features',
      challenges: 'Challenges and Solutions',
      close: 'Close',
      projects: [
        {
          title: 'Clinic Management System',
          category: 'systems',
          description: 'Complete system for medical clinic management, including scheduling, electronic medical records, and billing.',
          image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          technologies: ['VB.NET', 'SQL Server', 'Crystal Reports'],
          role: 'Full Stack Developer',
          features: [
            'Smart scheduling with conflict detection',
            'Electronic medical records with complete history',
            'Billing module integrated with health insurance'
          ],
          challenges: 'The biggest challenge was integrating the system with different health insurance providers, each with its own data format. I developed an adapter module that automatically converts data to each specific format.',
          demoLink: 'https://clinica-demo.example.com',
          codeLink: 'https://github.com/niltonpita/clinica-sistema',
          feedback: 'The system reduced administrative tasks time by 40% and almost completely eliminated scheduling errors.'
        },
        {
          title: 'Electronics E-commerce',
          category: 'web',
          description: 'Complete e-commerce platform for selling electronic products, with integrated payment system and inventory management.',
          image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=901&q=80',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
          role: 'Frontend Developer and Payment Integration',
          features: [
            'Dynamic catalog with advanced filters',
            'Shopping cart with persistence',
            'Secure checkout with multiple payment methods'
          ],
          challenges: 'Implementing a secure payment system was challenging. I used the Stripe API with tokenization of sensitive data and implemented additional security checks to prevent fraud.',
          demoLink: 'https://tech-store.example.com',
          codeLink: 'https://github.com/niltonpita/tech-store',
          feedback: 'Sales increased by 25% after the launch of the new platform, with a significant reduction in cart abandonment rates.'
        },
        {
          title: 'Inventory Control System',
          category: 'systems',
          description: 'System for inventory control with reports and low stock alerts, integrated with suppliers.',
          image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          technologies: ['Python', 'Django', 'PostgreSQL', 'Docker'],
          role: 'Backend Developer and DevOps',
          features: [
            'Real-time tracking of inventory levels',
            'Demand forecasting based on history',
            'Automatic integration with suppliers'
          ],
          challenges: 'The biggest challenge was implementing an accurate demand forecasting algorithm. I used machine learning techniques to analyze historical sales patterns and predict future inventory needs.',
          demoLink: 'https://inventory-system.example.com',
          codeLink: 'https://github.com/niltonpita/inventory-system',
          feedback: 'The system reduced storage costs by 30% and virtually eliminated out-of-stock situations.'
        },
        {
          title: 'Financial Management App',
          category: 'systems',
          description: 'Mobile application for personal financial control with automatic expense categorization and report visualization.',
          image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxM jA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1011&q=80',
          technologies: ['Flutter', 'Firebase', 'TensorFlow Lite'],
          role: 'Mobile Developer and AI',
          features: [
            'Automatic expense categorization using AI',
            'Synchronization with bank accounts',
            'Custom reports and financial goals'
          ],
          challenges: 'Implementing automatic expense categorization was complex. I trained a machine learning model with thousands of categorized transactions and optimized it to work efficiently on mobile devices.',
          demoLink: 'https://finance-app.example.com',
          codeLink: 'https://github.com/niltonpita/finance-app',
          feedback: 'Users report an average savings of 15% in their monthly expenses after starting to use the app regularly.'
        },
        {
          title: 'Hotel Booking Portal',
          category: 'web',
          description: 'Complete online booking system for hotels, with real-time availability visualization and integrated payment.',
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          technologies: ['Vue.js', 'Laravel', 'MySQL', 'PayPal API'],
          role: 'Full Stack Developer',
          features: [
            'Interactive availability calendar',
            'Review and comment system',
            'Complete administrative panel for management'
          ],
          challenges: 'The biggest challenge was implementing a booking system that avoided conflicts in real time. I used WebSockets to synchronize availability among all active users on the site.',
          demoLink: 'https://hotel-booking.example.com',
          codeLink: 'https://github.com/niltonpita/hotel-booking',
          feedback: 'Online bookings increased by 60% after implementing the new system, significantly reducing costs with commissions to third-party platforms.'
        },
        {
          title: 'School Management System',
          category: 'systems',
          description: 'Complete platform for school management, including enrollments, grades, attendance, and communication with parents and students.',
          image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1022&q=80',
          technologies: ['PHP', 'Laravel', 'MySQL', 'WebSockets'],
          role: 'Software Architect and Backend Developer',
          features: [
            'Parent portal with real-time monitoring',
            'Report card and transcript generation system',
            'Internal communication and notification module'
          ],
          challenges: 'Developing a system that met the specific needs of different types of schools was challenging. I created a modular architecture that allows activating or deactivating features according to the needs of each institution.',
          demoLink: 'https://school-management.example.com',
          codeLink: 'https://github.com/niltonpita/school-management',
          feedback: 'Communication between school and parents improved significantly, with 90% of parents regularly accessing the portal to monitor their children\'s performance.'
        }
      ]
    }
  };

  const t = translations[language as keyof typeof translations];

  const filteredProjects = activeCategory === 'all' 
    ? t.projects 
    : t.projects.filter(project => project.category === activeCategory);

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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tiktok-gradient-text">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t.subtitle}</p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#fe2c55] to-[#25f4ee] mx-auto mt-4"></div>
        </ScrollReveal>
        
        <ScrollReveal className="flex justify-center mb-12" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <motion.button 
              onClick={() => setActiveCategory('all')} 
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === 'all' 
                  ? 'bg-gradient-to-r from-[#fe2c55] to-[#25f4ee] text-white shadow-lg' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.all}
            </motion.button>
            <motion.button 
              onClick={() => setActiveCategory('web')} 
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === 'web' 
                  ? 'bg-gradient-to-r from-[#fe2c55] to-[#25f4ee] text-white shadow-lg' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.web}
            </motion.button>
            <motion.button 
              onClick={() => setActiveCategory('systems')} 
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === 'systems' 
                  ? 'bg-gradient-to-r from-[#fe2c55] to-[#25f4ee] text-white shadow-lg' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.systems}
            </motion.button>
          </div>
        </ScrollReveal>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="h-full"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col tiktok-card">
                <div className="relative h-48 overflow-hidden group">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="flex space-x-2">
                      <a 
                        href={project.demoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-[#fe2c55] text-white rounded-full text-sm flex items-center hover:bg-[#ff3b64] transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        {t.viewProject}
                      </a>
                      <a 
                        href={project.codeLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-[#25f4ee] text-white rounded-full text-sm flex items-center hover:bg-[#3afff9] transition-colors"
                      >
                        <Github className="w-3 h-3 mr-1" />
                        {t.viewCode}
                      </a>
                    </div>
                  </div>
                  
                  {/* Category badge */}
                  <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-[#fe2c55] to-[#25f4ee] text-white text-xs rounded-full uppercase tracking-wider">
                    {project.category}
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="px-6 pb-6">
                  <motion.button 
                    className="w-full px-4 py-2 bg-gradient-to-r from-[#fe2c55] to-[#25f4ee] hover:from-[#ff3b64] hover:to-[#3afff9] text-white rounded-lg shadow transition-all flex items-center justify-center"
                    whileHover={{ y: -3 }}
                    whileTap={{ y: 0 }}
                    onClick={() => setSelectedProject(index)}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t.viewProject}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <div className="h-64 md:h-80 overflow-hidden">
                    <img 
                      src={filteredProjects[selectedProject].image} 
                      alt={filteredProjects[selectedProject].title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                      <h2 className="text-white text-3xl font-bold">{filteredProjects[selectedProject].title}</h2>
                      <p className="text-gray-300 mt-2">{filteredProjects[selectedProject].description}</p>
                    </div>
                  </div>
                  
                  <button 
                    className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-3 flex items-center text-gray-900 dark:text-white">
                        <Code className="w-5 h-5 mr-2 text-[#fe2c55]" />
                        {t.technologies}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {filteredProjects[selectedProject].technologies.map((tech, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-3 flex items-center text-gray-900 dark:text-white">
                        <Database className="w-5 h-5 mr-2 text-[#25f4ee]" />
                        {t.role}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">{filteredProjects[selectedProject].role}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-3 flex items-center text-gray-900 dark:text-white">
                        <Server className="w-5 h-5 mr-2 text-[#fe2c55]" />
                        {t.features}
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        {filteredProjects[selectedProject].features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{t.challenges}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{filteredProjects[selectedProject].challenges}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Feedback</h3>
                      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-[#25f4ee]">
                        <p className="text-gray-700 dark:text-gray-300 italic">{filteredProjects[selectedProject].feedback}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <a 
                        href={filteredProjects[selectedProject].demoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-[#fe2c55] to-[#fe2c55] hover:from-[#ff3b64] hover:to-[#ff3b64] text-white rounded-lg shadow text-center font-medium flex items-center justify-center"
                      >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        {t.viewProject}
                      </a>
                      <a 
                        href={filteredProjects[selectedProject].codeLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-[#25f4ee] to-[#25f4ee] hover:from-[#3afff9] hover:to-[#3afff9] text-white rounded-lg shadow text-center font-medium flex items-center justify-center"
                      >
                        <Github className="w-5 h-5 mr-2" />
                        {t.viewCode}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;