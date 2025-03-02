import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { Code, Briefcase, GraduationCap } from 'lucide-react';

interface AboutProps {
  language: string;
}

const About: React.FC<AboutProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState('skills');

  const translations = {
    pt: {
      title: 'Sobre Mim',
      subtitle: 'Conheça minha história',
      description: 'Sou Nilton Ramim Pita, um profissional de TI e desenvolvedor apaixonado por tecnologia e inovação. Com experiência em programação, design e marketing digital, busco sempre criar soluções eficientes e criativas para os desafios tecnológicos.',
      skills: 'Habilidades',
      experience: 'Experiência',
      education: 'Educação',
      skillsList: [
        'Desenvolvimento de Sistemas',
        'Programação em VB.NET e Python',
        'Desenvolvimento Web',
        'Design Gráfico',
        'Montagem e Manutenção de Computadores',
        'Redes de Computadores',
        'Marketing Digital',
        'Gestão de Projetos'
      ],
      experienceList: [
        {
          position: 'Programador',
          company: 'Nexus JR',
          period: '2023 - Presente',
          description: 'Desenvolvimento de aplicações web e sistemas de gestão para empresas.'
        },
        {
          position: 'Gerente de Vendas',
          company: 'NCANGAZA MULTISERVICES LDA',
          period: '2021 - 2023',
          description: 'Gestão de equipe de vendas e desenvolvimento de estratégias comerciais.'
        },
        {
          position: 'Professor e Técnico de Informática',
          company: 'Instituto Nacional de Governo Eletrônico (INAGE, IP)',
          period: '2019 - 2021',
          description: 'Ensino de informática e suporte técnico.'
        }
      ],
      educationList: [
        {
          degree: 'Ensino Superior',
          institution: 'Universidade Católica de Moçambique (UCM)',
          period: '2018 - 2022',
          description: 'Formação em Tecnologia da Informação.'
        },
        {
          degree: 'Curso de Redes Cisco - CCNA',
          institution: 'Cisco',
          period: '2022',
          description: 'Certificação em redes de computadores e infraestrutura de TI.'
        },
        {
          degree: 'Desenvolvimento Web Full Stack',
          institution: 'Universidade Católica de Moçambique',
          period: '2020',
          description: 'Curso de desenvolvimento web com foco em tecnologias front-end e back-end.'
        }
      ]
    },
    en: {
      title: 'About Me',
      subtitle: 'Get to know my story',
      description: 'Hello! I am Nilton Ramim Pita, an IT professional and developer passionate about technology and innovation. With experience in programming, design, and digital marketing, I always seek to create efficient and creative solutions for technological challenges.',
      skills: 'Skills',
      experience: 'Experience',
      education: 'Education',
      skillsList: [
        'Systems Development',
        'VB.NET and Python Programming',
        'Web Development',
        'Graphic Design',
        'Computer Assembly and Maintenance',
        'Computer Networks',
        'Digital Marketing',
        'Project Management'
      ],
      experienceList: [
        {
          position: 'Programmer',
          company: 'Nexus JR',
          period: '2023 - Present',
          description: 'Development of web applications and management systems for companies.'
        },
        {
          position: 'Sales Manager',
          company: 'NCANGAZA MULTISERVICES LDA',
          period: '2021 - 2023',
          description: 'Management of sales team and development of commercial strategies.'
        },
        {
          position: 'Teacher and IT Technician',
          company: 'National Institute of Electronic Government (INAGE, IP)',
          period: '2019 - 2021',
          description: 'Teaching computer science and technical support.'
        }
      ],
      educationList: [
        {
          degree: 'Higher Education',
          institution: 'Catholic University of Mozambique (UCM)',
          period: '2018 - 2022',
          description: 'Degree in Information Technology.'
        },
        {
          degree: 'Cisco Networks Course - CCNA',
          institution: 'Cisco',
          period: '2022',
          description: 'Certification in computer networks and IT infrastructure.'
        },
        {
          degree: 'Full Stack Web Development',
          institution: 'Catholic University of Mozambique',
          period: '2020',
          description: 'Web development course focusing on front-end and back-end technologies.'
        }
      ]
    }
  };

  const t = translations[language as keyof typeof translations];

  const tabVariants = {
    active: {
      borderColor: '#fe2c55',
      color: '#fe2c55',
      backgroundColor: 'rgba(254, 44, 85, 0.1)',
    },
    inactive: {
      borderColor: 'transparent',
      color: 'inherit',
      backgroundColor: 'transparent',
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tiktok-gradient-text">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t.subtitle}</p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#fe2c55] to-[#25f4ee] mx-auto mt-4"></div>
        </ScrollReveal>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <ScrollReveal className="md:w-1/2" direction="left">
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-8 rounded-lg">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {t.description}
                </p>
                
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                  <motion.button
                    className="px-4 py-2 border-b-2 font-medium text-sm"
                    variants={tabVariants}
                    animate={activeTab === 'skills' ? 'active' : 'inactive'}
                    onClick={() => setActiveTab('skills')}
                  >
                    {t.skills}
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 border-b-2 font-medium text-sm"
                    variants={tabVariants}
                    animate={activeTab === 'experience' ? 'active' : 'inactive'}
                    onClick={() => setActiveTab('experience')}
                  >
                    {t.experience}
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 border-b-2 font-medium text-sm"
                    variants={tabVariants}
                    animate={activeTab === 'education' ? 'active' : 'inactive'}
                    onClick={() => setActiveTab('education')}
                  >
                    {t.education}
                  </motion.button>
                </div>
                
                <motion.div
                  key={activeTab}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {activeTab === 'skills' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {t.skillsList.map((skill, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-[#fe2c55] rounded-full mr-2"></div>
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {activeTab === 'experience' && (
                    <div className="space-y-4">
                      {t.experienceList.map((exp, index) => (
                        <div key={index} className="relative pl-8 border-l-2 border-[#fe2c55]">
                          <div className="absolute -left-2 top-0 w-4 h-4 bg-[#fe2c55] rounded-full"></div>
                          <h4 className="font-bold">{exp.position}</h4>
                          <p className="text-[#fe2c55] dark:text-[#fe2c55] text-sm">{exp.company} | {exp.period}</p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {activeTab === 'education' && (
                    <div className="space-y-4">
                      {t.educationList.map((edu, index) => (
                        <div key={index} className="relative pl-8 border-l-2 border-[#25f4ee]">
                          <div className="absolute -left-2 top-0 w-4 h-4 bg-[#25f4ee] rounded-full"></div>
                          <h4 className="font-bold">{edu.degree}</h4>
                          <p className="text-[#25f4ee] dark:text-[#25f4ee] text-sm">{edu.institution} | {edu.period}</p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{edu.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal className="md:w-1/2" direction="right">
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-8 rounded-lg shadow-lg">
                <div className="relative z-10">
                  <div className="flex justify-center mb-8">
                    <div className="w-full h-64 overflow-hidden rounded-lg shadow-lg">
                      <img 
                        src="/nilton-about.jpg" 
                        alt="Nilton Ramim Pita" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "https://i.ibb.co/CpyLCH6f/nilton-about.jpg";
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow text-center">
                      <div className="w-12 h-12 bg-[#fe2c55]/20 dark:bg-[#fe2c55]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Code className="w-6 h-6 text-[#fe2c55] dark:text-[#fe2c55]" />
                      </div>
                      <h3 className="font-bold">5+</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Anos de Programação</p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow text-center">
                      <div className="w-12 h-12 bg-[#25f4ee]/20 dark:bg-[#25f4ee]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Briefcase className="w-6 h-6 text-[#25f4ee] dark:text-[#25f4ee]" />
                      </div>
                      <h3 className="font-bold">10+</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Projetos Concluídos</p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#fe2c55]/20 to-[#25f4ee]/20 dark:from-[#fe2c55]/20 dark:to-[#25f4ee]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <GraduationCap className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      </div>
                      <h3 className="font-bold">3+</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Certificações</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;